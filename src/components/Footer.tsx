import { Compass, ArrowUp, Shield, Mail, Phone } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#040805] text-white/60 border-t border-white/10 pt-16 sm:pt-20 pb-10 sm:pb-12 overflow-hidden">
      {/* Background subtle watermark */}
      <div className="absolute right-0 bottom-0 text-[72px] sm:text-[130px] md:text-[180px] font-serif-luxury font-bold text-white/[0.015] pointer-events-none select-none leading-none">
        SAFARI
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full border border-[#c5a059]/40 flex items-center justify-center">
                <Compass className="w-4 h-4 text-[#c5a059]" />
              </div>
              <span className="font-serif-luxury tracking-[0.25em] text-base font-semibold text-[#f7f4ed]">
                AURA SAFARIS
              </span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed font-light mb-6">
              Curating low-impact, ultra-luxury wildlife expeditions across India's premier tiger reserves since 1998. Dedicated to tiger corridor protection, ethical tracking, and local community eco-development.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#c5a059] font-mono">
              <Shield className="w-3.5 h-3.5" />
              <span>100% Carbon Neutral Travel Guarantee</span>
            </div>
          </div>

          {/* Concierge Desks */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#f7f4ed] font-medium mb-4">
              Private Concierge
            </h4>
            <ul className="space-y-3 text-xs font-light">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span className="text-white/80">+91 11 4987 6000 (New Delhi HQ)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span className="text-white/80">+91 712 254 8800 (Nagpur Gateway)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <a
                  href="mailto:concierge@aurasafaris.com"
                  className="animated-underline text-white/80 hover:text-[#c5a059]"
                >
                  <span>concierge@aurasafaris.com</span>
                </a>
              </li>
              <li className="pt-2 text-[11px] text-white/40">
                24/7 Field & Naturalist Coordination for active expeditions
              </li>
            </ul>
          </div>

          {/* Wilderness Sanctuaries */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#f7f4ed] font-medium mb-4">
              Protected Reserves
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <span className="animated-underline hover:text-[#c5a059] transition-colors cursor-pointer">
                  <span>Kanha Tiger Reserve (Madhya Pradesh)</span>
                </span>
              </li>
              <li>
                <span className="animated-underline hover:text-[#c5a059] transition-colors cursor-pointer">
                  <span>Pench Tiger Reserve (MP & Maharashtra)</span>
                </span>
              </li>
              <li>
                <span className="animated-underline hover:text-[#c5a059] transition-colors cursor-pointer">
                  <span>Tadoba-Andhari Tiger Reserve (Maharashtra)</span>
                </span>
              </li>
              <li>
                <span className="animated-underline hover:text-[#c5a059] transition-colors cursor-pointer">
                  <span>Bandhavgarh National Park (Madhya Pradesh)</span>
                </span>
              </li>
              <li>
                <span className="animated-underline hover:text-[#c5a059] transition-colors cursor-pointer">
                  <span>Satpura Tiger Reserve (Madhya Pradesh)</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Affiliations & Social */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#f7f4ed] font-medium mb-4">
              Conservation & Society
            </h4>
            <p className="text-xs text-white/50 mb-4 font-light leading-relaxed">
              Aligned with National Tiger Conservation Authority (NTCA) eco-tourism guidelines and local Village Eco-Development Committees (EDCs).
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#enquiry"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-[#c5a059] hover:border-[#c5a059] transition-colors text-xs font-mono"
                title="Instagram Dispatch"
              >
                IG
              </a>
              <a
                href="#enquiry"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-[#c5a059] hover:border-[#c5a059] transition-colors text-xs font-mono"
                title="Vimeo Cinematic Films"
              >
                VM
              </a>
              <a
                href="#enquiry"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-[#c5a059] hover:border-[#c5a059] transition-colors text-xs font-mono"
                title="Spotify Safari Soundscapes"
              >
                SP
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-white/40 text-center sm:text-left">
          <p>© {new Date().getFullYear()} AURA SAFARIS LTD. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span className="animated-underline hover:text-white transition-colors cursor-pointer">
              <span>Conservation Protocol</span>
            </span>
            <span className="animated-underline hover:text-white transition-colors cursor-pointer">
              <span>Privacy & Security</span>
            </span>
            <button
              onClick={scrollToTop}
              className="animated-underline flex items-center gap-1.5 text-[#c5a059] hover:text-[#dfb76c] transition-colors font-medium min-h-[44px]"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
