import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true) // Default to true until desktop confirmed

  useEffect(() => {
    // Only enable on true desktop pointer devices with hover capability
    const hasCoarsePointer = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || hasCoarsePointer

    if (isTouch) {
      setIsTouchDevice(true)
      return
    }

    setIsTouchDevice(false)

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      const target = e.target as HTMLElement | null
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('input') ||
        target?.closest('select') ||
        target?.closest('textarea') ||
        target?.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, []) // Empty dependency array prevents re-binding

  if (isTouchDevice || !isVisible) return null

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer subtle ring */}
      <div
        className="fixed rounded-full border border-[#c5a059]/40 transition-transform duration-200 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovered ? '48px' : '28px',
          height: isHovered ? '48px' : '28px',
          backgroundColor: isHovered ? 'rgba(197, 160, 89, 0.08)' : 'transparent',
          backdropFilter: isHovered ? 'blur(2px)' : 'none',
        }}
      />
      {/* Center pinpoint */}
      <div
        className="fixed rounded-full bg-[#c5a059] -translate-x-1/2 -translate-y-1/2 transition-all duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovered ? '6px' : '4px',
          height: isHovered ? '6px' : '4px',
        }}
      />
    </div>
  )
}
