# API Setup Guide: Step-by-Step

Follow this logical order to get your Laundry Hive up and running with real services.

## 🚀 Phase 1: The Essentials (Quick Wins)

### 1. Google Maps (Address Autocomplete)
**Why:** Makes the "New Order" form look professional immediately.
**Cost:** ~$2.83 per 1,000 sessions (First $200/mo is free).

3.  Toggle **"View test data"** (Top right).
4.  Copy the **Publishable key** (`pk_test_...`) and **Secret key** (`sk_test_...`).
5.  Add to `.env.local`:
    ```env
    STRIPE_SECRET_KEY=sk_test_...
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
    ```

---

## 📱 Phase 2: Notifications (Customer Updates)

### 3. Twilio (SMS)
**Why:** SMS is the best way to reach customers.
**Cost:** ~$0.0079 per message (Trial gives $15 free).

1.  Sign up at [twilio.com](https://www.twilio.com/try-twilio).
2.  Get your **Account SID** and **Auth Token** from the dashboard.
3.  Click **"Get a trial phone number"**.
4.  Add to `.env.local`:
    ```env
    TWILIO_ACCOUNT_SID=AC...
    TWILIO_AUTH_TOKEN=...
    TWILIO_FROM=+1555...
    ```
    *Note: In trial mode, you can only text your own verified phone number.*

### 4. AWS SES (Email)
**Why:** Cheaper than Twilio for non-urgent updates (receipts, marketing).
**Cost:** $0.10 per 1,000 emails (Free tier available).

1.  Go to [AWS SES Console](https://console.aws.amazon.com/ses/).
2.  Click **"Get Started"** or **"Create Identity"**.
3.  Select **Email Address** and enter your sender email (e.g., `info@yourlaundry.com`).
4.  Check your inbox and click the verification link.
5.  Go to **IAM** (Identity and Access Management) → **Users** → **Create User**.
6.  Attach policy: `AmazonSESFullAccess`.
7.  Create **Access Keys** for this user.
8.  Add to `.env.local`:
    ```env
    AWS_ACCESS_KEY_ID=...
    AWS_SECRET_ACCESS_KEY=...
    AWS_SES_REGION=us-east-1
    EMAIL_FROM=info@yourlaundry.com
    ```

---

## ⚡ Phase 3: Advanced (Real-time Sync)

### 5. Firebase (Live Updates)
**Why:** Updates the Kanban board instantly when a driver/admin changes an order status.
**Cost:** Free Spark Plan is sufficient.

1.  Go to [Firebase Console](https://console.firebase.google.com/).
2.  Create a project.
3.  Go to **Project Settings** → **General** → **Your apps** → **Web** (`</>`).
4.  Register app (no hosting needed).
5.  Copy the `firebaseConfig` values to `.env.local`:
    ```env
    NEXT_PUBLIC_FIREBASE_ENABLED=true
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    # ... add the rest from the config object
    ```
6.  Go to **Firestore Database** → **Create Database** → **Start in Production Mode**.
7.  Go to **Rules** and allow read/write (for development only):
    ```
    allow read, write: if true;
    ```
    *(Secure this before real launch!)*

---

## ✅ Final Step

Restart your server to apply the changes:
```bash
npm run dev
```
