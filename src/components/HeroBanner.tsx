import React, { useState, useEffect } from 'react';
import { WeddingData, LanguageMode } from '../types/wedding';
import { Calendar, Volume2, VolumeX, Share2, MapPin } from 'lucide-react';
import { weddingAudio } from '../utils/audioSynth';
import { createGoogleCalendarUrl, getWhatsAppShareText } from '../utils/calendar';

interface HeroBannerProps {
  data: WeddingData;
  lang: LanguageMode;
  onLanguageChange: (lang: LanguageMode) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  data,
  lang,
  onLanguageChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate live countdown to Nov 5, 2026, 10:45 AM IST
  useEffect(() => {
    const weddingTime = new Date('2026-11-05T10:45:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = weddingTime - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      weddingAudio.stop();
      setIsPlaying(false);
    } else {
      weddingAudio.play();
      setIsPlaying(true);
    }
  };

  const handleShareWhatsApp = () => {
    const text = getWhatsAppShareText(data, lang === 'te' ? 'te' : 'en');
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        {/* Sacred Sloka & Invocation */}
        <div className="mb-4 inline-flex flex-col items-center">
          <p className="font-telugu text-base sm:text-lg font-bold text-amber-950 tracking-wide px-5 py-2 rounded-full bg-gradient-to-r from-amber-100/95 via-amber-200 to-amber-100/95 border border-amber-400 shadow-sm inline-block">
            {data.slokaTe}
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm font-semibold text-amber-900">
            <span className="px-3 py-1 rounded-full bg-amber-100/90 text-amber-950 border border-amber-300/90 font-bold shadow-2xs">కన్యాదానం మంగళం</span>
            <span aria-hidden="true">·</span>
            <span className="px-3 py-1 rounded-full bg-amber-100/90 text-amber-950 border border-amber-300/90 font-bold shadow-2xs">లావణ్య యోగ్యదాంపత్య కల్యాణం</span>
          </div>
        </div>

        {/* Invitation Heading */}
        <div className="mb-4">
          <h2 className="font-telugu text-amber-950 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight inline-block px-7 py-2.5 rounded-2xl bg-gradient-to-r from-amber-100/90 via-amber-200 to-amber-100/90 border-2 border-amber-400/90 shadow-md">
            {data.invitationTitleTe}
          </h2>
          <p className="font-cinzel text-xs sm:text-sm tracking-widest uppercase text-amber-800 font-bold mt-1.5">
            {data.invitationTitle}
          </p>
        </div>

        {/* Grand Couple Names Spotlight with Clean Royal Typography */}
        <div className="py-6 px-4 my-2 border-y border-amber-300/80 bg-amber-50/70 backdrop-blur-xs rounded-2xl shadow-xs relative">
          <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-2">
            {lang === 'te' ? 'వధూవరులు' : 'Auspicious Holy Matrimony'}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8">
            {/* Bride */}
            <div className="text-center">
              <span className="text-xs font-semibold text-amber-800 block font-telugu">
                {lang === 'te' ? data.brideTitleTe : data.brideTitleEn}
              </span>
              <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#45140b]">
                {lang === 'te' ? data.brideNameTe : data.brideName}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-amber-900 mt-1 max-w-xs font-telugu">
                {lang === 'te' ? data.brideParentsTe : data.brideParentsEn}
              </p>
            </div>

            {/* Sacred Knot Symbol */}
            <div className="my-2 md:my-0 flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 shadow-inner">
                <span className="font-serif italic font-bold text-xl">&</span>
              </div>
              <span className="text-xs font-medium text-amber-800 font-telugu mt-1">
                {lang === 'te' ? 'కల్యాణం' : 'Weds'}
              </span>
            </div>

            {/* Groom */}
            <div className="text-center">
              <span className="text-xs font-semibold text-amber-800 block font-telugu">
                {lang === 'te' ? data.groomTitleTe : data.groomTitleEn}
              </span>
              <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#45140b]">
                {lang === 'te' ? data.groomNameTe : data.groomName}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-amber-900 mt-1 max-w-xs font-telugu">
                {lang === 'te' ? data.groomParentsTe : data.groomParentsEn}
              </p>
            </div>
          </div>
        </div>

        {/* Muhurtham & Venue Highlights */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-amber-950 font-medium">
          <div className="flex items-center gap-1.5 bg-amber-50/90 px-3 py-1.5 rounded-lg border border-amber-200 shadow-xs">
            <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              {data.dayEn}, 05th November 2026 ({data.timeEn})
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-amber-50/90 px-3 py-1.5 rounded-lg border border-amber-200 shadow-xs">
            <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              {data.venueNameEn}, {data.cityEn}
            </span>
          </div>
        </div>

        {/* Live Countdown Clock */}
        <div className="mt-6 max-w-md mx-auto p-4 rounded-xl bg-gradient-to-b from-amber-50 to-[#faf3e0] border border-amber-300 shadow-xs">
          <p className="text-xs uppercase tracking-wider text-amber-900 font-semibold mb-2">
            {lang === 'te' ? 'సుముహూర్తానికి సమయం (లగ్న నిరీక్షణ)' : 'Countdown to Auspicious Muhurtham'}
          </p>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-white/95 p-2 rounded-lg border border-amber-200 shadow-xs">
              <span className="block text-2xl font-bold text-amber-950 tabular-nums">
                {timeLeft.days}
              </span>
              <span className="text-[11px] text-amber-800 uppercase font-medium">
                {lang === 'te' ? 'రోజులు' : 'Days'}
              </span>
            </div>
            <div className="bg-white/95 p-2 rounded-lg border border-amber-200 shadow-xs">
              <span className="block text-2xl font-bold text-amber-950 tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[11px] text-amber-800 uppercase font-medium">
                {lang === 'te' ? 'గంటలు' : 'Hours'}
              </span>
            </div>
            <div className="bg-white/95 p-2 rounded-lg border border-amber-200 shadow-xs">
              <span className="block text-2xl font-bold text-amber-950 tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[11px] text-amber-800 uppercase font-medium">
                {lang === 'te' ? 'నిమిషాలు' : 'Mins'}
              </span>
            </div>
            <div className="bg-white/95 p-2 rounded-lg border border-amber-200 shadow-xs">
              <span className="block text-2xl font-bold text-amber-700 tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[11px] text-amber-800 uppercase font-medium">
                {lang === 'te' ? 'సెకన్లు' : 'Secs'}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Controls Bar: Language Selector & Audio Synthesizer & Share */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center gap-1 p-1 bg-amber-100/80 rounded-lg border border-amber-300">
            <button
              onClick={() => onLanguageChange('te')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                lang === 'te'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-amber-900 hover:text-amber-950'
              }`}
            >
              తెలుగు
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                lang === 'en'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-amber-900 hover:text-amber-950'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onLanguageChange('bilingual')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                lang === 'bilingual'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-amber-900 hover:text-amber-950'
              }`}
            >
              Bilingual (Both)
            </button>
          </div>

          {/* Mangala Vadyam Music Toggle */}
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              isPlaying
                ? 'bg-amber-700 text-white border-amber-800 shadow-xs'
                : 'bg-white/95 text-amber-950 border-amber-300 hover:bg-amber-50'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-amber-200" />
                <span>Nadaswaram Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-amber-700" />
                <span>Play Mangala Vadyam</span>
              </>
            )}
          </button>

          {/* Add to Google Calendar */}
          <a
            href={createGoogleCalendarUrl(data)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/95 border border-amber-300 text-xs font-medium text-amber-950 hover:bg-amber-50 transition-colors shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>Add to Calendar</span>
          </a>

          {/* WhatsApp Share */}
          <button
            onClick={handleShareWhatsApp}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium transition-colors shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share via WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
};
