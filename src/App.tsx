import React, { useState, useEffect } from 'react';
import { WeddingData, LanguageMode, CardTemplate } from './types/wedding';
import { INITIAL_WEDDING_DATA, CARD_TEMPLATES } from './data/defaultWeddingData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { InvitationCard } from './components/InvitationCard';
import { MuhurthamDetails } from './components/MuhurthamDetails';
import { RitualsGuide } from './components/RitualsGuide';
import { VenueSection } from './components/VenueSection';
import { GuestbookRSVP } from './components/GuestbookRSVP';
import { Footer } from './components/Footer';
import { InvitationEditor } from './components/InvitationEditor';
import { MotionBackdrop } from './components/MotionBackdrop';

export default function App() {
  const [weddingData, setWeddingData] = useState<WeddingData>(() => {
    try {
      const saved = localStorage.getItem('chettipally_wedding_data');
      if (saved) {
        return { ...INITIAL_WEDDING_DATA, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return INITIAL_WEDDING_DATA;
  });

  const [languageMode, setLanguageMode] = useState<LanguageMode>('bilingual');
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate>(CARD_TEMPLATES[0]);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#faf6ee] text-amber-950 font-sans relative selection:bg-amber-700 selection:text-white">
      {/* Dynamic Animated Backdrop Motion Layer (T&S Monogram with Lord Krishna & Radha) */}
      <MotionBackdrop intensity="ambient" />

      {/* Main Foreground Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          onOpenEditor={() => setIsEditorOpen(!isEditorOpen)}
          isEditorOpen={isEditorOpen}
        />

        <main className="flex-1">
          <HeroBanner
            data={weddingData}
            lang={languageMode}
            onLanguageChange={setLanguageMode}
          />

          <InvitationCard
            data={weddingData}
            lang={languageMode}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />

          <MuhurthamDetails
            data={weddingData}
            lang={languageMode}
          />

          <RitualsGuide
            lang={languageMode}
          />

          <VenueSection
            data={weddingData}
            lang={languageMode}
          />

          <GuestbookRSVP
            data={weddingData}
            lang={languageMode}
          />
        </main>

        <Footer
          data={weddingData}
          lang={languageMode}
        />
      </div>

      {/* Interactive Invitation Editor Drawer */}
      {isEditorOpen && (
        <InvitationEditor
          data={weddingData}
          onChange={setWeddingData}
          onClose={() => setIsEditorOpen(false)}
        />
      )}
    </div>
  );
}
