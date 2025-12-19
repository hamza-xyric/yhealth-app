import ejs from 'ejs';
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { env } from '../config/env.config.js';
import { logger } from '../services/logger.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to EJS templates
const TEMPLATES_PATH = join(__dirname, '../mails');

/**
 * Email subject lines for each template type
 */
export const EMAIL_SUBJECTS = {
  'verification': 'Verify Your Email - yHealth',
  'resend-verification': 'New Verification Link - yHealth',
  'email-verified': 'Email Verified! - yHealth',
  'password-reset': 'Reset Your Password - yHealth',
  'password-changed': 'Password Changed - yHealth',
  'password-reset-otp': 'Your Password Reset Code - yHealth',
  'registration-otp': 'Your Verification Code - yHealth',
  'security-alert': 'Security Alert - yHealth',
  'welcome': 'Welcome to yHealth - Your AI Life Coach!',
  'assessment-reminder': 'Complete Your Assessment - yHealth',
  'integration-reminder': 'Connect Your Devices - yHealth',
  'goal-set': 'Goal Set! - yHealth',
  'onboarding-complete': "You're All Set! - yHealth",
  'weekly-progress': 'Your Weekly Progress - yHealth',
  'milestone-achieved': 'Milestone Achieved! - yHealth',
  'streak-milestone': 'Streak Milestone! - yHealth',
  're-engagement': 'We Miss You! - yHealth',
} as const;

export type EmailTemplateType = keyof typeof EMAIL_SUBJECTS;

/**
 * Options for sending email
 */
export interface SendMailOptions {
  email: string | string[];
  subject: string;
  template?: string;
  html?: string;
  text?: string;
  data?: Record<string, unknown>;
  fromName?: string;
  attachments?: Array<{
    filename: string;
    content?: string | Buffer;
    path?: string;
    contentType?: string;
  }>;
}

/**
 * Public interface for MailHelper
 */
export interface IMailHelper {
  send(options: SendMailOptions): Promise<boolean>;
  verify(): Promise<boolean>;
  healthCheck(): Promise<{ status: 'up' | 'down'; message?: string }>;
  isMailConfigured(): boolean;
  getAppUrl(): string;
  sendVerificationEmail(email: string, firstName: string, verificationToken: string): Promise<boolean>;
  resendVerificationEmail(email: string, firstName: string, verificationToken: string): Promise<boolean>;
  sendEmailVerifiedEmail(email: string, firstName: string): Promise<boolean>;
  sendPasswordResetEmail(email: string, firstName: string, resetToken: string, ipAddress?: string): Promise<boolean>;
  sendPasswordResetOTPEmail(email: string, firstName: string, otpCode: string, expiresIn?: string): Promise<boolean>;
  sendRegistrationOTPEmail(email: string, firstName: string, otpCode: string, expiresIn?: string): Promise<boolean>;
  sendPasswordChangedEmail(email: string, firstName: string, ipAddress?: string, device?: string): Promise<boolean>;
  sendSecurityAlertEmail(email: string, firstName: string, alertType: string, ipAddress?: string, location?: string, device?: string): Promise<boolean>;
  sendWelcomeEmail(email: string, firstName: string): Promise<boolean>;
  sendAssessmentReminderEmail(email: string, firstName: string, daysRegistered: number): Promise<boolean>;
  sendIntegrationReminderEmail(email: string, firstName: string, connectedCount: number, availableIntegrations?: string[]): Promise<boolean>;
  sendGoalSetEmail(email: string, firstName: string, goalTitle: string, goalCategory: string): Promise<boolean>;
  sendOnboardingCompleteEmail(email: string, firstName: string, connectedDevices?: number, goalsSet?: number): Promise<boolean>;
  sendWeeklyProgressEmail(email: string, firstName: string, data: {
    weekStart: string;
    weekEnd: string;
    checkIns?: number;
    goalsProgress?: number;
    streak?: number;
    coachMessage?: string;
    highlights?: Array<{ icon?: string; title: string; description: string }>;
    insights?: string[];
    nextWeekFocus?: string;
  }): Promise<boolean>;
  sendMilestoneAchievedEmail(email: string, firstName: string, data: {
    milestoneTitle: string;
    milestoneDescription: string;
    milestoneCategory: string;
    milestoneIcon?: string;
    stats?: {
      daysActive?: number;
      totalCheckIns?: number;
      goalsCompleted?: number;
    };
  }): Promise<boolean>;
  sendStreakMilestoneEmail(email: string, firstName: string, streakDays: number, nextMilestone?: number, motivationalQuote?: string, quoteAuthor?: string): Promise<boolean>;
  sendReEngagementEmail(email: string, firstName: string, daysAway: number, lastActivity?: string, newFeatures?: string[]): Promise<boolean>;
}

/**
 * Mail Helper - Centralized email sending utility for yHealth
 * Uses EJS templates for rendering beautiful, responsive emails
 */
class MailHelper {
  private static instance: MailHelper;
  private transporter: Transporter | null = null;
  private readonly isConfigured: boolean;
  private readonly appUrl: string;

  private constructor() {
    this.isConfigured = !!(env.smtp.host && env.smtp.user && env.smtp.pass);
    this.appUrl = process.env['APP_URL'] || 'http://localhost:3000';

    if (this.isConfigured) {
      this.createTransporter();
    } else {
      logger.warn('Mail helper not configured - SMTP credentials missing');
    }
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): MailHelper {
    if (!MailHelper.instance) {
      MailHelper.instance = new MailHelper();
    }
    return MailHelper.instance;
  }

  /**
   * Create nodemailer transporter with connection pooling
   */
  private createTransporter(): void {
    try {
      this.transporter = nodemailer.createTransport({
        host: env.smtp.host,
        port: env.smtp.port,
        secure: env.smtp.secure,
        auth: {
          user: env.smtp.user,
          pass: env.smtp.pass,
        },
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
        rateLimit: 10,
      });

      logger.info('Mail transporter created', { host: env.smtp.host });
    } catch (error) {
      logger.error('Failed to create mail transporter', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Render EJS template with data
   */
  private async renderTemplate(
    templateName: string,
    data: Record<string, unknown>
  ): Promise<string> {
    const templatePath = templateName.endsWith('.ejs')
      ? join(TEMPLATES_PATH, templateName)
      : join(TEMPLATES_PATH, `${templateName}.ejs`);
    return ejs.renderFile(templatePath, data);
  }

  /**
   * Verify transporter connection
   */
  public async verify(): Promise<boolean> {
    if (!this.transporter) {
      return false;
    }

    try {
      await this.transporter.verify();
      logger.info('Mail service verified');
      return true;
    } catch (error) {
      logger.error('Mail service verification failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return false;
    }
  }

  /**
   * Send email - Core method
   */
  public async send(options: SendMailOptions): Promise<boolean> {
    if (!this.transporter || !this.isConfigured) {
      logger.warn('Email not sent - service not configured', {
        to: options.email,
        subject: options.subject,
      });
      return false;
    }

    try {
      const { email, subject, template, html: providedHtml, text, data, fromName = 'yHealth', attachments } = options;

      if (!email || !subject) {
        throw new Error('Missing required email parameters: email or subject');
      }

      let html: string;
      if (providedHtml) {
        html = providedHtml;
      } else if (template) {
        html = await this.renderTemplate(template, data || {});
      } else {
        throw new Error('Either template or html must be provided');
      }

      const mailOptions = {
        from: `${fromName} <${env.smtp.from || env.smtp.user}>`,
        to: Array.isArray(email) ? email.join(', ') : email,
        subject,
        html,
        ...(text && { text }),
        ...(attachments && {
          attachments: attachments.map(att => ({
            filename: att.filename,
            ...(att.content && { content: att.content }),
            ...(att.path && { path: att.path }),
            ...(att.contentType && { contentType: att.contentType }),
          })),
        }),
      };

      const info = await this.transporter.sendMail(mailOptions);

      logger.info('Email sent successfully', {
        messageId: info.messageId,
        to: email,
        subject,
      });

      return true;
    } catch (error) {
      logger.error('Failed to send email', {
        error: error instanceof Error ? error.message : 'Unknown error',
        to: options.email,
        subject: options.subject,
        template: options.template,
      });
      return false;
    }
  }

  // ============================================
  // VERIFICATION EMAILS
  // ============================================

  /**
   * Send email verification
   */
  public async sendVerificationEmail(
    email: string,
    firstName: string,
    verificationToken: string
  ): Promise<boolean> {
    const verificationUrl = `${this.appUrl}/verify-email?token=${verificationToken}`;

    return this.send({
      email,
      subject: EMAIL_SUBJECTS['verification'],
      template: 'emailVerification',
      data: { firstName, verificationUrl },
    });
  }

  /**
   * Resend verification email
   */
  public async resendVerificationEmail(
    email: string,
    firstName: string,
    verificationToken: string
  ): Promise<boolean> {
    const verificationUrl = `${this.appUrl}/verify-email?token=${verificationToken}`;

    return this.send({
      email,
      subject: EMAIL_SUBJECTS['resend-verification'],
      template: 'resendVerification',
      data: { firstName, verificationUrl },
    });
  }

  /**
   * Send email verified confirmation
   */
  public async sendEmailVerifiedEmail(
    email: string,
    firstName: string
  ): Promise<boolean> {
    const dashboardUrl = `${this.appUrl}/dashboard`;

    return this.send({
      email,
      subject: EMAIL_SUBJECTS['email-verified'],
      template: 'emailVerified',
      data: { firstName, dashboardUrl },
    });
  }

  // ============================================
  // PASSWORD EMAILS
  // ============================================

  /**
   * Send password reset email
   */
  public async sendPasswordResetEmail(
    email: string,
    firstName: string,
    resetToken: string,
    ipAddress?: string
  ): Promise<boolean> {
    const resetUrl = `${this.appUrl}/reset-password?token=${resetToken}`;

    return this.send({
      email,
      subject: EMAIL_SUBJECTS['password-reset'],
      template: 'passwordReset',
      data: { firstName, resetUrl, ipAddress },
    });
  }

  /**
   * Send password reset OTP email
   */
  public async sendPasswordResetOTPEmail(
    email: string,
    firstName: string,
    otpCode: string,
    expiresIn: string = '10 minutes'
  ): Promise<boolean> {
    return this.send({
      email,
      subject: EMAIL_SUBJECTS['password-reset-otp'],
      template: 'passwordResetOTP',
      data: { firstName, otpCode, expiresIn },
    });
  }

  /**
   * Send registration OTP email for account verification
   */
  public async sendRegistrationOTPEmail(
    email: string,
    firstName: string,
    otpCode: string,
    expiresIn: string = '10 minutes'
  ): Promise<boolean> {
    return this.send({
      email,
      subject: EMAIL_SUBJECTS['registration-otp'],
      template: 'registrationOTP',
      data: { firstName, otpCode, expiresIn },
    });
  }

  /**
   * Send password changed confirmation
   */
  public async sendPasswordChangedEmail(
    email: string,
    firstName: string,
    ipAddress?: string,
    device?: string
  ): Promise<boolean> {
    const dashboardUrl = `${this.appUrl}/dashboard`;
    const resetUrl = `${this.appUrl}/forgot-password`;
    const changedAt = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    return this.send({
      email,
      subject: EMAIL_SUBJECTS['password-changed'],
      template: 'passwordChanged',
      data: { firstName, changedAt, ipAddress, device, dashboardUrl, resetUrl },
    });
  }

  /**
   * Send security alert email
   */
  public async sendSecurityAlertEmail(
    email: string,
    firstName: string,
    alertType: string,
    ipAddress?: string,
    location?: string,
    device?: string
  ): Promise<boolean> {
    const secureAccountUrl = `${this.appUrl}/settings/security`;
    const activityTime = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    return this.send({
      email,
      subject: EMAIL_SUBJECTS['security-alert'],
      template: 'securityAlert',
      data: { firstName, alertType, activityTime, ipAddress, location, device, secureAccountUrl },
    });
  }

  // ============================================
  // WELCOME & ONBOARDING EMAILS
  // ============================================

  /**
   * Send welcome email
   */
  public async sendWelcomeEmail(
    email: string,
    firstName: string
  ): Promise<boolean> {
    const dashboardUrl = `${this.appUrl}/dashboard`;
    const assessmentUrl = `${this.appUrl}/onboarding/assessment`;

    return this.send({
      email,
      subject: EMAIL_SUBJECTS['welcome'],
      template: 'welcome',
      data: { firstName, dashboardUrl, assessmentUrl },
    });
  }

  /**
   * Send assessment reminder
   */
  public async sendAssessmentReminderEmail(
    email: string,
    firstName: string,
    daysRegistered: number
  ): Promise<boolean> {
    const assessmentUrl = `${this.appUrl}/onboarding/assessment`;

    return this.send({
      email,
      subject: EMAIL_SUBJECTS['assessment-reminder'],
      template: 'assessmentReminder',
      data: { firstName, assessmentUrl, daysRegistered },
    });
  }

  /**
   * Send integration reminder
   */
  public async sendIntegrationReminderEmail(
    email: string,
    firstName: string,
    connectedCount: number,
    availableIntegrations: string[] = ['WHOOP', 'Fitbit', 'Garmin', 'Oura']
  ): Promise<boolean> {
    const integrationsUrl = `${this.appUrl}/onboarding/integrations`;

    return this.send({
      email,
      subject: EMAIL_SUBJECTS['integration-reminder'],
      template: 'integrationReminder',
      data: { firstName, integrationsUrl, connectedCount, availableIntegrations },
    });
  }

  /**
   * Send goal set celebration
   */
  public async sendGoalSetEmail(
    email: string,
    firstName: string,
    goalTitle: string,
    goalCategory: string
  ): Promise<boolean> {
    const dashboardUrl = `${this.appUrl}/dashboard`;

    return this.send({
      email,
      subject: EMAIL_SUBJECTS['goal-set'],
      template: 'goalSet',
      data: { firstName, goalTitle, goalCategory, dashboardUrl },
    });
  }

  /**
   * Send onboarding complete email
   */
  public async sendOnboardingCompleteEmail(
    email: string,
    firstName: string,
    connectedDevices?: number,
    goalsSet?: number
  ): Promise<boolean> {
    const dashboardUrl = `${this.appUrl}/dashboard`;

    return this.send({
      email,
      subject: EMAIL_SUBJECTS['onboarding-complete'],
      template: 'onboardingComplete',
      data: { firstName, dashboardUrl, connectedDevices, goalsSet },
    });
  }

  // ============================================
  // PROGRESS & ENGAGEMENT EMAILS
  // ============================================

  /**
   * Send weekly progress summary
   */
  public async sendWeeklyProgressEmail(
    email: string,
    firstName: string,
    data: {
      weekStart: string;
      weekEnd: string;
      checkIns?: number;
      goalsProgress?: number;
      streak?: number;
      coachMessage?: string;
      highlights?: Array<{ icon?: string; title: string; description: string }>;
      insights?: string[];
      nextWeekFocus?: string;
    }
  ): Promise<boolean> {
    const dashboardUrl = `${this.appUrl}/dashboard`;

    return this.send({
      email,
      subject: EMAIL_SUBJECTS['weekly-progress'],
      template: 'weeklyProgress',
      data: { firstName, dashboardUrl, ...data },
    });
  }

  /**
   * Send milestone achieved celebration
   */
  public async sendMilestoneAchievedEmail(
    email: string,
    firstName: string,
    data: {
      milestoneTitle: string;
      milestoneDescription: string;
      milestoneCategory: string;
      milestoneIcon?: string;
      stats?: {
        daysActive?: number;
        totalCheckIns?: number;
        goalsCompleted?: number;
      };
    }
  ): Promise<boolean> {
    const dashboardUrl = `${this.appUrl}/dashboard`;

    return this.send({
      email,
      subject: EMAIL_SUBJECTS['milestone-achieved'],
      template: 'milestoneAchieved',
      data: { firstName, dashboardUrl, ...data },
    });
  }

  /**
   * Send streak milestone celebration
   */
  public async sendStreakMilestoneEmail(
    email: string,
    firstName: string,
    streakDays: number,
    nextMilestone?: number,
    motivationalQuote?: string,
    quoteAuthor?: string
  ): Promise<boolean> {
    const dashboardUrl = `${this.appUrl}/dashboard`;

    return this.send({
      email,
      subject: `${streakDays} Day Streak! - yHealth`,
      template: 'streakMilestone',
      data: { firstName, streakDays, dashboardUrl, nextMilestone, motivationalQuote, quoteAuthor },
    });
  }

  /**
   * Send re-engagement email for inactive users
   */
  public async sendReEngagementEmail(
    email: string,
    firstName: string,
    daysAway: number,
    lastActivity?: string,
    newFeatures?: string[]
  ): Promise<boolean> {
    const dashboardUrl = `${this.appUrl}/dashboard`;

    return this.send({
      email,
      subject: EMAIL_SUBJECTS['re-engagement'],
      template: 'reEngagement',
      data: { firstName, daysAway, dashboardUrl, lastActivity, newFeatures },
    });
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  /**
   * Health check
   */
  public async healthCheck(): Promise<{ status: 'up' | 'down'; message?: string }> {
    if (!this.isConfigured) {
      return { status: 'down', message: 'Not configured' };
    }

    const verified = await this.verify();
    return verified
      ? { status: 'up' }
      : { status: 'down', message: 'Verification failed' };
  }

  /**
   * Check if mail service is configured
   */
  public isMailConfigured(): boolean {
    return this.isConfigured;
  }

  /**
   * Get app URL
   */
  public getAppUrl(): string {
    return this.appUrl;
  }
}

// Export singleton instance
export const mailHelper = MailHelper.getInstance();

// Export default for backward compatibility
export default mailHelper;

// Legacy function export for backward compatibility
export const sendMail = async (options: SendMailOptions): Promise<boolean> => {
  return mailHelper.send(options);
};
