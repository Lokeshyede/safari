import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Compass, ChevronRight } from 'lucide-react'
import WordReveal from './WordReveal'
import { isReducedMotion, setupMediaTumbleAnimation } from '../utils/textAnimations'

gsap.registerPlugin(ScrollTrigger)

export interface CinematicVideoSectionProps {
  id: string
  number: string
  label: string
  coordinates: string
  title: string
  subtitle: string
  videoSrc: string
  poster: string
  isHero?: boolean
  actionLabel?: string
  onAction?: () => void
  onExplorePrompt?: () => void
}

export default function CinematicVideoSection({
  id,
  number,
  label,
  coordinates,
  title,
  subtitle,
  videoSrc,
  poster,
  isHero = false,
  actionLabel,
  onAction,
  onExplorePrompt,
}: CinematicVideoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const mediaContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [videoFrameReady, setVideoFrameReady] = useState(false)

  // Mark video as ready only once it has decoded a valid frame and is actively playing
  const handleVideoReady = useCallback(() => {
    const v = videoRef.current
    if (v && v.readyState >= 2 && !v.paused) {
      setVideoFrameReady(true)
    }
  }, [])

  // If playback encounters an error, retain poster fallback
  const handleVideoError = useCallback(() => {
    setVideoFrameReady(false)
  }, [])

  // Prepare & play helper: upgrades preload to auto and triggers play
  const prepareAndPlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.preload !== 'auto') {
      v.preload = 'auto'
    }
    if (v.paused) {
      const p = v.play()
      if (p !== undefined) {
        p.catch(() => {})
      }
    }
  }, [])

  // Pause helper: pauses video to save battery and memory when offscreen
  const pauseVideo = useCallback(() => {
    const v = videoRef.current
    if (v && !v.paused) {
      v.pause()
    }
  }, [])

  // Master ScrollTrigger setup for video lifecycle & cinematic text reveal
  useEffect(() => {
    const sectionEl = sectionRef.current
    const videoEl = videoRef.current
    const contentEl = contentRef.current
    if (!sectionEl) return

    const motionPref = isReducedMotion()

    // 1. Initial Playback for Hero Scene
    if (isHero) {
      prepareAndPlay()
    }

    // Media Tumble Entrance Animation
    const mediaEl = mediaContainerRef.current
    let tumbleTrigger: ScrollTrigger | null = null
    if (mediaEl) {
      tumbleTrigger = setupMediaTumbleAnimation(sectionEl, mediaEl, { isHero })
    }

    // 2. Lookahead Pre-Warming & Playback Lifecycle Trigger
    // Pre-warms video 25% of viewport before entering from bottom or top
    const videoTrigger = ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top 125%',
      end: 'bottom -25%',
      onEnter: () => prepareAndPlay(),
      onEnterBack: () => prepareAndPlay(),
      onLeave: () => pauseVideo(),
      onLeaveBack: () => pauseVideo(),
    })

    // 3. Subtle, hardware-accelerated video zoom on scroll (if motion enabled)
    let videoTween: gsap.core.Tween | null = null
    if (!motionPref && videoEl) {
      videoTween = gsap.fromTo(
        videoEl,
        { scale: 1.06 },
        {
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      )
    }

    // 4. Cinematic Text Content Entrance Animation
    let textTrigger: ScrollTrigger | null = null
    if (contentEl) {
      const pill = contentEl.querySelector<HTMLElement>('.scene-pill')
      const words = contentEl.querySelectorAll<HTMLElement>('.scene-heading .word-inner')
      const sub = contentEl.querySelector<HTMLElement>('.scene-subtitle')
      const coords = contentEl.querySelector<HTMLElement>('.scene-coords')
      const cta = contentEl.querySelector<HTMLElement>('.scene-cta')
      const prompt = contentEl.querySelector<HTMLElement>('.scene-prompt')

      if (motionPref) {
        // Immediate display for reduced motion
        gsap.set([pill, words, sub, coords, cta, prompt].filter(Boolean), { opacity: 1, y: 0 })
      } else {
        // Set initial hidden states
        if (pill) gsap.set(pill, { opacity: 0, y: -12 })
        if (words.length > 0) gsap.set(words, { opacity: 0, y: '105%', letterSpacing: '0.05em' })
        if (sub) gsap.set(sub, { opacity: 0, y: 22 })
        if (coords) gsap.set(coords, { opacity: 0, y: 15 })
        if (cta) gsap.set(cta, { opacity: 0, y: 18 })
        if (prompt) gsap.set(prompt, { opacity: 0, y: 16 })

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        if (pill) tl.to(pill, { opacity: 1, y: 0, duration: 0.55 }, 0)
        if (words.length > 0) {
          tl.to(
            words,
            {
              opacity: 1,
              y: '0%',
              letterSpacing: '-0.02em',
              duration: 0.85,
              stagger: 0.05,
              ease: 'power3.out',
            },
            0.1
          )
        }
        if (sub) tl.to(sub, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.45')
        if (coords) tl.to(coords, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        if (cta) tl.to(cta, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.35')
        if (prompt) tl.to(prompt, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, '-=0.3')

        textTrigger = ScrollTrigger.create({
          trigger: sectionEl,
          start: isHero ? 'top 95%' : 'top 65%',
          toggleActions: 'play none none reverse',
          animation: tl,
        })
      }
    }

    return () => {
      videoTrigger.kill()
      if (tumbleTrigger) tumbleTrigger.kill()
      if (textTrigger) textTrigger.kill()
      if (videoTween) videoTween.kill()
    }
  }, [isHero, prepareAndPlay, pauseVideo])

  // Pause video if browser tab is switched away, resume when returning if in viewport
  useEffect(() => {
    const handleVisibility = () => {
      const v = videoRef.current
      const s = sectionRef.current
      if (!v || !s) return

      if (document.hidden) {
        if (!v.paused) v.pause()
      } else {
        const rect = s.getBoundingClientRect()
        const inView = rect.top < window.innerHeight && rect.bottom > 0
        if (inView && v.paused) {
          v.play().catch(() => {})
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full h-[100svh] min-h-[580px] flex items-center justify-center overflow-hidden bg-[#060b08]"
      style={{ perspective: '1200px' }}
    >
      {/* Full-bleed Video Background with Controlled Poster Handoff */}
      <div
        ref={mediaContainerRef}
        className="absolute inset-0 w-full h-full overflow-hidden bg-[#060b08] will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Layer 0: Static Poster Fallback Underlay (Guarantees zero black screen ever) */}
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          loading={isHero ? 'eager' : 'lazy'}
        />

        {/* Layer 1: Native HTML5 Video Element */}
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          loop
          preload={isHero ? 'auto' : 'metadata'}
          onLoadedData={handleVideoReady}
          onPlaying={handleVideoReady}
          onTimeUpdate={handleVideoReady}
          onError={handleVideoError}
          className="absolute inset-0 z-0 w-full h-full object-cover select-none pointer-events-none will-change-transform"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Layer 2: Controlled Poster Overlay (fades out smoothly once video frames actively render) */}
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-700 ease-out pointer-events-none ${
            videoFrameReady ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden="true"
        >
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover select-none pointer-events-none"
            loading={isHero ? 'eager' : 'lazy'}
          />
        </div>

        {/* Layer 3: Cinematic Vignette, Multi-Stop Lighting Gradients & Film Grain */}
        <div className="absolute inset-0 z-20 bg-radial-vignette opacity-75 sm:opacity-80 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 z-20 h-32 sm:h-44 bg-gradient-to-b from-[#060b08]/90 via-[#060b08]/50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 z-20 h-40 sm:h-52 bg-gradient-to-t from-[#060b08] via-[#060b08]/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-[#060b08]/30 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 z-20 film-grain pointer-events-none opacity-30 sm:opacity-40" />
      </div>

      {/* Layer 4: Minimalist Editorial Content Overlay */}
      <div
        ref={contentRef}
        className="scene-content relative z-30 max-w-5xl mx-auto px-4 sm:px-6 md:px-12 text-center flex flex-col items-center justify-center pt-8 sm:pt-0"
      >
        {/* Section Category Pill */}
        <div className="scene-pill inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#060b08]/75 backdrop-blur-md mb-3 sm:mb-6">
          <Compass className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#c5a059]" />
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#c5a059] font-mono font-medium">
            {number} // {label}
          </span>
        </div>

        {/* Majestic Headline with Word Reveal */}
        <WordReveal
          as={isHero ? 'h1' : 'h2'}
          className="scene-heading font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-[#f7f4ed] tracking-tight sm:tracking-[-0.02em] leading-[1.12] drop-shadow-2xl max-w-[320px] sm:max-w-xl md:max-w-3xl lg:max-w-4xl"
          text={title}
        />

        {/* Supporting Narrative Sentence */}
        <p className="scene-subtitle mt-2.5 sm:mt-5 font-sans-ui text-xs sm:text-sm md:text-base lg:text-lg text-[#f7f4ed]/85 font-light tracking-[0.02em] sm:tracking-[0.03em] max-w-[290px] sm:max-w-md md:max-w-xl mx-auto leading-relaxed drop-shadow-md">
          {subtitle}
        </p>

        {/* Section Reserve Coordinates */}
        <p className="scene-coords text-[9px] sm:text-[10px] font-mono tracking-widest text-[#c5a059]/80 uppercase mt-3 sm:mt-4 truncate max-w-[300px] sm:max-w-none">
          {coordinates}
        </p>

        {/* Optional Call to Action Button */}
        {actionLabel && onAction && (
          <div className="scene-cta mt-6 sm:mt-8 md:mt-10 flex items-center justify-center">
            <button
              onClick={onAction}
              className="btn-gold px-7 sm:px-8 py-3 sm:py-3.5 min-h-[44px] rounded-full text-xs font-semibold tracking-[0.2em] flex items-center justify-center gap-2.5 sm:gap-3 group"
            >
              <span>{actionLabel}</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}

        {/* Hero Section Discovery Prompt */}
        {isHero && onExplorePrompt && (
          <div className="scene-prompt mt-8 sm:mt-12 flex flex-col items-center">
            <button
              onClick={onExplorePrompt}
              className="group flex flex-col items-center gap-2 text-white/60 hover:text-[#c5a059] transition-colors focus:outline-none min-h-[44px]"
              aria-label="Scroll to explore"
            >
              <span className="animated-underline text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-medium">
                Scroll To Explore
              </span>
              <div className="w-6 sm:w-7 h-10 sm:h-11 rounded-full border border-white/20 group-hover:border-[#c5a059] flex items-start justify-center p-1.5 transition-colors">
                <span className="w-1 h-2 rounded-full bg-[#c5a059] animate-bounce" />
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
