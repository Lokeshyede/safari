/**
 * Web Audio API Atmospheric Safari Soundscape
 * Synthesizes gentle savannah breeze, night cricket ambience, and soft low wind.
 * No external audio files needed; 100% client-side synthesis.
 */

class SafariSoundscape {
  private ctx: AudioContext | null = null
  private isPlaying = false
  private masterGain: GainNode | null = null
  private windGain: GainNode | null = null
  private cricketGain: GainNode | null = null
  private noiseNode: AudioBufferSourceNode | null = null
  private cricketInterval: number | null = null

  public init() {
    if (this.ctx) return
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    this.ctx = new AudioContextClass()

    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime)
    this.masterGain.connect(this.ctx.destination)
  }

  public async toggle(): Promise<boolean> {
    if (!this.ctx) {
      this.init()
    }

    if (this.ctx?.state === 'suspended') {
      await this.ctx.resume()
    }

    if (this.isPlaying) {
      this.stop()
      return false
    } else {
      this.start()
      return true
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying
  }

  private start() {
    if (!this.ctx || !this.masterGain) return
    this.isPlaying = true

    // Master volume ramp up
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime)
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime)
    this.masterGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 2.5)

    // 1. Synthesize Pink Noise for Gentle Savannah Wind
    const bufferSize = this.ctx.sampleRate * 3
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.0168980
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
      output[i] *= 0.06
      b6 = white * 0.115926
    }

    this.noiseNode = this.ctx.createBufferSource()
    this.noiseNode.buffer = noiseBuffer
    this.noiseNode.loop = true

    // Lowpass filter to create lush wind through leaves
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(320, this.ctx.currentTime)

    // LFO to modulate wind intensity gently
    const lfo = this.ctx.createOscillator()
    lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime)
    const lfoGain = this.ctx.createGain()
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime)
    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)
    lfo.start()

    this.windGain = this.ctx.createGain()
    this.windGain.gain.setValueAtTime(0.7, this.ctx.currentTime)

    this.noiseNode.connect(filter)
    filter.connect(this.windGain)
    this.windGain.connect(this.masterGain)
    this.noiseNode.start()

    // 2. Synthesize High-Frequency Dusk Crickets
    this.cricketGain = this.ctx.createGain()
    this.cricketGain.gain.setValueAtTime(0.12, this.ctx.currentTime)
    this.cricketGain.connect(this.masterGain)

    this.startCricketChirps()
  }

  private startCricketChirps() {
    if (!this.ctx || !this.cricketGain) return

    const chirp = () => {
      if (!this.isPlaying || !this.ctx || !this.cricketGain) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      // Chirp frequency around 4500Hz - 5200Hz
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(4800 + (Math.random() * 400 - 200), this.ctx.currentTime)

      const now = this.ctx.currentTime
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.08, now + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

      osc.connect(gain)
      gain.connect(this.cricketGain)

      osc.start(now)
      osc.stop(now + 0.14)

      // Schedule next chirp randomly
      const nextTime = 150 + Math.random() * 350
      this.cricketInterval = window.setTimeout(chirp, nextTime)
    }

    chirp()
  }

  private stop() {
    if (!this.ctx || !this.masterGain) return
    this.isPlaying = false

    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime)
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime)
    this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.2)

    if (this.cricketInterval) {
      clearTimeout(this.cricketInterval)
      this.cricketInterval = null
    }

    setTimeout(() => {
      if (!this.isPlaying && this.noiseNode) {
        try {
          this.noiseNode.stop()
          this.noiseNode.disconnect()
        } catch {
          // ignore
        }
        this.noiseNode = null
      }
    }, 1300)
  }
}

export const soundscape = new SafariSoundscape()
