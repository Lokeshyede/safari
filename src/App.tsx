import { useState } from 'react'
import Navbar from './components/Navbar'
import CinematicStory from './components/CinematicStory'
import ForestJourney from './components/ForestJourney'
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

  const handleSelectDestination = (destTitle: string) => {
    setSelectedDestination(destTitle)
    handleNavigateToEnquiry()
  }

  return (
    <div className="relative min-h-screen bg-[#060b08] text-[#f7f4ed] selection:bg-[#c5a059] selection:text-[#060b08]">
      {/* Luxury Reticle Custom Cursor */}
      <CustomCursor />

      {/* Floating Global Navbar */}
      <Navbar
        onNavigateToEnquiry={handleNavigateToEnquiry}
      />

      {/* Cinematic Full-screen 4-Scene Storytelling Experience */}
      <main>
        <CinematicStory
          onExploreSafaris={handleExploreSafaris}
          onPlanSafari={handleNavigateToEnquiry}
        />

        {/* Extended Forest-Themed Animated Sections (Sections 5 to 8) */}
        <ForestJourney onPlanSafari={handleNavigateToEnquiry} />

        {/* Curated Wilderness Sanctuaries & Concessions */}
        <Destinations onSelectDestinationForEnquiry={handleSelectDestination} />

        {/* Signature Encounters & Experiences */}
        <Experiences onPlanSafari={handleNavigateToEnquiry} />

        {/* High-End Bespoke Safari Enquiry Suite */}
        <EnquiryForm initialDestination={selectedDestination} />
      </main>

      {/* Luxury Editorial Footer */}
      <Footer />
    </div>
  )
}
