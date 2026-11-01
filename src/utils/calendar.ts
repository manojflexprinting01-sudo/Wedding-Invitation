import { WeddingData } from '../types/wedding';

export function createGoogleCalendarUrl(data: WeddingData): string {
  // Start: 2026-11-05 10:45 AM IST (UTC: 2026-11-05 05:15:00Z)
  const startTime = '20261105T051500Z';
  const endTime = '20261105T103000Z'; // ~4 hours later
  
  const title = encodeURIComponent(`${data.brideName} & ${data.groomName} Wedding (సుముహూర్తం)`);
  const details = encodeURIComponent(
    `Auspicious Wedding of ${data.brideTitleEn} ${data.brideName} and ${data.groomTitleEn} ${data.groomName}.\n\n` +
    `Sumuhurtham: ${data.dayEn}, ${data.weddingDate} at ${data.timeEn}\n` +
    `Nakshatram: ${data.nakshatramEn} | Lagnam: ${data.lagnamEn}\n` +
    `Venue: ${data.venueNameEn}, ${data.addressEn}, ${data.cityEn}, ${data.districtEn}\n\n` +
    `Hosts: ${data.hostsEn}\n` +
    `Lunch Follows.`
  );
  const location = encodeURIComponent(`${data.venueNameEn}, ${data.addressEn}, ${data.cityEn}, ${data.districtEn}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
}

export function downloadIcsFile(data: WeddingData) {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Chettipally Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:chettipally-wedding-20261105@vemulawada',
    'DTSTAMP:20261031T120000Z',
    'DTSTART:20261105T051500Z',
    'DTEND:20261105T103000Z',
    `SUMMARY:${data.brideName} & ${data.groomName} Wedding (శుభ ముహూర్తం)`,
    `DESCRIPTION:${data.brideTitleEn} ${data.brideName} & ${data.groomTitleEn} ${data.groomName} Kalyana Mahotsavam. Sumuhurtham: ${data.timeEn}, ${data.nakshatramEn}, ${data.lagnamEn}. Venue: ${data.venueNameEn}.`,
    `LOCATION:${data.venueNameEn}, ${data.addressEn}, ${data.cityEn}, ${data.districtEn}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${data.brideName}_${data.groomName}_Wedding_2026.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getWhatsAppShareText(data: WeddingData, language: 'en' | 'te'): string {
  if (language === 'te') {
    return encodeURIComponent(
      `🙏 *శ్రీరస్తు! శుభమస్తు! అవిఘ్నమస్తు!* 🙏\n\n` +
      `*చెట్టిపల్లి వారి ఆప్యాయ శుభలేఖ*\n\n` +
      `మా ఇంటి పుత్రిక *${data.brideTitleTe} ${data.brideNameTe}* వివాహము *${data.groomTitleTe} ${data.groomNameTe}* తో నిశ్చయింపబడినది.\n\n` +
      `📅 *తేది:* ${data.weddingDate} (${data.dayTe})\n` +
      `⏰ *సుముహూర్తం:* ${data.timeTe}\n` +
      `✨ *నక్షత్రం:* ${data.nakshatramTe} | *లగ్నం:* ${data.lagnamTe}\n` +
      `📍 *కళ్యాణవేదిక:* ${data.venueNameTe}, ${data.addressTe}, ${data.cityTe}\n` +
      `🍛 *విందు:* ${data.lunchDetailsTe}\n\n` +
      `ఈ మంగళకరమైన వివాహ మహోత్సవానికి మీ కుటుంబ సమేతంగా విచ్చేసి నూతన వధూవరులను ఆశీర్వదించవలసిందిగా కోరుచున్నాము.\n\n` +
      `*ఆహ్వానించువారు:* ${data.hostsTe}\n` +
      `డిజిటల్ శుభలేఖను చూడటానికి: ${window.location.href}`
    );
  }

  return encodeURIComponent(
    `✨ *Chettipally's Wedding Invitation* ✨\n\n` +
    `We cordially invite your gracious presence with family on the auspicious occasion of the marriage of our only daughter:\n\n` +
    `👰 *${data.brideTitleEn} ${data.brideName}*\n` +
    `With\n` +
    `🤵 *${data.groomTitleEn} ${data.groomName}*\n` +
    `(${data.groomParentsEn}, ${data.groomFamilyOriginEn})\n\n` +
    `📅 *Date:* Thursday, 05th November 2026\n` +
    `⏰ *Sumuhurtham:* ${data.timeEn} (${data.nakshatramEn}, ${data.lagnamEn})\n` +
    `📍 *Venue:* ${data.venueNameEn}, ${data.addressEn}, ${data.cityEn}, ${data.districtEn}\n` +
    `🍽️ *Lunch:* Follows\n\n` +
    `*Invited by:* ${data.hostsEn}\n` +
    `*With best compliments from:* Near and Dear.\n\n` +
    `View online invitation: ${window.location.href}`
  );
}
