import React, { useState } from 'react';
import { GuestBlessing, LanguageMode, WeddingData } from '../types/wedding';
import { Heart, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GuestbookRSVPProps {
  data: WeddingData;
  lang: LanguageMode;
}

const INITIAL_BLESSINGS: GuestBlessing[] = [
  {
    id: '1',
    name: 'Munnuru Kapu Welfare Association Leaders',
    relation: 'Community Elders',
    message: 'నూతన వధూవరులు తేజస్విని - శ్రీనివాస్ సదా సుఖశాంతులతో, ఆయురారోగ్యాలతో వర్ధిల్లాలని హృదయపూర్వక శుభాశీస్సులు.',
    attendance: 'attending',
    guestCount: 6,
    timestamp: 'Today',
  },
  {
    id: '2',
    name: 'Gummadi Lakshman & Family',
    relation: 'Grandparents / Elders',
    message: 'శ్రీ అంబికా దేవి మరియు శ్రీ వేంకటేశ్వర స్వామి దివ్య కటాక్షంతో దాంపత్యం కలకాలం విలసిల్లాలి. శుభం భూయాత్!',
    attendance: 'attending',
    guestCount: 4,
    timestamp: 'Yesterday',
  },
  {
    id: '3',
    name: 'Nithin, Swapna & Sathwika',
    relation: 'Cousins & Siblings',
    message: 'Welcome to the family Srinivas bava! Looking forward to unforgettable Saptapadi and Talambralu moments! ❤️',
    attendance: 'attending',
    guestCount: 3,
    timestamp: '2 days ago',
  },
];

export const GuestbookRSVP: React.FC<GuestbookRSVPProps> = ({ data, lang }) => {
  const [blessings, setBlessings] = useState<GuestBlessing[]>(INITIAL_BLESSINGS);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'regrets' | 'online'>('attending');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Trigger golden yellow akshintalu & rose confetti shower
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#eab308', '#f59e0b', '#dc2626', '#b91c1c', '#fbbf24'],
    });

    const newBlessing: GuestBlessing = {
      id: Date.now().toString(),
      name: name.trim(),
      relation: relation.trim() || 'Well-wisher',
      message: message.trim(),
      attendance,
      guestCount,
      timestamp: 'Just now',
    };

    setBlessings([newBlessing, ...blessings]);
    setName('');
    setRelation('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="guestbook" className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
          Blessings & RSVP
        </span>
        <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-amber-950 mt-1">
          {lang === 'te' ? 'శుభాశీస్సులు & హాజరు నమోదు (RSVP)' : 'Send Blessings & RSVP'}
        </h2>
        <p className="text-xs sm:text-sm text-amber-800/80 max-w-lg mx-auto mt-1 font-telugu">
          {lang === 'te'
            ? 'నవ వధూవరులకు మీ హృదయపూర్వక ఆశీస్సులు తెలిపి అక్షింతలు వేయండి.'
            : 'Convey your warm wishes, blessings, and let the Chettipally family know your attendance.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Form: Send Blessings */}
        <div className="md:col-span-6 p-6 rounded-2xl bg-amber-50/90 border border-amber-300 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h3 className="font-playfair text-lg font-bold text-amber-950">
              {lang === 'te' ? 'ఆశీర్వాదం తెలియజేయండి' : 'Bless the Couple'}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-amber-950 mb-1">
                Your Full Name (మీ పేరు) *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-950"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-amber-950 mb-1">
                  Relation / Family
                </label>
                <input
                  type="text"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder="e.g. Friend, Relative, Colleague"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-950"
                />
              </div>
              <div>
                <label className="block font-semibold text-amber-950 mb-1">
                  Number of Guests
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-950"
                >
                  <option value={1}>1 Person</option>
                  <option value={2}>2 Persons</option>
                  <option value={3}>3 Persons</option>
                  <option value={4}>4 Persons</option>
                  <option value={5}>5+ Family members</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-amber-950 mb-1">
                Will you be attending in Vemulawada?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'attending', label: 'Yes, Joyfully!' },
                  { id: 'online', label: 'Virtually' },
                  { id: 'regrets', label: 'Blessing from afar' },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setAttendance(opt.id as any)}
                    className={`p-2 rounded-lg text-center transition-all ${
                      attendance === opt.id
                        ? 'bg-amber-800 text-white font-semibold shadow-xs'
                        : 'bg-white text-amber-900 border border-amber-300 hover:bg-amber-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-amber-950 mb-1">
                Your Blessing Message (మీ శుభాశీస్సులు) *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your loving blessings for Tejaswini & Srinivas..."
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-950"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors text-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Shower Akshintalu & Send Blessing</span>
            </button>

            {submitted && (
              <div className="p-2.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Thank you! Your blessings have been received by the family.</span>
              </div>
            )}
          </form>
        </div>

        {/* Right Column: Feed of Wishes / Guestbook */}
        <div className="md:col-span-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-amber-300/60">
            <h3 className="font-playfair text-lg font-bold text-amber-950">
              {lang === 'te' ? 'ఆత్మీయుల శుభాశీస్సులు' : 'Blessings from Near & Dear'}
            </h3>
            <span className="text-xs text-amber-700 font-medium">
              {blessings.length} Wishes
            </span>
          </div>

          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {blessings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-xl bg-white/80 border border-amber-200/90 shadow-xs space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-amber-950 text-xs">
                      {b.name}
                    </h4>
                    <span className="text-[11px] text-amber-700">
                      {b.relation}
                    </span>
                  </div>
                  <span className="text-[10px] text-amber-600">
                    {b.timestamp}
                  </span>
                </div>

                <p className="text-xs text-amber-900/90 leading-relaxed font-telugu">
                  {b.message}
                </p>

                <div className="pt-1 flex items-center gap-2 text-[10px] text-amber-700">
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 font-medium">
                    {b.attendance === 'attending'
                      ? `Attending (${b.guestCount} guests)`
                      : b.attendance === 'online'
                      ? 'Virtually Blessing'
                      : 'Blessing from afar'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
