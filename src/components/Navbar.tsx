import React from 'react';
import { Sparkles, Edit3 } from 'lucide-react';

interface NavbarProps {
  onOpenEditor: () => void;
  isEditorOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEditor, isEditorOpen }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#faf6ee]/90 backdrop-blur-md border-b border-amber-900/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <a
          href="#"
          className="font-cinzel text-lg sm:text-xl font-bold tracking-tight text-amber-950 hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="text-amber-700">✦</span>
          <span>Chettipally's Wedding</span>
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-amber-900/80">
          <a
            href="#invitation-card"
            className="hover:text-amber-950 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Digital Shubhalekha
          </a>
          <a
            href="#muhurtham"
            className="hover:text-amber-950 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Sumuhurtham
          </a>
          <a
            href="#rituals"
            className="hover:text-amber-950 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Ceremonies
          </a>
          <a
            href="#venue"
            className="hover:text-amber-950 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Venue & Map
          </a>
          <a
            href="#guestbook"
            className="hover:text-amber-950 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            RSVP & Wishes
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenEditor}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0 ${
              isEditorOpen
                ? 'bg-amber-800 text-white hover:bg-amber-900'
                : 'bg-amber-700 text-white hover:bg-amber-800 ring-1 ring-amber-600/30'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditorOpen ? 'Close Editor' : 'Edit Invitation'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
