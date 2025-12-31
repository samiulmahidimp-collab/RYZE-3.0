
import React, { useEffect, useState } from 'react';
import { DocumentItem } from '../types';
import { generateDocumentOverview } from '../services/geminiService';
import { ArrowLeft, FileText, Download, ShieldCheck, Bot, Coins, Loader2 } from 'lucide-react';

interface DocumentPreviewProps {
  doc: DocumentItem;
  onBack: () => void;
  onPurchase: (doc: DocumentItem) => void;
  userCoins: number;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ doc, onBack, onPurchase, userCoins }) => {
  const [overview, setOverview] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchOverview = async () => {
      const text = await generateDocumentOverview(doc.title, doc.description, doc.tags);
      if (isMounted) {
        setOverview(text);
        setLoading(false);
      }
    };
    fetchOverview();
    return () => { isMounted = false; };
  }, [doc]);

  const canAfford = userCoins >= doc.priceCoins;

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Market
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details & Purchase */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0f0f11] p-6 rounded-2xl shadow-sm border border-white/10">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                <FileText className="w-12 h-12" />
              </div>
            </div>
            
            <h1 className="text-xl font-bold text-white text-center mb-2">{doc.title}</h1>
            <p className="text-slate-400 text-center text-sm mb-6">By {doc.author}</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">File Type</span>
                <span className="font-medium text-white">PDF</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Downloads</span>
                <span className="font-medium text-white">{doc.downloads}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Price</span>
                <span className="font-bold text-purple-400 flex items-center gap-1">
                  <Coins className="w-4 h-4" /> {doc.priceCoins} COINS
                </span>
              </div>
            </div>

            <button 
              onClick={() => onPurchase(doc)}
              disabled={!canAfford}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg
                ${canAfford 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 shadow-purple-500/25' 
                  : 'bg-white/5 text-slate-500 cursor-not-allowed'}`}
            >
              {canAfford ? 'Buy Now' : 'Insufficient RYZE COINS'}
              {canAfford && <Download className="w-5 h-5" />}
            </button>
            
            {!canAfford && (
              <p className="text-xs text-red-400 text-center mt-3">
                You need {doc.priceCoins - userCoins} more coins.
              </p>
            )}
          </div>

          <div className="bg-green-900/10 p-4 rounded-xl border border-green-500/20 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-green-400">Verified Content</h4>
              <p className="text-xs text-green-300/80 mt-1">This material has been checked for quality and relevance by the community.</p>
            </div>
          </div>
        </div>

        {/* Right Column: AI Preview */}
        <div className="lg:col-span-2">
          <div className="bg-[#0f0f11] rounded-2xl shadow-sm border border-white/10 overflow-hidden h-full flex flex-col">
            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-teal-400" />
                AI Generated Overview
              </h3>
              <span className="text-xs font-medium text-slate-300 bg-white/10 px-2 py-1 rounded border border-white/10">
                Preview Mode
              </span>
            </div>
            
            <div className="p-8 flex-1">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 min-h-[300px]">
                  <Loader2 className="w-8 h-8 animate-spin mb-4 text-purple-500" />
                  <p>Generating document preview...</p>
                </div>
              ) : (
                <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                  <div dangerouslySetInnerHTML={{ __html: overview.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
              )}
            </div>
            
            <div className="p-4 bg-white/5 border-t border-white/10 text-center">
               <p className="text-xs text-slate-500">
                 This overview is generated by AI based on the document's content. Purchase to access the full file.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
