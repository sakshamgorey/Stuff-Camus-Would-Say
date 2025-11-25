import React, { useEffect, useState } from 'react';
import { CamusQuote } from '../types';

interface QuoteDisplayProps {
  quote: CamusQuote;
}

export const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [quote]);

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 perspective-1000">
      <div 
        className={`
          transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isVisible ? 'opacity-100 translate-y-0 blur-0 scale-100' : 'opacity-0 translate-y-8 blur-sm scale-95'}
        `}
      >
        {/* Decorative Quote Mark Background */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 -z-10 select-none pointer-events-none opacity-5">
           <span className="font-serif text-[12rem] md:text-[16rem] leading-none text-stone-100">“</span>
        </div>

        <div className="text-center relative z-10 flex flex-col items-center">
          {quote.context && (
            <span className="inline-block mb-8 px-3 py-1 text-[0.65rem] tracking-[0.3em] uppercase text-stone-500 border border-stone-800 rounded-full bg-stone-900/30 backdrop-blur-sm">
              {quote.context}
            </span>
          )}
          
          <blockquote className="mb-12 relative">
            <p className="text-2xl md:text-4xl lg:text-5xl leading-relaxed md:leading-tight font-serif text-stone-200 font-medium">
              {quote.text}
            </p>
          </blockquote>

          <cite className="not-italic flex flex-col items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-stone-500 to-transparent opacity-50 mb-2"></div>
            <span className="text-stone-100 font-bold text-xl md:text-2xl tracking-[0.2em] font-display uppercase">
              Albert Camus
            </span>
            <span className="text-stone-500 text-sm md:text-base italic tracking-wide">
              {quote.source}
            </span>
          </cite>
        </div>
      </div>
    </div>
  );
};