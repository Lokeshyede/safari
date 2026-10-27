import { useState } from 'react'
import Navbar from './components/Navbar'
import CinematicVideoSection from './components/CinematicVideoSection'
import {
  ForestCanopySection,
  WildlifeTigerSection,
  ForestRiverSection,
  ForestLodgeSection,
} from './components/ForestJourney'
import Destinations from './components/Destinations'
import Experiences from './components/Experiences'
import EnquiryForm from './components/EnquiryForm'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

export default function App() {
  const [selectedDestination, setSelectedDestination] = useState('')

  const handleNavigateToEnquiry = () => {
    const el = document.getElementById('enquiry')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleExploreSafaris = () => {
    const el = document.getElementById('destinations')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleExploreCanopy = () => {
    const el = document.getElementById('section-forest-canopy')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSelectDestination = (destTitle: string) => {
    setSelectedDestination(destTitle)
    handleNavigateToEnquiry()
  }

  return (
    <div className="relative min-h-screen bg-[#060b08] text-[#f7f4ed] selection:bg-[#c5a059] selection:text-[#060b08]">
      {/* Luxury Reticle Custom Cursor */}
      <CustomCursor />

      {/* Floating Global Navbar */}
      <Navbar onNavigateToEnquiry={handleNavigateToEnquiry} />

      {/* Complete Scroll-Driven Cinematic Experience with Independent Video & Image Sections */}
      <main>
        {/* SECTION 1 (VIDEO): Prologue / Into The Wild — Kanha Tiger Reserve */}
        <CinematicVideoSection
          id="scene-1"
          number="01 / 04"
          label="PROLOGUE"
          coordinates="22°20'00&quot;N 80°37'00&quot;E • KANHA TIGER RESERVE"
          title="Into The Wild"
          subtitle="Discover a different kind of escape. Pristine sal forests and open bamboo meadows where tigers roam unhindered."
          videoSrc="/videos/jungle-1.mp4"
          poster="/images/forest-canopy.jpg"
          isHero={true}
          onExplorePrompt={handleExploreCanopy}
        />

        {/* SECTION 2 (IMAGE): Forest Introduction — Deep Canopy Parallax */}
        <ForestCanopySection />

        {/* SECTION 3 (VIDEO): The Wilderness / Nature, Untamed — Pench Tiger Reserve */}
        <CinematicVideoSection
          id="scene-2"
          number="02 / 04"
          label="THE WILDERNESS"
          coordinates="21°42'00&quot;N 79°18'00&quot;E • PENCH TIGER RESERVE"
          title="Nature, Untamed"
          subtitle="Where ancient rhythms dictate every breath of the earth. Home of the Indian dhole, gaur herds, and silent leopards."
          videoSrc="/videos/jungle-2.mp4"
          poster="/images/forest-river.jpg"
        />

        {/* SECTION 4 (IMAGE): Wildlife Sanctuary — The Royal Bengal Tiger Reveal */}
        <WildlifeTigerSection />

        {/* SECTION 5 (VIDEO): The Expedition / Every Journey, A Story — Tadoba-Andhari */}
        <CinematicVideoSection
          id="scene-3"
          number="03 / 04"
          label="THE EXPEDITION"
          coordinates="20°14'00&quot;N 79°24'00&quot;E • TADOBA-ANDHARI TIGER RESERVE"
          title="Every Journey, A Story"
          subtitle="Guided across wild horizons where few have walked. Authorized 4x4 open safari gypsies led by certified forest naturalists."
          videoSrc="/videos/jungle-3.mp4"
          poster="/images/wildlife-tiger.jpg"
          actionLabel="Explore Reserves"
          onAction={handleExploreSafaris}
        />

        {/* SECTION 6 (CONTENT): Curated Indian Tiger Reserves Grid & Dossiers */}
        <Destinations onSelectDestinationForEnquiry={handleSelectDestination} />

        {/* SECTION 7 (IMAGE): Riverine Corridors — The River's Secret */}
        <ForestRiverSection />

        {/* SECTION 8 (VIDEO): The Sanctuary / Your Wild Escape Awaits — Satpura-Maikal */}
        <CinematicVideoSection
          id="scene-4"
          number="04 / 04"
          label="THE SANCTUARY"
          coordinates="CENTRAL HIGHLANDS • SATPURA-MAIKAL LANDSCAPE"
          title="Your Wild Escape Awaits"
          subtitle="Bespoke jungle lodges, twilight fire pits, and untamed stillness under star-studded skies."
          videoSrc="/videos/jungle-4.mp4"
          poster="/images/forest-lodge.jpg"
          actionLabel="Plan Your Safari"
          onAction={handleNavigateToEnquiry}
        />

        {/* SECTION 9 (CONTENT): Signature Safari Encounters & Naturalist Experiences */}
        <Experiences onPlanSafari={handleNavigateToEnquiry} />

        {/* SECTION 10 (IMAGE): Timeless Stillness — Forest Living & Treehouse Sanctuary */}
        <ForestLodgeSection onPlanSafari={handleNavigateToEnquiry} />

        {/* SECTION 11 (CONTENT): High-End Bespoke Safari Enquiry Suite */}
        <EnquiryForm initialDestination={selectedDestination} />
      </main>

      {/* SECTION 12: Luxury Editorial Footer */}
      <Footer />
    </div>
  )
}
