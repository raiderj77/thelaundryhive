import { db } from "@/lib/firebase/config";
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    increment,
    Timestamp,
    runTransaction
} from "firebase/firestore";
import { Affiliate, Commission, Referral } from "@/types"; // Assuming types re-export schema

/**
 * Generates a unique referral code for a user.
 * Format: First 3 letters of name + random 4 chars (e.g., JAS-9X2A)
 */
export function generateReferralCode(name: string): string {
    const prefix = (name || "USR").substring(0, 3).toUpperCase().replace(/[^A-Z]/g, "X");
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${random}`;
}

/**
 * Validates a referral code and returns the referrer's ID.
 */
export async function validateReferralCode(code: string): Promise<string | null> {
    try {
        // Check Affiliates first
        const affQuery = query(collection(db, "affiliates"), where("code", "==", code));
        const affSnap = await getDocs(affQuery);
        if (!affSnap.empty) {
            return affSnap.docs[0].id;
        }

        // Check Users (Peer-to-Peer)
        const userQuery = query(collection(db, "users"), where("referralCode", "==", code));
        const userSnap = await getDocs(userQuery);
        if (!userSnap.empty) {
            return userSnap.docs[0].id;
        }

        return null;
    } catch (error) {
        console.error("Error validating referral code:", error);
        return null;
    }
}

/**
 * Records a commission for an affiliate or referrer.
 */
export async function recordCommission(
    orderId: string,
    orderTotal: number,
    referrerId: string,
    tenantId: string
): Promise<void> {
    try {
        await runTransaction(db, async (transaction) => {
            // 1. Get Referrer (Affiliate or User)
            const affiliateRef = doc(db, "affiliates", referrerId);
            const affiliateSnap = await transaction.get(affiliateRef);

            let commissionRate = 0.10; // Default 10% for peer-to-peer
            let isAffiliate = false;

            if (affiliateSnap.exists()) {
                const data = affiliateSnap.data() as Affiliate;
                commissionRate = data.commissionRate || 0.25;
                isAffiliate = true;
            }

            const commissionAmount = orderTotal * commissionRate;

            // 2. Create Commission Record
            const commissionRef = doc(collection(db, "commissions"));
            const newCommission: Commission = {
                id: commissionRef.id,
                affiliateId: referrerId,
                sourceOrderId: orderId,
                sourceTenantId: tenantId,
                amount: commissionAmount,
                rateApplied: commissionRate,
                status: 'pending',
                createdAt: Timestamp.now(),
                releaseAt: Timestamp.fromMillis(Date.now() + 30 * 24 * 60 * 60 * 1000) // +30 days
            };

            transaction.set(commissionRef, newCommission);

            // 3. Update Affiliate Stats
            if (isAffiliate) {
                transaction.update(affiliateRef, {
                    totalEarnings: increment(commissionAmount),
                    pendingPayout: increment(commissionAmount)
                });
            } else {
                // For regular users, update wallet balance
                const userRef = doc(db, "users", referrerId);
                transaction.update(userRef, {
                    walletBalance: increment(commissionAmount)
                });
            }
        });
        console.log(`Commission recorded: $${(orderTotal * 0.1).toFixed(2)} for ${referrerId}`);
    } catch (error) {
        console.error("Error recording commission:", error);
        throw error;
    }
}
