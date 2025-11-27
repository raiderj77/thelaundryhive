import { Timestamp } from 'firebase/firestore';

// --- Core Enums ---

export type UserRole = 'customer' | 'driver' | 'operator' | 'admin' | 'super_admin';
export type OrderStatus =
    | 'draft'
    | 'placed'
    | 'driver_assigned_pickup'
    | 'en_route_pickup'
    | 'picked_up'
    | 'at_facility'
    | 'processing'
    | 'ready_for_delivery'
    | 'driver_assigned_delivery'
    | 'en_route_delivery'
    | 'delivered'
    | 'cancelled';

export type PaymentStatus = 'pending' | 'authorized' | 'paid' | 'refunded' | 'failed';

// --- Multi-Tenancy (Operators) ---

export interface Tenant {
    id: string; // operator_id
    name: string;
    slug: string; // for subdomain (e.g., sparkle-wash.laundryhive.com)
    logoUrl?: string;
    brandColor: string; // Hex code
    supportPhone?: string;
    supportEmail?: string;

    // Settings
    currency: string;
    timezone: string;
    serviceRadius: GeoPolygon[]; // Delivery zones

    // Stripe Connect
    stripeAccountId?: string;
    stripeChargesEnabled: boolean;

    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface GeoPolygon {
    points: { lat: number; lng: number }[];
}

// --- Users (Customers & Drivers) ---

export interface UserProfile {
    id: string; // auth_uid
    email: string;
    displayName?: string;
    phone?: string;
    photoUrl?: string;

    role: UserRole;
    tenantId?: string; // If tied to specific operator (optional for global users)

    // Customer Specific
    defaultAddress?: Address;
    stripeCustomerId?: string;

    // Driver Specific
    isOnline?: boolean;
    currentLocation?: { lat: number; lng: number };

    // Growth
    referralCode: string; // Their unique code to share
    referredBy?: string; // Code they used to sign up
    walletBalance: number; // Credits earned from referrals

    createdAt: Timestamp;
    lastLoginAt: Timestamp;
}

export interface Address {
    street: string;
    unit?: string;
    city: string;
    state: string;
    zip: string;
    lat: number;
    lng: number;
    instructions?: string;
}

// --- Orders & Chain of Custody ---

export interface Order {
    id: string;
    tenantId: string;
    customerId: string;
    customerName?: string; // Denormalized for list views
    customerPhone?: string;
    customerPhotoUrl?: string;
    driverName?: string; // Denormalized for list views

    status: OrderStatus;
    paymentStatus: PaymentStatus;

    // Logistics
    pickupAddress: Address;
    deliveryAddress: Address;
    pickupWindow: { start: Timestamp; end: Timestamp };
    deliveryWindow?: { start: Timestamp; end: Timestamp };

    // Assignments
    pickupDriverId?: string;
    deliveryDriverId?: string;

    // Items & Pricing
    items: OrderItem[];
    subtotal: number;
    tax: number;
    tip: number;
    deliveryFee: number;
    discount: number; // From promo/referral
    total: number;

    // Chain of Custody (The "Zero Lost Items" Guarantee)
    bagCount: number;
    weightLbs?: number;
    photos: CustodyPhoto[];
    timeline: TimelineEvent[];

    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface OrderItem {
    id: string;
    name: string; // e.g., "Wash & Fold", "Comforter"
    quantity: number;
    unitPrice: number;
    unit: 'lb' | 'item' | 'bag';
    totalPrice: number;
}

export interface CustodyPhoto {
    url: string;
    stage: OrderStatus;
    takenBy: string; // user_id
    timestamp: Timestamp;
    notes?: string;
}

export interface TimelineEvent {
    status: OrderStatus;
    timestamp: Timestamp;
    description: string;
    actorId?: string; // Who triggered it
}
