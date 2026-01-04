# Developer Onboarding & Architecture Summary

## 🏗️ System Overview
The Laundry Hive is a multi-tenant SaaS platform built with a **Hybrid Architecture**:
- **Frontend (Marketing & Web App)**: Next.js Static Single Page Applications (SPA).
- **Backend**: Firebase Cloud Functions & Firestore for real-time operations.

## 🛠️ Critical Architecture Notes (The "Restoration" Context)
This codebase was refactored in Dec 2025 to resolve several legacy blockers:

### 1. The Environment Setup (Fixing LH-001)
- **Localhost Trap**: Legacy code relied on `localhost:3000`. This has been replaced by `NEXT_PUBLIC_DASHBOARD_URL` and `NEXT_PUBLIC_MARKETING_URL`.
- **Cross-App Communication**: Marketing and Web App talk via these environment variables to handle redirects and tracking.

### 2. Routing & Security (Fixing LH-002)
- **Edge Middleware**: Found in `apps/web/src/middleware.ts`. It acts as the primary guard for `/dashboard` and `/admin` routes.
- **SPA Rewrites**: `firebase.json` is configured with catch-all rewrites to `/index.html` to support client-side navigation in a static export environment.
- **Multi-Tenancy**: All data (orders, users, businesses) is partitioned by `bizId` or `tenantId`.

### 3. Core Logic Engines (Fixing LH-003)
- **AI Route Optimizer**: (`apps/web/src/lib/optimizer.ts`) - Interfaces with Mapbox Optimized Trips API.
- **Billing Layer**: (`apps/web/src/lib/stripe.ts`) - Handles the $49/mo flat-fee subscription.
- **Tracking Portal**: (`apps/web/src/app/track/[orderId]`) - A public-facing Firestore reader.

## 🚀 Deployment Workflow
1. **Frontend**: `npm run build` within `apps/marketing` or `apps/web` triggers a static export to the `out/` directory.
2. **Backend**: `firebase deploy --only functions` pushes Node.js 20 logic.
3. **Storage**: `firebase deploy --only firestore:rules` ensures multi-tenant isolation.

## 🐝 Future Roadmap
- **Hive-Link**: Automated SMS triggers on order status changes.
- **Driver Chat**: Firestore-backed real-time communication between owners and drivers.

**Status:** Beta Ready | **Architect:** The Laundry Hive Lead AI
