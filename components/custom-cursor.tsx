"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── Types ────────────────────────────────────────────────────────────

type TrailDot = {
  id: number
  x: number
  y: number
}

// ─── Custom Cursor Component ──────────────────────────────────────────

export function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState<TrailDot[]>([])
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  let trailId = 0

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Mouse move handler
  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      // Check if hovering a clickable element
      const target = e.target as HTMLElement
      const clickable = target.closest("a, button, [role='button'], input, textarea, select, [onclick]")
      setIsPointer(!!clickable)

      // Add trail dot
      trailId++
      setTrail((prev) => [
        ...prev.slice(-18),
        { id: trailId, x: e.clientX, y: e.clientY },
      ])
    },
    []
  )

  // Mouse events
  useEffect(() => {
    if (isMobile) return

    const handleDown = () => setIsClicking(true)
    const handleUp = () => setIsClicking(false)
    const handleLeave = () => setIsVisible(false)
    const handleEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleDown)
    window.addEventListener("mouseup", handleUp)
    document.addEventListener("mouseleave", handleLeave)
    document.addEventListener("mouseenter", handleEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleDown)
      window.removeEventListener("mouseup", handleUp)
      document.removeEventListener("mouseleave", handleLeave)
      document.removeEventListener("mouseenter", handleEnter)
    }
  }, [handleMouseMove, isMobile])

  // Clean old trail dots
  useEffect(() => {
    if (trail.length === 0) return
    const timer = setTimeout(() => {
      setTrail((prev) => prev.slice(1))
    }, 80)
    return () => clearTimeout(timer)
  }, [trail])

  // Hide default cursor globally
  useEffect(() => {
    if (isMobile) return
    document.body.style.cursor = "none"

    const style = document.createElement("style")
    style.id = "custom-cursor-style"
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.body.style.cursor = ""
      const el = document.getElementById("custom-cursor-style")
      if (el) el.remove()
    }
  }, [isMobile])

  // Don't render on mobile
  if (isMobile) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* ── Trail dots ── */}
      <AnimatePresence>
        {trail.map((dot, index) => {
          const progress = index / trail.length
          const size = 4 + progress * 6
          const opacity = 0.1 + progress * 0.4

          return (
            <motion.div
              key={dot.id}
              initial={{ opacity: opacity, scale: 1 }}
              animate={{ opacity: opacity, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute rounded-full"
              style={{
                left: dot.x - size / 2,
                top: dot.y - size / 2,
                width: size,
                height: size,
                background: `radial-gradient(circle, rgba(0,255,200,${opacity}), transparent)`,
                boxShadow: `0 0 ${size * 2}px rgba(0,255,200,${opacity * 0.5})`,
              }}
            />
          )
        })}
      </AnimatePresence>

      {/* ── Outer ring ── */}
      <motion.div
        className="absolute rounded-full border"
        animate={{
          left: mousePos.x - (isPointer ? 24 : 20),
          top: mousePos.y - (isPointer ? 24 : 20),
          width: isPointer ? 48 : 40,
          height: isPointer ? 48 : 40,
          borderColor: isPointer
            ? "rgba(0,255,200,0.5)"
            : "rgba(0,255,200,0.2)",
          scale: isClicking ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          left: { type: "spring", stiffness: 150, damping: 15, mass: 0.5 },
          top: { type: "spring", stiffness: 150, damping: 15, mass: 0.5 },
          scale: { type: "spring", stiffness: 400, damping: 20 },
          default: { duration: 0.15 },
        }}
        style={{
          boxShadow: isPointer
            ? "0 0 20px rgba(0,255,200,0.15), inset 0 0 20px rgba(0,255,200,0.05)"
            : "0 0 10px rgba(0,255,200,0.05)",
        }}
      />

      {/* ── Inner dot ── */}
      <motion.div
        className="absolute rounded-full"
        animate={{
          left: mousePos.x - (isPointer ? 5 : 4),
          top: mousePos.y - (isPointer ? 5 : 4),
          width: isPointer ? 10 : 8,
          height: isPointer ? 10 : 8,
          scale: isClicking ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          left: { type: "spring", stiffness: 500, damping: 28 },
          top: { type: "spring", stiffness: 500, damping: 28 },
          scale: { type: "spring", stiffness: 400, damping: 20 },
          default: { duration: 0.1 },
        }}
        style={{
          background: "rgba(0,255,200,0.9)",
          boxShadow:
            "0 0 12px rgba(0,255,200,0.6), 0 0 30px rgba(0,255,200,0.3)",
        }}
      />

      {/* ── Click ripple ── */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            key="ripple"
            initial={{ scale: 0.5, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute rounded-full border border-cyan-400/40"
            style={{
              left: mousePos.x - 20,
              top: mousePos.y - 20,
              width: 40,
              height: 40,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}