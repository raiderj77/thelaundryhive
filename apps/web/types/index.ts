export type OrderStatus = 'new' | 'pickup_scheduled' | 'at_lab' | 'washing' | 'drying' | 'folding' | 'ready' | 'out_for_delivery' | 'completed';

export interface Order {
    id: string;
    tenantId: string;
    customerId: string;
    customerName: string;
    status: OrderStatus;
    type: 'pickup' | 'dropoff';
    totalPrice: number;
    createdAt: number;
    address: {
        formatted: string;
        lat?: number;
        lng?: number;
        gateCode?: string;
    };
    phoneNumber?: string;
    driverName?: string;

    // New Fields
    preferences?: {
        detergent: 'scented' | 'eco' | 'none';
        folding: 'konmari' | 'standard';
    };
    pickupWindow?: { start: string; end: string };
    deliveryWindow?: { start: string; end: string };
    items?: { [key: string]: number }; // Inventory
}

export interface Store {
    id: string;
    slug: string;
    branding: {
        primaryColor: string;
        storeName: string;
    };
}