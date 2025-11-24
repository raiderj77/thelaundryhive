import { EmailProvider } from "./types";
import { SmsProvider } from "./types";
import { MockEmailProvider, SesEmailProvider } from "./email-provider";
import { MockSmsProvider, TwilioSmsProvider } from "./sms-provider";

class NotificationService {
    private emailProvider: EmailProvider;
    private smsProvider: SmsProvider;

    constructor() {
        // EMAIL SETUP
        const sesRegion = process.env.AWS_SES_REGION;
        const emailFrom = process.env.EMAIL_FROM;
        const isSesConfigured = sesRegion && emailFrom && !sesRegion.includes("your_") && !emailFrom.includes("your_");

        if (isSesConfigured) {
            this.emailProvider = new SesEmailProvider(sesRegion!, emailFrom!);
        } else {
            this.emailProvider = new MockEmailProvider();
        }

        // SMS SETUP
        const twilioSid = process.env.TWILIO_ACCOUNT_SID;
        const twilioToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioFrom = process.env.TWILIO_FROM;
        const isTwilioConfigured = twilioSid && twilioToken && twilioFrom &&
            !twilioSid.includes("your_") &&
            !twilioToken.includes("your_");

        if (isTwilioConfigured) {
            this.smsProvider = new TwilioSmsProvider(twilioSid!, twilioToken!, twilioFrom!);
        } else {
            this.smsProvider = new MockSmsProvider();
        }
    }

    async sendEmail(to: string, subject: string, html: string, text?: string) {
        return this.emailProvider.sendEmail({ to, subject, html, text });
    }

    async sendSms(to: string, body: string) {
        return this.smsProvider.sendSms({ to, body });
    }
}

export const notifications = new NotificationService();
