import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { EmailMessage, EmailProvider } from "./types";

export class MockEmailProvider implements EmailProvider {
    async sendEmail(message: EmailMessage): Promise<void> {
        console.log("📧 [MOCK EMAIL] To:", message.to);
        console.log("   Subject:", message.subject);
        console.log("   Body:", message.text || "(HTML Content)");
        return Promise.resolve();
    }
}

export class SesEmailProvider implements EmailProvider {
    private client: SESClient;
    private fromAddress: string;

    constructor(region: string, fromAddress: string) {
        this.client = new SESClient({ region });
        this.fromAddress = fromAddress;
    }

    async sendEmail(message: EmailMessage): Promise<void> {
        const command = new SendEmailCommand({
            Source: this.fromAddress,
            Destination: { ToAddresses: [message.to] },
            Message: {
                Subject: { Data: message.subject },
                Body: {
                    Html: { Data: message.html },
                    Text: message.text ? { Data: message.text } : undefined,
                },
            },
        });
        await this.client.send(command);
    }
}
