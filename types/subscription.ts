export interface Subscription {
  id: string;
  userId: string;
  tier: 'free' | 'pro' | 'enterprise';
}
