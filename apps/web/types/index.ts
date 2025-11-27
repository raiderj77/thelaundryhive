export * from '../lib/schema';

// Backward compatibility aliases (if needed)
import { Tenant, OrderStatus } from '../lib/schema';

export type Store = Tenant;

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