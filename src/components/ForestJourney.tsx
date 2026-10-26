import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Compass, ChevronRight, Eye, Shield, Sparkles } from 'lucide-react'
import WordReveal from './WordReveal'
import { setupSceneTextAnimation } from '../utils/textAnimations'

gsap.registerPlugin(ScrollTrigger)

interface ForestJourneyProps {
  onPlanSafari: () => void
}

export default function ForestJourney({ onPlanSafari }: ForestJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Section 5 refs
  const sec5Ref = useRef<HTMLDivElement>(null)
  const sec5BgRef = useRef<HTMLImageElement>(null)
  const sec5SunbeamsRef = useRef<HTMLDivElement>(null)
  const sec5LeavesLeftRef = useRef<HTMLDivElement>(null)
  const sec5LeavesRightRef = useRef<HTMLDivElement>(null)

  // Section 6 refs (Wildlife Reveal)
  const sec6Ref = useRef<HTMLDivElement>(null)
  const sec6ImageRef = useRef<HTMLImageElement>(null)
  const sec6FoliageLeftRef = useRef<HTMLDivElement>(null)
  const sec6FoliageRightRef = useRef<HTMLDivElement>(null)
  const sec6ContentRef = useRef<HTMLDivElement>(null)

  // Section 7 refs (Into the Wilderness)
  const sec7Ref = useRef<HTMLDivElement>(null)
  const sec7ImageRef = useRef<HTMLImageElement>(null)
  const sec7MistRef = useRef<HTMLDivElement>(null)
  const sec7ContentRef = useRef<HTMLDivElement>(null)

  // Section 8 refs (Your Forest Escape)
  const sec8Ref = useRef<HTMLDivElement>(null)
  const sec8ImageRef = useRef<HTMLImageElement>(null)
  const sec8ContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const ctx = gsap.context(() => {
      // ----------------------------------------------------
      // SECTION 5: ENTER THE FOREST (Layered Parallax)
      // ----------------------------------------------------
      if (sec5Ref.current && sec5BgRef.current) {
        // Deep background image slow parallax
        gsap.fromTo(
          sec5BgRef.current,
          { y: '-10%', scale: 1.15 },
          {
            y: '10%',
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: sec5Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )

        // Volumetric sunbeams drift
        if (sec5SunbeamsRef.current) {
          gsap.fromTo(
            sec5SunbeamsRef.current,
            { opacity: 0.3, rotation: -4 },
            {
              opacity: 0.85,
              rotation: 2,
              ease: 'none',
              scrollTrigger: {
                trigger: sec5Ref.current,
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: 1,
              },
            }
          )
        }

        // Foreground leaves parallax (moves faster for 3D depth)
        if (sec5LeavesLeftRef.current) {
          gsap.fromTo(
            sec5LeavesLeftRef.current,
            { y: '25%', x: '-5%' },
            {
              y: '-25%',
              x: '0%',
              ease: 'none',
              scrollTrigger: {
                trigger: sec5Ref.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          )
        }

        if (sec5LeavesRightRef.current) {
          gsap.fromTo(
            sec5LeavesRightRef.current,
            { y: '30%', x: '5%' },
            {
              y: '-30%',
              x: '0%',
              ease: 'none',
              scrollTrigger: {
                trigger: sec5Ref.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          )
        }

        // Section 5 Cinematic Text Animation
        setupSceneTextAnimation(sec5Ref.current, { headingRestingTracking: '-0.02em' })
      }

      // ----------------------------------------------------
      // SECTION 6: WILDLIFE REVEAL (Layered Foliage Parting)
      // ----------------------------------------------------
      if (sec6Ref.current && sec6ImageRef.current) {
        // Subtle image zoom & brightness adjustment
        gsap.fromTo(
          sec6ImageRef.current,
          { scale: 1.15, filter: 'brightness(0.75)' },
          {
            scale: 1.0,
            filter: 'brightness(1)',
            ease: 'none',
            scrollTrigger: {
              trigger: sec6Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        )

        // Foliage parting effect
        if (sec6FoliageLeftRef.current) {
          gsap.fromTo(
            sec6FoliageLeftRef.current,
            { x: '0%', opacity: 1 },
            {
              x: '-25%',
              opacity: 0.4,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: sec6Ref.current,
                start: 'top 70%',
                end: 'center center',
                scrub: 1,
              },
            }
          )
        }

        if (sec6FoliageRightRef.current) {
          gsap.fromTo(
            sec6FoliageRightRef.current,
            { x: '0%', opacity: 1 },
            {
              x: '25%',
              opacity: 0.4,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: sec6Ref.current,
                start: 'top 70%',
                end: 'center center',
                scrub: 1,
              },
            }
          )
        }

        // Section 6 Cinematic Text Animation
        setupSceneTextAnimation(sec6Ref.current, { headingRestingTracking: 'normal' })
      }

      // ----------------------------------------------------
      // SECTION 7: INTO THE WILDERNESS (River & Trail Parallax)
      // ----------------------------------------------------
      if (sec7Ref.current && sec7ImageRef.current) {
        gsap.fromTo(
          sec7ImageRef.current,
          { scale: 1.14, y: '-8%' },
          {
            scale: 1.0,
            y: '8%',
            ease: 'none',
            scrollTrigger: {
              trigger: sec7Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )

        // River mist float
        if (sec7MistRef.current) {
          gsap.fromTo(
            sec7MistRef.current,
            { x: '-10%', opacity: 0.3 },
            {
              x: '10%',
              opacity: 0.7,
              ease: 'none',
              scrollTrigger: {
                trigger: sec7Ref.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          )
        }

        // Section 7 Cinematic Text Animation
        setupSceneTextAnimation(sec7Ref.current, { headingRestingTracking: '-0.01em' })
      }

      // ----------------------------------------------------
      // SECTION 8: YOUR FOREST ESCAPE (Lodge Sanctuary)
      // ----------------------------------------------------
      if (sec8Ref.current && sec8ImageRef.current) {
        gsap.fromTo(
          sec8ImageRef.current,
          { scale: 1.08, filter: 'brightness(0.85)' },
          {
            scale: 1.0,
            filter: 'brightness(1)',
            ease: 'none',
            scrollTrigger: {
              trigger: sec8Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )

        // Section 8 Cinematic Text Animation
        setupSceneTextAnimation(sec8Ref.current, { headingRestingTracking: '-0.02em' })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full bg-[#060b08] overflow-hidden">
      {/* ========================================================================= */}
      {/* SECTION 5: ENTER THE FOREST                                               */}
      {/* ========================================================================= */}
      <section
        ref={sec5Ref}
        id="section-forest-canopy"
        className="relative w-full h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden"
      >
        {/* Layer 1: Background Misty Ancient Canopy */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            ref={sec5BgRef}
            src="/images/forest-canopy.jpg"
            alt="Ancient tropical rainforest canopy with morning sunlight"
            className="w-full h-full object-cover select-none pointer-events-none will-change-transform"
          />
        </div>

        {/* Layer 2: Ethereal Volumetric Sunlight Rays & Mist Drift */}
        <div
          ref={sec5SunbeamsRef}
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50 will-change-transform"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 55% 25%, rgba(255, 230, 160, 0.45) 0%, rgba(197, 160, 89, 0.15) 45%, transparent 75%)',
          }}
        />

        {/* Layer 3: Edge Vignette & Deep Forest Haze */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b08] via-transparent to-[#060b08]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060b08]/70 via-transparent to-[#060b08]/70 pointer-events-none" />
        <div className="absolute inset-0 film-grain pointer-events-none opacity-30" />

        {/* Layer 4: Foreground Framing Foliage (Parallax Left) */}
        <div
          ref={sec5LeavesLeftRef}
          className="absolute -left-12 bottom-0 w-80 md:w-[480px] h-[550px] pointer-events-none select-none z-10 will-change-transform opacity-90"
        >
          <svg viewBox="0 0 400 500" className="w-full h-full fill-[#040805]">
            <path d="M0,500 C80,450 160,380 180,260 C200,140 130,50 40,0 C20,70 10,180 0,280 Z" opacity="0.95" />
            <path d="M0,400 C120,380 240,320 280,180 C260,260 180,360 20,440 Z" opacity="0.8" fill="#07120a" />
            <path d="M-20,480 C90,440 210,360 240,240 C190,320 110,410 0,460 Z" opacity="0.6" fill="#0c1811" />
          </svg>
        </div>

        {/* Layer 5: Foreground Framing Foliage (Parallax Right) */}
        <div
          ref={sec5LeavesRightRef}
          className="absolute -right-12 bottom-0 w-80 md:w-[480px] h-[550px] pointer-events-none select-none z-10 will-change-transform opacity-90"
        >
          <svg viewBox="0 0 400 500" className="w-full h-full fill-[#040805]">
            <path d="M400,500 C320,450 240,380 220,260 C200,140 270,50 360,0 C380,70 390,180 400,280 Z" opacity="0.95" />
            <path d="M400,400 C280,380 160,320 120,180 C140,260 220,360 380,440 Z" opacity="0.8" fill="#07120a" />
            <path d="M420,480 C310,440 190,360 160,240 C210,320 290,410 400,460 Z" opacity="0.6" fill="#0c1811" />
          </svg>
        </div>

        {/* Minimal Editorial Text */}
        <div className="scene-content relative z-20 max-w-4xl mx-auto px-6 text-center">
          <div className="scene-pill inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#060b08]/60 backdrop-blur-md mb-6">
            <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-medium">
              05 // Deep Canopy
            </span>
          </div>

          <WordReveal
            as="h2"
            className="scene-heading font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-normal text-[#f7f4ed] tracking-[-0.02em] leading-tight drop-shadow-2xl"
            text="Enter The Forest"
          />

          <p className="scene-subtitle mt-4 font-sans-ui text-sm sm:text-base text-[#f7f4ed]/80 font-light tracking-[0.04em] max-w-lg mx-auto leading-relaxed drop-shadow-md">
            Volumetric dawn rays filtering through ancient mahogany and emerald moss.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: WILDLIFE REVEAL                                                */}
      {/* ========================================================================= */}
      <section
        ref={sec6Ref}
        id="section-wildlife-reveal"
        className="relative w-full h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden border-t border-white/5"
      >
        {/* Full-bleed Majestic Wildlife Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            ref={sec6ImageRef}
            src="/images/wildlife-tiger.jpg"
            alt="Royal Bengal Tiger gazing through jungle foliage"
            className="w-full h-full object-cover select-none pointer-events-none will-change-transform"
          />
        </div>

        {/* Parting Foreground Foliage Overlay (Left) */}
        <div
          ref={sec6FoliageLeftRef}
          className="absolute inset-y-0 left-0 w-1/2 pointer-events-none select-none z-10 will-change-transform bg-gradient-to-r from-[#040805] via-[#040805]/70 to-transparent"
        >
          <div className="w-full h-full opacity-60 film-grain" />
        </div>

        {/* Parting Foreground Foliage Overlay (Right) */}
        <div
          ref={sec6FoliageRightRef}
          className="absolute inset-y-0 right-0 w-1/2 pointer-events-none select-none z-10 will-change-transform bg-gradient-to-l from-[#040805] via-[#040805]/70 to-transparent"
        >
          <div className="w-full h-full opacity-60 film-grain" />
        </div>

        {/* Ambient Vignette & Shadow Grading */}
        <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#060b08] via-[#060b08]/50 to-transparent pointer-events-none" />

        {/* Minimalist Wildlife Caption Overlay (Positioned Bottom-Left) */}
        <div
          ref={sec6ContentRef}
          className="scene-content absolute left-6 sm:left-12 md:left-20 bottom-16 sm:bottom-24 z-20 max-w-xl text-left"
        >
          <div className="scene-pill inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c5a059]/30 bg-[#060b08]/70 backdrop-blur-md mb-4">
            <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-medium">
              06 // The Sovereign Gaze
            </span>
          </div>

          <WordReveal
            as="h3"
            className="scene-heading font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#f7f4ed] leading-tight drop-shadow-2xl"
            text="Nature's Apex"
          />

          <p className="scene-subtitle mt-3 font-sans-ui text-sm sm:text-base text-[#f7f4ed]/85 font-light leading-relaxed max-w-md drop-shadow-md">
            Protected deep inside the sanctuary. Where shadows breathe and amber eyes watch in absolute silence.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: INTO THE WILDERNESS (River & Wooden Trail)                     */}
      {/* ========================================================================= */}
      <section
        ref={sec7Ref}
        id="section-forest-river"
        className="relative w-full h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden border-t border-white/5"
      >
        {/* Full-bleed River Landscape */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            ref={sec7ImageRef}
            src="/images/forest-river.jpg"
            alt="Misty jungle river with mossy wooden footbridge and twilight glow"
            className="w-full h-full object-cover select-none pointer-events-none will-change-transform"
          />
        </div>

        {/* Ethereal Floating River Mist Layer */}
        <div
          ref={sec7MistRef}
          className="absolute inset-x-0 bottom-1/4 h-64 pointer-events-none select-none mix-blend-screen opacity-50 will-change-transform"
          style={{
            background:
              'radial-gradient(ellipse 100% 50% at 50% 60%, rgba(255, 255, 255, 0.35) 0%, rgba(200, 220, 210, 0.15) 50%, transparent 80%)',
          }}
        />

        {/* Dark Vignette & Top/Bottom Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b08]/80 via-transparent to-[#060b08]/90 pointer-events-none" />
        <div className="absolute inset-0 film-grain pointer-events-none opacity-30" />

        {/* Minimal Wilderness Editorial Text */}
        <div
          ref={sec7ContentRef}
          className="scene-content relative z-20 max-w-3xl mx-auto px-6 text-center"
        >
          <div className="scene-pill inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#060b08]/60 backdrop-blur-md mb-5">
            <Shield className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-medium">
              07 // Primordial Waterways
            </span>
          </div>

          <WordReveal
            as="h2"
            className="scene-heading font-serif-luxury text-4xl sm:text-6xl md:text-7xl text-[#f7f4ed] tracking-[-0.01em] leading-tight drop-shadow-2xl"
            text="Into The Wilderness"
          />

          <p className="scene-subtitle mt-4 font-sans-ui text-sm sm:text-base md:text-lg text-[#f7f4ed]/85 font-light tracking-[0.03em] max-w-lg mx-auto leading-relaxed drop-shadow-md">
            Cross weathered wooden trails into secluded valleys untouched by time.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: YOUR FOREST ESCAPE (Luxury Treehouse Lodge)                     */}
      {/* ========================================================================= */}
      <section
        ref={sec8Ref}
        id="section-forest-lodge"
        className="relative w-full h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden border-t border-white/5"
      >
        {/* Full-bleed Luxury Lodge Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            ref={sec8ImageRef}
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

        {/* Minimal Hero Content (Exact User Specifications) */}
        <div
          ref={sec8ContentRef}
          className="scene-content relative z-20 max-w-4xl mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center"
        >
          <div className="scene-pill inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/40 bg-[#060b08]/60 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-medium">
              08 // Sanctuary In The Clouds
            </span>
          </div>

          <WordReveal
            as="h2"
            className="scene-heading font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#f7f4ed] tracking-[-0.02em] leading-tight drop-shadow-2xl"
            text="Your Wild Escape Awaits"
          />

          <p className="scene-subtitle mt-5 font-sans-ui text-sm sm:text-base md:text-lg text-[#f7f4ed]/90 font-light tracking-[0.04em] max-w-xl mx-auto leading-relaxed drop-shadow-md">
            Private cantilevered decks, starlit fire pits, and infinity plunge pools overlooking the misty jungle canopy.
          </p>

          <div className="scene-cta mt-9">
            <button
              onClick={onPlanSafari}
              className="btn-gold px-10 py-4 rounded-full text-xs font-semibold tracking-[0.2em] uppercase flex items-center gap-3 group shadow-[0_4px_30px_rgba(197,160,89,0.35)]"
            >
              <span>Plan Your Safari</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
