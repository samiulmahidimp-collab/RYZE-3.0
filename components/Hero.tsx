
import React from 'react';
import { Music, Headphones, User as UserIcon, QrCode, Zap, LayoutGrid, Signal, Wifi, Phone, Home, Search as SearchIcon, FileText, Bot, Edit, Flame } from 'lucide-react';
import { User } from '../types';

interface HeroProps {
  onNavigate: (page: string) => void;
  user: User;
}

const Hero: React.FC<HeroProps> = ({ onNavigate, user }) => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center pt-20 pb-10">
      
      {/* Background Glows (Local to Hero) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Hero Text */}
      <h1 className="relative z-10 text-5xl md:text-7xl font-black text-white mb-12 tracking-tight drop-shadow-2xl max-w-5xl mx-auto px-4">
        <span className="text-purple-500">Ryze,</span> the AI Powered lifestyle app <br className="hidden md:block"/>
        that fuels passions
      </h1>

      {/* Floating Elements & Phone Container */}
      <div className="relative z-10 w-full max-w-xs md:max-w-sm mx-auto perspective-1000">
        
        {/* Floating Icon Left */}
        <div className="absolute top-1/2 -left-20 md:-left-32 -translate-y-1/2 hidden md:flex flex-col gap-4 animate-float-slow">
           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-900/80 to-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg shadow-purple-500/20 group cursor-pointer hover:scale-110 transition">
              <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-ping opacity-20"></div>
              <Music className="w-6 h-6 text-purple-400 group-hover:text-white transition" />
           </div>
        </div>

        {/* Floating Icon Right */}
        <div className="absolute top-1/2 -right-20 md:-right-32 -translate-y-1/2 hidden md:flex flex-col gap-4 animate-float-delayed">
           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-900/80 to-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg shadow-purple-500/20 group cursor-pointer hover:scale-110 transition">
               <Headphones className="w-6 h-6 text-purple-400 group-hover:text-white transition" />
               <div className="absolute right-0 top-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
           </div>
           <div className="absolute -bottom-12 right-0 bg-slate-900/90 text-xs px-3 py-1 rounded-full border border-white/10 whitespace-nowrap text-slate-400">
             Real-time support
           </div>
        </div>

        {/* Phone Mockup */}
        <div className="relative bg-[#050505] rounded-[3rem] border-[8px] border-[#1a1a1c] shadow-2xl shadow-purple-900/50 overflow-hidden aspect-[9/19.5]">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-[#1a1a1c] rounded-b-xl z-20"></div>

          {/* Screen Content */}
          <div className="h-full w-full bg-gradient-to-b from-[#121214] to-black p-4 flex flex-col text-left overflow-hidden">
            
            {/* Status Bar */}
            <div className="flex justify-between items-center text-[10px] text-slate-400 mb-6 px-2 mt-1">
               <span>9:41</span>
               <div className="flex gap-1">
                 <Signal className="w-3 h-3" />
                 <Wifi className="w-3 h-3" />
                 <div className="w-4 h-2.5 bg-slate-600 rounded-[2px] relative">
                   <div className="absolute inset-y-0 left-0 bg-white w-3/4"></div>
                 </div>
               </div>
            </div>

            {/* User Profile Header */}
            <div className="flex justify-between items-center mb-6">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 p-[2px]">
                   <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-full h-full rounded-full border-2 border-black" />
                 </div>
                 <div>
                   <h3 className="text-white font-bold text-sm">{user.isLoggedIn ? user.name : 'Guest'}</h3>
                   <p className="text-slate-500 text-[10px]">{user.isLoggedIn ? user.phoneNumber : '014-XXX-XXXX'}</p>
                 </div>
               </div>
               <div className="flex gap-2">
                 <div className="bg-white/10 rounded-full px-3 py-1 flex items-center gap-1">
                   <span className="text-white font-bold text-xs">{user.isLoggedIn ? user.balanceCoins.toLocaleString() : '---'}</span>
                   <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                 </div>
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                   <SearchIcon className="w-4 h-4 text-white" />
                 </div>
               </div>
            </div>

            {/* Widgets Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* AI Toolbox Widget */}
              <div 
                onClick={() => onNavigate('learning')}
                className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-3 text-white relative overflow-hidden cursor-pointer hover:opacity-90 transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold">AI Toolbox</span>
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px]">↗</div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-white/20 rounded-lg aspect-square flex items-center justify-center"><FileText className="w-4 h-4"/></div>
                  <div className="bg-white/20 rounded-lg aspect-square flex items-center justify-center"><Bot className="w-4 h-4"/></div>
                  <div className="bg-white/20 rounded-lg aspect-square flex items-center justify-center"><Edit className="w-4 h-4"/></div>
                  <div className="bg-white/20 rounded-lg aspect-square flex items-center justify-center"><LayoutGrid className="w-4 h-4"/></div>
                </div>
              </div>

              {/* Data Usage Widget */}
              <div className="bg-[#1c1c1e] rounded-2xl p-3 relative overflow-hidden">
                 <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-white">Data Usage</span>
                  <div className="flex gap-1">
                    <span className="w-1 h-1 rounded-full bg-white"></span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  </div>
                </div>
                <div className="flex items-center justify-center py-2 relative">
                   {/* Circular Progress Mockup */}
                   <div className="w-20 h-20 rounded-full border-4 border-slate-700 flex items-center justify-center relative">
                     <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-l-transparent border-b-transparent rotate-45"></div>
                     <div className="text-center">
                       <span className="text-white font-bold text-xs block">{user.isLoggedIn ? user.currentData : '--'}</span>
                       <span className="text-[8px] text-slate-400">GB Left</span>
                     </div>
                   </div>
                   <div className="absolute bottom-0 bg-pink-600 text-[8px] text-white px-2 py-0.5 rounded-full">
                     40/40 GB
                   </div>
                </div>
              </div>
            </div>

            {/* Available Packs Section */}
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-white font-bold text-sm">All Available Packs</span>
              <span className="text-xs text-slate-500">↗</span>
            </div>

            <div className="space-y-3 overflow-hidden">
               {/* Pack Card 1 */}
               <div onClick={() => onNavigate('plans')} className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-3 relative overflow-hidden border border-white/5 cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-white bg-white/20 px-2 py-0.5 rounded">BLAZE</span>
                    <span className="text-[10px] text-purple-200 flex items-center gap-1"><Flame className="w-3 h-3"/> Popular</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                       <div className="flex gap-3 text-xs text-white mb-1">
                         <span className="flex items-center gap-1"><Wifi className="w-3 h-3"/> 25 GB</span>
                         <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> 50 Min</span>
                       </div>
                       <div className="flex gap-1">
                         <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[8px]">W</span>
                         <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[8px]">F</span>
                       </div>
                    </div>
                    <div className="text-right">
                       <span className="block text-white font-bold">TK 197</span>
                       <span className="block text-[8px] text-slate-400">7 days</span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Daily Checkin */}
            <div className="mt-3 bg-[#1c1c1e] rounded-xl p-3 border border-white/5">
               <div className="flex justify-between mb-2">
                 <span className="text-xs font-bold text-white">Daily Check in</span>
                 <UserIcon className="w-3 h-3 text-green-400" />
               </div>
               <p className="text-[9px] text-slate-400 mb-2">Win upto 6 GB every month</p>
               <div className="flex justify-between gap-1 mb-2">
                 {[1,2,3,4,5,6,7].map(d => (
                   <div key={d} className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] ${d <= 2 ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                     {d <= 2 ? '✓' : 'D'+d}
                   </div>
                 ))}
               </div>
               <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 py-1.5 rounded-lg text-[10px] font-bold text-white">
                 Claim today's bonus
               </button>
            </div>

            {/* Bottom Nav Mockup */}
            <div className="mt-auto pt-4 flex justify-between px-2 text-[9px] text-slate-500">
               <div className="flex flex-col items-center gap-1 text-purple-500">
                 <Home className="w-4 h-4" />
                 <span>Home</span>
               </div>
               <div className="flex flex-col items-center gap-1">
                 <Zap className="w-4 h-4" />
                 <span>Offers</span>
               </div>
               <div className="flex flex-col items-center gap-1 -mt-4">
                 <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-1 backdrop-blur text-white">
                    <LayoutGrid className="w-5 h-5" />
                 </div>
                 <span className="text-white">Explore</span>
               </div>
                <div className="flex flex-col items-center gap-1">
                 <Signal className="w-4 h-4" />
                 <span>Usage</span>
               </div>
               <div className="flex flex-col items-center gap-1">
                 <UserIcon className="w-4 h-4" />
                 <span>Profile</span>
               </div>
            </div>

          </div>
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
        <span className="text-xs font-bold text-white uppercase tracking-widest">Scroll Down</span>
      </div>

    </div>
  );
};

export default Hero;
