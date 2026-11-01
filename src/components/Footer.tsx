import React from 'react';
import { WeddingData, LanguageMode } from '../types/wedding';

interface FooterProps {
  data: WeddingData;
  lang: LanguageMode;
}

export const Footer: React.FC<FooterProps> = ({ data, lang }) => {
  return (
    <footer className="relative bg-[#f4ecd8] border-t border-amber-300 pt-12 pb-16 px-4 text-center overflow-hidden">
      {/* Subtle Temple Gopuram in Background */}
      <div className="flex justify-center mb-6">
        <img
          src="/assets/aistudio/image_e959728e.png"
          alt="Temple Gopuram"
          referrerPolicy="no-referrer"
          className="h-28 w-auto object-contain opacity-70 filter drop-shadow-sm"
        />
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        <p className="font-telugu text-base sm:text-lg font-bold text-amber-950">
          {data.invitationTitleTe}
        </p>
        <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold font-cinzel">
          {data.invitationTitle}
        </p>

        <p className="font-telugu text-sm text-amber-900 font-medium">
          {data.hostsTe}
        </p>

        <div className="py-2 inline-block px-4 rounded-full bg-amber-200/60 border border-amber-300 text-xs font-telugu text-amber-900 font-semibold">
          {data.childrenWelcomeLineTe}
        </div>

        <p className="text-xs text-amber-800/80 font-telugu pt-2">
          {data.communityBlessingsTe}
        </p>

        <div className="pt-6 border-t border-amber-300/80 text-[11px] text-amber-700">
          <p>© 2026 Chettipally Family | Vemulawada, Dist: Rajanna Sircilla | 05th November 2026</p>
        </div>
      </div>
    </footer>
  );
};
