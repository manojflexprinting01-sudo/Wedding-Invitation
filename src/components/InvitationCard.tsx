import React, { useRef, useState } from 'react';
import { WeddingData, LanguageMode, CardTemplate } from '../types/wedding';
import { CARD_TEMPLATES } from '../data/defaultWeddingData';
import { Download, Printer, Copy, Check, Layers } from 'lucide-react';
import html2canvas from 'html2canvas';
import { Thoranam } from './Thoranam';

interface InvitationCardProps {
  data: WeddingData;
  lang: LanguageMode;
  selectedTemplate: CardTemplate;
  onSelectTemplate: (template: CardTemplate) => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  data,
  lang,
  selectedTemplate,
  onSelectTemplate,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cardTheme, setCardTheme] = useState<'sandalwood' | 'ivory' | 'kumkum'>('sandalwood');

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloading(true);
      const canvas = await html2canvas(cardRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#faf6ee',
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Chettipally_Wedding_Card_${data.brideName}_${data.groomName}.png`;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text =
      lang === 'te'
        ? `${data.slokaTe}\n\n${data.invitationTitleTe}\n\nకన్యాదానం మంగళం లావణ్య యోగ్యదాంపత్య కల్యాణం.\n\nవధూవరులు:\nచి॥ ల॥ సౌ॥ ${data.brideNameTe} (సుపుత్రిక: ${data.hostsTe})\nసహస్రాక్షిక బంధంతో\nచి॥ ${data.groomNameTe} (${data.groomParentsTe}, ${data.groomFamilyOriginTe})\n\nసుముహూర్తం: ${data.samvatsaramTe} ${data.tithiTe}, తేది: ${data.weddingDate} (${data.dayTe}) ఉదయం ${data.timeTe}.\nనక్షత్రం: ${data.nakshatramTe} | లగ్నం: ${data.lagnamTe}\n\nకళ్యాణవేదిక: ${data.venueNameTe}, ${data.addressTe}, ${data.cityTe}, ${data.districtTe}\nవిందు: ${data.lunchDetailsTe}\n\nఆహ్వానించువారు: ${data.hostsTe}\n${data.communityBlessingsTe}\n${data.childrenWelcomeLineTe}`
        : `${data.invitationTitle}\n\n${data.subTitleEn}\n\nBride: ${data.brideTitleEn} ${data.brideName}\nWith\nGroom: ${data.groomTitleEn} ${data.groomName}\n(${data.groomParentsEn}, ${data.groomFamilyOriginEn})\n\nSUMUHURTHAM:\nDay: ${data.dayEn}\nDate: ${data.weddingDate}\nTime: ${data.timeEn}\nNakshatram: ${data.nakshatramEn}\nLagnam: ${data.lagnamEn}\n\nVENUE:\n${data.venueNameEn}, ${data.addressEn}, ${data.cityEn}, ${data.districtEn}\nLunch: ${data.lunchDetailsEn}\n\nInvited by: ${data.hostsEn}\n${data.complimentsEn}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const themeClasses = {
    ivory: 'bg-[#faf8f2] text-amber-950 border-amber-300',
    sandalwood: 'bg-[#fcf7ec] text-amber-950 border-amber-400',
    kumkum: 'bg-[#fcf3ef] text-amber-950 border-rose-300',
  }[cardTheme];

  return (
    <section id="invitation-card" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
          Auspicious Digital Card
        </span>
        <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-amber-950 mt-1">
          {lang === 'te' ? 'సాంప్రదాయ శుభలేఖ పత్రిక' : 'Wedding Invitation Card'}
        </h2>
        <p className="text-xs sm:text-sm text-amber-900 font-medium max-w-xl mx-auto mt-1 font-telugu">
          {lang === 'te'
            ? 'సహజమైన అందమైన ఫాంట్లతో సాంప్రదాయ శుభలేఖ కార్డు.'
            : 'Traditional South Indian wedding card with refined typography and delicate floral thoranam.'}
        </p>
      </div>

      {/* Template & Styling Control Bar */}
      <div className="mb-6 p-3 rounded-xl bg-amber-100/80 border border-amber-300 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
            <Layers className="w-4 h-4 text-amber-700" />
            <span>Select Artwork Template:</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 bg-white/90 px-3 py-1 rounded-lg border border-amber-300">
              <span className="text-amber-900 font-semibold">Card Theme:</span>
              {(['sandalwood', 'ivory', 'kumkum'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setCardTheme(t)}
                  className={`px-2 py-0.5 rounded text-xs capitalize font-medium transition-all ${
                    cardTheme === t
                      ? 'bg-amber-800 text-white shadow-xs font-semibold'
                      : 'text-amber-900 hover:bg-amber-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Template Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {CARD_TEMPLATES.map((tmpl) => {
            const isSelected = selectedTemplate.id === tmpl.id;
            return (
              <button
                key={tmpl.id}
                onClick={() => onSelectTemplate(tmpl)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all shrink-0 ${
                  isSelected
                    ? 'bg-amber-800 text-white shadow-sm ring-2 ring-amber-600'
                    : 'bg-white/90 hover:bg-white text-amber-950 border border-amber-300'
                }`}
              >
                <img
                  src={tmpl.image}
                  alt={tmpl.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded object-cover shadow-xs"
                />
                <div className="whitespace-nowrap">
                  <p className="text-xs font-bold leading-tight">{tmpl.nameEn}</p>
                  <p
                    className={`text-[10px] leading-tight font-telugu ${
                      isSelected ? 'text-amber-200' : 'text-amber-700'
                    }`}
                  >
                    {tmpl.nameTe}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-xs text-amber-900 font-semibold">
          <span>Active Template:</span>
          <span className="font-bold text-amber-950 underline decoration-amber-500">
            {selectedTemplate.nameEn}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-amber-300 text-xs font-semibold text-amber-900 hover:bg-amber-50 shadow-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-amber-300 text-xs font-semibold text-amber-900 hover:bg-amber-50 shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloading ? 'Preparing Card...' : 'Download Card (PNG)'}</span>
          </button>
        </div>
      </div>

      {/* The Printable / Exportable Wedding Card Canvas */}
      <div className="flex justify-center">
        <div
          ref={cardRef}
          className={`relative w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden border-2 p-6 sm:p-9 pt-14 sm:pt-16 ${themeClasses}`}
          style={{
            backgroundImage: `url('${selectedTemplate.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Top Marigold & Mango Leaves Flower Thoranam on Card Canvas (Selector 5) */}
          <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
            <Thoranam variant="card" />
          </div>

          {/* Translucent Parchment Scrim to guarantee pristine readability */}
          <div className="absolute inset-0 bg-[#faf6eee8] backdrop-blur-[1.5px]" />

          {/* Traditional Ornate Border Frame Overlay */}
          <div className="absolute inset-3 rounded-xl border border-amber-600/35 pointer-events-none" />
          <div className="absolute inset-4 rounded-lg border border-amber-600/20 pointer-events-none" />

          {/* Kolam / Muggu Corner Accents */}
          <div className="absolute top-10 left-4 w-10 h-10 opacity-35 pointer-events-none overflow-hidden">
            <img src="/assets/aistudio/image_65b87b21.png" alt="kolam corner" className="w-20 h-20 -mt-2 -ml-2 object-cover" />
          </div>
          <div className="absolute top-10 right-4 w-10 h-10 opacity-35 pointer-events-none overflow-hidden">
            <img src="/assets/aistudio/image_65b87b21.png" alt="kolam corner" className="w-20 h-20 -mt-2 -ml-8 object-cover" />
          </div>
          <div className="absolute bottom-4 left-4 w-10 h-10 opacity-35 pointer-events-none overflow-hidden">
            <img src="/assets/aistudio/image_65b87b21.png" alt="kolam corner" className="w-20 h-20 -mt-8 -ml-2 object-cover" />
          </div>
          <div className="absolute bottom-4 right-4 w-10 h-10 opacity-35 pointer-events-none overflow-hidden">
            <img src="/assets/aistudio/image_65b87b21.png" alt="kolam corner" className="w-20 h-20 -mt-8 -ml-8 object-cover" />
          </div>

          {/* Card Content Layout: Pure Elegant Traditional Typography without Harsh Outerglow */}
          <div className="relative z-10 text-center flex flex-col items-center">
            {/* Top Sloka Header */}
            <div className="mb-3">
              <p className="font-telugu text-base sm:text-lg font-bold text-amber-950 tracking-wide">
                {data.slokaTe}
              </p>
              <p className="text-xs text-amber-800 font-telugu mt-0.5">
                {data.divineBlessingsTe}
              </p>
            </div>

            {/* Shubhalekha Title */}
            <div className="mb-4">
              <h3 className="font-telugu text-2xl sm:text-3xl font-bold text-amber-950">
                {data.invitationTitleTe}
              </h3>
              <p className="font-cinzel text-xs uppercase tracking-widest text-amber-800 font-bold mt-0.5">
                {data.invitationTitle}
              </p>
            </div>

            {/* Welcoming Text */}
            <p className="font-telugu text-xs sm:text-sm text-amber-900 max-w-lg mb-5 leading-relaxed font-medium">
              {lang === 'te' || lang === 'bilingual' ? data.subTitleTe : data.subTitleEn}
            </p>

            {/* Couple Announcement Box: Clean, Royal, High-Legibility Typography */}
            <div className="w-full my-2 py-5 px-4 rounded-xl bg-amber-50/90 border border-amber-300 shadow-xs">
              {/* Bride Details (Selector 1) */}
              <div className="mb-2">
                <span className="text-xs text-amber-800 block font-telugu font-semibold">
                  {lang === 'en' ? data.brideTitleEn : `${data.brideTitleTe} (${data.brideTitleEn})`}
                </span>
                <h4 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4a1508] tracking-tight">
                  {data.brideName} ({data.brideNameTe})
                </h4>
                <p className="text-xs text-amber-900 font-telugu mt-0.5 font-medium">
                  {data.brideParentsTe}
                </p>
              </div>

              {/* Knot / With */}
              <div className="my-2 flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-amber-300" />
                <span className="text-xs uppercase tracking-widest text-amber-800 font-bold px-3 py-0.5 rounded-full bg-white border border-amber-200">
                  {lang === 'te' ? 'కల్యాణం' : 'With'}
                </span>
                <div className="h-px w-16 bg-amber-300" />
              </div>

              {/* Groom Details (Selector 2) */}
              <div className="mt-2">
                <span className="text-xs text-amber-800 block font-telugu font-semibold">
                  {lang === 'en' ? data.groomTitleEn : `${data.groomTitleTe} (${data.groomTitleEn})`}
                </span>
                <h4 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4a1508] tracking-tight">
                  {data.groomName} ({data.groomNameTe})
                </h4>
                <p className="text-xs text-amber-900 font-telugu mt-0.5 font-medium">
                  {data.groomParentsTe} ({data.groomFamilyOriginTe})
                </p>
              </div>
            </div>

            {/* Panchangam & Sumuhurtham Details */}
            <div className="my-3 py-3 px-4 w-full rounded-lg bg-amber-100/60 border border-amber-200 text-center">
              <p className="text-xs uppercase tracking-wider font-bold text-amber-900 mb-0.5">
                {lang === 'te' ? 'శుభ ముహూర్తం' : 'SUMUHURTHAM'}
              </p>
              <p className="font-telugu text-xs sm:text-sm text-amber-950 font-semibold">
                {data.samvatsaramTe} {data.tithiTe}
              </p>
              <p className="font-serif text-sm sm:text-base font-bold text-amber-950 mt-0.5">
                {data.dayEn} ({data.dayTe}), {data.weddingDate}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-1 text-xs text-amber-900 font-semibold">
                <span>సమయం: {data.timeTe} ({data.timeEn})</span>
                <span aria-hidden="true">·</span>
                <span>{data.nakshatramTe} ({data.nakshatramEn})</span>
                <span aria-hidden="true">·</span>
                <span>{data.lagnamTe} ({data.lagnamEn})</span>
              </div>
            </div>

            {/* Venue & Lunch */}
            <div className="my-3 text-center">
              <p className="text-xs uppercase tracking-wider font-bold text-amber-800">
                {lang === 'te' ? 'కళ్యాణవేదిక' : 'VENUE'}
              </p>
              <p className="text-lg sm:text-xl font-bold text-amber-950 font-serif">
                {data.venueNameEn} ({data.venueNameTe})
              </p>
              <p className="text-xs text-amber-900 mt-0.5">
                {data.addressEn}, {data.cityEn}, {data.districtEn}
              </p>
              <p className="text-xs text-amber-800 font-semibold mt-1">
                🍛 {data.lunchDetailsTe}
              </p>
            </div>

            {/* Hosts & Compliments */}
            <div className="mt-3 pt-3 border-t border-amber-300/80 w-full text-center">
              <p className="text-xs text-amber-700 uppercase tracking-wider font-semibold">
                {lang === 'te' ? 'ఆహ్వానించువారు' : 'Invited by'}
              </p>
              <p className="font-telugu text-sm font-bold text-amber-950 mt-0.5">
                {data.hostsTe}
              </p>
              <p className="text-xs text-amber-800 mt-1 font-telugu">
                {data.communityBlessingsTe}
              </p>
              <p className="text-xs text-amber-900 font-medium italic mt-1 font-telugu">
                {data.childrenWelcomeLineTe}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
