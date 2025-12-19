-- YHealth Database Schema
-- PostgreSQL Tables (Raw SQL - No Prisma)

-- ============================================
-- CUSTOM TYPES (ENUMS)
-- ============================================

-- Drop existing types if they exist (for clean migration)
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS gender CASCADE;
DROP TYPE IF EXISTS auth_provider CASCADE;
DROP TYPE IF EXISTS onboarding_status CASCADE;
DROP TYPE IF EXISTS consent_type CASCADE;
DROP TYPE IF EXISTS notification_channel CASCADE;
DROP TYPE IF EXISTS coaching_style CASCADE;
DROP TYPE IF EXISTS coaching_intensity CASCADE;
DROP TYPE IF EXISTS goal_category CASCADE;
DROP TYPE IF EXISTS health_pillar CASCADE;
DROP TYPE IF EXISTS goal_status CASCADE;
DROP TYPE IF EXISTS assessment_type CASCADE;
DROP TYPE IF EXISTS question_type CASCADE;
DROP TYPE IF EXISTS integration_provider CASCADE;
DROP TYPE IF EXISTS sync_status CASCADE;
DROP TYPE IF EXISTS data_type CASCADE;
DROP TYPE IF EXISTS plan_status CASCADE;
DROP TYPE IF EXISTS activity_type CASCADE;
DROP TYPE IF EXISTS day_of_week CASCADE;
DROP TYPE IF EXISTS activity_log_status CASCADE;

-- Create enum types
CREATE TYPE user_role AS ENUM ('user', 'admin', 'moderator', 'doctor', 'patient');
CREATE TYPE gender AS ENUM ('male', 'female', 'non_binary', 'prefer_not_to_say');
CREATE TYPE auth_provider AS ENUM ('local', 'google', 'apple');
CREATE TYPE onboarding_status AS ENUM ('registered', 'consent_pending', 'assessment_pending', 'goals_pending', 'integrations_pending', 'preferences_pending', 'plan_pending', 'completed');
CREATE TYPE consent_type AS ENUM ('terms_of_service', 'privacy_policy', 'email_marketing', 'whatsapp_coaching');
CREATE TYPE notification_channel AS ENUM ('push', 'email', 'whatsapp', 'sms');
CREATE TYPE coaching_style AS ENUM ('supportive', 'direct', 'analytical', 'motivational');
CREATE TYPE coaching_intensity AS ENUM ('light', 'moderate', 'intensive');
CREATE TYPE goal_category AS ENUM ('weight_loss', 'muscle_building', 'sleep_improvement', 'stress_wellness', 'energy_productivity', 'event_training', 'health_condition', 'habit_building', 'overall_optimization', 'custom');
CREATE TYPE health_pillar AS ENUM ('fitness', 'nutrition', 'wellbeing');
CREATE TYPE goal_status AS ENUM ('draft', 'active', 'paused', 'completed', 'abandoned');
CREATE TYPE assessment_type AS ENUM ('quick', 'deep');
CREATE TYPE question_type AS ENUM ('single_select', 'multi_select', 'slider', 'emoji_scale', 'number_input', 'date_picker', 'text_input');
CREATE TYPE integration_provider AS ENUM ('whoop', 'apple_health', 'fitbit', 'garmin', 'oura', 'samsung_health', 'myfitnesspal', 'nutritionix', 'cronometer', 'strava');
CREATE TYPE sync_status AS ENUM ('active', 'paused', 'error', 'disconnected', 'pending');
CREATE TYPE data_type AS ENUM ('heart_rate', 'hrv', 'sleep', 'steps', 'workouts', 'calories', 'nutrition', 'strain', 'recovery', 'body_temp', 'vo2_max', 'training_load', 'gps_activities');
CREATE TYPE plan_status AS ENUM ('draft', 'active', 'paused', 'completed', 'archived');
CREATE TYPE activity_type AS ENUM ('workout', 'meal', 'sleep_routine', 'mindfulness', 'habit', 'check_in', 'reflection', 'learning');
CREATE TYPE day_of_week AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
CREATE TYPE activity_log_status AS ENUM ('pending', 'completed', 'skipped', 'partial');

-- ============================================
-- UUID EXTENSION
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Users table (supports both local and social auth via NextAuth)
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    gender gender,
    role user_role DEFAULT 'user',
    is_active BOOLEAN DEFAULT true,
    is_email_verified BOOLEAN DEFAULT false,
    avatar VARCHAR(500),
    phone VARCHAR(20),

    -- Auth provider (local, google, apple)
    auth_provider auth_provider DEFAULT 'local',
    -- Provider user ID (for social auth - e.g., Google sub ID)
    provider_id VARCHAR(255),

    -- Onboarding
    onboarding_status onboarding_status DEFAULT 'registered',
    onboarding_completed_at TIMESTAMP,

    -- Security tokens
    last_login TIMESTAMP,
    refresh_token TEXT,
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    email_verification_token VARCHAR(255),
    email_verification_expires TIMESTAMP,
    phone_verification_code VARCHAR(10),
    phone_verification_expires TIMESTAMP,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for users
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_users_created_at ON users(created_at DESC);
CREATE INDEX idx_users_onboarding_status ON users(onboarding_status);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_provider ON users(auth_provider, provider_id);

-- Consent records table
DROP TABLE IF EXISTS consent_records CASCADE;
CREATE TABLE consent_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type consent_type NOT NULL,
    version VARCHAR(20) NOT NULL,
    consented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip VARCHAR(45),

    UNIQUE(user_id, type)
);

CREATE INDEX idx_consent_records_user_id ON consent_records(user_id);

-- WhatsApp enrollments table
DROP TABLE IF EXISTS whatsapp_enrollments CASCADE;
CREATE TABLE whatsapp_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    phone_number VARCHAR(20) NOT NULL,
    country_code VARCHAR(5) NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    verified_at TIMESTAMP,
    consented_at TIMESTAMP
);

CREATE INDEX idx_whatsapp_enrollments_phone ON whatsapp_enrollments(phone_number);

-- User preferences table
DROP TABLE IF EXISTS user_preferences CASCADE;
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Notification Preferences
    notification_channels JSONB DEFAULT '{"push": true, "email": true, "whatsapp": false, "sms": false}',
    notification_types JSONB DEFAULT '{}',
    quiet_hours_enabled BOOLEAN DEFAULT true,
    quiet_hours_start VARCHAR(5) DEFAULT '22:00',
    quiet_hours_end VARCHAR(5) DEFAULT '07:00',
    timezone VARCHAR(50) DEFAULT 'UTC',
    max_notifications_day INTEGER DEFAULT 10,
    max_notifications_week INTEGER DEFAULT 50,

    -- Coaching Preferences
    coaching_style coaching_style DEFAULT 'supportive',
    coaching_intensity coaching_intensity DEFAULT 'moderate',
    preferred_channel notification_channel DEFAULT 'push',
    check_in_frequency VARCHAR(20) DEFAULT 'daily',
    preferred_check_in_time VARCHAR(5) DEFAULT '09:00',

    -- AI Personality
    ai_use_emojis BOOLEAN DEFAULT true,
    ai_formality_level VARCHAR(20) DEFAULT 'balanced',
    ai_encouragement_level VARCHAR(20) DEFAULT 'medium',
    focus_areas TEXT[] DEFAULT '{}',

    -- Display Preferences
    weight_unit VARCHAR(10) DEFAULT 'kg',
    height_unit VARCHAR(10) DEFAULT 'cm',
    distance_unit VARCHAR(10) DEFAULT 'km',
    temperature_unit VARCHAR(15) DEFAULT 'celsius',
    date_format VARCHAR(15) DEFAULT 'YYYY-MM-DD',
    time_format VARCHAR(5) DEFAULT '24h',
    language VARCHAR(10) DEFAULT 'en',
    theme VARCHAR(10) DEFAULT 'system',

    -- Privacy Preferences
    share_progress_with_coach BOOLEAN DEFAULT true,
    allow_anonymous_data_research BOOLEAN DEFAULT false,
    show_in_leaderboards BOOLEAN DEFAULT false,
    profile_visibility VARCHAR(10) DEFAULT 'private',

    -- Integration Preferences
    auto_sync_enabled BOOLEAN DEFAULT true,
    sync_on_wifi_only BOOLEAN DEFAULT false,
    background_sync_enabled BOOLEAN DEFAULT true,
    data_retention_days INTEGER DEFAULT 365,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User goals table
DROP TABLE IF EXISTS user_goals CASCADE;
CREATE TABLE user_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category goal_category NOT NULL,
    custom_goal_text VARCHAR(500),
    pillar health_pillar NOT NULL,
    is_primary BOOLEAN DEFAULT false,

    -- SMART Goal Details
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    target_value FLOAT NOT NULL,
    target_unit VARCHAR(50) NOT NULL,
    current_value FLOAT,
    start_value FLOAT,

    -- Timeline
    start_date DATE NOT NULL,
    target_date DATE NOT NULL,
    duration_weeks INTEGER NOT NULL,

    -- Milestones
    milestones JSONB DEFAULT '[]',

    -- Motivation
    motivation VARCHAR(500) NOT NULL,
    confidence_level SMALLINT NOT NULL,

    -- Status
    status goal_status DEFAULT 'active',
    progress FLOAT DEFAULT 0,

    -- Safety
    is_safety_checked BOOLEAN DEFAULT false,
    safety_warnings TEXT[] DEFAULT '{}',
    requires_doctor_consult BOOLEAN DEFAULT false,

    -- AI Metadata
    ai_suggested BOOLEAN DEFAULT false,
    ai_confidence_score FLOAT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_goals_user_status ON user_goals(user_id, status);
CREATE INDEX idx_user_goals_user_primary ON user_goals(user_id, is_primary);
CREATE INDEX idx_user_goals_user_pillar ON user_goals(user_id, pillar);

-- Assessment questions table
DROP TABLE IF EXISTS assessment_questions CASCADE;
CREATE TABLE assessment_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id VARCHAR(100) UNIQUE NOT NULL,
    text TEXT NOT NULL,
    type question_type NOT NULL,
    category VARCHAR(50) NOT NULL,
    pillar health_pillar,
    order_num INTEGER NOT NULL,
    is_required BOOLEAN DEFAULT true,

    -- Options
    options JSONB,
    slider_config JSONB,
    validation JSONB,
    show_if JSONB,

    is_active BOOLEAN DEFAULT true,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_assessment_questions_category_order ON assessment_questions(category, order_num);
CREATE INDEX idx_assessment_questions_active ON assessment_questions(is_active);

-- Assessment responses table
DROP TABLE IF EXISTS assessment_responses CASCADE;
CREATE TABLE assessment_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assessment_type assessment_type NOT NULL,
    goal_category goal_category NOT NULL,

    -- Responses
    responses JSONB DEFAULT '[]',

    -- Deep assessment conversation
    conversation_transcript JSONB,

    -- Extracted insights
    extracted_insights JSONB,

    -- Baseline data
    baseline_data JSONB DEFAULT '{}',

    -- Body stats
    body_stats JSONB,

    -- Status
    is_complete BOOLEAN DEFAULT false,
    completed_at TIMESTAMP,
    time_spent_seconds INTEGER,

    -- Mode switch tracking
    switched_from_mode assessment_type,
    switched_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_assessment_responses_user_complete ON assessment_responses(user_id, is_complete);
CREATE INDEX idx_assessment_responses_user_type ON assessment_responses(user_id, assessment_type);

-- User integrations table
DROP TABLE IF EXISTS user_integrations CASCADE;
CREATE TABLE user_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider integration_provider NOT NULL,

    -- OAuth tokens
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    token_expiry TIMESTAMP,
    scopes TEXT[] DEFAULT '{}',

    -- Connection status
    status sync_status DEFAULT 'pending',
    connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    disconnected_at TIMESTAMP,

    -- Sync tracking
    last_sync_at TIMESTAMP,
    last_sync_status VARCHAR(20),
    last_sync_error TEXT,
    sync_retry_count INTEGER DEFAULT 0,
    next_sync_at TIMESTAMP,

    -- Initial sync progress
    initial_sync_complete BOOLEAN DEFAULT false,
    initial_sync_progress JSONB,

    -- User preferences for this integration
    is_primary_for_data_types data_type[] DEFAULT '{}',
    is_enabled BOOLEAN DEFAULT true,

    -- Device info
    device_info JSONB,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(user_id, provider)
);

CREATE INDEX idx_user_integrations_user_status ON user_integrations(user_id, status);
CREATE INDEX idx_user_integrations_status_next_sync ON user_integrations(status, next_sync_at);

-- Sync logs table
DROP TABLE IF EXISTS sync_logs CASCADE;
CREATE TABLE sync_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    integration_id UUID NOT NULL REFERENCES user_integrations(id) ON DELETE CASCADE,
    provider integration_provider NOT NULL,

    -- Sync details
    sync_type VARCHAR(20) NOT NULL,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    duration_ms INTEGER,

    -- Results
    status VARCHAR(20) NOT NULL,
    records_processed INTEGER DEFAULT 0,
    records_created INTEGER DEFAULT 0,
    records_updated INTEGER DEFAULT 0,
    records_skipped INTEGER DEFAULT 0,

    -- Errors
    sync_errors JSONB,

    -- Date range synced
    date_range_start TIMESTAMP,
    date_range_end TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sync_logs_user_created ON sync_logs(user_id, created_at DESC);
CREATE INDEX idx_sync_logs_integration_created ON sync_logs(integration_id, created_at DESC);

-- Health data records table
DROP TABLE IF EXISTS health_data_records CASCADE;
CREATE TABLE health_data_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    integration_id UUID NOT NULL REFERENCES user_integrations(id) ON DELETE CASCADE,
    provider integration_provider NOT NULL,
    data_type data_type NOT NULL,

    -- Timestamp
    recorded_at TIMESTAMP NOT NULL,
    received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Value
    value JSONB NOT NULL,
    unit VARCHAR(50) NOT NULL,

    -- Source priority
    source_priority INTEGER DEFAULT 0,
    is_golden_source BOOLEAN DEFAULT false,

    -- Raw data reference
    raw_data_id VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_health_data_user_type_recorded ON health_data_records(user_id, data_type, recorded_at DESC);
CREATE INDEX idx_health_data_user_recorded ON health_data_records(user_id, recorded_at DESC);
CREATE INDEX idx_health_data_user_type_golden ON health_data_records(user_id, data_type, is_golden_source);

-- User plans table
DROP TABLE IF EXISTS user_plans CASCADE;
CREATE TABLE user_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    goal_id UUID NOT NULL REFERENCES user_goals(id) ON DELETE CASCADE,

    -- Plan metadata
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    pillar health_pillar NOT NULL,
    goal_category goal_category NOT NULL,

    -- Duration
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    duration_weeks INTEGER NOT NULL,
    current_week INTEGER DEFAULT 1,

    -- Status
    status plan_status DEFAULT 'draft',
    paused_at TIMESTAMP,
    resumed_at TIMESTAMP,
    completed_at TIMESTAMP,

    -- Activities
    activities JSONB DEFAULT '[]',

    -- Weekly focuses
    weekly_focuses JSONB DEFAULT '[]',

    -- AI generation metadata
    ai_generated BOOLEAN DEFAULT true,
    ai_model VARCHAR(50),
    generation_params JSONB,

    -- User adjustments
    user_adjustments JSONB DEFAULT '[]',

    -- Progress
    overall_progress FLOAT DEFAULT 0,
    weekly_completion_rates JSONB DEFAULT '[]',

    -- User feedback
    user_rating SMALLINT,
    user_feedback TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_plans_user_status ON user_plans(user_id, status);
CREATE INDEX idx_user_plans_user_goal ON user_plans(user_id, goal_id);

-- Activity logs table
DROP TABLE IF EXISTS activity_logs CASCADE;
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES user_plans(id) ON DELETE CASCADE,
    activity_id VARCHAR(100) NOT NULL,

    -- When
    scheduled_date DATE NOT NULL,
    completed_at TIMESTAMP,

    -- Status
    status activity_log_status DEFAULT 'pending',

    -- Tracking data
    actual_value FLOAT,
    target_value FLOAT,
    duration INTEGER,

    -- Notes
    user_notes TEXT,
    mood SMALLINT,

    -- AI feedback
    ai_feedback TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activity_logs_user_scheduled ON activity_logs(user_id, scheduled_date DESC);
CREATE INDEX idx_activity_logs_user_plan_scheduled ON activity_logs(user_id, plan_id, scheduled_date DESC);
CREATE INDEX idx_activity_logs_plan_activity_scheduled ON activity_logs(plan_id, activity_id, scheduled_date);

-- ============================================
-- TRIGGER FOR updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_goals_updated_at BEFORE UPDATE ON user_goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assessment_questions_updated_at BEFORE UPDATE ON assessment_questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assessment_responses_updated_at BEFORE UPDATE ON assessment_responses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_integrations_updated_at BEFORE UPDATE ON user_integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_health_data_records_updated_at BEFORE UPDATE ON health_data_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_plans_updated_at BEFORE UPDATE ON user_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_activity_logs_updated_at BEFORE UPDATE ON activity_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
