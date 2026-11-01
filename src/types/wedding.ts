export interface WeddingData {
  invitationTitle: string;
  invitationTitleTe: string;
  subTitleEn: string;
  subTitleTe: string;
  slokaTe: string;
  slokaMeaningEn: string;

  // Bride details
  brideTitleEn: string;
  brideTitleTe: string;
  brideName: string;
  brideNameTe: string;
  brideParentsEn: string;
  brideParentsTe: string;
  brideFamilyOriginEn: string;
  brideFamilyOriginTe: string;

  // Groom details
  groomTitleEn: string;
  groomTitleTe: string;
  groomName: string;
  groomNameTe: string;
  groomParentsEn: string;
  groomParentsTe: string;
  groomFamilyOriginEn: string;
  groomFamilyOriginTe: string;

  // Muhurtham
  weddingDate: string; // "2026-11-05"
  dayEn: string;
  dayTe: string;
  timeEn: string;
  timeTe: string;
  nakshatramEn: string;
  nakshatramTe: string;
  lagnamEn: string;
  lagnamTe: string;
  samvatsaramTe: string;
  tithiTe: string;

  // Venue & Feast
  venueNameEn: string;
  venueNameTe: string;
  addressEn: string;
  addressTe: string;
  cityEn: string;
  cityTe: string;
  districtEn: string;
  districtTe: string;
  googleMapsUrl: string;
  lunchDetailsEn: string;
  lunchDetailsTe: string;

  // Hosts & Greetings
  hostsEn: string;
  hostsTe: string;
  divineBlessingsTe: string;
  complimentsEn: string;
  complimentsTe: string;
  childrenWelcomeLineTe: string;
  childrenWelcomeLineEn: string;
  communityBlessingsTe: string;
  contactPhones: string[];
}

export type LanguageMode = 'te' | 'en' | 'bilingual';

export type TemplateId = 'ts-monogram' | 'divine-hands' | 'radha-krishna' | 'sita-rama' | 'sacred-mettelu' | 'mandapam-pillar';

export interface CardTemplate {
  id: TemplateId;
  nameEn: string;
  nameTe: string;
  image: string;
  tagline: string;
  textColorTheme: 'classic' | 'dark' | 'crimson';
}

export interface RitualItem {
  id: string;
  nameTe: string;
  nameEn: string;
  timeEstimate: string;
  significanceEn: string;
  significanceTe: string;
  badge: string;
}

export interface GuestBlessing {
  id: string;
  name: string;
  relation: string;
  message: string;
  attendance: 'attending' | 'regrets' | 'online';
  guestCount: number;
  timestamp: string;
}
