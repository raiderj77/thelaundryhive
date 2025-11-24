"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Store } from "@/types";
const StoreContext = createContext<{ store: Store | null }>({ store: null });
export const useStore = () => useContext(StoreContext);
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState<Store | null>(null);
  useEffect(() => { setStore({ id: "1", slug: "sparkle-wash", branding: { primaryColor: "#2563eb", storeName: "Sparkle Wash" }}); }, []);
  return <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>;
};