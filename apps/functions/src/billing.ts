import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

// Monthly Usage Aggregator
// Trigger: Scheduled every 1st of the month (Simulated via HTTP for now)
export const aggregateMonthlyUsage = functions.https.onRequest(async (req, res) => {
    const tenantsSnapshot = await db.collection("tenants").get();

    const batch = db.batch();
    const results: any[] = [];

    for (const tenantDoc of tenantsSnapshot.docs) {
        const tenantId = tenantDoc.id;

        // Calculate usage for last month
        // (Simplified: Just summing up all unbilled logs)
        const logsSnapshot = await db.collection("usage_logs")
            .where("tenantId", "==", tenantId)
            .where("billed", "==", false)
            .get();

        let totalCost = 0;
        logsSnapshot.forEach(doc => {
            totalCost += doc.data().cost || 0;
            batch.update(doc.ref, { billed: true });
        });

        if (totalCost > 0) {
            // Create Invoice Record
            const invoiceRef = db.collection("invoices").doc();
            batch.set(invoiceRef, {
                tenantId,
                amount: totalCost,
                status: "pending_payment",
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
            results.push({ tenantId, totalCost });
        }
    }

    await batch.commit();
    res.json({ success: true, results });
});
