
import React, { useState } from 'react';
import { SubscriptionService } from '../types';
import { Check, CreditCard, Coins } from 'lucide-react';

interface SubscriptionStoreProps {
  buySubscription: (serviceName: string, planName: string, cost: number, currency: 'BDT' | 'COINS') => void;
}

const SERVICES: SubscriptionService[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    plans: [
      { name: 'Mobile', priceBDT: 399, priceCoins: 3990 },
      { name: 'Standard', priceBDT: 799, priceCoins: 7990 },
    ]
  },
  {
    id: 'spotify',
    name: 'Spotify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
    plans: [
      { name: 'Individual', priceBDT: 199, priceCoins: 1990 },
      { name: 'Duo', priceBDT: 249, priceCoins: 2490 },
    ]
  },
  {
    id: 'prime',
    name: 'Amazon Prime',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png',
    plans: [
      { name: 'Monthly', priceBDT: 299, priceCoins: 2990 },
      { name: 'Annual', priceBDT: 2999, priceCoins: 29990 },
    ]
  }
];

const SubscriptionStore: React.FC<SubscriptionStoreProps> = ({ buySubscription }) => {
  const [currency, setCurrency] = useState<'BDT' | 'COINS'>('BDT');

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Digital Lifestyle</h2>
        <div className="bg-white/5 p-1 rounded-lg border border-white/10 flex shadow-sm">
          <button 
            onClick={() => setCurrency('BDT')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${currency === 'BDT' ? 'bg-white text-black shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <CreditCard className="w-4 h-4" /> BDT
          </button>
          <button 
            onClick={() => setCurrency('COINS')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${currency === 'COINS' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <Coins className="w-4 h-4" /> RYZE COINS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map(service => (
          <div key={service.id} className="bg-[#0f0f11] rounded-2xl p-6 border border-white/10 shadow-lg hover:border-purple-500/30 transition-all flex flex-col items-center text-center group">
            <div className="bg-white/90 p-3 rounded-lg mb-6 w-full flex justify-center">
              <img src={service.logo} alt={service.name} className="h-8 object-contain" />
            </div>
            
            <div className="w-full space-y-3">
              {service.plans.map(plan => (
                <div key={plan.name} className="w-full border border-white/10 rounded-xl p-4 hover:border-purple-500/50 bg-white/5 hover:bg-white/10 transition group relative">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-slate-300">{plan.name}</span>
                    <span className="font-bold text-white">
                      {currency === 'BDT' ? `৳${plan.priceBDT}` : `${plan.priceCoins} COINS`}
                    </span>
                  </div>
                  <button 
                    onClick={() => buySubscription(service.name, plan.name, currency === 'BDT' ? plan.priceBDT : plan.priceCoins, currency)}
                    className="w-full mt-2 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-slate-300 font-medium group-hover:bg-white group-hover:text-black transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2 w-full text-xs text-slate-500">
               <div className="flex items-center justify-center gap-1">
                 <Check className="w-3 h-3 text-green-500" /> Instant Activation
               </div>
               <div className="flex items-center justify-center gap-1">
                 <Check className="w-3 h-3 text-green-500" /> Cancel Anytime
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionStore;
