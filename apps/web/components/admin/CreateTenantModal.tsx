"use client";
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { createTenant, generateSlug, CreateTenantInput } from "@/lib/firebase/tenants";
import { Loader2 } from "lucide-react";

interface CreateTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PLANS = [
  { value: "starter", label: "Starter - $49/mo" },
  { value: "pro", label: "Pro - $99/mo" },
  { value: "enterprise", label: "Enterprise - Custom" },
];

const TIMEZONES = [
  { value: "America/New_York", label: "Eastern (ET)" },
  { value: "America/Chicago", label: "Central (CT)" },
  { value: "America/Denver", label: "Mountain (MT)" },
  { value: "America/Los_Angeles", label: "Pacific (PT)" },
];

export default function CreateTenantModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateTenantModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateTenantInput>({
    name: "",
    slug: "",
    brandColor: "#6B46C1",
    supportEmail: "",
    supportPhone: "",
    plan: "starter",
    timezone: "America/New_York",
    currency: "USD",
    pricePerPound: 1.99,
    address: "",
  });

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!formData.name.trim()) {
        throw new Error("Business name is required");
      }

      await createTenant(formData);
      onSuccess();
      onClose();

      // Reset form
      setFormData({
        name: "",
        slug: "",
        brandColor: "#6B46C1",
        supportEmail: "",
        supportPhone: "",
        plan: "starter",
        timezone: "America/New_York",
        currency: "USD",
        pricePerPound: 1.99,
        address: "",
      });
    } catch (err: any) {
      setError(err.message || "Failed to create tenant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Onboard New White Label Customer" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-white/60 mb-1">
            Business Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="e.g., Sparkle Wash Laundry"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors"
            required
          />
        </div>

        {/* Slug (auto-generated) */}
        <div>
          <label className="block text-sm font-medium text-white/60 mb-1">
            URL Slug
          </label>
          <div className="flex items-center gap-2">
            <span className="text-white/40">laundryhive.com/</span>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
              placeholder="sparkle-wash"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Plan & Brand Color Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1">
              Plan
            </label>
            <select
              value={formData.plan}
              onChange={(e) => setFormData((prev) => ({ ...prev, plan: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
            >
              {PLANS.map((plan) => (
                <option key={plan.value} value={plan.value} className="bg-zinc-900">
                  {plan.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/60 mb-1">
              Brand Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={formData.brandColor}
                onChange={(e) => setFormData((prev) => ({ ...prev, brandColor: e.target.value }))}
                className="w-12 h-12 rounded-lg cursor-pointer border-0"
              />
              <input
                type="text"
                value={formData.brandColor}
                onChange={(e) => setFormData((prev) => ({ ...prev, brandColor: e.target.value }))}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-mono focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Contact Info Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1">
              Support Email
            </label>
            <input
              type="email"
              value={formData.supportEmail}
              onChange={(e) => setFormData((prev) => ({ ...prev, supportEmail: e.target.value }))}
              placeholder="support@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/60 mb-1">
              Support Phone
            </label>
            <input
              type="tel"
              value={formData.supportPhone}
              onChange={(e) => setFormData((prev) => ({ ...prev, supportPhone: e.target.value }))}
              placeholder="(555) 123-4567"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-white/60 mb-1">
            Business Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
            placeholder="123 Main St, City, State 12345"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Timezone & Price Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1">
              Timezone
            </label>
            <select
              value={formData.timezone}
              onChange={(e) => setFormData((prev) => ({ ...prev, timezone: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value} className="bg-zinc-900">
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/60 mb-1">
              Price Per Pound ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.pricePerPound}
              onChange={(e) => setFormData((prev) => ({ ...prev, pricePerPound: parseFloat(e.target.value) || 0 }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-white/60 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-bold transition-colors"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Creating..." : "Create Tenant"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
