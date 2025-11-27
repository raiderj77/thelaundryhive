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
    sendEmail(message: EmailMessage): Promise<any>;
}

export interface SmsProvider {
    sendSms(message: SmsMessage): Promise<any>;
}
