/**
 * AMBIENT SOUNDSCAPE GENERATOR
 * Generates an ethereal, authentic Indian palace tanpura & sitar harmonic drone
 * using the Web Audio API, completely offline and CORS-free.
 * Also supports playing an optional audio file if provided.
 */

class AmbientSoundscape {
  constructor() {
    this.audioCtx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.nodes = [];
    this.externalAudio = null;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);
        this.masterGain.connect(this.audioCtx.destination);
      }
    }
  }

  start(audioSrc = null) {
    if (this.isPlaying) return;

    // If external audio source is provided, use standard audio element
    if (audioSrc) {
      try {
        if (!this.externalAudio) {
          this.externalAudio = new Audio(audioSrc);
          this.externalAudio.loop = true;
          this.externalAudio.volume = 0.4;
        }
        this.externalAudio.play().then(() => {
          this.isPlaying = true;
        }).catch(() => {
          // Fall back to synth if external audio is blocked
          this.startSynth();
        });
        return;
      } catch {
        this.startSynth();
        return;
      }
    }

    this.startSynth();
  }

  startSynth() {
    try {
      this.initContext();
      if (!this.audioCtx) return;

      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      // Traditional Indian Classical Drone tuning (Key of C# / Pancham-Shadaj: G#3 & C#3)
      // Base frequencies in Hz:
      // Pa (G#3) = 207.65 Hz
      // Sa (C#3) = 138.59 Hz
      // Sa octave (C#4) = 277.18 Hz
      const droneNotes = [
        { freq: 138.59, type: "sine", gain: 0.18, pan: -0.2 },
        { freq: 207.65, type: "triangle", gain: 0.12, pan: 0.3 },
        { freq: 277.18, type: "sine", gain: 0.1, pan: -0.1 },
        { freq: 415.30, type: "sine", gain: 0.04, pan: 0.2 }, // Subtle overtone
        { freq: 69.30, type: "sine", gain: 0.2, pan: 0 },    // Deep sub-bass resonance
      ];

      this.nodes = [];

      droneNotes.forEach(({ freq, type, gain }) => {
        const osc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        // Lowpass warm filter mimicking resonant wooden gourd
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(650, this.audioCtx.currentTime);

        noteGain.gain.setValueAtTime(gain, this.audioCtx.currentTime);

        // Subtle LFO slow breathing pulse (simulates tanpura strumming rhythm ~6s)
        const lfo = this.audioCtx.createOscillator();
        const lfoGain = this.audioCtx.createGain();
        lfo.frequency.setValueAtTime(0.18 + Math.random() * 0.05, this.audioCtx.currentTime);
        lfoGain.gain.setValueAtTime(gain * 0.35, this.audioCtx.currentTime);
        lfo.connect(lfoGain.gain);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start();
        lfo.start();

        this.nodes.push(osc, lfo);
      });

      // Smooth fade-in over 2.5 seconds
      const now = this.audioCtx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(0.0001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.25, now + 2.5);

      this.isPlaying = true;
    } catch (e) {
      console.warn("Audio synthesis unavailable or blocked:", e);
    }
  }

  stop() {
    if (!this.isPlaying) return;

    if (this.externalAudio) {
      this.externalAudio.pause();
      this.isPlaying = false;
      return;
    }

    if (this.audioCtx && this.masterGain) {
      const now = this.audioCtx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.00001, now + 1.2);

      setTimeout(() => {
        this.nodes.forEach((n) => {
          try {
            n.stop();
          } catch {}
        });
        this.nodes = [];
        this.isPlaying = false;
      }, 1300);
    } else {
      this.isPlaying = false;
    }
  }

  toggle(audioSrc = null) {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start(audioSrc);
      return true;
    }
  }
}

export const ambientSound = new AmbientSoundscape();
