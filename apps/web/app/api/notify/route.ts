import { NextResponse } from "next/server";
import { notifications } from "@/lib/notifications/service";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, to, subject, content } = body;

        if (!to || !content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (type === "email") {
            await notifications.sendEmail(to, subject || "Notification", "<div>" + content + "</div>", content);
        } else if (type === "sms") {
            await notifications.sendSms(to, content);
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Notification Error:", error);
        return NextResponse.json({ error: "Failed to send notification", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}
