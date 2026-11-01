import React, { useState } from 'react';
import { WeddingData } from '../types/wedding';
import { INITIAL_WEDDING_DATA } from '../data/defaultWeddingData';
import { X, RotateCcw, Check, Sparkles, BookOpen, User, Clock, MapPin, HeartHandshake } from 'lucide-react';

interface InvitationEditorProps {
  data: WeddingData;
  onChange: (newData: WeddingData) => void;
  onClose: () => void;
}

export const InvitationEditor: React.FC<InvitationEditorProps> = ({
  data,
  onChange,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'basics' | 'couple' | 'muhurtham' | 'venue' | 'hosts'>('basics');
  const [saveToast, setSaveToast] = useState(false);

  const updateField = (key: keyof WeddingData, value: any) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const handleReset = () => {
    if (confirm('Revert all invitation details back to the Chettipally family defaults?')) {
      onChange(INITIAL_WEDDING_DATA);
    }
  };

  const handleSave = () => {
    localStorage.setItem('chettipally_wedding_data', JSON.stringify(data));
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-[#faf6ee] shadow-2xl border-l border-amber-300 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="p-4 bg-amber-900 text-amber-50 flex items-center justify-between border-b border-amber-800">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <h3 className="font-cinzel text-base font-bold tracking-tight">
              Invitation Editor (వివరాల సవరణ)
            </h3>
          </div>
          <p className="text-xs text-amber-200/80 font-telugu mt-0.5">
            శుభలేఖలోని ప్రతి వివరమును ఇక్కడ ప్రత్యక్షంగా మార్చుకోవచ్చు.
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-amber-200 hover:text-white hover:bg-amber-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Editor Tabs */}
      <div className="flex items-center gap-1 p-2 bg-amber-100/70 border-b border-amber-200 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('basics')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'basics'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'text-amber-900 hover:bg-amber-200/60'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Title & Sloka</span>
        </button>

        <button
          onClick={() => setActiveTab('couple')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'couple'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'text-amber-900 hover:bg-amber-200/60'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Bride & Groom</span>
        </button>

        <button
          onClick={() => setActiveTab('muhurtham')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'muhurtham'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'text-amber-900 hover:bg-amber-200/60'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Sumuhurtham</span>
        </button>

        <button
          onClick={() => setActiveTab('venue')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'venue'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'text-amber-900 hover:bg-amber-200/60'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Venue & Lunch</span>
        </button>

        <button
          onClick={() => setActiveTab('hosts')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'hosts'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'text-amber-900 hover:bg-amber-200/60'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Hosts & Family</span>
        </button>
      </div>

      {/* Editor Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
        {/* Tab 1: Basics & Sloka */}
        {activeTab === 'basics' && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-amber-950 mb-1">
                Invitation Title (English)
              </label>
              <input
                type="text"
                value={data.invitationTitle}
                onChange={(e) => updateField('invitationTitle', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-950"
              />
            </div>

            <div>
              <label className="block font-semibold text-amber-950 mb-1 font-telugu">
                శుభలేఖ శీర్షిక (Telugu Title)
              </label>
              <input
                type="text"
                value={data.invitationTitleTe}
                onChange={(e) => updateField('invitationTitleTe', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-950 font-telugu"
              />
            </div>

            <div>
              <label className="block font-semibold text-amber-950 mb-1 font-telugu">
                మంగళ శ్లోకం (Sacred Sloka)
              </label>
              <input
                type="text"
                value={data.slokaTe}
                onChange={(e) => updateField('slokaTe', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-950 font-telugu"
              />
            </div>

            <div>
              <label className="block font-semibold text-amber-950 mb-1 font-telugu">
                దివ్య ఆశీస్సుల వాక్యం (Divine Blessings)
              </label>
              <input
                type="text"
                value={data.divineBlessingsTe}
                onChange={(e) => updateField('divineBlessingsTe', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-950 font-telugu"
              />
            </div>

            <div>
              <label className="block font-semibold text-amber-950 mb-1 font-telugu">
                ఆహ్వాన వచనం (Telugu Welcoming Message)
              </label>
              <textarea
                rows={3}
                value={data.subTitleTe}
                onChange={(e) => updateField('subTitleTe', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-950 font-telugu"
              />
            </div>

            <div>
              <label className="block font-semibold text-amber-950 mb-1">
                Welcoming Message (English)
              </label>
              <textarea
                rows={3}
                value={data.subTitleEn}
                onChange={(e) => updateField('subTitleEn', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-950"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Bride & Groom */}
        {activeTab === 'couple' && (
          <div className="space-y-5">
            {/* Bride Box */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 space-y-3">
              <h4 className="font-bold text-amber-900 uppercase tracking-wider text-[11px]">
                Bride Details (వధువు వివరాలు)
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-amber-900 mb-0.5">Title (English / Telugu)</label>
                  <input
                    type="text"
                    value={data.brideTitleEn}
                    onChange={(e) => updateField('brideTitleEn', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-950"
                  />
                </div>
                <div>
                  <label className="block text-amber-900 mb-0.5">Telugu Title (చి॥ల॥సౌ॥)</label>
                  <input
                    type="text"
                    value={data.brideTitleTe}
                    onChange={(e) => updateField('brideTitleTe', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-950 font-telugu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-amber-900 mb-0.5">Bride Name (English)</label>
                  <input
                    type="text"
                    value={data.brideName}
                    onChange={(e) => updateField('brideName', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-950 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-amber-900 mb-0.5 font-telugu">వధువు పేరు (Telugu)</label>
                  <input
                    type="text"
                    value={data.brideNameTe}
                    onChange={(e) => updateField('brideNameTe', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-950 font-telugu font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-900 mb-0.5 font-telugu">తల్లిదండ్రుల వివరాలు (Parents)</label>
                <input
                  type="text"
                  value={data.brideParentsTe}
                  onChange={(e) => updateField('brideParentsTe', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-950 font-telugu"
                />
              </div>
            </div>

            {/* Groom Box */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 space-y-3">
              <h4 className="font-bold text-amber-900 uppercase tracking-wider text-[11px]">
                Groom Details (వరుని వివరాలు)
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-amber-900 mb-0.5">Title (Chi.)</label>
                  <input
                    type="text"
                    value={data.groomTitleEn}
                    onChange={(e) => updateField('groomTitleEn', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-950"
                  />
                </div>
                <div>
                  <label className="block text-amber-900 mb-0.5 font-telugu">బిరుదు (చి॥)</label>
                  <input
                    type="text"
                    value={data.groomTitleTe}
                    onChange={(e) => updateField('groomTitleTe', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-950 font-telugu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-amber-900 mb-0.5">Groom Name (English)</label>
                  <input
                    type="text"
                    value={data.groomName}
                    onChange={(e) => updateField('groomName', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-950 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-amber-900 mb-0.5 font-telugu">వరుని పేరు (Telugu)</label>
                  <input
                    type="text"
                    value={data.groomNameTe}
                    onChange={(e) => updateField('groomNameTe', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-950 font-telugu font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-900 mb-0.5 font-telugu">వరుని తల్లిదండ్రులు & స్వస్థలం</label>
                <input
                  type="text"
                  value={data.groomParentsTe}
                  onChange={(e) => updateField('groomParentsTe', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-950 font-telugu"
                />
              </div>

              <div>
                <label className="block text-amber-900 mb-0.5">Village / Origin (కోనాయిపల్లి / Konaipalli)</label>
                <input
                  type="text"
                  value={data.groomFamilyOriginEn}
                  onChange={(e) => updateField('groomFamilyOriginEn', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-950"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Muhurtham */}
        {activeTab === 'muhurtham' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-amber-950 mb-1">
                  Wedding Date (YYYY-MM-DD)
                </label>
                <input
                  type="text"
                  value={data.weddingDate}
                  onChange={(e) => updateField('weddingDate', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950 font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-amber-950 mb-1">
                  Day (Thursday / గురువారం)
                </label>
                <input
                  type="text"
                  value={data.dayEn}
                  onChange={(e) => updateField('dayEn', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-amber-950 mb-1">
                  Sumuhurtham Time (10:45 AM)
                </label>
                <input
                  type="text"
                  value={data.timeEn}
                  onChange={(e) => updateField('timeEn', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950"
                />
              </div>
              <div>
                <label className="block font-semibold text-amber-950 mb-1 font-telugu">
                  సమయం (ఉదయం 10-45 ని॥)
                </label>
                <input
                  type="text"
                  value={data.timeTe}
                  onChange={(e) => updateField('timeTe', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950 font-telugu"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-amber-950 mb-1">
                  Nakshatram (Uttara Nakshatram)
                </label>
                <input
                  type="text"
                  value={data.nakshatramEn}
                  onChange={(e) => updateField('nakshatramEn', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950"
                />
              </div>
              <div>
                <label className="block font-semibold text-amber-950 mb-1 font-telugu">
                  లగ్నం (Dhanur Lagnam)
                </label>
                <input
                  type="text"
                  value={data.lagnamEn}
                  onChange={(e) => updateField('lagnamEn', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-amber-950 mb-1 font-telugu">
                తెలుగు సంవత్సరం & తిథి (Panchangam)
              </label>
              <input
                type="text"
                value={`${data.samvatsaramTe} ${data.tithiTe}`}
                onChange={(e) => {
                  updateField('samvatsaramTe', e.target.value);
                }}
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950 font-telugu"
              />
            </div>
          </div>
        )}

        {/* Tab 4: Venue & Lunch */}
        {activeTab === 'venue' && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-amber-950 mb-1">
                Venue Name (Harimala Gardens)
              </label>
              <input
                type="text"
                value={data.venueNameEn}
                onChange={(e) => updateField('venueNameEn', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950 font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-amber-950 mb-1 font-telugu">
                కళ్యాణవేదిక పేరు (హరిమల గార్డెన్స్)
              </label>
              <input
                type="text"
                value={data.venueNameTe}
                onChange={(e) => updateField('venueNameTe', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950 font-telugu font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-amber-950 mb-1">
                Address / Street
              </label>
              <input
                type="text"
                value={data.addressEn}
                onChange={(e) => updateField('addressEn', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-amber-950 mb-1">City / Town</label>
                <input
                  type="text"
                  value={data.cityEn}
                  onChange={(e) => updateField('cityEn', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950"
                />
              </div>
              <div>
                <label className="block font-semibold text-amber-950 mb-1">District</label>
                <input
                  type="text"
                  value={data.districtEn}
                  onChange={(e) => updateField('districtEn', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-amber-950 mb-1 font-telugu">
                వివాహ విందు (Lunch / Reception Feast)
              </label>
              <input
                type="text"
                value={data.lunchDetailsTe}
                onChange={(e) => updateField('lunchDetailsTe', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950 font-telugu"
              />
            </div>
          </div>
        )}

        {/* Tab 5: Hosts & Family */}
        {activeTab === 'hosts' && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-amber-950 mb-1 font-telugu">
                ఆహ్వానించువారు (Hosts - Telugu)
              </label>
              <input
                type="text"
                value={data.hostsTe}
                onChange={(e) => updateField('hostsTe', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950 font-telugu font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-amber-950 mb-1">
                Hosts (English)
              </label>
              <input
                type="text"
                value={data.hostsEn}
                onChange={(e) => updateField('hostsEn', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950 font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-amber-950 mb-1 font-telugu">
                బంధు-మిత్రులు & సంఘం ఆశీస్సులు
              </label>
              <textarea
                rows={2}
                value={data.communityBlessingsTe}
                onChange={(e) => updateField('communityBlessingsTe', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950 font-telugu"
              />
            </div>

            <div>
              <label className="block font-semibold text-amber-950 mb-1 font-telugu">
                పిల్లల ఆహ్వానం (Children's Welcome Line)
              </label>
              <input
                type="text"
                value={data.childrenWelcomeLineTe}
                onChange={(e) => updateField('childrenWelcomeLineTe', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-amber-950 font-telugu"
              />
            </div>
          </div>
        )}
      </div>

      {/* Editor Footer */}
      <div className="p-4 bg-amber-100/80 border-t border-amber-200 flex items-center justify-between gap-3">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-amber-300 bg-white text-xs font-medium text-amber-900 hover:bg-amber-50 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Defaults</span>
        </button>

        <div className="flex items-center gap-2">
          {saveToast && (
            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1 animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>Saved!</span>
            </span>
          )}

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
