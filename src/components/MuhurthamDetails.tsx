import React from 'react';
import { WeddingData, LanguageMode } from '../types/wedding';
import { Calendar, Clock, Star, Compass, Download, ExternalLink } from 'lucide-react';
import { createGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

interface MuhurthamDetailsProps {
  data: WeddingData;
  lang: LanguageMode;
}

export const MuhurthamDetails: React.FC<MuhurthamDetailsProps> = ({ data, lang }) => {
  return (
    <section id="muhurtham" className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
          Auspicious Timing
        </span>
        <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-amber-950 mt-1">
          {lang === 'te' ? 'వేద సుముహూర్త ప్రాశస్త్యం' : 'The Auspicious Sumuhurtham'}
        </h2>
        <p className="text-xs sm:text-sm text-amber-800/80 max-w-lg mx-auto mt-1 font-telugu">
          {lang === 'te'
            ? 'పెద్దల సమక్షంలో, వేద మంత్రోచ్ఛారణల నడుమ నిర్వహించబడే లగ్న ఘట్ట వివరాలు.'
            : 'Sacred planetary alignment chosen according to Vedic Jyotishastra for lifelong bliss.'}
        </p>
      </div>

      {/* Grid of 4 Auspicious Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Date & Day */}
        <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200/80 shadow-xs flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 mb-3 shadow-inner">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold">
            {lang === 'te' ? 'తేది & వారం' : 'Date & Day'}
          </span>
          <p className="font-playfair text-xl font-bold text-amber-950 mt-1">
            05 Nov 2026
          </p>
          <p className="text-xs text-amber-800 font-telugu mt-0.5">
            {data.dayEn} ({data.dayTe})
          </p>
          <span className="text-[11px] text-amber-700/80 font-telugu mt-2">
            {data.samvatsaramTe}
          </span>
        </div>

        {/* Time */}
        <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200/80 shadow-xs flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 mb-3 shadow-inner">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold">
            {lang === 'te' ? 'లగ్న సమయం' : 'Sumuhurtham Time'}
          </span>
          <p className="font-playfair text-xl font-bold text-amber-950 mt-1 tabular-nums">
            {data.timeEn}
          </p>
          <p className="text-xs text-amber-800 font-telugu mt-0.5">
            {data.timeTe}
          </p>
          <span className="text-[11px] text-amber-700/80 font-telugu mt-2">
            {data.tithiTe}
          </span>
        </div>

        {/* Nakshatram */}
        <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200/80 shadow-xs flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 mb-3 shadow-inner">
            <Star className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold">
            {lang === 'te' ? 'నక్షత్రం' : 'Nakshatram'}
          </span>
          <p className="font-playfair text-xl font-bold text-amber-950 mt-1 font-telugu">
            {data.nakshatramTe}
          </p>
          <p className="text-xs text-amber-800 mt-0.5">
            {data.nakshatramEn}
          </p>
          <span className="text-[11px] text-amber-700/80 mt-2">
            Uttara Phalguni Star
          </span>
        </div>

        {/* Lagnam */}
        <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200/80 shadow-xs flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 mb-3 shadow-inner">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold">
            {lang === 'te' ? 'లగ్నం' : 'Ascendant Lagnam'}
          </span>
          <p className="font-playfair text-xl font-bold text-amber-950 mt-1 font-telugu">
            {data.lagnamTe}
          </p>
          <p className="text-xs text-amber-800 mt-0.5">
            {data.lagnamEn}
          </p>
          <span className="text-[11px] text-amber-700/80 mt-2">
            Sagittarius Ascendant
          </span>
        </div>
      </div>

      {/* Calendar Reminders Bar */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-100/80 via-amber-50 to-amber-100/80 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-semibold text-amber-950 text-sm">
            Save the Date in your Calendar
          </h4>
          <p className="text-xs text-amber-800 font-telugu">
            సుముహూర్తం తేదీని మీ మొబైల్ లేదా కంప్యూటర్ క్యాలెండర్‌లో జోడించండి.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={createGoogleCalendarUrl(data)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-800 text-white text-xs font-medium hover:bg-amber-900 transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Google Calendar</span>
          </a>

          <button
            onClick={() => downloadIcsFile(data)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 text-xs font-medium hover:bg-amber-50 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Apple / Outlook (.ics)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
