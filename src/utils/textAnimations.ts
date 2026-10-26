import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Checks if the user prefers reduced motion
 */
export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Premium cinematic text animation for full-screen narrative scenes
 * (Used in CinematicStory and ForestJourney full-bleed scenes)
 */
export function setupSceneTextAnimation(
  sceneEl: HTMLElement,
  options: {
    isFirstScene?: boolean
    headingRestingTracking?: string
  } = {}
) {
  if (isReducedMotion()) return null

  const contentEl = sceneEl.querySelector<HTMLElement>('.scene-content')
  if (!contentEl) return null

  const pillEl = contentEl.querySelector<HTMLElement>('.scene-pill')
  const headingWords = contentEl.querySelectorAll<HTMLElement>('.scene-heading .word-inner')
  const subtitleEl = contentEl.querySelector<HTMLElement>('.scene-subtitle')
  const ctaEl = contentEl.querySelector<HTMLElement>('.scene-cta')
  const promptEl = contentEl.querySelector<HTMLElement>('.scene-prompt')

  // Set initial states to prevent flash
  gsap.set(contentEl, { opacity: 1, y: 0 })
  if (pillEl) gsap.set(pillEl, { opacity: 0, y: -12 })
  if (headingWords.length > 0) {
    gsap.set(headingWords, {
      opacity: 0,
      y: '105%',
      letterSpacing: '0.06em',
    })
  }
  if (subtitleEl) gsap.set(subtitleEl, { opacity: 0, y: 22 })
  if (ctaEl) gsap.set(ctaEl, { opacity: 0, y: 16 })
  if (promptEl) gsap.set(promptEl, { opacity: 0, y: 16 })

  const restingTracking = options.headingRestingTracking || '-0.02em'

  // Master entrance timeline
  const playEntrance = () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // 1. Category Pill Drop & Fade
    if (pillEl) {
      tl.to(
        pillEl,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        0
      )
    }

    // 2. Heading Word-by-Word Reveal with subtle letter-spacing animation
    if (headingWords.length > 0) {
      tl.to(
        headingWords,
        {
          opacity: 1,
          y: '0%',
          letterSpacing: restingTracking,
          duration: 0.85,
          stagger: 0.065,
          ease: 'power3.out',
        },
        pillEl ? 0.15 : 0
      )
    }

    // 3. Subtitle / Paragraph Fade with small vertical movement
    if (subtitleEl) {
      tl.to(
        subtitleEl,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
        },
        '-=0.45'
      )
    }

    // 4. CTA / Exploration Action Button
    if (ctaEl) {
      tl.to(
        ctaEl,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
        },
        '-=0.35'
      )
    }

    // 5. Scene 1 Scroll Prompt
    if (promptEl) {
      tl.to(
        promptEl,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
        },
        '-=0.25'
      )
    }

    return tl
  }

  // Scroll exit and enter triggers
  const trigger = ScrollTrigger.create({
    trigger: sceneEl,
    start: 'top 75%',
    end: 'bottom 15%',
    onEnter: () => {
      gsap.to(contentEl, { opacity: 1, y: 0, duration: 0.3 })
      playEntrance()
    },
    onLeave: () => {
      // Smooth upward drift and gentle fade as user scrolls past section downwards
      gsap.to(contentEl, {
        opacity: 0,
        y: -28,
        duration: 0.5,
        ease: 'power2.inOut',
        overwrite: 'auto',
      })
    },
    onEnterBack: () => {
      // Re-enter smoothly when scrolling back up into section
      gsap.to(contentEl, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      // Ensure words and text are fully visible
      if (headingWords.length > 0) {
        gsap.to(headingWords, {
          opacity: 1,
          y: '0%',
          letterSpacing: restingTracking,
          duration: 0.4,
          stagger: 0.02,
        })
      }
      if (subtitleEl) gsap.to(subtitleEl, { opacity: 1, y: 0, duration: 0.4 })
      if (ctaEl) gsap.to(ctaEl, { opacity: 1, y: 0, duration: 0.4 })
      if (pillEl) gsap.to(pillEl, { opacity: 1, y: 0, duration: 0.4 })
    },
    onLeaveBack: () => {
      // Smooth downward drift and fade when scrolling back up above section
      if (!options.isFirstScene) {
        gsap.to(contentEl, {
          opacity: 0,
          y: 28,
          duration: 0.5,
          ease: 'power2.inOut',
          overwrite: 'auto',
        })
      }
    },
  })

  // If first scene is already in viewport on load, play immediately
  if (options.isFirstScene && ScrollTrigger.isInViewport(sceneEl)) {
    playEntrance()
  }

  return trigger
}

/**
 * Elegant section header scroll reveal (for Destinations, Experiences, Enquiry)
 */
export function setupSectionHeaderAnimation(
  containerEl: HTMLElement,
  options: {
    startOffset?: string
    headingRestingTracking?: string
  } = {}
) {
  if (isReducedMotion()) return null

  const pillEl = containerEl.querySelector<HTMLElement>('.section-header-pill')
  const headingWords = containerEl.querySelectorAll<HTMLElement>(
    '.section-header-heading .word-inner'
  )
  const paragraphEl = containerEl.querySelector<HTMLElement>('.section-header-paragraph')

  // Set initial states
  if (pillEl) gsap.set(pillEl, { opacity: 0, y: -12 })
  if (headingWords.length > 0) {
    gsap.set(headingWords, {
      opacity: 0,
      y: '105%',
      letterSpacing: '0.04em',
    })
  }
  if (paragraphEl) gsap.set(paragraphEl, { opacity: 0, y: 20 })

  const restingTracking = options.headingRestingTracking || '-0.01em'

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power3.out' },
  })

  if (pillEl) {
    tl.to(pillEl, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0)
  }

  if (headingWords.length > 0) {
    tl.to(
      headingWords,
      {
        opacity: 1,
        y: '0%',
        letterSpacing: restingTracking,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
      },
      pillEl ? 0.12 : 0
    )
  }

  if (paragraphEl) {
    tl.to(
      paragraphEl,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
      },
      '-=0.4'
    )
  }

  return ScrollTrigger.create({
    trigger: containerEl,
    start: options.startOffset || 'top 85%',
    onEnter: () => tl.play(),
    onLeaveBack: () => tl.reverse(),
  })
}

/**
 * Staggered text reveals for Destination Titles (Kanha, Pench, Tadoba-Andhari)
 */
export function setupDestinationTitlesAnimation(
  cardsContainerEl: HTMLElement
) {
  if (isReducedMotion()) return null

  const cards = cardsContainerEl.querySelectorAll<HTMLElement>('.destination-card')
  if (cards.length === 0) return null

  // Collect each card's components
  cards.forEach((card) => {
    const meta = card.querySelector<HTMLElement>('.destination-card-meta')
    const titleWords = card.querySelectorAll<HTMLElement>('.destination-card-title .word-inner')
    const desc = card.querySelector<HTMLElement>('.destination-card-desc')
    const tags = card.querySelectorAll<HTMLElement>('.destination-card-tag')
    const footer = card.querySelector<HTMLElement>('.destination-card-footer')

    if (meta) gsap.set(meta, { opacity: 0, y: -8 })
    if (titleWords.length > 0) {
      gsap.set(titleWords, {
        opacity: 0,
        y: '105%',
        letterSpacing: '0.04em',
      })
    }
    if (desc) gsap.set(desc, { opacity: 0, y: 12 })
    if (tags.length > 0) gsap.set(tags, { opacity: 0, y: 8 })
    if (footer) gsap.set(footer, { opacity: 0, y: 10 })
  })

  const masterTl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power3.out' },
  })

  cards.forEach((card, cardIdx) => {
    const cardStartTime = cardIdx * 0.22 // Stagger between cards

    const meta = card.querySelector<HTMLElement>('.destination-card-meta')
    const titleWords = card.querySelectorAll<HTMLElement>('.destination-card-title .word-inner')
    const desc = card.querySelector<HTMLElement>('.destination-card-desc')
    const tags = card.querySelectorAll<HTMLElement>('.destination-card-tag')
    const footer = card.querySelector<HTMLElement>('.destination-card-footer')

    if (meta) {
      masterTl.to(
        meta,
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        cardStartTime
      )
    }

    if (titleWords.length > 0) {
      masterTl.to(
        titleWords,
        {
          opacity: 1,
          y: '0%',
          letterSpacing: '-0.01em',
          duration: 0.75,
          stagger: 0.05,
          ease: 'power3.out',
        },
        cardStartTime + 0.1
      )
    }

    if (desc) {
      masterTl.to(
        desc,
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        cardStartTime + 0.3
      )
    }

    if (tags.length > 0) {
      masterTl.to(
        tags,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.03,
          ease: 'power2.out',
        },
        cardStartTime + 0.38
      )
    }

    if (footer) {
      masterTl.to(
        footer,
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        cardStartTime + 0.45
      )
    }
  })

  return ScrollTrigger.create({
    trigger: cardsContainerEl,
    start: 'top 80%',
    onEnter: () => masterTl.play(),
    onLeaveBack: () => masterTl.reverse(),
  })
}

/**
 * Staggered text reveals for Experiences Section Cards
 */
export function setupExperiencesCardsAnimation(
  cardsContainerEl: HTMLElement
) {
  if (isReducedMotion()) return null

  const cards = cardsContainerEl.querySelectorAll<HTMLElement>('.experience-card')
  if (cards.length === 0) return null

  cards.forEach((card) => {
    const titleWords = card.querySelectorAll<HTMLElement>('.experience-card-title .word-inner')
    const subtitle = card.querySelector<HTMLElement>('.experience-card-subtitle')
    const desc = card.querySelector<HTMLElement>('.experience-card-desc')

    if (titleWords.length > 0) {
      gsap.set(titleWords, {
        opacity: 0,
        y: '105%',
        letterSpacing: '0.03em',
      })
    }
    if (subtitle) gsap.set(subtitle, { opacity: 0, y: 8 })
    if (desc) gsap.set(desc, { opacity: 0, y: 12 })
  })

  const masterTl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power3.out' },
  })

  cards.forEach((card, idx) => {
    const cardStartTime = idx * 0.18

    const titleWords = card.querySelectorAll<HTMLElement>('.experience-card-title .word-inner')
    const subtitle = card.querySelector<HTMLElement>('.experience-card-subtitle')
    const desc = card.querySelector<HTMLElement>('.experience-card-desc')

    if (titleWords.length > 0) {
      masterTl.to(
        titleWords,
        {
          opacity: 1,
          y: '0%',
          letterSpacing: 'inherit',
          duration: 0.7,
          stagger: 0.04,
          ease: 'power3.out',
        },
        cardStartTime
      )
    }

    if (subtitle) {
      masterTl.to(
        subtitle,
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        cardStartTime + 0.15
      )
    }

    if (desc) {
      masterTl.to(
        desc,
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        cardStartTime + 0.25
      )
    }
  })

  return ScrollTrigger.create({
    trigger: cardsContainerEl,
    start: 'top 80%',
    onEnter: () => masterTl.play(),
    onLeaveBack: () => masterTl.reverse(),
  })
}
