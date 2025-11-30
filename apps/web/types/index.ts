export * from '../lib/schema';

// Backward compatibility aliases (if needed)
import { Tenant, OrderStatus } from '../lib/schema';

// Store type for StoreContext - includes UI-specific properties
export interface Store {
    id: string;
    slug: string;
    branding: {
        primaryColor: string;
        storeName: string;
    };
}

// Machine types (not yet in schema)
export type MachineStatus = 'available' | 'running' | 'maintenance' | 'offline';

export interface Machine {
    id: string;
    name: string;
    type: 'washer' | 'dryer';
    status: MachineStatus;
    timeLeft?: number; // minutes
    cycle?: string;
    tenantId?: string;
}