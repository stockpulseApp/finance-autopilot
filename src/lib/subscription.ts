import subscription from "../../config/subscription.json";

export type SubscriptionPlan = {
  id: string;
  name: string;
  price: number;
  interval: string;
  badge?: string;
  checkoutUrl: string;
  features: string[];
};

export function getSubscriptionPlans(): SubscriptionPlan[] {
  return subscription.plans as SubscriptionPlan[];
}

export function getSubscriptionMeta() {
  return {
    name: subscription.name,
    tagline: subscription.tagline,
    freeTierFeatures: subscription.freeTierFeatures as string[],
  };
}
