import { useEffect, useRef, useState, useCallback } from 'react'
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
  poster: string
  actionLabel?: string
  onAction?: () => void
}

const BASE_SCENES = [
  {
    id: 'scene-1',
    title: 'Into The Wild',
    subtitle: 'Discover a different kind of escape.',
    label: 'PROLOGUE',
    indexLabel: '01 / 04',
    coordinates: '22°20\'00"N 80°37\'00"E • KANHA TIGER RESERVE',
    videoSrc: '/videos/jungle-1.mp4',
    poster: '/images/forest-canopy.jpg',
  },
  {
    id: 'scene-2',
    title: 'Nature, Untamed',
    subtitle: 'Where ancient rhythms dictate every breath of the earth.',
    label: 'THE WILDERNESS',
    indexLabel: '02 / 04',
    coordinates: '21°42\'00"N 79°18\'00"E • PENCH TIGER RESERVE',
    videoSrc: '/videos/jungle-2.mp4',
    poster: '/images/forest-river.jpg',
  },
  {
    id: 'scene-3',
    title: 'Every Journey, A Story',
    subtitle: 'Guided across wild horizons where few have walked.',
    label: 'THE EXPEDITION',
    indexLabel: '03 / 04',
    coordinates: '20°14\'00"N 79°24\'00"E • TADOBA-ANDHARI TIGER RESERVE',
    videoSrc: '/videos/jungle-3.mp4',
    poster: '/images/wildlife-tiger.jpg',
    actionLabel: 'Explore Safaris',
  },
  {
    id: 'scene-4',
    title: 'Your Wild Escape Awaits',
    subtitle: 'Bespoke lodges, private air safaris, and untamed stillness.',
    label: 'THE SANCTUARY',
    indexLabel: '04 / 04',
    coordinates: 'CENTRAL HIGHLANDS • SATPURA-MAIKAL LANDSCAPE',
    videoSrc: '/videos/jungle-4.mp4',
    poster: '/images/forest-lodge.jpg',
    actionLabel: 'Plan Your Safari',
  },
] as const

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
  const [videoFrameReady, setVideoFrameReady] = useState<boolean[]>([false, false, false, false])

  const scenes: SceneData[] = [
    { ...BASE_SCENES[0] },
    { ...BASE_SCENES[1] },
    { ...BASE_SCENES[2], onAction: onExploreSafaris },
    { ...BASE_SCENES[3], onAction: onPlanSafari },
  ]

  // Mark video as ready only when it has decoded a valid frame (readyState >= 2) and is actively playing
  const handleVideoReady = useCallback((idx: number) => {
    const v = videoRefs.current[idx]
    if (v && v.readyState >= 2 && !v.paused) {
      setVideoFrameReady((prev) => {
        if (prev[idx]) return prev
        const next = [...prev]
        next[idx] = true
        return next
      })
    }
  }, [])

  // On playback error, retain poster fallback
  const handleVideoError = useCallback((idx: number) => {
    setVideoFrameReady((prev) => {
      if (!prev[idx]) return prev
      const next = [...prev]
      next[idx] = false
      return next
    })
  }, [])

  // Video play/pause helpers memoized for stable references
  const playVideo = useCallback((idx: number) => {
    const v = videoRefs.current[idx]
    if (v && v.paused) {
      const p = v.play()
      if (p !== undefined) {
        p.catch(() => {})
      }
    }
  }, [])

  // Early pre-warmer: sets preload='auto' and initiates playback before the scene becomes visible
  const prepareVideo = useCallback((idx: number) => {
    const v = videoRefs.current[idx]
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

  const pauseVideo = useCallback((idx: number) => {
    const v = videoRefs.current[idx]
    if (v && !v.paused) {
      v.pause()
    }
  }, [])

  const pauseAllVideos = useCallback(() => {
    BASE_SCENES.forEach((_, idx) => pauseVideo(idx))
  }, [pauseVideo])

  // Smooth programmatic scroll to scene target on both mobile and desktop
  const scrollToScene = useCallback((idx: number) => {
    if (isReducedMotion() || window.innerWidth < 1024 || !masterScrollTriggerRef.current) {
      const el = document.getElementById(BASE_SCENES[idx]?.id)
      el?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    const st = masterScrollTriggerRef.current
    const targets = [0.0, 0.38, 0.70, 1.0]
    const targetProgress = targets[idx] ?? 0
    const targetY = st.start + (st.end - st.start) * targetProgress
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }, [])

  // Master GSAP animations with matchMedia (Desktop Pinned Transitions vs Mobile Sequential Full-Screen Scenes)
  useEffect(() => {
    const motionPref = isReducedMotion()

    // Play first video initially
    playVideo(0)

    if (motionPref) {
      // Reduced motion: basic visibility without movement
      const triggers: ScrollTrigger[] = []
      BASE_SCENES.forEach((_, index) => {
        const el = document.getElementById(`scene-${index + 1}`)
        if (!el) return
        const t = ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            setActiveScene(index)
            prepareVideo(index)
            BASE_SCENES.forEach((_, other) => {
              if (other !== index) pauseVideo(other)
            })
          },
          onEnterBack: () => {
            setActiveScene(index)
            prepareVideo(index)
            BASE_SCENES.forEach((_, other) => {
              if (other !== index) pauseVideo(other)
            })
          },
        })
        triggers.push(t)
      })
      return () => triggers.forEach((t) => t.kill())
    }

    if (!containerRef.current || !stageRef.current) return

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

    // Initial Scene 1 opening animation on load (both mobile and desktop)
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

    const mm = gsap.matchMedia()

    // =========================================================================
    // 1. DESKTOP EXPERIENCE (min-width: 1024px)
    // Pinned documentary master transitions: expanding circular mask, vertical cross-wipe, slow zoom
    // =========================================================================
    mm.add('(min-width: 1024px)', () => {
      // Set initial desktop states
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

      // Hide upcoming desktop content initially
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

      const updatePlayback = (progress: number) => {
        let currentScene = 0
        if (progress < 0.22) currentScene = 0
        else if (progress < 0.55) currentScene = 1
        else if (progress < 0.85) currentScene = 2
        else currentScene = 3

        if (currentScene !== activeSceneRef.current) {
          activeSceneRef.current = currentScene
          setActiveScene(currentScene)
        }

        // Scene 1: active until Scene 2 circle fully covers it (~0.28)
        if (progress < 0.28) {
          playVideo(0)
        } else {
          pauseVideo(0)
        }

        // Scene 2: pre-warmed right from initial scroll movement (0.005), active through Scene 2 until Scene 3 covers (~0.58)
        if (progress >= 0.005 && progress < 0.58) {
          prepareVideo(1)
        } else {
          pauseVideo(1)
        }

        // Scene 3: pre-warmed early at 0.20 (well before wipe starts at 0.40), active through Scene 3 until Scene 4 covers (~0.85)
        if (progress >= 0.20 && progress < 0.85) {
          prepareVideo(2)
        } else {
          pauseVideo(2)
        }

        // Scene 4: pre-warmed early at 0.52 (well before fade starts at 0.73), active through Sanctuary
        if (progress >= 0.52) {
          prepareVideo(3)
        } else {
          pauseVideo(3)
        }
      }

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

      // TRANSITION 1: Second Video — Expanding Circular Reveal & Scale (t: 0 to 1)
      if (content1) {
        tl.to(content1, { y: -25, opacity: 0, duration: 0.22, ease: 'power2.in' }, 0.12)
      }
      if (scene2) {
        tl.fromTo(
          scene2,
          { clipPath: 'circle(0% at 50% 50%)' },
          { clipPath: 'circle(150% at 50% 50%)', duration: 0.65, ease: 'power2.inOut' },
          0.18
        )
      }
      if (video2) {
        tl.fromTo(
          video2,
          { scale: 1.08 },
          { scale: 1.0, duration: 0.65, ease: 'power2.out' },
          0.18
        )
      }
      if (video1) {
        tl.to(video1, { opacity: 0.15, scale: 0.96, duration: 0.5, ease: 'power2.inOut' }, 0.22)
      }
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

      // TRANSITION 2: Third Video — Layered Cross-Transition (t: 1 to 2)
      if (content2) {
        tl.to(content2, { y: -25, opacity: 0, duration: 0.22, ease: 'power2.in' }, 1.12)
      }
      if (scene3) {
        tl.fromTo(
          scene3,
          { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.62, ease: 'power2.inOut' },
          1.22
        )
      }
      if (video3) {
        tl.fromTo(
          video3,
          { scale: 1.06 },
          { scale: 1.0, duration: 0.62, ease: 'power2.out' },
          1.22
        )
      }
      if (video2) {
        tl.to(video2, { opacity: 0, scale: 0.97, duration: 0.48, ease: 'power2.inOut' }, 1.32)
      }
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

      // TRANSITION 3: Fourth Video — Immersive Scene Change (t: 2 to 3)
      if (content3) {
        tl.to(content3, { y: -25, opacity: 0, duration: 0.22, ease: 'power2.in' }, 2.12)
      }
      if (scene4) {
        tl.fromTo(
          scene4,
          { opacity: 0 },
          { opacity: 1, duration: 0.58, ease: 'power2.inOut' },
          2.22
        )
      }
      if (video4) {
        tl.fromTo(
          video4,
          { scale: 1.14 },
          { scale: 1.0, duration: 0.65, ease: 'power2.out' },
          2.22
        )
      }
      if (scene3) {
        tl.to(scene3, { opacity: 0, duration: 0.45, ease: 'power2.inOut' }, 2.32)
      }
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
    })

    // =========================================================================
    // 2. MOBILE EXPERIENCE (max-width: 1023px)
    // Discrete sequential full-screen (100svh) sections that appear ONE AFTER ANOTHER
    // Native touch scroll with smooth video reveals, safe opacity, and scale transitions
    // =========================================================================
    mm.add('(max-width: 1023px)', () => {
      // Configure ScrollTrigger for mobile dynamic address bars
      ScrollTrigger.config({ ignoreMobileResize: true })

      // Clear desktop properties so scenes render in natural vertical flow without clipping
      gsap.set([scene1, scene2, scene3, scene4], {
        clearProps: 'clipPath,zIndex,opacity,transform,position',
      })
      gsap.set([video1, video2, video3, video4], {
        clearProps: 'transform,scale,opacity',
      })

      // Setup clean per-scene triggers for early lookahead video pre-warming & active HUD tracking
      BASE_SCENES.forEach((_, idx) => {
        const scEl = sceneRefs.current[idx]
        if (!scEl) return

        // 1. Lookahead pre-warming trigger: prepares and starts video BEFORE it enters viewport
        ScrollTrigger.create({
          trigger: scEl,
          start: 'top 130%', // Pre-warm 30% vh before entering from bottom
          end: 'bottom -30%', // Keep warm until 30% vh after leaving through top
          onEnter: () => {
            prepareVideo(idx)
          },
          onEnterBack: () => {
            prepareVideo(idx)
          },
          onLeave: () => {
            pauseVideo(idx)
          },
          onLeaveBack: () => {
            pauseVideo(idx)
          },
        })

        // 2. Active Scene & HUD tracker: updates coordinates when scene center is in view
        ScrollTrigger.create({
          trigger: scEl,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => {
            setActiveScene(idx)
          },
          onEnterBack: () => {
            setActiveScene(idx)
          },
        })

        // Text reveal animation on mobile (Scenes 2, 3, 4)
        if (idx > 0) {
          const c = contentRefs.current[idx]
          if (c) {
            const pill = c.querySelector('.scene-pill')
            const words = c.querySelectorAll('.scene-heading .word-inner')
            const sub = c.querySelector('.scene-subtitle')
            const cta = c.querySelector('.scene-cta')

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: scEl,
                start: 'top 65%',
                toggleActions: 'play none none reverse',
              },
            })

            if (pill) tl.fromTo(pill, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4 }, 0)
            if (words.length > 0) {
              tl.fromTo(
                words,
                { opacity: 0, y: '80%' },
                { opacity: 1, y: '0%', duration: 0.65, stagger: 0.035, ease: 'power2.out' },
                0.08
              )
            }
            if (sub) tl.fromTo(sub, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 0.22)
            if (cta) tl.fromTo(cta, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45 }, 0.3)
          }
        }

        // Gentle, hardware-accelerated subtle zoom without destructive clipping
        const v = videoRefs.current[idx]
        if (v) {
          gsap.fromTo(
            v,
            { scale: 1.05 },
            {
              scale: 1.0,
              ease: 'none',
              scrollTrigger: {
                trigger: scEl,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          )
        }
      })

      // Hide HUD and pause all videos when scrolled past story into Forest Journey on mobile
      if (containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          onEnter: () => setIsInStory(true),
          onEnterBack: () => setIsInStory(true),
          onLeave: () => {
            setIsInStory(false)
            pauseAllVideos()
          },
          onLeaveBack: () => {
            setIsInStory(false)
            pauseAllVideos()
          },
        })
      }
    })

    // Recalculate ScrollTrigger on font load and video metadata load
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh()
      })
    }

    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      mm.revert()
      ScrollTrigger.refresh()
    }
  }, [playVideo, prepareVideo, pauseVideo, pauseAllVideos, handleVideoReady])

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
  }, [scrollToScene])

  // Pause videos when browser tab is hidden and resume active video on tab return
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseAllVideos()
      } else if (isInStory) {
        playVideo(activeSceneRef.current)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isInStory, pauseAllVideos, playVideo])

  return (
    <div
      ref={containerRef}
      id="cinematic-story"
      className="relative w-full bg-[#060b08]"
    >
      {/* Pinned Stage Viewport on Desktop; Natural Sequential Scroll on Mobile */}
      <div
        ref={stageRef}
        className="relative w-full h-auto lg:h-[100svh] overflow-visible lg:overflow-hidden bg-[#060b08]"
      >
        {/* Floating Global Cinematic HUD / Progress Bar */}
        <div
          className={`fixed left-4 bottom-5 sm:left-8 sm:bottom-10 md:left-12 md:bottom-12 z-50 transition-opacity duration-500 pointer-events-none ${
            !isInStory ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="flex items-center gap-2.5 sm:gap-4 text-[10px] sm:text-xs font-mono tracking-widest text-[#c5a059]">
            <span className="font-semibold">{scenes[activeScene]?.indexLabel}</span>
            <span className="w-5 sm:w-8 h-[1px] bg-[#c5a059]/40" />
            <span className="text-white/60 tracking-[0.2em] sm:tracking-[0.25em] text-[9px] sm:text-[10px] uppercase">
              {scenes[activeScene]?.label}
            </span>
          </div>
          <p className="text-[9px] sm:text-[10px] text-white/40 font-mono tracking-wider mt-0.5 sm:mt-1 truncate max-w-[280px] sm:max-w-none">
            {scenes[activeScene]?.coordinates}
          </p>
        </div>

        {/* Floating Right Scene Dots (Desktop / Tablet only) */}
        <div
          className={`fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-5 transition-opacity duration-500 ${
            !isInStory ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {scenes.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => scrollToScene(idx)}
              className="group flex items-center justify-end gap-3 text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] rounded-full p-1"
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

        {/* 4 Cinematic Scenes:
            On Mobile: 4 consecutive full-screen (100svh with 100vh fallback) sections that appear ONE AFTER ANOTHER.
            On Desktop: 4 layered pinned scenes with expanding lens, crossfade, and slow-zoom. */}
        {scenes.map((scene, idx) => (
          <section
            key={scene.id}
            id={scene.id}
            ref={(el) => {
              sceneRefs.current[idx] = el
            }}
            className={`scene-slide relative lg:absolute lg:inset-0 w-full h-mobile-fullscreen flex items-center justify-center overflow-hidden ${
              idx === 0 ? 'lg:z-10' : idx === 1 ? 'lg:z-20' : idx === 2 ? 'lg:z-30' : 'lg:z-40'
            }`}
            style={{
              minHeight: '100vh',
              height: '100svh',
            }}
          >
            {/* Full-bleed Video Background with Controlled Poster Handoff */}
            <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#060b08]">
              {/* 1. Underlying Poster Fallback (Guarantees no black screen or blank frame ever) */}
              <img
                src={scene.poster}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />

              {/* 2. Active Video Layer (Plays seamlessly underneath controlled overlay) */}
              <video
                ref={(el) => {
                  videoRefs.current[idx] = el
                }}
                src={scene.videoSrc}
                muted
                playsInline
                loop
                preload={idx === 0 ? 'auto' : 'metadata'}
                onLoadedMetadata={() => ScrollTrigger.refresh()}
                onLoadedData={() => handleVideoReady(idx)}
                onPlaying={() => handleVideoReady(idx)}
                onTimeUpdate={() => handleVideoReady(idx)}
                onError={() => handleVideoError(idx)}
                className="absolute inset-0 z-0 w-full h-full object-cover select-none pointer-events-none will-change-transform"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* 3. Controlled Poster Overlay: fades out smoothly only when video is actively playing frames */}
              <div
                className={`absolute inset-0 z-10 transition-opacity duration-700 ease-out pointer-events-none ${
                  videoFrameReady[idx] ? 'opacity-0' : 'opacity-100'
                }`}
                aria-hidden="true"
              >
                <img
                  src={scene.poster}
                  alt={scene.title}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>

              {/* 4. Cinematic Gradient Overlays for High Legibility on Mobile & Desktop */}
              <div className="absolute inset-0 z-20 bg-radial-vignette opacity-75 sm:opacity-75 pointer-events-none" />
              <div className="absolute inset-x-0 top-0 z-20 h-28 sm:h-40 bg-gradient-to-b from-[#060b08]/90 via-[#060b08]/50 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 z-20 h-36 sm:h-48 bg-gradient-to-t from-[#060b08] via-[#060b08]/60 to-transparent pointer-events-none" />
              <div className="absolute inset-0 z-20 bg-[#060b08]/30 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 z-20 film-grain pointer-events-none opacity-30 sm:opacity-40" />
            </div>

            {/* Minimalist Scene Content Overlay */}
            <div
              ref={(el) => {
                contentRefs.current[idx] = el
              }}
              className="scene-content relative z-30 max-w-5xl mx-auto px-4 sm:px-6 md:px-12 text-center flex flex-col items-center justify-center pt-6 sm:pt-0"
            >
              {/* Section Category Pill */}
              <div className="scene-pill inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#060b08]/70 backdrop-blur-md mb-3 sm:mb-6">
                <Compass className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#c5a059]" />
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#c5a059] font-medium">
                  {scene.label}
                </span>
              </div>

              {/* Majestic Headline with Word Reveal - Single semantic H1 for Scene 1, H2 for Scenes 2-4 */}
              <WordReveal
                as={idx === 0 ? 'h1' : 'h2'}
                className="scene-heading font-serif-luxury text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-[#f7f4ed] tracking-tight sm:tracking-[-0.02em] leading-[1.12] drop-shadow-2xl max-w-[300px] sm:max-w-xl md:max-w-3xl lg:max-w-4xl"
                text={scene.title}
              />

              {/* Subtle, restrained supporting sentence */}
              <p className="scene-subtitle mt-2.5 sm:mt-5 font-sans-ui text-xs sm:text-sm md:text-base lg:text-lg text-[#f7f4ed]/85 font-light tracking-[0.02em] sm:tracking-[0.03em] max-w-[280px] sm:max-w-md md:max-w-xl mx-auto leading-relaxed drop-shadow-md">
                {scene.subtitle}
              </p>

              {/* Optional Call to Action Button */}
              {scene.actionLabel && (
                <div className="scene-cta mt-6 sm:mt-8 md:mt-10 flex items-center justify-center gap-4">
                  <button
                    onClick={scene.onAction}
                    className="btn-gold px-7 sm:px-8 py-3 sm:py-3.5 min-h-[44px] rounded-full text-xs font-semibold tracking-[0.2em] flex items-center justify-center gap-2.5 sm:gap-3 group"
                  >
                    <span>{scene.actionLabel}</span>
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              )}

              {/* Scene 1: Initial Discovery prompt */}
              {idx === 0 && (
                <div className="scene-prompt mt-8 sm:mt-12 flex flex-col items-center">
                  <button
                    onClick={() => scrollToScene(1)}
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
        ))}
      </div>
    </div>
  )
}
