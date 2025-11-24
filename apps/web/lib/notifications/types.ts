export interface EmailMessage {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

export interface SmsMessage {
    to: string;
    body: string;
}

export interface EmailProvider {
    sendEmail(message: EmailMessage): Promise<void>;
}

export interface SmsProvider {
    sendSms(message: SmsMessage): Promise<void>;
}
