import { pool } from './pg.js';
import { logger } from '../services/logger.service.js';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// List of expected tables in the database
const EXPECTED_TABLES = [
  'users',
  'user_preferences',
  'consent_records',
  'whatsapp_enrollments',
  'user_goals',
  'assessment_questions',
  'assessment_responses',
  'user_integrations',
  'sync_logs',
  'health_data_records',
  'user_plans',
  'activity_logs',
  'notifications',
];

// List of expected enum types
const EXPECTED_TYPES = [
  'user_role',
  'gender',
  'auth_provider',
  'onboarding_status',
  'consent_type',
  'notification_channel',
  'coaching_style',
  'coaching_intensity',
  'goal_category',
  'health_pillar',
  'goal_status',
  'assessment_type',
  'question_type',
  'integration_provider',
  'sync_status',
  'data_type',
  'plan_status',
  'activity_type',
  'day_of_week',
  'activity_log_status',
  'notification_type',
  'notification_priority',
];

/**
 * Check which tables exist in the database
 */
async function getExistingTables(): Promise<string[]> {
  const result = await pool.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
  `);
  return result.rows.map(row => row.table_name);
}

/**
 * Check which enum types exist in the database
 */
async function getExistingTypes(): Promise<string[]> {
  const result = await pool.query(`
    SELECT typname
    FROM pg_type
    WHERE typcategory = 'E'
  `);
  return result.rows.map(row => row.typname);
}

/**
 * Run the full schema if database is empty or missing critical tables
 */
async function runFullSchema(): Promise<void> {
  const schemaPath = join(__dirname, 'schema.sql');

  if (!existsSync(schemaPath)) {
    logger.error('Schema file not found', { path: schemaPath });
    throw new Error('Schema file not found');
  }

  const schema = readFileSync(schemaPath, 'utf-8');

  logger.info('Applying full database schema...');
  await pool.query(schema);
  logger.info('Full database schema applied successfully');
}

/**
 * Run a specific migration file
 */
async function runMigration(migrationFile: string): Promise<void> {
  const migrationPath = join(__dirname, 'migrations', migrationFile);

  if (!existsSync(migrationPath)) {
    logger.warn('Migration file not found', { path: migrationPath });
    return;
  }

  const migration = readFileSync(migrationPath, 'utf-8');

  logger.info(`Running migration: ${migrationFile}`);
  await pool.query(migration);
  logger.info(`Migration completed: ${migrationFile}`);
}

/**
 * Check database and auto-migrate missing tables
 */
export async function autoMigrate(): Promise<{
  success: boolean;
  tablesCreated: string[];
  existingTables: string[];
}> {
  try {
    // Get existing tables
    const existingTables = await getExistingTables();
    const existingTypes = await getExistingTypes();

    logger.debug('Existing tables', { tables: existingTables });
    logger.debug('Existing types', { types: existingTypes });

    // Find missing tables
    const missingTables = EXPECTED_TABLES.filter(
      table => !existingTables.includes(table)
    );

    // Find missing types
    const missingTypes = EXPECTED_TYPES.filter(
      type => !existingTypes.includes(type)
    );

    if (missingTables.length === 0 && missingTypes.length === 0) {
      logger.info('Database schema is up to date', {
        tableCount: existingTables.length,
      });
      return {
        success: true,
        tablesCreated: [],
        existingTables
      };
    }

    logger.info('Missing database objects detected', {
      missingTables,
      missingTypes,
    });

    // If most tables are missing, run full schema
    if (missingTables.length > EXPECTED_TABLES.length / 2) {
      logger.info('Running full schema migration...');
      await runFullSchema();

      const newTables = await getExistingTables();
      return {
        success: true,
        tablesCreated: missingTables,
        existingTables: newTables
      };
    }

    // Otherwise, run individual migrations for missing tables
    const tablesCreated: string[] = [];

    // Check for specific migrations in the migrations folder
    const migrationsDir = join(__dirname, 'migrations');

    if (existsSync(migrationsDir)) {
      const migrationFiles = readdirSync(migrationsDir)
        .filter(f => f.endsWith('.sql'))
        .sort();

      for (const table of missingTables) {
        // Look for a migration file that creates this table
        const migrationFile = migrationFiles.find(f =>
          f.toLowerCase().includes(table.replace(/_/g, '-')) ||
          f.toLowerCase().includes(table)
        );

        if (migrationFile) {
          try {
            await runMigration(migrationFile);
            tablesCreated.push(table);
          } catch (error) {
            logger.error(`Failed to run migration for ${table}`, {
              error: (error as Error).message
            });
          }
        }
      }
    }

    // If we still have missing tables after individual migrations, run full schema
    const stillMissingTables = missingTables.filter(
      t => !tablesCreated.includes(t)
    );

    if (stillMissingTables.length > 0) {
      logger.info('Running full schema for remaining tables...', {
        stillMissingTables
      });
      await runFullSchema();
      tablesCreated.push(...stillMissingTables);
    }

    const finalTables = await getExistingTables();

    logger.info('Auto-migration completed', {
      tablesCreated,
      totalTables: finalTables.length,
    });

    return {
      success: true,
      tablesCreated,
      existingTables: finalTables
    };

  } catch (error) {
    logger.error('Auto-migration failed', {
      error: (error as Error).message,
      stack: (error as Error).stack,
    });
    return {
      success: false,
      tablesCreated: [],
      existingTables: []
    };
  }
}

/**
 * Verify database schema integrity
 */
export async function verifySchema(): Promise<{
  isValid: boolean;
  missingTables: string[];
  missingTypes: string[];
}> {
  const existingTables = await getExistingTables();
  const existingTypes = await getExistingTypes();

  const missingTables = EXPECTED_TABLES.filter(
    table => !existingTables.includes(table)
  );

  const missingTypes = EXPECTED_TYPES.filter(
    type => !existingTypes.includes(type)
  );

  return {
    isValid: missingTables.length === 0 && missingTypes.length === 0,
    missingTables,
    missingTypes,
  };
}

export default {
  autoMigrate,
  verifySchema,
  EXPECTED_TABLES,
  EXPECTED_TYPES,
};
