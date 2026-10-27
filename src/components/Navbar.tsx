import { useState, useEffect } from 'react'
import { Menu, X, Compass } from 'lucide-react'

interface NavbarProps {
  onNavigateToEnquiry: () => void
}

export default function Navbar({
  onNavigateToEnquiry,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile drawer is open to prevent background page scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    if (id === 'scene-1') {
      window.dispatchEvent(new CustomEvent('safari:scrollToScene', { detail: { index: 0 } }))
      return
    }
    if (id === 'scene-2') {
      window.dispatchEvent(new CustomEvent('safari:scrollToScene', { detail: { index: 1 } }))
      return
    }
    if (id === 'scene-3') {
      window.dispatchEvent(new CustomEvent('safari:scrollToScene', { detail: { index: 2 } }))
      return
    }
    if (id === 'scene-4') {
      window.dispatchEvent(new CustomEvent('safari:scrollToScene', { detail: { index: 3 } }))
      return
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#060b08]/90 backdrop-blur-md border-b border-[#c5a059]/15 py-3 sm:py-4'
            : 'bg-gradient-to-b from-[#060b08]/85 via-[#060b08]/40 to-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-3">
          {/* Logo / Brandmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none shrink-0 min-h-[44px]"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#c5a059]/40 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 bg-[#060b08]/50">
              <Compass className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div>
              <span className="font-serif-luxury tracking-[0.2em] sm:tracking-[0.25em] text-xs sm:text-sm md:text-base font-semibold text-[#f7f4ed] block leading-tight">
                AURA SAFARIS
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#c5a059] block">
                Untamed Expeditions
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            <button
              onClick={() => scrollToSection('scene-1')}
              className="animated-underline text-xs uppercase tracking-[0.2em] text-[#f7f4ed]/75 hover:text-[#c5a059] transition-colors duration-200 py-1"
            >
              <span>Prologue</span>
            </button>
            <button
              onClick={() => scrollToSection('scene-2')}
              className="animated-underline text-xs uppercase tracking-[0.2em] text-[#f7f4ed]/75 hover:text-[#c5a059] transition-colors duration-200 py-1"
            >
              <span>Wilderness</span>
            </button>
            <button
              onClick={() => scrollToSection('scene-3')}
              className="animated-underline text-xs uppercase tracking-[0.2em] text-[#f7f4ed]/75 hover:text-[#c5a059] transition-colors duration-200 py-1"
            >
              <span>Expeditions</span>
            </button>
            <button
              onClick={() => scrollToSection('section-forest-canopy')}
              className="animated-underline text-xs uppercase tracking-[0.2em] text-[#f7f4ed]/75 hover:text-[#c5a059] transition-colors duration-200 py-1"
            >
              <span>The Forest</span>
            </button>
            <button
              onClick={() => scrollToSection('destinations')}
              className="animated-underline text-xs uppercase tracking-[0.2em] text-[#f7f4ed]/75 hover:text-[#c5a059] transition-colors duration-200 py-1"
            >
              <span>Sanctuaries</span>
            </button>
            <button
              onClick={() => scrollToSection('experiences')}
              className="animated-underline text-xs uppercase tracking-[0.2em] text-[#f7f4ed]/75 hover:text-[#c5a059] transition-colors duration-200 py-1"
            >
              <span>Experiences</span>
            </button>
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            {/* Plan Your Safari CTA (shown on sm and up, hidden on tiny screens to avoid crowding) */}
            <button
              onClick={onNavigateToEnquiry}
              className="hidden sm:inline-flex btn-gold text-[10px] sm:text-[11px] px-3.5 sm:px-5 py-2 sm:py-2.5 min-h-[44px] rounded-full items-center justify-center"
            >
              Plan Your Safari
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-white/20 text-white hover:text-[#c5a059] hover:border-[#c5a059] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#060b08]/98 backdrop-blur-2xl flex flex-col justify-center px-6 sm:px-8 overflow-y-auto">
          {/* Top Close Button for convenient one-tap dismissal */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col gap-4 sm:gap-5 text-center my-auto py-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c5a059] font-medium">
              Navigation
            </span>
            <button
              onClick={() => scrollToSection('scene-1')}
              className="font-serif-luxury text-xl sm:text-2xl text-[#f7f4ed] hover:text-[#c5a059] transition-colors min-h-[44px] flex items-center justify-center"
            >
              01. Prologue
            </button>
            <button
              onClick={() => scrollToSection('scene-2')}
              className="font-serif-luxury text-xl sm:text-2xl text-[#f7f4ed] hover:text-[#c5a059] transition-colors min-h-[44px] flex items-center justify-center"
            >
              02. Nature Untamed
            </button>
            <button
              onClick={() => scrollToSection('scene-3')}
              className="font-serif-luxury text-xl sm:text-2xl text-[#f7f4ed] hover:text-[#c5a059] transition-colors min-h-[44px] flex items-center justify-center"
            >
              03. The Safari Story
            </button>
            <button
              onClick={() => scrollToSection('scene-4')}
              className="font-serif-luxury text-xl sm:text-2xl text-[#f7f4ed] hover:text-[#c5a059] transition-colors min-h-[44px] flex items-center justify-center"
            >
              04. Your Wild Escape
            </button>
            <button
              onClick={() => scrollToSection('section-forest-canopy')}
              className="font-serif-luxury text-xl sm:text-2xl text-[#f7f4ed] hover:text-[#c5a059] transition-colors min-h-[44px] flex items-center justify-center"
            >
              05. The Forest
            </button>
            <button
              onClick={() => scrollToSection('destinations')}
              className="font-serif-luxury text-xl sm:text-2xl text-[#f7f4ed] hover:text-[#c5a059] transition-colors min-h-[44px] flex items-center justify-center"
            >
              Sanctuaries
            </button>
            <button
              onClick={() => scrollToSection('experiences')}
              className="font-serif-luxury text-xl sm:text-2xl text-[#f7f4ed] hover:text-[#c5a059] transition-colors min-h-[44px] flex items-center justify-center"
            >
              Signature Encounters
            </button>
            <div className="pt-4 sm:pt-6 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onNavigateToEnquiry()
                }}
                className="btn-gold py-3.5 min-h-[44px] text-xs rounded-full uppercase tracking-[0.2em] flex items-center justify-center"
              >
                Plan Your Safari
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )}

