import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";
import { Tenant } from "@/lib/schema";

const TENANTS_COLLECTION = "tenants";

export interface CreateTenantInput {
  name: string;
  slug: string;
  logoUrl?: string;
  brandColor: string;
  supportPhone?: string;
  supportEmail?: string;
  currency?: string;
  timezone?: string;
  plan?: string;
  status?: "active" | "inactive" | "suspended";
  pricePerPound?: number;
  address?: string;
}

export interface TenantWithMeta extends Tenant {
  plan?: string;
  status?: "active" | "inactive" | "suspended";
  monthlyRevenue?: number;
  pricePerPound?: number;
  address?: string;
}

/**
 * Get all tenants from Firestore
 */
export async function getAllTenants(): Promise<TenantWithMeta[]> {
  const tenantsRef = collection(db, TENANTS_COLLECTION);
  const q = query(tenantsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TenantWithMeta[];
}

/**
 * Get a single tenant by ID
 */
export async function getTenantById(tenantId: string): Promise<TenantWithMeta | null> {
  const docRef = doc(db, TENANTS_COLLECTION, tenantId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as TenantWithMeta;
}

/**
 * Create a new tenant (white label customer)
 */
export async function createTenant(input: CreateTenantInput): Promise<string> {
  const tenantsRef = collection(db, TENANTS_COLLECTION);

  const newTenant = {
    name: input.name,
    slug: input.slug.toLowerCase().replace(/\s+/g, "-"),
    logoUrl: input.logoUrl || "",
    brandColor: input.brandColor || "#6B46C1",
    supportPhone: input.supportPhone || "",
    supportEmail: input.supportEmail || "",
    currency: input.currency || "USD",
    timezone: input.timezone || "America/New_York",
    serviceRadius: [],
    stripeAccountId: "",
    stripeChargesEnabled: false,
    plan: input.plan || "starter",
    status: input.status || "active",
    pricePerPound: input.pricePerPound || 1.99,
    address: input.address || "",
    monthlyRevenue: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(tenantsRef, newTenant);
  return docRef.id;
}

/**
 * Update an existing tenant
 */
export async function updateTenant(
  tenantId: string,
  updates: Partial<CreateTenantInput>
): Promise<void> {
  const docRef = doc(db, TENANTS_COLLECTION, tenantId);

  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete a tenant
 */
export async function deleteTenant(tenantId: string): Promise<void> {
  const docRef = doc(db, TENANTS_COLLECTION, tenantId);
  await deleteDoc(docRef);
}

/**
 * Generate a unique slug from a name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
