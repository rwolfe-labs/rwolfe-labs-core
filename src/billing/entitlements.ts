export type Entitlement = string;

export type Entitlements = {
  plan: "free" | "paid" | "pro";
  features: Record<Entitlement, boolean>;
};

export function hasEntitlement(entitlements: Entitlements, key: Entitlement): boolean {
  return !!entitlements.features[key];
}
