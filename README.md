# AURA SAFARIS — Luxury Cinematic Wildlife Expeditions

A luxury wildlife safari website inspired by high-end cinematic travel documentaries. Built with React, TypeScript, Tailwind CSS, GSAP ScrollTrigger, and Framer Motion.

## 🌿 Overview & Key Features

- **4-Scene Cinematic Scrolling Video Narrative**:
  - **Scene 1 (Prologue)**: `/videos/jungle-1.mp4` — Lush tropical canopy, winding river & morning mist. Minimal headline: *"Into The Wild"*.
  - **Scene 2 (The Wilderness)**: `/videos/jungle-2.mp4` — Spotted deer & wildlife grazing in untamed clearings. Minimal headline: *"Nature, Untamed"*.
  - **Scene 3 (The Safari Experience)**: `/videos/jungle-3.mp4` — Open-top 4x4 expedition tracking through the forest. Minimal headline: *"Every Journey, A Story"*.
  - **Scene 4 (Your Next Adventure)**: `/videos/jungle-4.mp4` — Sunset over water, luxury campfire hearth & eco-lodge retreat. Minimal headline: *"Your Wild Escape Awaits"*.
- **Smart Video Management**:
  - Automated play/pause management via ScrollTrigger to pause off-screen videos, saving CPU/GPU and preserving buttery 60fps performance.
  - `muted`, `autoPlay`, `playsInline`, `loop` with responsive video scaling.
- **Atmospheric Web Audio API Soundscape**:
  - Native browser audio synthesizer that generates savannah breeze and dusk crickets with zero external audio assets.
- **Cinema Mode**:
  - Dedicated toggle to gently fade out all UI text overlays, allowing visitors to immerse themselves in pure nature footage.
- **Curated Indian Tiger Sanctuaries & Signature Encounters**:
  - Kanha National Park (MP), Pench National Park (MP/MH), and Tadoba-Andhari Tiger Reserve (MH) with interactive modal dossiers and direct official government booking portal links.
  - Morning Jeep Safaris, Guided Wildlife Tracking on buffer trails, Birdwatching & Forest Discovery, and Evening Jeep Safaris in compliance with NTCA guidelines.
- **Bespoke Safari Enquiry Suite**:
  - Full client-side validation, instant error states, simulated concierge dispatch, unique expedition reference code generation (`SAF-2026-XXXX`), and clear confirmation policy disclosure.
- **Accessibility & Reduced Motion**:
  - Automatically respects `prefers-reduced-motion: reduce` by replacing scroll-scrubbed transforms with smooth accessible static layouts.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

## 📁 Project Structure

- `public/videos/`: Local video assets (`jungle-1.mp4`, `jungle-2.mp4`, `jungle-3.mp4`, `jungle-4.mp4`)
- `src/components/Navbar.tsx`: Floating header with soundscape toggle, cinema mode, and responsive drawer
- `src/components/CinematicStory.tsx`: Pinned 4-scene GSAP video scrolling experience
- `src/components/Destinations.tsx`: Wilderness sanctuary dossiers & modal specifications
- `src/components/Experiences.tsx`: Signature safari encounters
- `src/components/EnquiryForm.tsx`: Bespoke itinerary inquiry suite with full validation
- `src/components/Footer.tsx`: Editorial footer with conservation affiliations and international concierge desks
- `src/utils/soundscape.ts`: Native Web Audio API procedural soundscape generator
