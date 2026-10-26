import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Compass, ChevronRight } from 'lucide-react'
import WordReveal from './WordReveal'
import { isReducedMotion } from '../utils/textAnimations'

gsap.registerPlugin(ScrollTrigger)

interface CinematicStoryProps {
  onExploreSafaris: () => void
  onPlanSafari: () => void
}

interface SceneData {
  id: string
  title: string
  subtitle: string
  label: string
  indexLabel: string
  coordinates: string
  videoSrc: string
  actionLabel?: string
  onAction?: () => void
}

export default function CinematicStory({
  onExploreSafaris,
  onPlanSafari,
}: CinematicStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const sceneRefs = useRef<(HTMLElement | null)[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const masterScrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const activeSceneRef = useRef(0)

  const [activeScene, setActiveScene] = useState(0)
  const [isInStory, setIsInStory] = useState(true)

  const scenes: SceneData[] = [
    {
      id: 'scene-1',
      title: 'Into The Wild',
      subtitle: 'Discover a different kind of escape.',
      label: 'PROLOGUE',
      indexLabel: '01 / 04',
      coordinates: '22°20\'00"N 80°37\'00"E • KANHA TIGER RESERVE',
      videoSrc: '/videos/jungle-1.mp4',
    },
    {
      id: 'scene-2',
      title: 'Nature, Untamed',
      subtitle: 'Where ancient rhythms dictate every breath of the earth.',
      label: 'THE WILDERNESS',
      indexLabel: '02 / 04',
      coordinates: '21°42\'00"N 79°18\'00"E • PENCH TIGER RESERVE',
      videoSrc: '/videos/jungle-2.mp4',
    },
    {
      id: 'scene-3',
      title: 'Every Journey, A Story',
      subtitle: 'Guided across wild horizons where few have walked.',
      label: 'THE EXPEDITION',
      indexLabel: '03 / 04',
      coordinates: '20°14\'00"N 79°24\'00"E • TADOBA-ANDHARI TIGER RESERVE',
      videoSrc: '/videos/jungle-3.mp4',
      actionLabel: 'Explore Safaris',
      onAction: onExploreSafaris,
    },
    {
      id: 'scene-4',
      title: 'Your Wild Escape Awaits',
      subtitle: 'Bespoke lodges, private air safaris, and untamed stillness.',
      label: 'THE SANCTUARY',
      indexLabel: '04 / 04',
      coordinates: 'CENTRAL HIGHLANDS • SATPURA-MAIKAL LANDSCAPE',
      videoSrc: '/videos/jungle-4.mp4',
      actionLabel: 'Plan Your Safari',
      onAction: onPlanSafari,
    },
  ]

  // Video play/pause helpers
  const playVideo = (idx: number) => {
    const v = videoRefs.current[idx]
    if (v && v.paused) {
      v.play().catch(() => {})
    }
  }

  const pauseVideo = (idx: number) => {
    const v = videoRefs.current[idx]
    if (v && !v.paused) {
      v.pause()
    }
  }

  const pauseAllVideos = () => {
    scenes.forEach((_, idx) => pauseVideo(idx))
  }

  // Smooth programmatic scroll to scene target
  const scrollToScene = (idx: number) => {
    if (isReducedMotion() || !masterScrollTriggerRef.current) {
      const el = document.getElementById(scenes[idx]?.id)
      el?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    const st = masterScrollTriggerRef.current
    // Normalized target progress in the pinned scrub timeline
    const targets = [0.0, 0.333, 0.666, 1.0]
    const targetProgress = targets[idx] ?? 0
    const targetY = st.start + (st.end - st.start) * targetProgress
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  // Master GSAP pinned cinematic documentary transitions
  useEffect(() => {
    const motionPref = isReducedMotion()

    // Play first video initially
    playVideo(0)

    // Reduced motion fallback: simple sequential triggers
    if (motionPref) {
      const triggers: ScrollTrigger[] = []
      scenes.forEach((_, index) => {
        const el = document.getElementById(`scene-${index + 1}`)
        if (!el) return
        const t = ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            setActiveScene(index)
            playVideo(index)
            scenes.forEach((_, other) => {
              if (other !== index) pauseVideo(other)
            })
          },
          onEnterBack: () => {
            setActiveScene(index)
            playVideo(index)
            scenes.forEach((_, other) => {
              if (other !== index) pauseVideo(other)
            })
          },
        })
        triggers.push(t)
      })
      return () => triggers.forEach((t) => t.kill())
    }

    if (!containerRef.current || !stageRef.current) return

    // Scene elements
    const scene1 = sceneRefs.current[0]
    const scene2 = sceneRefs.current[1]
    const scene3 = sceneRefs.current[2]
    const scene4 = sceneRefs.current[3]

    const video1 = videoRefs.current[0]
    const video2 = videoRefs.current[1]
    const video3 = videoRefs.current[2]
    const video4 = videoRefs.current[3]

    const content1 = contentRefs.current[0]
    const content2 = contentRefs.current[1]
    const content3 = contentRefs.current[2]
    const content4 = contentRefs.current[3]

    // Set initial layout & visibility states
    if (scene1) gsap.set(scene1, { opacity: 1, zIndex: 10 })
    if (scene2) {
      gsap.set(scene2, {
        clipPath: 'circle(0% at 50% 50%)',
        opacity: 1,
        zIndex: 20,
      })
    }
    if (scene3) {
      gsap.set(scene3, {
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0,
        zIndex: 30,
      })
    }
    if (scene4) {
      gsap.set(scene4, {
        opacity: 0,
        zIndex: 40,
      })
    }

    if (video1) gsap.set(video1, { scale: 1.0, opacity: 1 })
    if (video2) gsap.set(video2, { scale: 1.08, opacity: 1 })
    if (video3) gsap.set(video3, { scale: 1.06, opacity: 1 })
    if (video4) gsap.set(video4, { scale: 1.14, opacity: 1 })

    // Hide upcoming text content initially
    ;[content2, content3, content4].forEach((c) => {
      if (c) {
        const pill = c.querySelector('.scene-pill')
        const words = c.querySelectorAll('.scene-heading .word-inner')
        const sub = c.querySelector('.scene-subtitle')
        const cta = c.querySelector('.scene-cta')
        if (pill) gsap.set(pill, { opacity: 0, y: -12 })
        if (words.length > 0) gsap.set(words, { opacity: 0, y: '105%', letterSpacing: '0.05em' })
        if (sub) gsap.set(sub, { opacity: 0, y: 20 })
        if (cta) gsap.set(cta, { opacity: 0, y: 15 })
      }
    })

    // Initial load opening reveal for Scene 1
    if (content1) {
      const s1Pill = content1.querySelector('.scene-pill')
      const s1Words = content1.querySelectorAll('.scene-heading .word-inner')
      const s1Sub = content1.querySelector('.scene-subtitle')
      const s1Prompt = content1.querySelector('.scene-prompt')

      if (s1Pill) gsap.fromTo(s1Pill, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      if (s1Words.length > 0) {
        gsap.fromTo(
          s1Words,
          { opacity: 0, y: '105%', letterSpacing: '0.05em' },
          { opacity: 1, y: '0%', letterSpacing: '-0.02em', duration: 0.85, stagger: 0.065, ease: 'power3.out' }
        )
      }
      if (s1Sub) gsap.fromTo(s1Sub, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.75, delay: 0.4, ease: 'power2.out' })
      if (s1Prompt) gsap.fromTo(s1Prompt, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.6, ease: 'power2.out' })
    }

    // Video manager based on scrub progress
    const updatePlayback = (progress: number) => {
      // Determine active scene for HUD and indicators
      let currentScene = 0
      if (progress < 0.22) currentScene = 0
      else if (progress < 0.55) currentScene = 1
      else if (progress < 0.85) currentScene = 2
      else currentScene = 3

      if (currentScene !== activeSceneRef.current) {
        activeSceneRef.current = currentScene
        setActiveScene(currentScene)
      }

      // Smart video pre-roll & play/pause:
      // Never play more than 2 videos simultaneously to preserve memory & GPU
      if (progress < 0.08) {
        playVideo(0)
        pauseVideo(1)
        pauseVideo(2)
        pauseVideo(3)
      } else if (progress < 0.38) {
        playVideo(0)
        playVideo(1)
        pauseVideo(2)
        pauseVideo(3)
      } else if (progress < 0.44) {
        pauseVideo(0)
        playVideo(1)
        pauseVideo(2)
        pauseVideo(3)
      } else if (progress < 0.72) {
        pauseVideo(0)
        playVideo(1)
        playVideo(2)
        pauseVideo(3)
      } else if (progress < 0.78) {
        pauseVideo(0)
        pauseVideo(1)
        playVideo(2)
        pauseVideo(3)
      } else if (progress <= 1.0) {
        pauseVideo(0)
        pauseVideo(1)
        playVideo(2)
        playVideo(3)
      }
    }

    // Master Timeline pinned over 280vh of scroll distance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=280%',
        pin: true,
        scrub: 0.85,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          updatePlayback(self.progress)
        },
        onEnter: () => {
          setIsInStory(true)
          playVideo(activeSceneRef.current)
        },
        onEnterBack: () => {
          setIsInStory(true)
          playVideo(activeSceneRef.current)
        },
        onLeave: () => {
          setIsInStory(false)
          pauseAllVideos()
        },
        onLeaveBack: () => {
          setIsInStory(false)
          pauseAllVideos()
        },
      },
    })

    masterScrollTriggerRef.current = tl.scrollTrigger || null

    // Normalized duration = 3.0 (1.0 unit per transition)
    // =========================================================================
    // TRANSITION 1: Second Video — Expanding Circular Reveal & Scale (t: 0 to 1)
    // =========================================================================
    // Scene 1 text gently drifts up and fades out
    if (content1) {
      tl.to(content1, { y: -25, opacity: 0, duration: 0.22, ease: 'power2.in' }, 0.12)
    }

    // Scene 2 expanding circle mask reveal (0% -> 150%)
    if (scene2) {
      tl.fromTo(
        scene2,
        { clipPath: 'circle(0% at 50% 50%)' },
        { clipPath: 'circle(150% at 50% 50%)', duration: 0.65, ease: 'power2.inOut' },
        0.18
      )
    }

    // Scene 2 video subtle scale down (1.08 -> 1.0)
    if (video2) {
      tl.fromTo(
        video2,
        { scale: 1.08 },
        { scale: 1.0, duration: 0.65, ease: 'power2.out' },
        0.18
      )
    }

    // Scene 1 video dims/fades away underneath
    if (video1) {
      tl.to(video1, { opacity: 0.15, scale: 0.96, duration: 0.5, ease: 'power2.inOut' }, 0.22)
    }

    // Scene 2 text reveals after mask expands
    if (content2) {
      const pill = content2.querySelector('.scene-pill')
      const words = content2.querySelectorAll('.scene-heading .word-inner')
      const sub = content2.querySelector('.scene-subtitle')

      if (pill) {
        tl.fromTo(pill, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.14, ease: 'power2.out' }, 0.62)
      }
      if (words.length > 0) {
        tl.fromTo(
          words,
          { opacity: 0, y: '105%', letterSpacing: '0.05em' },
          { opacity: 1, y: '0%', letterSpacing: '-0.02em', duration: 0.24, stagger: 0.02, ease: 'power3.out' },
          0.66
        )
      }
      if (sub) {
        tl.fromTo(sub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.74)
      }
    }

    // =========================================================================
    // TRANSITION 2: Third Video — Layered Cross-Transition (t: 1 to 2)
    // =========================================================================
    // Scene 2 text fades out upward
    if (content2) {
      tl.to(content2, { y: -25, opacity: 0, duration: 0.22, ease: 'power2.in' }, 1.12)
    }

    // Scene 3 layered cross-transition:
    // Vertical clip-path wipe + cross-fade + scale settle
    if (scene3) {
      tl.fromTo(
        scene3,
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
        { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.62, ease: 'power2.inOut' },
        1.22
      )
    }

    // Scene 3 video subtle scale (1.06 -> 1.0)
    if (video3) {
      tl.fromTo(
        video3,
        { scale: 1.06 },
        { scale: 1.0, duration: 0.62, ease: 'power2.out' },
        1.22
      )
    }

    // Scene 2 video fades out underneath, creating soft documentary dissolve
    if (video2) {
      tl.to(video2, { opacity: 0, scale: 0.97, duration: 0.48, ease: 'power2.inOut' }, 1.32)
    }

    // Scene 3 text reveals as scene 3 becomes visible
    if (content3) {
      const pill = content3.querySelector('.scene-pill')
      const words = content3.querySelectorAll('.scene-heading .word-inner')
      const sub = content3.querySelector('.scene-subtitle')
      const cta = content3.querySelector('.scene-cta')

      if (pill) {
        tl.fromTo(pill, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.14, ease: 'power2.out' }, 1.62)
      }
      if (words.length > 0) {
        tl.fromTo(
          words,
          { opacity: 0, y: '105%', letterSpacing: '0.05em' },
          { opacity: 1, y: '0%', letterSpacing: '-0.02em', duration: 0.24, stagger: 0.02, ease: 'power3.out' },
          1.66
        )
      }
      if (sub) {
        tl.fromTo(sub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 1.74)
      }
      if (cta) {
        tl.fromTo(cta, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }, 1.80)
      }
    }

    // =========================================================================
    // TRANSITION 3: Fourth Video — Immersive Scene Change (t: 2 to 3)
    // =========================================================================
    // Scene 3 text fades out upward
    if (content3) {
      tl.to(content3, { y: -25, opacity: 0, duration: 0.22, ease: 'power2.in' }, 2.12)
    }

    // Scene 4 slow zoom with layered fade gradually filling the viewport
    if (scene4) {
      tl.fromTo(
        scene4,
        { opacity: 0 },
        { opacity: 1, duration: 0.58, ease: 'power2.inOut' },
        2.22
      )
    }

    // Scene 4 video slow zoom (1.14 -> 1.0)
    if (video4) {
      tl.fromTo(
        video4,
        { scale: 1.14 },
        { scale: 1.0, duration: 0.65, ease: 'power2.out' },
        2.22
      )
    }

    // Scene 3 fades away completely underneath
    if (scene3) {
      tl.to(scene3, { opacity: 0, duration: 0.45, ease: 'power2.inOut' }, 2.32)
    }

    // ONLY AFTER Scene 4 is prominently visible, reveal its heading & content
    if (content4) {
      const pill = content4.querySelector('.scene-pill')
      const words = content4.querySelectorAll('.scene-heading .word-inner')
      const sub = content4.querySelector('.scene-subtitle')
      const cta = content4.querySelector('.scene-cta')

      if (pill) {
        tl.fromTo(pill, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.14, ease: 'power2.out' }, 2.68)
      }
      if (words.length > 0) {
        tl.fromTo(
          words,
          { opacity: 0, y: '105%', letterSpacing: '0.05em' },
          { opacity: 1, y: '0%', letterSpacing: '-0.02em', duration: 0.24, stagger: 0.02, ease: 'power3.out' },
          2.72
        )
      }
      if (sub) {
        tl.fromTo(sub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 2.80)
      }
      if (cta) {
        tl.fromTo(cta, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }, 2.86)
      }
    }

    return () => {
      tl.kill()
      ScrollTrigger.refresh()
    }
  }, [])

  // Listen for navigation events from navbar
  useEffect(() => {
    const handleNavEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>
      if (customEvent.detail && typeof customEvent.detail.index === 'number') {
        scrollToScene(customEvent.detail.index)
      }
    }

    window.addEventListener('safari:scrollToScene', handleNavEvent)
    return () => window.removeEventListener('safari:scrollToScene', handleNavEvent)
  }, [])

  return (
    <div
      ref={containerRef}
      id="cinematic-story"
      className="relative w-full bg-[#060b08]"
    >
      {/* Pinned Stage Viewport */}
      <div
        ref={stageRef}
        className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-[#060b08]"
      >
        {/* Floating Global Cinematic HUD / Progress Bar */}
        <div
          className={`fixed left-8 md:left-12 bottom-12 z-50 transition-opacity duration-500 pointer-events-none ${
            !isInStory ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-[#c5a059]">
            <span className="font-semibold">{scenes[activeScene]?.indexLabel}</span>
            <span className="w-8 h-[1px] bg-[#c5a059]/40" />
            <span className="text-white/60 tracking-[0.25em] text-[10px] uppercase">
              {scenes[activeScene]?.label}
            </span>
          </div>
          <p className="text-[10px] text-white/40 font-mono tracking-wider mt-1">
            {scenes[activeScene]?.coordinates}
          </p>
        </div>

        {/* Floating Right Scene Dots */}
        <div
          className={`fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-5 transition-opacity duration-500 ${
            !isInStory ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {scenes.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => scrollToScene(idx)}
              className="group flex items-center justify-end gap-3 text-right focus:outline-none"
              aria-label={`Go to scene ${idx + 1}: ${s.title}`}
            >
              <span
                className={`text-[9px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeScene === idx
                    ? 'text-[#c5a059] opacity-100 font-semibold'
                    : 'text-white/30 opacity-0 group-hover:opacity-100'
                }`}
              >
                {s.label}
              </span>
              <span
                className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                  activeScene === idx
                    ? 'bg-[#c5a059] border-[#c5a059] scale-125 shadow-[0_0_12px_rgba(197,160,89,0.7)]'
                    : 'bg-transparent border-white/30 group-hover:border-white/70'
                }`}
              />
            </button>
          ))}
        </div>

        {/* 4 Layered Cinematic Video Scenes */}
        {scenes.map((scene, idx) => (
          <section
            key={scene.id}
            id={scene.id}
            ref={(el) => {
              sceneRefs.current[idx] = el
            }}
            className={`scene-slide absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden ${
              idx === 0 ? 'z-10' : idx === 1 ? 'z-20' : idx === 2 ? 'z-30' : 'z-40'
            }`}
          >
            {/* Full-bleed Video Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <video
                ref={(el) => {
                  videoRefs.current[idx] = el
                }}
                src={scene.videoSrc}
                muted
                playsInline
                loop
                preload="metadata"
                className="w-full h-full object-cover select-none pointer-events-none will-change-transform"
              />

              {/* Cinematic Gradient Overlays for Razor-Sharp Typography & Mood */}
              <div className="absolute inset-0 bg-radial-vignette opacity-75 pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#060b08]/90 via-[#060b08]/40 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#060b08] via-[#060b08]/50 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-[#060b08]/30 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 film-grain pointer-events-none opacity-40" />
            </div>

            {/* Minimalist Scene Content Overlay */}
            <div
              ref={(el) => {
                contentRefs.current[idx] = el
              }}
              className="scene-content relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center"
            >
              {/* Section Category Pill */}
              <div className="scene-pill inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#060b08]/50 backdrop-blur-md mb-6">
                <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-medium">
                  {scene.label}
                </span>
              </div>

              {/* Majestic Headline with Word Reveal */}
              <WordReveal
                as="h1"
                className="scene-heading font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#f7f4ed] tracking-[-0.02em] leading-[1.05] drop-shadow-2xl max-w-4xl"
                text={scene.title}
              />

              {/* Subtle, restrained supporting sentence */}
              <p className="scene-subtitle mt-5 sm:mt-6 font-sans-ui text-sm sm:text-base md:text-lg text-[#f7f4ed]/85 font-light tracking-[0.04em] max-w-xl mx-auto leading-relaxed drop-shadow-md">
                {scene.subtitle}
              </p>

              {/* Optional Call to Action */}
              {scene.actionLabel && (
                <div className="scene-cta mt-8 sm:mt-10 flex items-center gap-4">
                  <button
                    onClick={scene.onAction}
                    className="btn-gold px-8 py-3.5 rounded-full text-xs font-semibold tracking-[0.2em] flex items-center gap-3 group"
                  >
                    <span>{scene.actionLabel}</span>
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              )}

              {/* Scene 1: Initial Discovery prompt */}
              {idx === 0 && (
                <div className="scene-prompt mt-12 flex flex-col items-center">
                  <button
                    onClick={() => scrollToScene(1)}
                    className="group flex flex-col items-center gap-2 text-white/60 hover:text-[#c5a059] transition-colors focus:outline-none"
                    aria-label="Scroll to explore"
                  >
                    <span className="animated-underline text-[10px] uppercase tracking-[0.3em] font-medium">
                      Scroll To Explore
                    </span>
                    <div className="w-7 h-11 rounded-full border border-white/20 group-hover:border-[#c5a059] flex items-start justify-center p-1.5 transition-colors">
                      <span className="w-1 h-2 rounded-full bg-[#c5a059] animate-bounce" />
                    </div>
                  </button>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
