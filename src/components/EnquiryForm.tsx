import { useState, useRef, useEffect, type FormEvent } from 'react'
import {
  Compass,
  CheckCircle2,
  AlertCircle,
  Users,
  Calendar,
  Send,
  Sparkles,
  Phone,
  Mail,
  User,
  RotateCcw,
} from 'lucide-react'
import WordReveal from './WordReveal'
import { setupSectionHeaderAnimation } from '../utils/textAnimations'

interface EnquiryFormProps {
  initialDestination?: string
}

interface FormData {
  fullName: string
  email: string
  phoneNumber: string
  destination: string
  travelDate: string
  guests: string
  safariStyle: string
  notes: string
}

interface FormErrors {
  fullName?: string
  email?: string
  phoneNumber?: string
  destination?: string
  travelDate?: string
  guests?: string
}

export default function EnquiryForm({ initialDestination = '' }: EnquiryFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    destination: initialDestination || 'Kanha National Park (Madhya Pradesh)',
    travelDate: '',
    guests: '2 Guests',
    safariStyle: 'Private 4x4 Guided Expedition',
    notes: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)
  const [referenceId, setReferenceId] = useState('')

  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      const t = setupSectionHeaderAnimation(headerRef.current)
      return () => t?.kill()
    }
  }, [])

  const destinationsList = [
    'Kanha National Park (Madhya Pradesh)',
    'Pench National Park (Madhya Pradesh)',
    'Tadoba-Andhari Tiger Reserve (Maharashtra)',
    'Central Indian Tiger Circuit (Custom Multi-Park Expedition)',
  ]

  const guestOptions = [
    'Solo Traveler (1 Guest)',
    'Couples Expedition (2 Guests)',
    'Small Private Group (3 - 4 Guests)',
    'Family / Group (5 - 8 Guests)',
    'Private Expeditions (8+ Guests)',
  ]

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address'
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number / WhatsApp is required'
    } else if (formData.phoneNumber.trim().length < 7) {
      newErrors.phoneNumber = 'Please provide a valid contact number with country code'
    }

    if (!formData.destination) {
      newErrors.destination = 'Please select a preferred sanctuary'
    }

    if (!formData.travelDate) {
      newErrors.travelDate = 'Target travel month or date is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // Simulate concierge dispatch and availability lookup
    setTimeout(() => {
      const generatedRef = `SAF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
      setReferenceId(generatedRef)
      setIsSubmitting(false)
      setSubmissionSuccess(true)
    }, 1800)
  }

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      destination: 'Kanha National Park (Madhya Pradesh)',
      travelDate: '',
      guests: '2 Guests',
      safariStyle: 'Private 4x4 Guided Expedition',
      notes: '',
    })
    setErrors({})
    setSubmissionSuccess(false)
  }

  return (
    <section id="enquiry" className="relative py-28 md:py-36 bg-[#060b08] border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1a3826]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="section-header-pill inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#0c1811] mb-5">
            <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-medium">
              Bespoke Itinerary Planning
            </span>
          </div>
          <WordReveal
            as="h2"
            className="section-header-heading font-serif-luxury text-3xl sm:text-5xl text-[#f7f4ed] tracking-[-0.01em]"
            text="Begin Your Indian Expedition"
          />
          <p className="section-header-paragraph mt-4 font-sans-ui text-sm sm:text-base text-white/60 font-light max-w-lg mx-auto leading-relaxed">
            Our private safari directors design every itinerary individually. Submit your travel parameters below to receive a bespoke itinerary proposal and lodge availability.
          </p>
        </div>

        {/* Success State Modal / Card */}
        {submissionSuccess ? (
          <div className="rounded-2xl border border-[#c5a059]/40 bg-[#0c1811]/90 backdrop-blur-xl p-8 sm:p-12 text-center shadow-2xl animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#132a1c] border border-[#c5a059] flex items-center justify-center mx-auto mb-6 text-[#c5a059]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#c5a059] block mb-2">
              Enquiry Dossier Received
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-4xl text-[#f7f4ed]">
              Thank You, {formData.fullName}
            </h3>

            <div className="my-6 inline-block px-5 py-2 rounded-full border border-[#c5a059]/30 bg-black/40 text-xs font-mono text-[#c5a059]">
              REFERENCE CODE: {referenceId}
            </div>

            <p className="text-sm text-white/75 font-light leading-relaxed max-w-xl mx-auto">
              Your safari enquiry for <strong className="text-white font-medium">{formData.destination}</strong> ({formData.guests}) has been logged with our senior concierge in New Delhi & Nagpur.
            </p>

            <div className="mt-8 p-6 rounded-xl border border-white/10 bg-white/5 max-w-lg mx-auto text-left text-xs space-y-2.5">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/50">Travel Window:</span>
                <span className="text-white font-mono">{formData.travelDate}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/50">Direct Contact:</span>
                <span className="text-white font-mono">{formData.email}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/50">Phone / WhatsApp:</span>
                <span className="text-white font-mono">{formData.phoneNumber}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-white/50">Enquiry Status:</span>
                <span className="text-amber-300 font-mono">Pending Custom Itinerary & Lodge Availability Review</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 max-w-lg mx-auto text-left text-[11px] text-amber-200/90 leading-relaxed">
              <strong>Permit Booking Clarification:</strong> Submitting this enquiry initiates itinerary planning and lodge reservations. It does <em>not</em> imply or constitute a confirmed Forest Department safari permit. Official park entry permits are strictly issued by the Madhya Pradesh (MP Online) and Maharashtra (MahaForest) Forest Departments subject to official government quotas and government ID verification.
            </div>

            <div className="mt-8">
              <button
                onClick={resetForm}
                className="btn-outline-gold px-8 py-3 rounded-full text-xs font-semibold tracking-widest uppercase inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Submit Another Request</span>
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Luxury Form */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-white/10 bg-[#0c1811]/70 backdrop-blur-xl p-8 sm:p-12 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#f7f4ed]/80 mb-2 font-medium">
                  Full Name <span className="text-[#c5a059]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="e.g. Lord Julian Sterling"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border bg-black/40 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#c5a059] transition-colors ${
                      errors.fullName ? 'border-red-500/80' : 'border-white/15'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#f7f4ed]/80 mb-2 font-medium">
                  Email Address <span className="text-[#c5a059]">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    placeholder="julian@sterlingadvisors.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border bg-black/40 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#c5a059] transition-colors ${
                      errors.email ? 'border-red-500/80' : 'border-white/15'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#f7f4ed]/80 mb-2 font-medium">
                  Phone / WhatsApp <span className="text-[#c5a059]">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="tel"
                    placeholder="+44 20 7946 0912 or +1 (555)..."
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border bg-black/40 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#c5a059] transition-colors ${
                      errors.phoneNumber ? 'border-red-500/80' : 'border-white/15'
                    }`}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.phoneNumber}</span>
                  </p>
                )}
              </div>

              {/* Target Travel Window / Date */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#f7f4ed]/80 mb-2 font-medium">
                  Travel Window / Date <span className="text-[#c5a059]">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="e.g. October 2026 or 2027 Migration"
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border bg-black/40 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#c5a059] transition-colors ${
                      errors.travelDate ? 'border-red-500/80' : 'border-white/15'
                    }`}
                  />
                </div>
                {errors.travelDate && (
                  <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.travelDate}</span>
                  </p>
                )}
              </div>

              {/* Preferred Destination / Sanctuary */}
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-[#f7f4ed]/80 mb-2 font-medium">
                  Preferred Wilderness Sanctuary <span className="text-[#c5a059]">*</span>
                </label>
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-[#0a120c] text-sm text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                >
                  {destinationsList.map((d) => (
                    <option key={d} value={d} className="bg-[#0a120c] text-white">
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#f7f4ed]/80 mb-2 font-medium">
                  Number of Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/15 bg-[#0a120c] text-sm text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                  >
                    {guestOptions.map((g) => (
                      <option key={g} value={g} className="bg-[#0a120c] text-white">
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Safari Style */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#f7f4ed]/80 mb-2 font-medium">
                  Expedition Style
                </label>
                <select
                  value={formData.safariStyle}
                  onChange={(e) => setFormData({ ...formData, safariStyle: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-[#0a120c] text-sm text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                >
                  <option value="Private 4x4 Guided Expedition">Private 4x4 Guided Expedition</option>
                  <option value="Wildlife Photography & Big Cat Focus">Wildlife Photography & Big Cat Focus</option>
                  <option value="Central Indian Multi-Park Tiger Circuit">Central Indian Multi-Park Tiger Circuit</option>
                  <option value="Family Jungle Safari Experience">Family Jungle Safari Experience</option>
                </select>
              </div>

              {/* Bespoke Notes */}
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-[#f7f4ed]/80 mb-2 font-medium">
                  Wildlife Priorities & Special Requests (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Specific interest in Bengal tiger photography, naturalist preference, dietary requirements, or multi-park transfers between Kanha, Pench and Tadoba..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-4 rounded-xl border border-white/15 bg-black/40 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#c5a059] transition-colors"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2 text-xs text-white/50 font-light">
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                <span>Concierge review within 4 hours • Strictly confidential</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto btn-gold px-10 py-4 rounded-full text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-3 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Allocating Private Lodges...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Request Safari Proposal</span>
                  </>
                )}
              </button>
            </div>

            {/* Important Permit Clarification */}
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-white/45 font-light leading-relaxed">
              * Note: Submitting an enquiry initiates customized itinerary curation and wilderness lodge reservation. It does not imply that official state tiger reserve permits are confirmed. Government safari permits are issued through official portals (MP Online / MahaForest) according to state quotas and passenger ID details.
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
