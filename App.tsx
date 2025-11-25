import React, { useState, useEffect, useCallback } from 'react';
import { fetchCamusQuote } from './services/geminiService';
import { CamusQuote } from './types';
import { QuoteDisplay } from './components/QuoteDisplay';
import { RefreshIcon, CopyIcon, CheckIcon } from './components/Icons';

const App: React.FC = () => {
  const [quote, setQuote] = useState<CamusQuote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const getNewQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    setCopied(false);
    try {
      const newQuote = await fetchCamusQuote();
      setQuote(newQuote);
    } catch (err) {
      setError("The silence of the universe is deafening. Try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getNewQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
    if (quote) {
      const textToCopy = `"${quote.text}" - Albert Camus`;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-stone-950 text-stone-200 overflow-hidden selection:bg-stone-700 selection:text-white">
      
      {/* Dynamic Background Fog */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-stone-900/40 rounded-full blur-[100px] animate-float-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-stone-800/20 rounded-full blur-[120px] animate-float-medium"></div>
        <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] bg-black rounded-full blur-[80px] opacity-60 animate-float-slow" style={{animationDelay: '-5s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full p-8 flex justify-center opacity-60 hover:opacity-100 transition-opacity duration-500">
        <h1 className="text-xs md:text-sm font-bold tracking-[0.5em] text-stone-500 uppercase font-display">
          Absurdity Generator
        </h1>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-6 md:p-12 w-full">
        
        {/* Error State */}
        {error && (
          <div className="text-stone-400 bg-stone-900/80 px-8 py-6 rounded-sm border-l-2 border-red-900/50 mb-12 max-w-md text-center backdrop-blur-md shadow-2xl">
            <p className="mb-6 font-serif italic">{error}</p>
            <button 
              onClick={getNewQuote}
              className="text-xs uppercase tracking-widest hover:text-white transition-colors border-b border-stone-700 hover:border-white pb-1"
            >
              Revolt (Try Again)
            </button>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && !quote && (
           <div className="flex flex-col items-center animate-pulse gap-4">
             <div className="w-12 h-12 border-2 border-stone-800 border-t-stone-400 rounded-full animate-spin"></div>
             <p className="text-stone-600 font-serif text-sm tracking-widest uppercase">Consulting the Void...</p>
           </div>
        )}

        {/* Quote Container */}
        {quote && !error && (
          <div className={`w-full transition-all duration-700 ${loading ? 'opacity-40 blur-sm scale-98 grayscale' : 'opacity-100 blur-0 scale-100 grayscale-0'}`}>
            <QuoteDisplay quote={quote} />
          </div>
        )}

      </main>

      {/* Footer Controls */}
      <footer className="relative z-10 w-full p-8 md:p-12 flex flex-col items-center gap-8">
        <div className="flex gap-6 items-center">
          <button
            onClick={getNewQuote}
            disabled={loading}
            className="group relative px-8 py-4 bg-stone-100 text-stone-950 font-display font-bold tracking-[0.2em] uppercase text-xs md:text-sm rounded-sm transition-all hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
             <span className="relative z-10 flex items-center gap-3">
               <RefreshIcon className={`w-4 h-4 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
               {loading ? 'Thinking...' : 'Generate'}
             </span>
          </button>

          {quote && (
            <button
              onClick={handleCopy}
              className="group px-6 py-4 border border-stone-800 text-stone-500 font-display font-bold tracking-[0.2em] uppercase text-xs md:text-sm rounded-sm transition-all hover:border-stone-600 hover:text-stone-300 active:scale-95 bg-stone-950/30 backdrop-blur-sm"
              aria-label="Copy Quote"
            >
              <div className="flex items-center gap-2">
                {copied ? <CheckIcon className="w-4 h-4 text-emerald-500/80" /> : <CopyIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </div>
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default App;