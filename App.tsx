
import React, { useState } from 'react';
import Hero from './components/Hero';
import LandingPage from './components/LandingPage';
import DataPlans from './components/DataPlans';
import LearningHub from './components/LearningHub';
import SubscriptionStore from './components/SubscriptionStore';
import DocumentPreview from './components/DocumentPreview';
import { User, DataPackage, DocumentItem } from './types';
import { Menu, X, Coins, AlertTriangle, ChevronDown, Download, Globe, MessageSquare, MapPin, LogIn, BookOpen, Briefcase, GraduationCap, Star } from 'lucide-react';

const App: React.FC = () => {
  // --- Global State ---
  const [activePage, setActivePage] = useState('home');
  const [user, setUser] = useState<User>({
    name: 'Jame',
    phoneNumber: '01412345678',
    balanceCoins: 598240,
    balanceBDT: 1500,
    currentData: 40,
    isLoggedIn: false,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  // Auth & Onboarding State
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Specific State for Preview & Confirmation
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    onConfirm: () => void;
  }>({ isOpen: false, onConfirm: () => {} });


  // --- Actions ---

  const showNotification = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleNavigate = (page: string) => {
    if (page === 'home') {
      setActivePage('home');
    } else {
      if (user.isLoggedIn) {
        setActivePage(page);
      } else {
        setShowLoginModal(true);
      }
    }
  };

  const handleLogout = () => {
    setUser(prev => ({ ...prev, isLoggedIn: false }));
    setActivePage('home');
    showNotification("Logged out successfully");
  };

  const openConfirmation = (action: () => void) => {
    setConfirmationModal({
      isOpen: true,
      onConfirm: action
    });
  };

  const closeConfirmation = () => {
    setConfirmationModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleConfirmAction = () => {
    confirmationModal.onConfirm();
    closeConfirmation();
  };

  // --- Login & Onboarding Components ---

  const LoginModal = () => {
    const [phone, setPhone] = useState('01412345678');
    const [pass, setPass] = useState('12345');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (phone === '01412345678' && pass === '12345') {
        setUser(prev => ({ ...prev, isLoggedIn: true }));
        setShowLoginModal(false);
        // Trigger Onboarding immediately after login
        setShowOnboarding(true);
      } else {
        setError('Invalid credentials. Use 01412345678 / 12345');
      }
    };

    return (
      <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold text-white">Login to Ryze</h2>
             <button onClick={() => setShowLoginModal(false)} className="text-slate-400 hover:text-white"><X /></button>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Phone Number</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
              <input 
                type="password" 
                value={pass} 
                onChange={(e) => setPass(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-xl font-bold text-white hover:opacity-90 transition">
              Sign In
            </button>
            <p className="text-xs text-center text-slate-500">Demo: 01412345678 / 12345</p>
          </form>
        </div>
      </div>
    );
  };

  const OnboardingModal = () => {
    const [step, setStep] = useState(1);
    const [purpose, setPurpose] = useState<'academic' | 'self-study' | null>(null);
    const [selection, setSelection] = useState('');

    const grades = ['Grade 8', 'Grade 9', 'Grade 10', 'SSC', 'HSC', 'Undergrad'];
    const interests = ['Technology', 'Art & Design', 'Business', 'Literature', 'Science'];

    const handleFinish = () => {
      if (purpose && selection) {
        setUser(prev => ({ 
          ...prev, 
          onboarding: { purpose, detail: selection } 
        }));
        setShowOnboarding(false);
        showNotification("Profile updated successfully!");
      }
    };

    return (
      <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-fade-in relative overflow-hidden">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-1 bg-white/10 w-full">
            <div className={`h-full bg-purple-500 transition-all duration-300 ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
          </div>

          <h2 className="text-3xl font-black text-white mb-2 mt-2">Welcome, {user.name}!</h2>
          <p className="text-slate-400 mb-8">Let's customize your Ryze experience.</p>

          {step === 1 && (
            <div className="space-y-4">
              <p className="text-lg font-semibold text-white">What brings you here today?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => { setPurpose('academic'); setStep(2); }}
                  className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-purple-600/20 hover:border-purple-500 transition text-left group"
                >
                  <GraduationCap className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition" />
                  <h3 className="font-bold text-white">Academic Purposes</h3>
                  <p className="text-sm text-slate-400 mt-1">School, College, or University studies.</p>
                </button>
                <button 
                  onClick={() => { setPurpose('self-study'); setStep(2); }}
                  className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-teal-600/20 hover:border-teal-500 transition text-left group"
                >
                  <BookOpen className="w-8 h-8 text-teal-400 mb-3 group-hover:scale-110 transition" />
                  <h3 className="font-bold text-white">Self Study</h3>
                  <p className="text-sm text-slate-400 mt-1">Personal growth and hobbies.</p>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                 <button onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-white">← Back</button>
              </div>
              <p className="text-lg font-semibold text-white">
                {purpose === 'academic' ? 'Select your current grade level:' : 'What are you interested in?'}
              </p>
              
              <div className="flex flex-wrap gap-3">
                {(purpose === 'academic' ? grades : interests).map(item => (
                  <button
                    key={item}
                    onClick={() => setSelection(item)}
                    className={`px-4 py-2 rounded-full text-sm font-bold border transition ${
                      selection === item 
                        ? 'bg-white text-black border-white' 
                        : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/40'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <button 
                onClick={handleFinish}
                disabled={!selection}
                className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-xl font-bold text-white hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Ryzing 🚀
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- Domain Logic Handlers ---

  const processBuyPackage = (pkg: DataPackage) => {
    if (user.balanceBDT >= pkg.priceBDT) {
      setUser(prev => ({
        ...prev,
        balanceBDT: prev.balanceBDT - pkg.priceBDT,
        balanceCoins: prev.balanceCoins + pkg.coinsEarned,
        currentData: prev.currentData + pkg.dataAmountGB
      }));
      showNotification(`Purchase successful! Added ${pkg.dataAmountGB}GB and earned ${pkg.coinsEarned} RYZE COINS.`);
    } else {
      showNotification('Insufficient BDT Balance.', 'error');
    }
  };

  const processPurchaseDoc = (doc: DocumentItem) => {
    if (user.balanceCoins >= doc.priceCoins) {
      setUser(prev => ({ ...prev, balanceCoins: prev.balanceCoins - doc.priceCoins }));
      showNotification(`Purchased "${doc.title}" for ${doc.priceCoins} RYZE COINS.`);
      setActivePage('learning');
      setPreviewDoc(null);
    } else {
      showNotification('Insufficient RYZE COINS.', 'error');
    }
  };

  const processBuySubscription = (serviceName: string, planName: string, cost: number, currency: 'BDT' | 'COINS') => {
    if (currency === 'BDT') {
      if (user.balanceBDT >= cost) {
        setUser(prev => ({ ...prev, balanceBDT: prev.balanceBDT - cost }));
        showNotification(`${serviceName} ${planName} activated via BDT.`);
      } else {
        showNotification('Insufficient BDT Balance.', 'error');
      }
    } else {
      if (user.balanceCoins >= cost) {
        setUser(prev => ({ ...prev, balanceCoins: prev.balanceCoins - cost }));
        showNotification(`${serviceName} ${planName} activated using RYZE COINS.`);
      } else {
        showNotification('Insufficient RYZE COINS.', 'error');
      }
    }
  };

  // --- Interaction Handlers (Connected to Components) ---

  const handleBuyPackageClick = (pkg: DataPackage) => {
    openConfirmation(() => processBuyPackage(pkg));
  };

  const handleUploadDoc = (doc: DocumentItem, rewardType: 'instant' | 'sell', amount: number) => {
    if (rewardType === 'instant') {
      setUser(prev => ({ ...prev, balanceCoins: prev.balanceCoins + amount }));
      showNotification(`Upload successful! You earned ${amount} RYZE COINS instantly.`);
    } else {
      showNotification(`Upload successful! Listed for ${doc.priceCoins} RYZE COINS.`);
    }
  };

  const handlePreviewDoc = (doc: DocumentItem) => {
    setPreviewDoc(doc);
    setActivePage('preview');
  };

  const handlePurchaseDocClick = (doc: DocumentItem) => {
     openConfirmation(() => processPurchaseDoc(doc));
  };

  const handleBuySubscriptionClick = (serviceName: string, planName: string, cost: number, currency: 'BDT' | 'COINS') => {
    openConfirmation(() => processBuySubscription(serviceName, planName, cost, currency));
  };

  // --- Render ---

  return (
    <div className="min-h-screen flex flex-col font-sans relative text-slate-100 selection:bg-purple-500 selection:text-white bg-[#050505]">
      
      {/* Auth Modals */}
      {showLoginModal && <LoginModal />}
      {showOnboarding && <OnboardingModal />}

      {/* Global Background Effects */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#050505]">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[120px]"></div>
      </div>
      
      {/* Navbar (Pill Style) */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between gap-8 shadow-2xl w-full max-w-5xl">
            {/* Logo */}
            <div 
              className="flex-shrink-0 cursor-pointer" 
              onClick={() => handleNavigate('home')}
            >
               <span className="font-black text-2xl tracking-tighter text-white">RYZE</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => handleNavigate('home')} className={`text-sm font-medium hover:text-white transition ${activePage === 'home' ? 'text-white' : 'text-slate-400'}`}>Home</button>
              <button onClick={() => handleNavigate('learning')} className={`text-sm font-medium hover:text-white transition ${activePage === 'learning' ? 'text-white' : 'text-slate-400'}`}>Learn</button>
              <button onClick={() => { handleNavigate('home'); /* Should scroll to features */ }} className="text-sm font-medium text-slate-400 hover:text-white transition">Features</button>
              <button onClick={() => handleNavigate('plans')} className={`text-sm font-medium hover:text-white transition ${activePage === 'plans' ? 'text-white' : 'text-slate-400'}`}>Telco plans</button>
              <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="text-sm font-medium text-slate-400 hover:text-white transition">About us</button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
               <button className="hidden md:flex items-center gap-1 text-sm text-slate-400 hover:text-white">
                  EN <ChevronDown className="w-3 h-3" />
               </button>
               {user.isLoggedIn ? (
                  <button 
                  onClick={handleLogout}
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition"
                >
                  <LogIn className="w-4 h-4" /> Logout
                </button>
               ) : (
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition"
                >
                  <Download className="w-4 h-4" /> Join Ryze
                </button>
               )}
               {/* Mobile Menu Toggle */}
               <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
                 {mobileMenuOpen ? <X /> : <Menu />}
               </button>
            </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed top-24 left-4 right-4 z-40 bg-[#121214] border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-2">
            <button onClick={() => {handleNavigate('home'); setMobileMenuOpen(false)}} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium">Home</button>
            <button onClick={() => {handleNavigate('learning'); setMobileMenuOpen(false)}} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium">Learn</button>
            <button onClick={() => {handleNavigate('plans'); setMobileMenuOpen(false)}} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium">Telco Plans</button>
            <button onClick={() => {handleNavigate('subscriptions'); setMobileMenuOpen(false)}} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium">Subscriptions</button>
        </div>
      )}

      {/* Global Confirmation Modal */}
      {confirmationModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center transform scale-100 transition-transform">
             <div className="w-16 h-16 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
                <AlertTriangle className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">Confirm Purchase</h3>
             <p className="text-slate-400 mb-6 leading-relaxed">
               Are you sure you want to make this purchase? <br/>
               <span className="text-red-500 text-xs font-bold uppercase tracking-wide">Purchases are non refundable.</span>
             </p>
             <div className="flex gap-3">
               <button 
                 onClick={closeConfirmation}
                 className="flex-1 py-3 border border-white/10 rounded-xl font-semibold text-slate-300 hover:bg-white/5 transition"
               >
                 Take me back
               </button>
               <button 
                 onClick={handleConfirmAction}
                 className="flex-1 py-3 bg-white text-black rounded-xl font-bold hover:bg-slate-200 transition shadow-lg"
               >
                 Yes
               </button>
             </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed bottom-4 right-4 z-50 px-6 py-3 rounded-lg shadow-xl text-white font-medium animate-fade-in-up flex items-center gap-2 ${notification.type === 'success' ? 'bg-gradient-to-r from-teal-500 to-emerald-500' : 'bg-red-500'}`}>
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="w-full">
        
        {/* Landing Page Mode */}
        {activePage === 'home' && (
          <div className="animate-fade-in">
             <Hero onNavigate={handleNavigate} user={user} />
             <LandingPage onNavigate={handleNavigate} />
          </div>
        )}

        {/* Functional Pages (Wrapped in Container) */}
        {activePage !== 'home' && user.isLoggedIn && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-[80vh]">
             {activePage === 'plans' && <DataPlans buyPackage={handleBuyPackageClick} />}
             
             {activePage === 'learning' && (
                <div className="animate-fade-in">
                  <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">Learning Hub</h2>
                      <div className="flex items-center gap-3">
                         <span className="bg-purple-600/20 text-purple-400 border border-purple-500/30 text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wide">{user.onboarding?.purpose === 'academic' ? 'Academic' : 'Self Study'} Mode</span>
                         <span className="text-slate-400 text-sm border-l border-white/20 pl-3">{user.onboarding?.detail}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                       <span className="text-sm text-slate-400">Your RYZE COINS:</span>
                       <span className="text-purple-400 font-bold flex items-center gap-1"><Coins className="w-4 h-4"/> {user.balanceCoins.toLocaleString()}</span>
                    </div>
                  </div>
                  <LearningHub 
                      userCoins={user.balanceCoins} 
                      onPreviewDoc={handlePreviewDoc} 
                      onUploadDoc={handleUploadDoc}
                  />
                </div>
              )}

              {activePage === 'preview' && previewDoc && (
                <DocumentPreview 
                  doc={previewDoc}
                  onBack={() => setActivePage('learning')}
                  onPurchase={handlePurchaseDocClick}
                  userCoins={user.balanceCoins}
                />
              )}
              
              {activePage === 'subscriptions' && <SubscriptionStore buySubscription={handleBuySubscriptionClick} />}
          </div>
        )}

      </main>

      {/* Footer (Accordion Style Mockup) */}
      <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked <br/> Questions <MessageSquare className="inline w-8 h-8 text-green-400 ml-2" /></h2>
                 <p className="text-slate-400 mb-8">Can't find what you're looking for? Check out our FAQ.</p>
                 <div className="space-y-4">
                    {['What is Ryze?', 'How can I join Ryze?', 'What are the benefits?'].map((q, i) => (
                      <div key={i} className="border-b border-white/10 pb-4">
                         <div className="flex justify-between items-center cursor-pointer hover:text-purple-400 transition">
                            <span className="font-medium text-slate-200">{q}</span>
                            <span className="text-xl">+</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="bg-[#121214] rounded-3xl p-8 border border-white/10">
                 <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><MapPin className="text-purple-500"/> Our headquarters</h3>
                 <div className="aspect-video bg-slate-800 rounded-xl mb-4 overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="Office"/>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                       <span className="px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full text-sm font-bold text-white">Ryze HQ, Dhaka</span>
                    </div>
                 </div>
                 <div className="space-y-2 text-sm text-slate-400">
                    <p><span className="text-white font-semibold">Location:</span> House 4, Tiger's Den, SW(H), Gulshan-1, Dhaka</p>
                    <p><span className="text-white font-semibold">Email:</span> hello@ryze.com.bd</p>
                    <p><span className="text-white font-semibold">Phone:</span> +880 17 0000 0000</p>
                 </div>
              </div>
           </div>

           <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
              <div className="flex gap-6">
                 <a href="#" className="hover:text-white">Terms & conditions</a>
                 <a href="#" className="hover:text-white">Privacy</a>
              </div>
              <p>COPYRIGHT © RYZE 2025</p>
              <div className="flex gap-4">
                 <Globe className="w-5 h-5 hover:text-white cursor-pointer" />
                 <div className="flex gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-8" alt="Play Store" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="h-8" alt="App Store" />
                 </div>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
