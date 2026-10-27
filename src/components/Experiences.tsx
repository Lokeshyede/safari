import { useRef, useEffect } from 'react'
import { Compass, Sun, Sunset, Feather, ShieldAlert, Clock, MapPin } from 'lucide-react'
import WordReveal from './WordReveal'
import {
  setupSectionHeaderAnimation,
  setupExperiencesCardsAnimation,
} from '../utils/textAnimations'

interface Experience {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  parks: string
  timing: string
  highlight: string
  regulationNote?: string
  icon: typeof Compass
}

const EXPERIENCES: Experience[] = [
  {
    id: 'morning-safari',
    number: '01',
    title: 'Morning Jeep Safari',
    subtitle: 'Dawn Game Drive • Core & Buffer Zones',
    description:
      'Enter the forest gates at first light in an authorized open 4x4 Gypsy accompanied by a certified Forest Department guide. Experience the morning bird chorus, track fresh tiger pugmarks across misty trails, and observe spotted deer and gaur herds grazing in dewy grasslands.',
    parks: 'Kanha, Pench & Tadoba (Core & Buffer)',
    timing: 'Sunrise — ~10:30 AM (Seasonal Park Timings)',
    highlight: 'Optimal morning predator movement & golden forest light',
    icon: Sun,
  },
  {
    id: 'wildlife-tracking',
    number: '02',
    title: 'Guided Wildlife Tracking',
    subtitle: 'Buffer Trail Tracking & Forest Craft',
    description:
      'Learn the ancient art of forest interpretation along designated eco-buffer nature trails. Accompanied by experienced tribal naturalists, decode fresh pugmarks, identify territorial tree claw marks, and read langur and cheetal warning alarm calls.',
    parks: 'Designated Buffer Trails of Kanha, Pench & Tadoba',
    timing: 'Morning & Late Afternoon Walking Windows',
    highlight: 'Intimate sensory understanding of jungle signs & flora',
    regulationNote:
      'Walking is strictly restricted to designated eco-buffer zones. Under NTCA guidelines, walking inside core tiger reserve zones is strictly prohibited.',
    icon: Compass,
  },
  {
    id: 'birdwatching',
    number: '03',
    title: 'Birdwatching & Forest Discovery',
    subtitle: 'Riverine Corridors & Wetland Ecosystems',
    description:
      'Explore wetland margins, ancient bamboo thickets, and riverbanks sheltering over 300 resident and winter migratory bird species. Spot Malabar pied hornbills, crested serpent eagles, Indian pittas, and rare forest raptors with field binoculars.',
    parks: 'Pench River Banks, Tadoba Lake & Kanha Waterways',
    timing: 'Early Morning & Golden Hour',
    highlight: 'Over 300 avian species recorded across Central Indian habitats',
    regulationNote: 'Best enjoyed between November and March during winter migratory arrivals.',
    icon: Feather,
  },
  {
    id: 'evening-safari',
    number: '04',
    title: 'Evening Jeep Safari',
    subtitle: 'Afternoon To Sunset Predator Drive',
    description:
      'Embark on the afternoon drive as the mid-day heat recedes and wildlife heads towards waterholes. Track leopards descending from rocky outcrops, sloth bears foraging along termite mounds, and tigers patrolling their territory before strict sunset gate closure.',
    parks: 'Kanha, Pench & Tadoba (Core & Buffer)',
    timing: 'Mid-Afternoon — Sunset (Strict Gate Exit)',
    highlight: 'Active predator hours near watering holes and riverbeds',
    icon: Sunset,
  },
]

interface ExperiencesProps {
  onPlanSafari: () => void
}

export default function Experiences({ onPlanSafari }: ExperiencesProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const triggers: { kill: () => void }[] = []

    if (headerRef.current) {
      const t = setupSectionHeaderAnimation(headerRef.current)
      if (t) triggers.push(t)
    }

    if (cardsRef.current) {
      const t = setupExperiencesCardsAnimation(cardsRef.current)
      if (t) triggers.push(t)
    }

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <section id="experiences" className="relative py-20 sm:py-28 md:py-36 bg-[#08100b] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <div className="section-header-pill inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c5a059]/30 bg-[#0c1811] mb-3 sm:mb-5">
            <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#c5a059] font-medium">
              Authentic Indian Wildlife Encounters
            </span>
          </div>
          <WordReveal
            as="h2"
            className="section-header-heading font-serif-luxury text-2xl sm:text-4xl md:text-5xl text-[#f7f4ed] tracking-[-0.01em]"
            text="Forest & Wildlife Experiences"
          />
          <p className="section-header-paragraph mt-3 sm:mt-4 font-sans-ui text-xs sm:text-sm md:text-base text-white/65 font-light leading-relaxed">
            Respectful, low-impact safari drives and guided nature walks conducted in strict compliance with National Tiger Conservation Authority (NTCA) rules.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {EXPERIENCES.map((exp) => {
            const Icon = exp.icon
            return (
              <div
                key={exp.id}
                className="experience-card group relative rounded-2xl border border-white/10 bg-[#0c1811]/70 backdrop-blur-md p-5 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#c5a059]/40 hover:-translate-y-1.5 hover:shadow-2xl hover:bg-[#0c1811]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <span className="text-xs font-mono text-[#c5a059]">{exp.number}</span>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#132a1c] border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <WordReveal
                    as="h3"
                    className="experience-card-title font-serif-luxury text-lg sm:text-xl text-[#f7f4ed] group-hover:text-[#c5a059] transition-colors duration-200"
                    text={exp.title}
                  />
                  <p className="experience-card-subtitle mt-1 text-[10px] sm:text-[11px] text-[#c5a059]/80 font-mono tracking-wider uppercase">
                    {exp.subtitle}
                  </p>

                  <p className="experience-card-desc mt-3 sm:mt-4 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Park Availability */}
                  <div className="mt-4 sm:mt-5 space-y-2 pt-3.5 sm:pt-4 border-t border-white/10 text-xs">
                    <div className="flex items-start gap-2 text-white/60 font-light">
                      <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                      <span className="text-[11px] sm:text-xs">{exp.parks}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 font-light">
                      <Clock className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                      <span className="text-[11px] sm:text-xs">{exp.timing}</span>
                    </div>
                  </div>

                  {exp.regulationNote && (
                    <div className="mt-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[10px] sm:text-[11px] text-amber-200/80 leading-relaxed font-light">
                      {exp.regulationNote}
                    </div>
                  )}
                </div>

                <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-white/10">
                  <span className="text-[10px] sm:text-[11px] text-white/50 block font-light italic">
                    ★ {exp.highlight}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Official Regulation Notice Banner */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-2xl border border-white/10 bg-[#0c1811]/60 backdrop-blur-md max-w-4xl mx-auto flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <ShieldAlert className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
          <div className="text-xs text-white/60 font-light leading-relaxed space-y-1">
            <span className="text-[#f7f4ed] font-medium block">
              Official Park Regulations & Conservation Notice
            </span>
            <p>
              All safari activities, entry timings, vehicle quotas, and zone allotments are strictly governed by the National Tiger Conservation Authority (NTCA) and State Forest Departments (Madhya Pradesh & Maharashtra). Game drives are permitted only in registered 4x4 open Gypsies with official Forest Department naturalists. Walking inside core tiger reserve zones, hot-air ballooning, night drives in core zones, and off-road tracking are strictly prohibited by law.
            </p>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 sm:mt-12 text-center">
          <button
            onClick={onPlanSafari}
            className="btn-gold px-8 py-3.5 sm:px-10 sm:py-4 rounded-full text-xs font-semibold tracking-[0.18em] sm:tracking-[0.2em] uppercase min-h-[44px]"
          >
            Customize Your Encounters
          </button>
        </div>
      </div>
    </section>
  )
}
