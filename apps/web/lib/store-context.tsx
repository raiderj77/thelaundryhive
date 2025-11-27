"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Store } from "@/types";
const StoreContext = createContext<{ store: Store | null }>({ store: null });
export const useStore = () => useContext(StoreContext);
import { useAuth } from "@/context/AuthContext";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState<Store | null>(null);
  const { tenantId, loading: authLoading } = useAuth();
  console.log("StoreProvider: Component Rendering...", { tenantId, authLoading });

  useEffect(() => {
    const loadStore = async () => {
      if (authLoading) return;

      // If no tenantId (not logged in or no store), maybe load a default or nothing
      // For now, let's fallback to "1" ONLY if we want a public demo mode, 
      // but for "White Label" testing, we want to see OUR store.
      // Let's use the tenantId if available, otherwise wait.

      const targetTenantId = tenantId || "1"; // Fallback to demo for now so site doesn't break for visitors

      try {
        // Import dynamically to avoid server-side issues
        const { doc, getDoc } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase/config");

        const docRef = doc(db, "tenants", targetTenantId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setStore({
            id: targetTenantId,
            slug: data.slug || "laundry-hive",
            branding: {
              primaryColor: data.brandColor || "#18181B",
              storeName: data.storeName || "The Laundry Hive"
            }
          });

          // Apply Brand Color
          if (data.brandColor) {
            console.log("StoreProvider: Setting brand color to", data.brandColor);
            document.documentElement.style.setProperty('--hive-primary', data.brandColor);
          } else {
            console.log("StoreProvider: No brand color found in data", data);
          }
        } else {
          console.log(`StoreProvider: No tenant document found for ID '${targetTenantId}'`);
        }
      } catch (err) {
        console.error("Failed to load store config:", err);
      }
    };

    loadStore();
  }, [tenantId, authLoading]);

  return <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>;
};