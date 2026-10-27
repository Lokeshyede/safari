import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Compass, ChevronRight, Eye, Shield, Sparkles } from 'lucide-react'
import WordReveal from './WordReveal'
import {
  setupSceneTextAnimation,
  isReducedMotion,
  setupMediaTumbleAnimation,
} from '../utils/textAnimations'

gsap.registerPlugin(ScrollTrigger)

// =========================================================================
// SECTION: ENTER THE FOREST (Image Section - Deep Canopy)
// =========================================================================
export function ForestCanopySection() {
  const secRef = useRef<HTMLDivElement>(null)
  const mediaContainerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLImageElement>(null)
  const sunbeamsRef = useRef<HTMLDivElement>(null)
  const leavesLeftRef = useRef<HTMLDivElement>(null)
  const leavesRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let tumbleTrigger: ScrollTrigger | null = null
    if (secRef.current && mediaContainerRef.current) {
      tumbleTrigger = setupMediaTumbleAnimation(secRef.current, mediaContainerRef.current)
    }

    if (isReducedMotion()) {
      return () => {
        if (tumbleTrigger) tumbleTrigger.kill()
      }
    }

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      if (secRef.current && bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { y: '-10%', scale: 1.15 },
          {
            y: '10%',
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: secRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )

        if (sunbeamsRef.current) {
          gsap.fromTo(
            sunbeamsRef.current,
            { opacity: 0.3, rotation: -4 },
            {
              opacity: 0.85,
              rotation: 2,
              ease: 'none',
              scrollTrigger: {
                trigger: secRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: 1,
              },
            }
          )
        }

        if (leavesLeftRef.current) {
          gsap.fromTo(
            leavesLeftRef.current,
            { y: '25%', x: '-5%' },
            {
              y: '-25%',
              x: '0%',
              ease: 'none',
              scrollTrigger: {
                trigger: secRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          )
        }

        if (leavesRightRef.current) {
          gsap.fromTo(
            leavesRightRef.current,
            { y: '30%', x: '5%' },
            {
              y: '-30%',
              x: '0%',
              ease: 'none',
              scrollTrigger: {
                trigger: secRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          )
        }

        setupSceneTextAnimation(secRef.current, { headingRestingTracking: '-0.02em' })
      }
    })

    mm.add('(max-width: 1023px)', () => {
      if (secRef.current && bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.06 },
          {
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: secRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        )
        setupSceneTextAnimation(secRef.current)
      }
    })

    return () => {
      if (tumbleTrigger) tumbleTrigger.kill()
      mm.revert()
    }
  }, [])

  return (
    <section
      ref={secRef}
      id="section-forest-canopy"
      className="relative w-full h-[100svh] min-h-[500px] sm:min-h-[640px] flex items-center justify-center overflow-hidden border-t border-white/5"
      style={{ perspective: '1200px' }}
    >
      {/* Background Media Container with 3D Tumble */}
      <div
        ref={mediaContainerRef}
        className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Background Misty Ancient Canopy Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            ref={bgRef}
            src="/images/forest-canopy.jpg"
            alt="Ancient tropical rainforest canopy with morning sunlight"
            className="w-full h-full object-cover select-none pointer-events-none will-change-transform"
          />
        </div>

        {/* Volumetric Sunlight Rays Layer */}
        <div
          ref={sunbeamsRef}
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50 will-change-transform"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 55% 25%, rgba(255, 230, 160, 0.45) 0%, rgba(197, 160, 89, 0.15) 45%, transparent 75%)',
          }}
        />

        {/* Vignettes & Atmospheric Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b08] via-transparent to-[#060b08]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060b08]/70 via-transparent to-[#060b08]/70 pointer-events-none" />
        <div className="absolute inset-0 film-grain pointer-events-none opacity-30" />

        {/* Foreground Framing Foliage (Parallax Left - Desktop/Tablet) */}
        <div
          ref={leavesLeftRef}
          className="hidden sm:block absolute -left-12 bottom-0 w-52 sm:w-80 md:w-[480px] h-[380px] sm:h-[550px] pointer-events-none select-none z-10 will-change-transform opacity-75 sm:opacity-90"
        >
          <svg viewBox="0 0 400 500" className="w-full h-full fill-[#040805]">
            <path d="M0,500 C80,450 160,380 180,260 C200,140 130,50 40,0 C20,70 10,180 0,280 Z" opacity="0.95" />
            <path d="M0,400 C120,380 240,320 280,180 C260,260 180,360 20,440 Z" opacity="0.8" fill="#07120a" />
            <path d="M-20,480 C90,440 210,360 240,240 C190,320 110,410 0,460 Z" opacity="0.6" fill="#0c1811" />
          </svg>
        </div>

        {/* Foreground Framing Foliage (Parallax Right - Desktop/Tablet) */}
        <div
          ref={leavesRightRef}
          className="hidden sm:block absolute -right-12 bottom-0 w-52 sm:w-80 md:w-[480px] h-[380px] sm:h-[550px] pointer-events-none select-none z-10 will-change-transform opacity-75 sm:opacity-90"
        >
          <svg viewBox="0 0 400 500" className="w-full h-full fill-[#040805]">
            <path d="M400,500 C320,450 240,380 220,260 C200,140 270,50 360,0 C380,70 390,180 400,280 Z" opacity="0.95" />
            <path d="M400,400 C280,380 160,320 120,180 C140,260 220,360 380,440 Z" opacity="0.8" fill="#07120a" />
            <path d="M420,480 C310,440 190,360 160,240 C210,320 290,410 400,460 Z" opacity="0.6" fill="#0c1811" />
          </svg>
        </div>
      </div>

      {/* Editorial Content */}
      <div className="scene-content relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="scene-pill inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#060b08]/60 backdrop-blur-md mb-4 sm:mb-6">
          <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
          <span className="text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#c5a059] font-medium font-mono">
            02 // Deep Canopy
          </span>
        </div>

        <WordReveal
          as="h2"
          className="scene-heading font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#f7f4ed] tracking-[-0.02em] leading-tight drop-shadow-2xl"
          text="Enter The Forest"
        />

        <p className="scene-subtitle mt-3 sm:mt-4 font-sans-ui text-sm sm:text-base text-[#f7f4ed]/80 font-light tracking-[0.02em] sm:tracking-[0.04em] max-w-lg mx-auto leading-relaxed drop-shadow-md">
          Volumetric dawn rays filtering through ancient sal trees, bamboo groves, and emerald moss.
        </p>
      </div>
    </section>
  )
}

// =========================================================================
// SECTION: WILDLIFE REVEAL (Image Section - Royal Bengal Tiger)
// =========================================================================
export function WildlifeTigerSection() {
  const secRef = useRef<HTMLDivElement>(null)
  const mediaContainerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const foliageLeftRef = useRef<HTMLDivElement>(null)
  const foliageRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let tumbleTrigger: ScrollTrigger | null = null
    if (secRef.current && mediaContainerRef.current) {
      tumbleTrigger = setupMediaTumbleAnimation(secRef.current, mediaContainerRef.current)
    }

    if (isReducedMotion()) {
      return () => {
        if (tumbleTrigger) tumbleTrigger.kill()
      }
    }

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      if (secRef.current && imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.15, filter: 'brightness(0.75)' },
          {
            scale: 1.0,
            filter: 'brightness(1)',
            ease: 'none',
            scrollTrigger: {
              trigger: secRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        )

        if (foliageLeftRef.current) {
          gsap.fromTo(
            foliageLeftRef.current,
            { x: '0%', opacity: 1 },
            {
              x: '-25%',
              opacity: 0.4,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: secRef.current,
                start: 'top 70%',
                end: 'center center',
                scrub: 1,
              },
            }
          )
        }

        if (foliageRightRef.current) {
          gsap.fromTo(
            foliageRightRef.current,
            { x: '0%', opacity: 1 },
            {
              x: '25%',
              opacity: 0.4,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: secRef.current,
                start: 'top 70%',
                end: 'center center',
                scrub: 1,
              },
            }
          )
        }

        setupSceneTextAnimation(secRef.current, { headingRestingTracking: 'normal' })
      }
    })

    mm.add('(max-width: 1023px)', () => {
      if (secRef.current && imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.06 },
          {
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: secRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        )
        setupSceneTextAnimation(secRef.current)
      }
    })

    return () => {
      if (tumbleTrigger) tumbleTrigger.kill()
      mm.revert()
    }
  }, [])

  return (
    <section
      ref={secRef}
      id="section-wildlife-tiger"
      className="relative w-full h-[100svh] min-h-[500px] sm:min-h-[640px] flex items-center justify-center overflow-hidden border-t border-white/5"
      style={{ perspective: '1200px' }}
    >
      {/* Background Media Container with 3D Tumble */}
      <div
        ref={mediaContainerRef}
        className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Full-bleed Majestic Wildlife Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            ref={imgRef}
            src="/images/wildlife-tiger.jpg"
            alt="Royal Bengal Tiger gazing through jungle foliage"
            className="w-full h-full object-cover select-none pointer-events-none will-change-transform"
          />
        </div>

        {/* Parting Foreground Foliage Overlay (Left) */}
        <div
          ref={foliageLeftRef}
          className="absolute inset-y-0 left-0 w-1/2 pointer-events-none select-none z-10 will-change-transform bg-gradient-to-r from-[#040805] via-[#040805]/70 to-transparent opacity-50 sm:opacity-100"
        >
          <div className="w-full h-full opacity-60 film-grain" />
        </div>

        {/* Parting Foreground Foliage Overlay (Right) */}
        <div
          ref={foliageRightRef}
          className="absolute inset-y-0 right-0 w-1/2 pointer-events-none select-none z-10 will-change-transform bg-gradient-to-l from-[#040805] via-[#040805]/70 to-transparent opacity-50 sm:opacity-100"
        >
          <div className="w-full h-full opacity-60 film-grain" />
        </div>

        {/* Ambient Vignette & Shadow Grading */}
        <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#060b08] via-[#060b08]/50 to-transparent pointer-events-none" />
      </div>

      {/* Minimalist Wildlife Caption Overlay (Positioned Bottom-Left) */}
      <div className="scene-content absolute left-4 right-4 sm:left-12 sm:right-auto md:left-20 bottom-8 sm:bottom-24 z-20 max-w-xl text-left">
        <div className="scene-pill inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c5a059]/30 bg-[#060b08]/70 backdrop-blur-md mb-3 sm:mb-4">
          <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
          <span className="text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#c5a059] font-medium font-mono">
            04 // Apex Predator
          </span>
        </div>

        <WordReveal
          as="h3"
          className="scene-heading font-serif-luxury text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#f7f4ed] leading-tight drop-shadow-2xl"
          text="The Royal Bengal Tiger"
        />

        <p className="scene-subtitle mt-2 sm:mt-3 font-sans-ui text-xs sm:text-base text-[#f7f4ed]/85 font-light leading-relaxed max-w-md drop-shadow-md">
          Undisputed sovereign of the Indian jungle. Protected deep inside core reserves where shadows breathe and amber eyes watch in absolute stillness.
        </p>
      </div>
    </section>
  )
}

// =========================================================================
// SECTION: INTO THE WILDERNESS (Image Section - Riverine Corridors)
// =========================================================================
export function ForestRiverSection() {
  const secRef = useRef<HTMLDivElement>(null)
  const mediaContainerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const mistRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let tumbleTrigger: ScrollTrigger | null = null
    if (secRef.current && mediaContainerRef.current) {
      tumbleTrigger = setupMediaTumbleAnimation(secRef.current, mediaContainerRef.current)
    }

    if (isReducedMotion()) {
      return () => {
        if (tumbleTrigger) tumbleTrigger.kill()
      }
    }

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      if (secRef.current && imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.14, y: '-8%' },
          {
            scale: 1.0,
            y: '8%',
            ease: 'none',
            scrollTrigger: {
              trigger: secRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )

        if (mistRef.current) {
          gsap.fromTo(
            mistRef.current,
            { x: '-10%', opacity: 0.3 },
            {
              x: '10%',
              opacity: 0.7,
              ease: 'none',
              scrollTrigger: {
                trigger: secRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          )
        }

        setupSceneTextAnimation(secRef.current, { headingRestingTracking: '-0.01em' })
      }
    })

    mm.add('(max-width: 1023px)', () => {
      if (secRef.current && imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.06 },
          {
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: secRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        )
        setupSceneTextAnimation(secRef.current)
      }
    })

    return () => {
      if (tumbleTrigger) tumbleTrigger.kill()
      mm.revert()
    }
  }, [])

  return (
    <section
      ref={secRef}
      id="section-forest-river"
      className="relative w-full h-[100svh] min-h-[500px] sm:min-h-[640px] flex items-center justify-center overflow-hidden border-t border-white/5"
      style={{ perspective: '1200px' }}
    >
      {/* Background Media Container with 3D Tumble */}
      <div
        ref={mediaContainerRef}
        className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Full-bleed River Landscape */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            ref={imgRef}
            src="/images/forest-river.jpg"
            alt="Misty jungle river with mossy wooden footbridge and twilight glow"
            className="w-full h-full object-cover select-none pointer-events-none will-change-transform"
          />
        </div>

        {/* Ethereal Floating River Mist Layer */}
        <div
          ref={mistRef}
          className="absolute inset-x-0 bottom-1/4 h-64 pointer-events-none select-none mix-blend-screen opacity-50 will-change-transform"
          style={{
            background:
              'radial-gradient(ellipse 100% 50% at 50% 60%, rgba(255, 255, 255, 0.35) 0%, rgba(200, 220, 210, 0.15) 50%, transparent 80%)',
          }}
        />

        {/* Dark Vignette & Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b08]/80 via-transparent to-[#060b08]/90 pointer-events-none" />
        <div className="absolute inset-0 film-grain pointer-events-none opacity-30" />
      </div>

      {/* Minimal Wilderness Editorial Text */}
      <div className="scene-content relative z-20 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="scene-pill inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#060b08]/60 backdrop-blur-md mb-4 sm:mb-5">
          <Shield className="w-3.5 h-3.5 text-[#c5a059]" />
          <span className="text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#c5a059] font-medium font-mono">
            07 // Riverine Corridors
          </span>
        </div>

        <WordReveal
          as="h2"
          className="scene-heading font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#f7f4ed] tracking-[-0.01em] leading-tight drop-shadow-2xl"
          text="The River's Secret"
        />

        <p className="scene-subtitle mt-3 sm:mt-4 font-sans-ui text-sm sm:text-base md:text-lg text-[#f7f4ed]/85 font-light tracking-[0.02em] sm:tracking-[0.03em] max-w-lg mx-auto leading-relaxed drop-shadow-md">
          Cross weathered wooden trails into secluded valleys where predators and prey meet at twilight along ancient waterways.
        </p>
      </div>
    </section>
  )
}

// =========================================================================
// SECTION: YOUR FOREST ESCAPE (Image Section - Luxury Lodge Sanctuary)
// =========================================================================
export function ForestLodgeSection({ onPlanSafari }: { onPlanSafari?: () => void }) {
  const secRef = useRef<HTMLDivElement>(null)
  const mediaContainerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    let tumbleTrigger: ScrollTrigger | null = null
    if (secRef.current && mediaContainerRef.current) {
      tumbleTrigger = setupMediaTumbleAnimation(secRef.current, mediaContainerRef.current)
    }

    if (isReducedMotion()) {
      return () => {
        if (tumbleTrigger) tumbleTrigger.kill()
      }
    }

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      if (secRef.current && imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.08, filter: 'brightness(0.85)' },
          {
            scale: 1.0,
            filter: 'brightness(1)',
            ease: 'none',
            scrollTrigger: {
              trigger: secRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )

        setupSceneTextAnimation(secRef.current, { headingRestingTracking: '-0.02em' })
      }
    })

    mm.add('(max-width: 1023px)', () => {
      if (secRef.current && imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.06 },
          {
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: secRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        )
        setupSceneTextAnimation(secRef.current)
      }
    })

    return () => {
      if (tumbleTrigger) tumbleTrigger.kill()
      mm.revert()
    }
  }, [])

  return (
    <section
      ref={secRef}
      id="section-forest-lodge"
      className="relative w-full h-[100svh] min-h-[500px] sm:min-h-[640px] flex items-center justify-center overflow-hidden border-t border-white/5"
      style={{ perspective: '1200px' }}
    >
      {/* Background Media Container with 3D Tumble */}
      <div
        ref={mediaContainerRef}
        className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Full-bleed Luxury Lodge Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            ref={imgRef}
            src="/images/forest-lodge.jpg"
            alt="Luxury eco-safari treehouse lodge cantilevered over the misty canopy with lanterns"
            className="w-full h-full object-cover select-none pointer-events-none will-change-transform"
          />
        </div>

        {/* Lantern Glow & Twilight Atmosphere Layer */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-color-dodge"
          style={{
            background:
              'radial-gradient(circle at 65% 65%, rgba(255, 175, 75, 0.45) 0%, transparent 60%)',
          }}
        />

        {/* Dark Vignettes & Readable Overlays */}
        <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#060b08] via-[#060b08]/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 film-grain pointer-events-none opacity-25" />
      </div>

      {/* Editorial Content */}
      <div className="scene-content relative z-20 max-w-4xl mx-auto px-4 sm:px-6 md:px-12 text-center flex flex-col items-center justify-center">
        <div className="scene-pill inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/40 bg-[#060b08]/60 backdrop-blur-md mb-4 sm:mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
          <span className="text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#c5a059] font-medium font-mono">
            10 // Timeless Stillness
          </span>
        </div>

        <WordReveal
          as="h2"
          className="scene-heading font-serif-luxury text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal text-[#f7f4ed] tracking-[-0.02em] leading-tight drop-shadow-2xl"
          text="A Sanctuary in the Wild"
        />

        <p className="scene-subtitle mt-4 sm:mt-5 font-sans-ui text-sm sm:text-base md:text-lg text-[#f7f4ed]/90 font-light tracking-[0.02em] sm:tracking-[0.04em] max-w-xl mx-auto leading-relaxed drop-shadow-md">
          Private cantilevered decks, starlit fire pits, and untamed stillness where night brings the ancient symphony of the forest.
        </p>

        {onPlanSafari && (
          <div className="scene-cta mt-6 sm:mt-9">
            <button
              onClick={onPlanSafari}
              className="btn-gold px-8 py-3.5 sm:px-10 sm:py-4 rounded-full text-xs font-semibold tracking-[0.18em] sm:tracking-[0.2em] uppercase flex items-center gap-3 group shadow-[0_4px_30px_rgba(197,160,89,0.35)] min-h-[44px]"
            >
              <span>Plan Your Safari</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

// Default export combining all 4 for backward compatibility
export default function ForestJourney({ onPlanSafari }: { onPlanSafari?: () => void }) {
  return (
    <div className="relative w-full bg-[#060b08] overflow-hidden">
      <ForestCanopySection />
      <WildlifeTigerSection />
      <ForestRiverSection />
      <ForestLodgeSection onPlanSafari={onPlanSafari} />
    </div>
  )
}
