import React from 'react';
import { WeddingData, LanguageMode } from '../types/wedding';
import { MapPin, Navigation, Phone, Utensils, Compass, ExternalLink } from 'lucide-react';

interface VenueSectionProps {
  data: WeddingData;
  lang: LanguageMode;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ data, lang }) => {
  return (
    <section id="venue" className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
          Wedding Destination
        </span>
        <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-amber-950 mt-1">
          {lang === 'te' ? 'కళ్యాణ వేదిక & విందు వివరాలు' : 'Venue & Wedding Feast'}
        </h2>
        <p className="text-xs sm:text-sm text-amber-800/80 max-w-lg mx-auto mt-1 font-telugu">
          {lang === 'te'
            ? 'వేములవాడ పుణ్యక్షేత్రం పరిధిలో హరిమల గార్డెన్స్ వద్ద వివాహ మహోత్సవం.'
            : 'Conveniently accessible location on Korutla Road, Vemulawada, Rajanna Sircilla.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Venue Details & Mandapam Visual Accent */}
        <div className="md:col-span-7 p-6 rounded-2xl bg-amber-50/90 border border-amber-300 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>{lang === 'te' ? 'కళ్యాణ మండపం' : 'Kalyana Mandapam'}</span>
            </div>

            <h3 className="font-playfair text-2xl font-bold text-amber-950">
              {data.venueNameEn}
            </h3>
            <p className="font-telugu text-lg font-bold text-amber-800 mt-0.5">
              {data.venueNameTe}
            </p>

            <div className="mt-4 space-y-2 text-xs sm:text-sm text-amber-900">
              <p className="flex items-start gap-2">
                <span className="font-medium text-amber-800">Address:</span>
                <span>{data.addressEn}, {data.cityEn}, {data.districtEn}</span>
              </p>
              <p className="flex items-start gap-2 font-telugu">
                <span className="font-medium text-amber-800">తెలుగు చిరునామా:</span>
                <span>{data.addressTe}, {data.cityTe}, {data.districtTe}</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-medium text-amber-800">Landmark:</span>
                <span>Korutla Highway, approx 3 km from Sri Raja Rajeshwara Swamy Temple</span>
              </p>
            </div>

            {/* Feast Box */}
            <div className="mt-6 p-4 rounded-xl bg-amber-100/70 border border-amber-300">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs mb-1">
                <Utensils className="w-4 h-4 text-amber-700" />
                <span>{lang === 'te' ? 'కల్యాణ భోజనం' : 'Auspicious Wedding Feast'}</span>
              </div>
              <p className="font-telugu text-sm font-bold text-amber-950">
                {data.lunchDetailsTe}
              </p>
              <p className="text-xs text-amber-800 mt-0.5">
                {data.lunchDetailsEn}
              </p>
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="mt-6 pt-4 border-t border-amber-200 flex flex-wrap items-center gap-3">
            <a
              href={data.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition-colors shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Google Maps Directions</span>
            </a>

            <a
              href={`tel:${data.contactPhones[0].replace(/\s+/g, '')}`}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-amber-300 text-amber-900 text-xs font-semibold hover:bg-amber-50 transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-amber-700" />
              <span>Call Host</span>
            </a>
          </div>
        </div>

        {/* Right Column: Traditional Mandapam Decorative Pillar & Deepam Art */}
        <div className="md:col-span-5 rounded-2xl overflow-hidden bg-[#faf2e3] border border-amber-300 p-4 flex flex-col items-center justify-between shadow-sm">
          <div className="w-full text-center pb-2 border-b border-amber-200 mb-2">
            <span className="text-xs font-bold text-amber-900 font-telugu">
              కల్యాణ తోరణం & దీపారాధన
            </span>
          </div>

          <div className="relative w-full flex-1 flex items-center justify-center p-2">
            <img
              src="/assets/aistudio/image_c85622ad.png"
              alt="Traditional Mandapam stone pillar with banana leaves, Samay brass lamp, and flower urlai"
              referrerPolicy="no-referrer"
              className="max-h-[320px] w-auto object-contain filter drop-shadow-md"
            />
          </div>

          <div className="text-center pt-2 border-t border-amber-200 w-full">
            <p className="text-xs font-bold text-amber-950 font-telugu">
              {data.hostsTe}
            </p>
            <p className="text-[11px] text-amber-700 font-medium">
              Vemulawada, Dist: Rajanna Sircilla
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
