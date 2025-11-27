import twilio from "twilio";
import { SmsMessage, SmsProvider } from "./types";

export class MockSmsProvider implements SmsProvider {
    async sendSms(message: SmsMessage): Promise<any> {
        console.log("📱 [MOCK SMS] To:", message.to);
        console.log("   Body:", message.body);
        return { sid: "mock_sid_" + Date.now() };
    }
}

export class TwilioSmsProvider implements SmsProvider {
    private client: twilio.Twilio;
    private fromNumber: string;

    constructor(accountSid: string, authToken: string, fromNumber: string) {
        this.client = twilio(accountSid, authToken);
        this.fromNumber = fromNumber;
    }

    async sendSms(message: SmsMessage): Promise<any> {
        const result = await this.client.messages.create({
            body: message.body,
            from: this.fromNumber,
            to: message.to,
        });
        console.log("✅ Twilio SMS Sent! SID:", result.sid);
        return result;
    }
}
