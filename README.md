# Antigravity Platform 🚀

The all-in-one SaaS platform for modern laundry operators. Built with **Turborepo**, **Next.js**, and **Firebase**.

## 🏗 Architecture

This project is a Monorepo containing:

| Workspace | Path | Description | URL (Dev) |
|-----------|------|-------------|-----------|
| **Marketing** | `apps/marketing` | Public landing page ("The Hive") | http://localhost:3001 |
| **Product** | `apps/web` | White-label SaaS for tenants ("The Factory") | http://localhost:3000 |
| **Functions** | `apps/functions` | Firebase Cloud Functions (Backend) | N/A |
| **UI Lib** | `packages/ui` | Shared React components | N/A |

## ⚡ Quick Start

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 🛠 Features

### Tenant App (`apps/web`)
*   **Customer PWA**: Ordering wizard, preferences, tracking.
*   **Driver App**: Route optimization, proof-of-delivery.
*   **Operator Dashboard**: Machine management, Kanban board.
*   **Super-Admin**: Global revenue monitoring (`/admin`).

### Marketing Site (`apps/marketing`)
*   High-conversion landing page.
*   "Hive" theme (Gold/Black).

### Backend (`apps/functions`)
*   **Order State Machine**: Automates lifecycle (`Intake` -> `Wash` -> `Deliver`).
*   **Stripe Connect**: Onboarding and webhook handling.
*   **Billing**: Usage metering (SMS/Maps).

## 🚀 Deployment

The project is configured for **Firebase Multi-Site Hosting**.

```bash
firebase deploy
```

*   Target `marketing` -> `apps/marketing`
*   Target `product` -> `apps/web`
