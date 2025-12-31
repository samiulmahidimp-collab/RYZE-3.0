
export interface User {
  name: string;
  phoneNumber: string;
  balanceCoins: number;
  balanceBDT: number;
  currentData: number; // in GB
  isLoggedIn: boolean;
  onboarding?: {
    purpose: 'academic' | 'self-study';
    detail: string; // Grade or Interests
  };
}

export interface DataPackage {
  id: string;
  name: string;
  tag?: string; // e.g. Recommended, Popular
  dataAmountGB: number;
  voiceMinutes: number;
  priceBDT: number;
  coinsEarned: number; // This serves as Loyalty Coin
  validityDays: number;
  otts: string[]; // e.g. ['Toffee', 'Hoichoi']
  color: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  author: string;
  description: string;
  tags: string[];
  priceCoins: number; // 0 if free/purchased
  downloads: number;
  isOwner: boolean;
}

export interface SubscriptionService {
  id: string;
  name: string;
  logo: string; // URL or icon name
  plans: {
    name: string;
    priceBDT: number;
    priceCoins: number;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
