
import React, { useState, useEffect } from 'react';
import { Wifi, Phone, Tv, Flame, Star, Zap, Sliders, ChevronDown } from 'lucide-react';
import { DataPackage } from '../types';

interface DataPlansProps {
  buyPackage: (pkg: DataPackage) => void;
}

const PACKAGES: DataPackage[] = [
  { 
    id: 'p1', 
    name: 'FLY', 
    tag: 'Recommended',
    dataAmountGB: 60, 
    voiceMinutes: 300,
    priceBDT: 497, 
    coinsEarned: 39535, 
    validityDays: 30, 
    otts: ['Toffee', 'Hoichoi'],
    color: 'from-blue-600 to-purple-600' 
  },
  { 
    id: 'p2', 
    name: 'BLAZE', 
    tag: 'Most Popular',
    dataAmountGB: 25, 
    voiceMinutes: 50,
    priceBDT: 197, 
    coinsEarned: 15670, 
    validityDays: 7, 
    otts: ['Toffee', 'Hoichoi'],
    color: 'from-purple-600 to-indigo-600' 
  },
  { 
    id: 'p3', 
    name: 'STARTER', 
    tag: 'Popular',
    dataAmountGB: 7, 
    voiceMinutes: 0,
    priceBDT: 97, 
    coinsEarned: 7716, 
    validityDays: 3, 
    otts: ['Toffee'],
    color: 'from-indigo-600 to-blue-600' 
  },
];

const DataPlans: React.FC<DataPlansProps> = ({ buyPackage }) => {
  const [activeTab, setActiveTab] = useState<'packs' | 'mixer'>('packs');

  // Mixer State
  const [mixData, setMixData] = useState(10);
  const [mixVoice, setMixVoice] = useState(50);
  const [mixValidity, setMixValidity] = useState(7);
  const [mixPrice, setMixPrice] = useState(0);

  // Simple pricing logic for the mixer
  useEffect(() => {
    // Arbitrary calculation for demo purposes
    const price = Math.round((mixData * 5) + (mixVoice * 0.6) + (mixValidity * 2.5) + 20);
    setMixPrice(price);
  }, [mixData, mixVoice, mixValidity]);

  const handleMixBuy = () => {
    const customPkg: DataPackage = {
      id: `mix-${Date.now()}`,
      name: 'Custom Mix',
      dataAmountGB: mixData,
      voiceMinutes: mixVoice,
      priceBDT: mixPrice,
      coinsEarned: Math.floor(mixPrice * 80), // Rough calc for points
      validityDays: mixValidity,
      otts: mixData >= 20 ? ['Toffee', 'Hoichoi'] : ['Toffee'],
      color: 'from-teal-600 to-emerald-600'
    };
    buyPackage(customPkg);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
          <Wifi className="text-purple-500" />
          Internet & Packs
        </h2>
        
        <div className="bg-white/5 p-1 rounded-xl border border-white/10 shadow-sm flex mt-4 md:mt-0">
          <button 
            onClick={() => setActiveTab('packs')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'packs' ? 'bg-white text-black shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            Regular Packs
          </button>
          <button 
            onClick={() => setActiveTab('mixer')}
            className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${activeTab === 'mixer' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Sliders className="w-4 h-4" /> Data Mixer
          </button>
        </div>
      </div>

      {activeTab === 'mixer' && (
        <div className="bg-[#0f0f11] rounded-3xl p-8 shadow-xl border border-white/10 mb-8 max-w-3xl mx-auto animate-scale-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">Build Your Own Plan</h3>
            <p className="text-slate-400">Drag the sliders to create a package that fits your lifestyle.</p>
          </div>

          <div className="space-y-8">
            {/* Data Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-slate-300 flex items-center gap-2"><Wifi className="w-5 h-5 text-purple-500"/> Internet</span>
                <span className="font-bold text-2xl text-purple-500">{mixData} GB</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="1"
                value={mixData} 
                onChange={(e) => setMixData(Number(e.target.value))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>0 GB</span>
                <span>100 GB</span>
              </div>
            </div>

            {/* Voice Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-slate-300 flex items-center gap-2"><Phone className="w-5 h-5 text-teal-500"/> Call Minutes</span>
                <span className="font-bold text-2xl text-teal-500">{mixVoice} Min</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                step="10"
                value={mixVoice} 
                onChange={(e) => setMixVoice(Number(e.target.value))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
               <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>0 Min</span>
                <span>1000 Min</span>
              </div>
            </div>

            {/* Validity Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-slate-300 flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500"/> Validity</span>
                <span className="font-bold text-2xl text-yellow-500">{mixValidity} Days</span>
              </div>
              <input 
                type="range" 
                min="3" 
                max="30" 
                step="1"
                value={mixValidity} 
                onChange={(e) => setMixValidity(Number(e.target.value))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
               <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>3 Days</span>
                <span>30 Days</span>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-slate-400 text-sm">Estimated Total</p>
              <p className="text-4xl font-bold text-white">৳{mixPrice}</p>
            </div>
            <button 
              onClick={handleMixBuy}
              className="w-full md:w-auto px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-purple-500 hover:text-white transition shadow-lg flex items-center justify-center gap-2"
            >
              Buy Custom Pack <Zap className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'packs' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className="relative bg-[#0f0f11] rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-white/10 shadow-2xl group">
              {/* Header Gradient */}
              <div className={`bg-gradient-to-br ${pkg.color} p-6 pb-12 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <h3 className="text-2xl font-extrabold text-white uppercase tracking-wider">{pkg.name}</h3>
                  {pkg.tag && (
                    <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/30 shadow-sm">
                      <Flame className="w-3 h-3 fill-white" /> {pkg.tag}
                    </span>
                  )}
                </div>
                <div className="relative z-10">
                   <span className="text-3xl font-bold text-white">TK {pkg.priceBDT}</span>
                   <span className="text-white/80 text-sm ml-1">/ {pkg.validityDays} Days</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 space-y-3 -mt-6 relative z-20">
                
                {/* Internet Row */}
                <div className="bg-[#1a1a1e] rounded-xl p-4 flex justify-between items-center border border-white/5">
                  <div className="flex items-center gap-3">
                     <Wifi className="w-5 h-5 text-orange-500" />
                     <span className="text-white font-bold">Internet</span>
                  </div>
                  <span className="text-white font-bold text-lg">{pkg.dataAmountGB} GB</span>
                </div>

                {/* Call Row */}
                <div className="bg-[#1a1a1e] rounded-xl p-4 flex justify-between items-center border border-white/5">
                  <div className="flex items-center gap-3">
                     <Phone className="w-5 h-5 text-orange-500" />
                     <span className="text-white font-bold">Call</span>
                  </div>
                  <span className="text-white font-bold text-lg">{pkg.voiceMinutes} Min</span>
                </div>

                {/* OTT Row */}
                <div className="bg-[#1a1a1e] rounded-xl p-4 border border-white/5">
                  <div className="flex justify-between items-center cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <Tv className="w-5 h-5 text-orange-500" />
                      <span className="text-white font-bold">Included OTTs</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="mt-3 flex gap-2">
                    {pkg.otts.map(ott => (
                       <span key={ott} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
                         {ott}
                       </span>
                    ))}
                  </div>
                </div>

                 {/* Loyalty Row */}
                 <div className="bg-[#1a1a1e] rounded-xl p-4 flex justify-between items-center border border-white/5">
                  <div className="flex items-center gap-3">
                     <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                     <span className="text-white font-bold">RYZE COINS</span>
                  </div>
                  <span className="text-white font-bold text-lg">{pkg.coinsEarned}</span>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => buyPackage(pkg)}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-3.5 rounded-full font-bold transition-all shadow-lg shadow-purple-900/40"
                  >
                    Buy pack
                  </button>
                </div>

                <div className="text-center space-y-1 py-2">
                   <p className="text-[10px] text-slate-500">• The listed prices are inclusive of VAT/TAX</p>
                   <p className="text-[10px] text-slate-500">• To experience RYZE full on, download RYZE app</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataPlans;
