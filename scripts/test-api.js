// This script assumes the server is running on localhost:3000
// Using native fetch (Node 18+)

async function testApi() {
    console.log("🧪 Testing Notification API Endpoint...");

    try {
        const response = await fetch('http://localhost:3000/api/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'sms',
                to: '+15551234567',
                content: 'Your laundry is ready for pickup! 🧺'
            })
        });

        const data = await response.json();
        console.log("Response:", data);
    } catch (e) {
        console.error("Error:", e.message);
        console.log("⚠️ Make sure the dev server is running (npm run dev)");
    }
}

testApi();
