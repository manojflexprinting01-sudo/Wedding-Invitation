/**
 * Synthesized Auspicious Mangala Vadyam / Nadaswaram & Tanpura Ambiance
 * Uses Web Audio API without requiring external MP3 bandwidth or failing network requests.
 */

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private droneGains: GainNode[] = [];

  // Frequencies in Hz for traditional auspicious Raga Mohanam (Sa, Ri2, Ga3, Pa, Dha2, Sa')
  // Rooted in C#3 (approx 138.59 Hz) - deeply authentic for South Indian temple Nadaswaram
  private baseFreq = 138.59;
  private scaleRatios = [
    1,          // Sa
    9 / 8,      // Ri2
    5 / 4,      // Ga3
    3 / 2,      // Pa
    5 / 3,      // Dha2
    2,          // Sa'
    9 / 4,      // Ri'
    5 / 2,      // Ga'
    3,          // Pa'
  ];

  // Auspicious melody sequence (swara indices in scaleRatios)
  private melodyPhrase = [
    { note: 0, duration: 1.0 }, // Sa
    { note: 1, duration: 0.6 }, // Ri
    { note: 2, duration: 0.8 }, // Ga
    { note: 3, duration: 1.2 }, // Pa
    { note: 4, duration: 0.8 }, // Dha
    { note: 5, duration: 1.6 }, // Sa'
    { note: 4, duration: 0.6 }, // Dha
    { note: 3, duration: 0.8 }, // Pa
    { note: 2, duration: 1.0 }, // Ga
    { note: 1, duration: 0.8 }, // Ri
    { note: 0, duration: 1.8 }, // Sa
    { note: 3, duration: 1.0 }, // Pa
    { note: 2, duration: 0.8 }, // Ga
    { note: 1, duration: 0.8 }, // Ri
    { note: 2, duration: 1.2 }, // Ga
    { note: 0, duration: 2.2 }, // Sa
  ];

  private currentStep = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.initContext();
    if (!this.ctx) return;
    if (this.isPlaying) return;

    this.isPlaying = true;

    // Master gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.25, this.ctx.currentTime + 1.5);
    this.masterGain.connect(this.ctx.destination);

    // Start warm Tanpura drone
    this.startDrone();

    // Start Nadaswaram lead melody
    this.scheduleNextNote();
  }

  private startDrone() {
    if (!this.ctx || !this.masterGain) return;

    // Tanpura Sa and Pa harmonics with subtle vibrato
    const droneFreqs = [
      this.baseFreq,
      this.baseFreq * 1.5, // Pa
      this.baseFreq * 2,   // Upper Sa
    ];

    this.droneGains = [];

    droneFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Warm sound with triangle + soft sine
      osc.type = idx === 1 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Low pass filter for warm temple wooden resonance
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.05 / (idx + 1), this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.droneGains.push(gain);
    });
  }

  private scheduleNextNote() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const currentNoteInfo = this.melodyPhrase[this.currentStep];
    const freq = this.baseFreq * 2 * this.scaleRatios[currentNoteInfo.note];

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Nadaswaram / Shehnai characteristic: sawtooth with resonant bell filter
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle gamakam (grace note pitch bend)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.01, now + 0.1);
    osc.frequency.exponentialRampToValueAtTime(freq, now + 0.3);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.8, now);
    filter.Q.setValueAtTime(2.5, now);

    const dur = currentNoteInfo.duration;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + dur + 0.1);

    this.currentStep = (this.currentStep + 1) % this.melodyPhrase.length;

    this.timer = window.setTimeout(() => {
      this.scheduleNextNote();
    }, dur * 900);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        if (this.ctx && this.ctx.state !== 'closed') {
          this.ctx.suspend();
        }
      }, 900);
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioPlayer();
