import { notifications } from "@/lib/notifications/service";

async function test() {
    console.log("🧪 Testing Notification Service (Direct)...");

    console.log("\n--- Testing Email (Mock) ---");
    await notifications.sendEmail("test@example.com", "Hello World", "<h1>Hello</h1>", "Hello");

    console.log("\n--- Testing SMS (Mock) ---");
    await notifications.sendSms("+15550000000", "Your order is ready!");

    console.log("\n✅ Service Test Complete");
}

test().catch(console.error);
