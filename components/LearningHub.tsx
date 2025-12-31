
import React, { useState, useEffect, useRef } from 'react';
import { Search, Upload, FileText, Coins, Bot, X, Send, Eye, Library } from 'lucide-react';
import { DocumentItem, ChatMessage } from '../types';
import { generateStudyHelp } from '../services/geminiService';

interface LearningHubProps {
  userCoins: number;
  onPreviewDoc: (doc: DocumentItem) => void;
  onUploadDoc: (doc: DocumentItem, rewardType: 'instant' | 'sell', instantAmount: number) => void;
}

const MOCK_DOCS: DocumentItem[] = [
  { id: '1', title: 'Intro to Quantum Physics', author: 'Dr. A. Rahman', description: 'Comprehensive notes on Quantum Mechanics basics, wave-particle duality, and Schrödinger equation.', tags: ['physics', 'science', 'quantum'], priceCoins: 50, downloads: 120, isOwner: false },
  { id: '2', title: 'React JS Advanced Patterns', author: 'Dev Sarah', description: 'Deep dive into Hooks, Context API, Performance optimization, and custom hooks design.', tags: ['coding', 'javascript', 'react'], priceCoins: 100, downloads: 450, isOwner: false },
  { id: '3', title: 'Economics 101 Summary', author: 'Ryze User', description: 'Quick revision summary for microeconomics supply and demand curves.', tags: ['economics', 'finance'], priceCoins: 0, downloads: 89, isOwner: false },
];

interface DocumentCardProps {
  doc: DocumentItem;
  onPreviewDoc: (doc: DocumentItem) => void;
  activeTab: 'market' | 'library' | 'chat';
}

const DocumentCard: React.FC<DocumentCardProps> = ({ doc, onPreviewDoc, activeTab }) => (
  <div className="bg-[#18181b] p-5 rounded-xl border border-white/5 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-900/20 transition-all group">
    <div className="flex justify-between items-start mb-3">
      <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
        <FileText className="w-6 h-6" />
      </div>
      {doc.priceCoins > 0 && !doc.isOwner ? (
        <div className="flex items-center gap-1 text-sm font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">
          <Coins className="w-3 h-3" /> {doc.priceCoins}
        </div>
      ) : (
        <div className="text-sm font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
          {doc.isOwner ? 'Owned' : 'Free'}
        </div>
      )}
    </div>
    <h3 className="font-bold text-white mb-1 truncate">{doc.title}</h3>
    <p className="text-xs text-slate-500 mb-3">By {doc.author} • {doc.downloads} downloads</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {doc.tags.map(tag => (
        <span key={tag} className="text-xs bg-white/5 text-slate-400 px-2 py-1 rounded-full border border-white/5">#{tag}</span>
      ))}
    </div>
    <button 
      onClick={() => onPreviewDoc(doc)}
      disabled={doc.isOwner && activeTab === 'market'}
      className={`w-full py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition
        ${doc.isOwner 
          ? 'bg-white/5 text-slate-500' 
          : 'bg-white text-black hover:bg-purple-200'}`}
    >
      {doc.isOwner ? 'Open Document' : 'View Preview & Buy'}
      {(!doc.isOwner || activeTab === 'library') && <Eye className="w-4 h-4" />}
    </button>
  </div>
);

const LearningHub: React.FC<LearningHubProps> = ({ userCoins, onPreviewDoc, onUploadDoc }) => {
  // --- State ---
  const [activeTab, setActiveTab] = useState<'market' | 'library' | 'chat'>('market');
  const [docs, setDocs] = useState<DocumentItem[]>(MOCK_DOCS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadTags, setUploadTags] = useState('');
  const [uploadType, setUploadType] = useState<'instant' | 'sell'>('instant');
  const [sellPrice, setSellPrice] = useState(50);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: 'Hello! I am RyzeBot. I can help you learn new topics or find study materials. What are you studying today?', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- Effects ---
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTab]);

  // --- Handlers ---

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredDocs = docs.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery) || 
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery))
  );
  
  const myLibraryDocs = docs.filter(doc => doc.isOwner);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: DocumentItem = {
      id: Date.now().toString(),
      title: uploadTitle,
      author: 'You',
      description: 'User uploaded document',
      tags: uploadTags.split(',').map(t => t.trim()),
      priceCoins: uploadType === 'sell' ? sellPrice : 0,
      downloads: 0,
      isOwner: true
    };
    
    // Add to local list
    setDocs([newDoc, ...docs]);
    
    // Trigger parent update (add points if instant)
    onUploadDoc(newDoc, uploadType, 80);
    
    // Reset & Close
    setUploadTitle('');
    setUploadTags('');
    setUploadType('instant');
    setShowUploadModal(false);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: inputMessage, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    const botResponseText = await generateStudyHelp(userMsg.text, messages.map(m => ({ role: m.role, text: m.text })));
    
    const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: botResponseText, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[800px] md:h-[600px] bg-[#0f0f11]/80 backdrop-blur rounded-2xl shadow-xl border border-white/10 overflow-hidden">
      {/* Header Tabs */}
      <div className="flex border-b border-white/10">
        <button 
          onClick={() => setActiveTab('market')}
          className={`flex-1 py-4 text-center font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'market' ? 'text-purple-400 border-b-2 border-purple-500 bg-purple-500/10' : 'text-slate-400 hover:bg-white/5'}`}
        >
          <Search className="w-4 h-4" /> Market
        </button>
        <button 
          onClick={() => setActiveTab('library')}
          className={`flex-1 py-4 text-center font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'library' ? 'text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/10' : 'text-slate-400 hover:bg-white/5'}`}
        >
          <Library className="w-4 h-4" /> My Library
        </button>
        <button 
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-4 text-center font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'chat' ? 'text-teal-400 border-b-2 border-teal-500 bg-teal-500/10' : 'text-slate-400 hover:bg-white/5'}`}
        >
          <Bot className="w-4 h-4" /> AI Tutor
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative bg-[#0f0f11]">
        
        {/* Market Tab */}
        {activeTab === 'market' && (
          <div className="h-full overflow-y-auto p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search by title or tags (e.g. physics)..." 
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                />
              </div>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition flex items-center gap-2 shadow-lg shadow-purple-900/40"
              >
                <Upload className="w-5 h-5" /> Upload & Earn
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocs.map(doc => <DocumentCard key={doc.id} doc={doc} onPreviewDoc={onPreviewDoc} activeTab={activeTab} />)}
              {filteredDocs.length === 0 && (
                <div className="col-span-full text-center py-12 text-slate-500">
                  <p>No documents found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Library Tab */}
        {activeTab === 'library' && (
          <div className="h-full overflow-y-auto p-6">
            <h3 className="text-xl font-bold text-white mb-6">My Purchased Documents</h3>
            {myLibraryDocs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {myLibraryDocs.map(doc => <DocumentCard key={doc.id} doc={doc} onPreviewDoc={onPreviewDoc} activeTab={activeTab} />)}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                <Library className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">Your library is empty</h4>
                <p className="text-slate-400 max-w-sm mx-auto mb-6">Buy documents from the market or upload your own notes to see them here.</p>
                <button onClick={() => setActiveTab('market')} className="text-purple-400 hover:text-purple-300 font-bold">Go to Market</button>
              </div>
            )}
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-purple-600 text-white rounded-br-none' 
                      : 'bg-[#18181b] border border-white/10 text-slate-200 rounded-bl-none'
                  }`}>
                    {msg.role === 'model' && <div className="flex items-center gap-2 mb-2 text-teal-400 font-bold text-xs"><Bot className="w-3 h-3"/> RyzeBot</div>}
                    <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }} />
                  </div>
                </div>
              ))}
              {isTyping && (
                 <div className="flex justify-start">
                  <div className="bg-[#18181b] border border-white/10 p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></span>
                  </div>
                 </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 bg-[#0f0f11] border-t border-white/10">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask RyzeBot about any topic..."
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-slate-500"
                />
                <button 
                  onClick={sendMessage}
                  disabled={isTyping || !inputMessage.trim()}
                  className="bg-teal-600 text-white p-3 rounded-xl hover:bg-teal-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal Overlay */}
        {showUploadModal && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
              <div className="bg-gradient-to-r from-purple-700 to-indigo-700 p-4 flex justify-between items-center text-white">
                <h3 className="font-bold flex items-center gap-2"><Upload className="w-5 h-5" /> Upload Material</h3>
                <button onClick={() => setShowUploadModal(false)} className="hover:bg-white/10 p-1 rounded"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleUploadSubmit} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Document Title</label>
                    <input required type="text" value={uploadTitle} onChange={e => setUploadTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="e.g. Physics Notes" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Tags (comma separated)</label>
                    <input required type="text" value={uploadTags} onChange={e => setUploadTags(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="e.g. physics, science" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">File</label>
                    <input type="file" required className="w-full border border-dashed border-white/20 rounded-lg p-4 text-sm text-slate-400 bg-white/5" />
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <label className="block text-sm font-bold text-slate-300 mb-2">Earnings Strategy</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:border-purple-500 transition">
                        <input 
                          type="radio" 
                          name="earnType" 
                          checked={uploadType === 'instant'} 
                          onChange={() => setUploadType('instant')}
                          className="text-purple-500 accent-purple-500"
                        />
                        <div className="flex-1">
                          <span className="block font-semibold text-sm text-white">Instant Reward</span>
                          <span className="text-xs text-slate-400">Get 80 RYZE COINS immediately</span>
                        </div>
                        <Coins className="w-5 h-5 text-yellow-500" />
                      </label>
                      <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:border-purple-500 transition">
                        <input 
                          type="radio" 
                          name="earnType" 
                          checked={uploadType === 'sell'} 
                          onChange={() => setUploadType('sell')}
                          className="text-purple-500 accent-purple-500"
                        />
                        <div className="flex-1">
                          <span className="block font-semibold text-sm text-white">Set Your Price</span>
                          <span className="text-xs text-slate-400">Earn when others download</span>
                        </div>
                      </label>
                    </div>
                    {uploadType === 'sell' && (
                      <div className="mt-3 animate-fade-in">
                        <label className="block text-xs font-bold text-slate-400 mb-1">Price (RYZE COINS)</label>
                        <input 
                          type="number" 
                          min="0" 
                          value={sellPrice} 
                          onChange={e => setSellPrice(Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded p-2 text-right font-mono text-white"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 bg-white text-black py-3 rounded-lg font-bold hover:bg-slate-200 transition">
                  Confirm Upload
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningHub;
