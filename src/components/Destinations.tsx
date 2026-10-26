import { useState, useEffect, useRef } from 'react'
import { Calendar, Compass, ArrowUpRight, X, ExternalLink, ShieldCheck, MapPin } from 'lucide-react'
import { DESTINATIONS, type Destination } from '../data/destinations'
import WordReveal from './WordReveal'
import {
  setupSectionHeaderAnimation,
  setupDestinationTitlesAnimation,
} from '../utils/textAnimations'

interface DestinationsProps {
  onSelectDestinationForEnquiry: (destTitle: string) => void
}

export default function Destinations({ onSelectDestinationForEnquiry }: DestinationsProps) {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const triggers: { kill: () => void }[] = []

    if (headerRef.current) {
      const t = setupSectionHeaderAnimation(headerRef.current)
      if (t) triggers.push(t)
    }

    if (cardsRef.current) {
      const t = setupDestinationTitlesAnimation(cardsRef.current)
      if (t) triggers.push(t)
    }

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <section id="destinations" className="relative py-28 md:py-36 bg-[#060b08] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20"
        >
          <div>
            <div className="section-header-pill inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c5a059]/30 bg-[#0c1811] mb-4">
              <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-medium">
                Sanctuaries & Habitats
              </span>
            </div>
            <WordReveal
              as="h2"
              className="section-header-heading font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#f7f4ed] tracking-[-0.01em]"
              text="Curated Indian Tiger Reserves"
            />
          </div>
          <p className="section-header-paragraph mt-4 md:mt-0 font-sans-ui text-xs md:text-sm text-white/60 max-w-md font-light leading-relaxed">
            Pristine sal forests, open bamboo meadows, and prime tiger landscapes of Central India, explored with certified naturalists.
          </p>
        </div>

        {/* Minimalist Destinations Grid - Responsive 3-Card Layout */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="destination-card group relative rounded-2xl border border-white/10 bg-[#0c1811]/60 backdrop-blur-md p-8 md:p-9 flex flex-col justify-between transition-all duration-500 hover:border-[#c5a059]/40 hover:bg-[#0c1811]/90 shadow-xl"
            >
              <div>
                {/* Meta Coordinates & Index */}
                <div className="destination-card-meta flex items-center justify-between text-xs font-mono text-[#c5a059] mb-5">
                  <span>{dest.number} // {dest.state}, {dest.country}</span>
                  <span className="text-white/40">{dest.coordinates}</span>
                </div>

                {/* Destination Title with Elegant Word Reveal */}
                <WordReveal
                  as="h3"
                  className="destination-card-title font-serif-luxury text-2xl md:text-3xl text-[#f7f4ed] group-hover:text-[#c5a059] transition-colors duration-300"
                  text={dest.title}
                />

                {/* Short Description */}
                <p className="destination-card-desc mt-3 text-sm text-[#f7f4ed]/75 font-light leading-relaxed">
                  {dest.shortDescription}
                </p>

                {/* Key Wildlife Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {dest.wildlifeTags.map((w) => (
                    <span
                      key={w}
                      className="destination-card-tag text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Details & Action */}
              <div className="destination-card-footer mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-white/50 font-light truncate">
                  <Calendar className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                  <span className="truncate">{dest.seasonInfo.split('|')[0].trim()}</span>
                </div>

                <button
                  onClick={() => setSelectedDest(dest)}
                  className="animated-underline text-xs uppercase tracking-widest text-[#c5a059] hover:text-[#dfb76c] flex items-center gap-1 font-medium shrink-0"
                >
                  <span>EXPLORE DESTINATION</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destination Modal Details */}
      {selectedDest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl border border-[#c5a059]/30 bg-[#0a120c] p-6 sm:p-10 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDest(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/40"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono text-[#c5a059] mb-2 tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>OFFICIAL SANCTUARY DOSSIER // {selectedDest.number}</span>
            </div>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#f7f4ed]">
              {selectedDest.title}
            </h3>
            <p className="text-xs text-white/60 font-mono mt-1 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{selectedDest.state}, {selectedDest.country} • {selectedDest.coordinates}</span>
            </p>

            <p className="mt-5 text-sm text-[#f7f4ed]/85 leading-relaxed font-light">
              {selectedDest.overview}
            </p>

            {/* Landscape & Habitat */}
            <div className="mt-5 p-3.5 rounded-xl border border-white/10 bg-white/5">
              <span className="text-[11px] uppercase tracking-wider text-[#c5a059] block font-mono mb-1">
                Landscape & Terrain
              </span>
              <p className="text-xs text-white/80 font-light leading-relaxed">
                {selectedDest.landscape}
              </p>
            </div>

            {/* Wildlife Tags */}
            <div className="mt-4">
              <span className="text-[11px] uppercase tracking-wider text-white/50 block font-mono mb-2">
                Key Wildlife Species
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedDest.wildlifeTags.map((w) => (
                  <span
                    key={w}
                    className="text-xs px-3 py-1 rounded-md bg-[#132a1c] border border-[#c5a059]/30 text-[#f7f4ed]"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            {/* Seasonality & Gates */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <span className="text-[#c5a059] block font-medium mb-1">Safari Season Window</span>
                <span className="text-white/80 font-light leading-relaxed block">{selectedDest.seasonInfo}</span>
                <span className="text-[11px] text-white/50 font-light mt-2 block">{selectedDest.monsoonStatus}</span>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <span className="text-[#c5a059] block font-medium mb-1">Primary Safari Gates</span>
                <ul className="space-y-1 text-white/80 font-light">
                  {selectedDest.gates.map((g) => (
                    <li key={g} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* State distinction note if applicable */}
            {selectedDest.stateSideNote && (
              <div className="mt-4 p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-amber-200/90 font-light leading-relaxed">
                {selectedDest.stateSideNote}
              </div>
            )}

            {/* Official Portals Box */}
            <div className="mt-5 p-4 rounded-xl border border-[#c5a059]/30 bg-[#0c1811] space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c5a059] block">
                Official Government Portals & Booking Links
              </span>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={selectedDest.officialInfoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs text-[#f7f4ed] transition-colors"
                >
                  <span>Official Tourism Information</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
                </a>

                <a
                  href={selectedDest.officialBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#c5a059]/40 bg-[#c5a059]/10 hover:bg-[#c5a059]/20 text-xs text-[#c5a059] font-medium transition-colors"
                >
                  <span>{selectedDest.bookingPortalName}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
                </a>
              </div>

              {selectedDest.secondaryBookingUrl && (
                <div className="pt-2 border-t border-white/10">
                  <a
                    href={selectedDest.secondaryBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-[#c5a059] hover:underline"
                  >
                    <span>Maharashtra Gate Booking: {selectedDest.secondaryBookingName}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              <p className="text-[11px] text-white/50 font-light leading-relaxed">
                * Note on Permit Allocation: Official state safari permits are issued exclusively through government forest portals subject to state-regulated vehicle quotas and valid government photo ID verification.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  const title = selectedDest.title
                  setSelectedDest(null)
                  onSelectDestinationForEnquiry(title)
                }}
                className="btn-gold flex-1 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase text-center"
              >
                Inquire For This Sanctuary
              </button>
              <button
                onClick={() => setSelectedDest(null)}
                className="btn-outline-gold px-6 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
