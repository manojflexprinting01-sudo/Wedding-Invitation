import React, { useState } from 'react';
import { TELUGU_RITUALS } from '../data/defaultWeddingData';
import { LanguageMode } from '../types/wedding';
import { Sparkles, Clock, ChevronRight, Info } from 'lucide-react';

interface RitualsGuideProps {
  lang: LanguageMode;
}

export const RitualsGuide: React.FC<RitualsGuideProps> = ({ lang }) => {
  const [selectedRitualId, setSelectedRitualId] = useState<string>('jeelakarra-bellam');

  const selectedRitual = TELUGU_RITUALS.find((r) => r.id === selectedRitualId) || TELUGU_RITUALS[4];

  return (
    <section id="rituals" className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
          Sacred Ceremonies
        </span>
        <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-amber-950 mt-1">
          {lang === 'te' ? 'కల్యాణ సంప్రదాయాలు & క్రతువులు' : 'Telugu Wedding Rituals Guide'}
        </h2>
        <p className="text-xs sm:text-sm text-amber-800/80 max-w-xl mx-auto mt-1 font-telugu">
          {lang === 'te'
            ? 'సమవర్తన నుండి సప్తపది, అరుంధతి దర్శనం వరకు ప్రతి వేద ఆచారం యొక్క విశిష్టత.'
            : 'Traditional Vedic ceremonies from Samavartana to Saptapadi and their spiritual significance.'}
        </p>
      </div>

      {/* Main Grid: Illustrated Ritual Art Banner & Interactive Ceremony Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Illustrated Telugu Wedding Rituals Art (image_5cbeaddc.png) */}
        <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-amber-50 border border-amber-300 shadow-sm p-4 flex flex-col items-center">
          <div className="w-full flex items-center justify-between pb-2 mb-3 border-b border-amber-200">
            <span className="text-xs font-bold text-amber-950 font-telugu">
              సాంప్రదాయ వివాహ చిత్ర మాలిక
            </span>
            <span className="text-[11px] text-amber-700 font-medium">
              Illustrated Rituals
            </span>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-amber-200 shadow-inner bg-[#f6eee0]">
            <img
              src="/assets/aistudio/image_5cbeaddc.png"
              alt="Traditional Telugu Wedding Rituals - Samavartana, Edurukolu, Gauri Pooja, Kanyadanam, Jeelakarra Bellam, Mangalyadharana, Talambralu, Saptapadi"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain max-h-[500px]"
            />
          </div>

          <p className="text-[11px] text-amber-800 text-center font-telugu mt-3">
            జీలకర్ర-బెల్లం, మాంగల్యధారణం, తలంబ్రాలు మరియు సప్తపది పవిత్ర ఘట్టాలు.
          </p>
        </div>

        {/* Right Column: Step-by-Step Interactive Timeline & Deep Explanations */}
        <div className="lg:col-span-7 space-y-3">
          {/* Active Ritual Spotlight Box */}
          <div className="p-5 rounded-2xl bg-amber-100/70 border-2 border-amber-400 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-800 text-white text-[11px] font-bold font-telugu">
                {selectedRitual.badge}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-900 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>{selectedRitual.timeEstimate}</span>
              </div>
            </div>

            <h3 className="font-playfair text-xl font-bold text-amber-950 font-telugu">
              {selectedRitual.nameTe}
            </h3>
            <p className="text-xs text-amber-800 font-semibold mb-2">
              {selectedRitual.nameEn}
            </p>

            <p className="text-xs sm:text-sm text-amber-950/90 font-telugu leading-relaxed mb-2">
              {selectedRitual.significanceTe}
            </p>

            <p className="text-xs text-amber-800 leading-relaxed italic border-t border-amber-300/60 pt-2">
              "{selectedRitual.significanceEn}"
            </p>
          </div>

          {/* Quick Clickable List of All Ceremonies */}
          <div className="space-y-1.5 pt-2">
            {TELUGU_RITUALS.map((r, idx) => {
              const isSelected = r.id === selectedRitualId;
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedRitualId(r.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between gap-3 border ${
                    isSelected
                      ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                      : 'bg-white/80 hover:bg-white text-amber-950 border-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-amber-700 text-amber-100' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold font-telugu leading-tight">
                        {r.nameTe}
                      </p>
                      <p
                        className={`text-[11px] leading-tight ${
                          isSelected ? 'text-amber-200' : 'text-amber-700'
                        }`}
                      >
                        {r.nameEn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] hidden sm:inline ${
                        isSelected ? 'text-amber-200' : 'text-amber-600'
                      }`}
                    >
                      {r.timeEstimate}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 ${
                        isSelected ? 'text-amber-300' : 'text-amber-400'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
