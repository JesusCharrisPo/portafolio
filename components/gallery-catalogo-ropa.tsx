"use client"

import { useState, useRef, useCallback, useEffect, MouseEvent } from "react"
import { Sparkles, Camera, Layers, ChevronLeft, ChevronRight, X, Zap, AlertCircle } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────

type MediaItem = {
  id: number | string
  title: string
  description: string
  type: "image" | "video"
  images: string[]
  thumbnail: string
}

type Category = {
  id: string
  name: string
  code: string
  icon: React.ReactNode
  description: string
  items: MediaItem[]
}

// ─── Data ─────────────────────────────────────────────────────────────

const categories: Category[] = [
  {
    id: "catalogo-producto", name: "Catálogo Producto", code: "01",
    icon: <Layers className="h-4 w-4" />,
    description: "CGI Generativo — visualización de producto 100% IA",
    items: [
      { id: "ia-mbloom",  title: "MBloom Body Butters", description: "Set virtual botánico con simulación de luz natural.", type: "image", thumbnail: "/mbloom-ia-1.jpg", images: ["/mbloom-ia-1.jpg", "/mbloom-ia-2.jpg"] },
      { id: "ia-petcare", title: "Pet Care Brush",      description: "Simulación de fluidos y partículas generativas.",    type: "image", thumbnail: "/petcare-ia.jpg",  images: ["/petcare-ia.jpg"] },
      { id: "ia-shoes",   title: "Sneakers Focus",      description: "Zapatos urbanos en entornos sintéticos.",            type: "image", thumbnail: "/sneaker-ia.jpg", images: ["/sneaker-ia.jpg", "/sneaker-ia-2.jpg"] },
    ],
  },
  {
    id: "modelos-ia", name: "Modelos IA", code: "02",
    icon: <Sparkles className="h-4 w-4" />,
    description: "Avatares hiperrealistas — fashion films sintéticos",
    items: [
      { id: "ia-avatar-1",        title: "Campaña Cosmética",      description: "Modelaje hiperrealista con texturas fotorrealistas.", type: "image", thumbnail: "/modelo-ia-1.jpg",       images: ["/modelo-ia-1.jpg", "/modelo-ia-2.jpg"] },
      { id: "ia-macone-virtual",  title: "Mac One | Virtual Try-On", description: "Prendas reales sobre modelos generados por IA.",   type: "image", thumbnail: "/macone-ia-modelo.jpg", images: ["/macone-ia-modelo.jpg"] },
    ],
  },
  {
    id: "editorial", name: "Editorial AI", code: "03",
    icon: <Camera className="h-4 w-4" />,
    description: "Dirección de arte — iluminación cinematográfica por IA",
    items: [
      { id: "ia-neon-concept", title: "Concepto Neón & Humo", description: "Iluminación dual retro-futurista generada por IA.", type: "image", thumbnail: "/neon-ia-1.jpg", images: ["/neon-ia-1.jpg", "/neon-ia-2.jpg"] },
    ],
  },
]

const WA_URL = `https://wa.me/573019132001?text=${encodeURIComponent("🤖 ¡Hola Jesus! Vi tu portafolio de *CGI con IA*. Me interesa crear una campaña visual para mi marca. ¿Podemos hablar? 🚀")}`

// ─── Image with loading state ─────────────────────────────────────────

function Img({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError]   = useState(false)
  if (error) return (
    <div className={className} style={{ ...style, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, background: "#0d0d14" }}>
      <AlertCircle style={{ width: 28, height: 28, color: "rgba(255,255,255,0.15)" }} />
      <span style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255,255,255,0.15)", letterSpacing: "0.15em" }}>SIN IMAGEN</span>
    </div>
  )
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {!loaded && <div className={className} style={{ ...style, position: "absolute", inset: 0, background: "linear-gradient(135deg,#0d0d14,#131320)", animation: "pulse 2s ease infinite" }} />}
      <img src={src} alt={alt} loading="lazy" onLoad={() => setLoaded(true)} onError={() => setError(true)}
        className={className} style={{ ...style, opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }} />
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────

export function GalleryCatalogoRopa() {
  const [catIdx,  setCatIdx]  = useState(0)
  const [itemIdx, setItemIdx] = useState(0)
  const [imgIdx,  setImgIdx]  = useState(0)
  const [modal,   setModal]   = useState(false)
  const [fade,    setFade]    = useState(true)

  const cat  = categories[catIdx]
  const item = cat.items[itemIdx]
  const imgs = item.images.length > 0 ? item.images : [item.thumbnail].filter(Boolean)
  const src  = imgs[imgIdx] || ""

  // Smooth transition helper
  const transition = useCallback((fn: () => void) => {
    setFade(false)
    setTimeout(() => { fn(); setFade(true) }, 220)
  }, [])

  const selectCat  = (i: number)  => { if (i !== catIdx)  transition(() => { setCatIdx(i);  setItemIdx(0); setImgIdx(0) }) }
  const selectItem = (i: number)  => { if (i !== itemIdx) transition(() => { setItemIdx(i); setImgIdx(0) }) }
  const prevImg    = useCallback(() => imgs.length > 1 && transition(() => setImgIdx(p => (p - 1 + imgs.length) % imgs.length)), [imgs.length, transition])
  const nextImg    = useCallback(() => imgs.length > 1 && transition(() => setImgIdx(p => (p + 1) % imgs.length)),               [imgs.length, transition])

  useEffect(() => {
    if (modal) return
    const h = (e: KeyboardEvent) => { if (e.key === "ArrowLeft") prevImg(); if (e.key === "ArrowRight") nextImg() }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [modal, prevImg, nextImg])

  return (
    <section style={{ background: "#07070f", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>

      {/* ══ HEADER ══════════════════════════════════════════════════════ */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        animation: "fadeUp 0.5s ease both",
      }}>
        {/* Title */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22d3a5", boxShadow: "0 0 8px #22d3a5", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Visual AI Studio</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
            Imágenes con IA Generativa
          </h2>
        </div>

        {/* CTA */}
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", gap: 10, padding: "12px 24px",
          background: "#22d3a5", color: "#07070f", borderRadius: 8, fontWeight: 700,
          fontSize: 14, textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: "-0.01em", flexShrink: 0, transition: "all 0.2s ease",
          boxShadow: "0 0 32px rgba(34,211,165,0.25)",
        }}
          onMouseEnter={e => { const el = e.currentTarget; el.style.background = "#1ab894"; el.style.boxShadow = "0 0 40px rgba(34,211,165,0.4)"; el.style.transform = "translateY(-1px)" }}
          onMouseLeave={e => { const el = e.currentTarget; el.style.background = "#22d3a5"; el.style.boxShadow = "0 0 32px rgba(34,211,165,0.25)"; el.style.transform = "translateY(0)" }}
        >
          <Zap style={{ width: 16, height: 16 }} />
          Crear campaña con IA
        </a>
      </header>

      {/* ══ CATEGORY TABS ═══════════════════════════════════════════════ */}
      <nav style={{
        display: "flex", gap: 0, padding: "0 32px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        animation: "fadeUp 0.5s ease both 0.05s", overflowX: "auto",
      }}>
        {categories.map((c, i) => {
          const active = i === catIdx
          return (
            <button key={c.id} onClick={() => selectCat(i)} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "16px 24px", background: "none", border: "none",
              borderBottom: active ? "2px solid #22d3a5" : "2px solid transparent",
              color: active ? "#fff" : "rgba(255,255,255,0.4)",
              fontSize: 14, fontWeight: active ? 600 : 400, cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.01em",
              transition: "all 0.2s ease", whiteSpace: "nowrap", flexShrink: 0,
            }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.7)" }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.4)" }}
            >
              <span style={{ color: active ? "#22d3a5" : "rgba(255,255,255,0.3)", display: "flex" }}>{c.icon}</span>
              {c.name}
            </button>
          )
        })}
      </nav>

      {/* ══ MAIN CONTENT ════════════════════════════════════════════════ */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>

        {/* ── HERO IMAGE ── */}
        <div style={{
          position: "relative", width: "100%", aspectRatio: "16/8", background: "#0d0d14",
          opacity: fade ? 1 : 0, transition: "opacity 0.22s ease",
          animation: "fadeUp 0.5s ease both 0.1s",
          overflow: "hidden", cursor: "pointer",
        }} onClick={() => setModal(true)}>

          <Img src={src} alt={item.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />

          {/* Bottom gradient */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,7,15,0.95) 0%, rgba(7,7,15,0.3) 40%, transparent 70%)", pointerEvents: "none" }} />

          {/* Click to expand hint */}
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8,
            padding: "10px 20px", color: "rgba(255,255,255,0.7)", fontSize: 12,
            fontFamily: "monospace", letterSpacing: "0.15em", pointerEvents: "none",
            opacity: 0.7,
          }}>VER IMAGEN COMPLETA</div>

          {/* Nav arrows — only if multiple imgs */}
          {imgs.length > 1 && (<>
            <button onClick={e => { e.stopPropagation(); prevImg() }} style={{
              position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)",
              width: 48, height: 48, borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
              color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#22d3a5"; e.currentTarget.style.color = "#22d3a5" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#fff" }}
            ><ChevronLeft style={{ width: 20, height: 20 }} /></button>

            <button onClick={e => { e.stopPropagation(); nextImg() }} style={{
              position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)",
              width: 48, height: 48, borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
              color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#22d3a5"; e.currentTarget.style.color = "#22d3a5" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#fff" }}
            ><ChevronRight style={{ width: 20, height: 20 }} /></button>

            {/* Dot indicators */}
            <div style={{ position: "absolute", bottom: 80, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
              {imgs.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); transition(() => setImgIdx(i)) }} style={{
                  width: i === imgIdx ? 24 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer",
                  background: i === imgIdx ? "#22d3a5" : "rgba(255,255,255,0.25)",
                  boxShadow: i === imgIdx ? "0 0 10px rgba(34,211,165,0.6)" : "none",
                  transition: "all 0.3s ease", padding: 0,
                }} />
              ))}
            </div>
          </>)}

          {/* Item info overlay */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 32px", pointerEvents: "none" }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(34,211,165,0.12)", border: "1px solid rgba(34,211,165,0.3)",
              borderRadius: 6, padding: "4px 12px", marginBottom: 10,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22d3a5", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 10, fontFamily: "monospace", color: "#22d3a5", letterSpacing: "0.15em" }}>100% IA GENERATIVA</span>
              {imgs.length > 1 && <span style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(34,211,165,0.6)", marginLeft: 6 }}>{imgs.length} variaciones</span>}
            </div>
            <h3 style={{
              fontSize: "clamp(1.8rem,4vw,3.5rem)", fontWeight: 700, color: "#fff",
              fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em",
              lineHeight: 1.05, marginBottom: 8, textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}>{item.title}</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontWeight: 400, maxWidth: 480 }}>{item.description}</p>
          </div>
        </div>

        {/* ── ITEM THUMBNAILS ── */}
        <div style={{
          display: "flex", gap: 2, padding: "2px 0", background: "#0a0a12",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          animation: "fadeUp 0.5s ease both 0.15s",
          overflowX: "auto",
        }}>
          {cat.items.map((it, i) => {
            const active = i === itemIdx
            const thumb  = it.thumbnail || it.images[0] || ""
            return (
              <button key={it.id} onClick={() => selectItem(i)} style={{
                position: "relative", flexShrink: 0, width: 140, height: 90, border: "none",
                outline: active ? "2px solid #22d3a5" : "2px solid transparent",
                outlineOffset: -2, cursor: "pointer", overflow: "hidden",
                transition: "all 0.2s ease", background: "#0d0d14",
              }}>
                {thumb && <img src={thumb} alt={it.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: active ? 1 : 0.35, transition: "opacity 0.2s ease" }} />}
                {/* Active glow */}
                {active && <div style={{ position: "absolute", inset: 0, background: "rgba(34,211,165,0.08)" }} />}
                {/* Label */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, padding: "6px 8px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: active ? "#22d3a5" : "rgba(255,255,255,0.5)", fontFamily: "'Space Grotesk',sans-serif", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {it.title}
                  </span>
                </div>
                {/* Number badge */}
                <div style={{ position: "absolute", top: 6, left: 6, background: active ? "#22d3a5" : "rgba(0,0,0,0.6)", borderRadius: 4, padding: "2px 6px" }}>
                  <span style={{ fontSize: 9, fontFamily: "monospace", color: active ? "#07070f" : "rgba(255,255,255,0.4)", fontWeight: 700 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* ── CATEGORY DESCRIPTION ── */}
        <div style={{
          padding: "16px 32px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          animation: "fadeUp 0.5s ease both 0.2s",
        }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontFamily: "monospace", letterSpacing: "0.05em" }}>
            <span style={{ color: "rgba(34,211,165,0.5)", marginRight: 8 }}>—</span>
            {cat.description}
          </p>
        </div>
      </main>

      {/* ══ MODAL ════════════════════════════════════════════════════════ */}
      {modal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "rgba(3,3,10,0.97)", backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column",
          animation: "fadeIn 0.18s ease both",
        }} onClick={() => setModal(false)}>

          {/* Modal top bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)",
            flexShrink: 0,
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22d3a5", boxShadow: "0 0 8px #22d3a5", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 16, fontWeight: 600, color: "#fff", fontFamily: "'Space Grotesk',sans-serif" }}>{item.title}</span>
              {imgs.length > 1 && (
                <span style={{ fontSize: 12, fontFamily: "monospace", color: "rgba(34,211,165,0.5)" }}>
                  {imgIdx + 1} / {imgs.length}
                </span>
              )}
            </div>
            <button onClick={() => setModal(false)} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 18px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.6)",
              cursor: "pointer", fontSize: 13, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500,
              transition: "all 0.2s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#22d3a5"; e.currentTarget.style.color = "#22d3a5" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)" }}
            >
              <X style={{ width: 14, height: 14 }} />
              Cerrar
            </button>
          </div>

          {/* Modal image */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 80px", position: "relative", minHeight: 0 }} onClick={e => e.stopPropagation()}>
            <img src={src} alt={item.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 8, animation: "fadeIn 0.2s ease both" }} />

            {imgs.length > 1 && (<>
              <button onClick={prevImg} style={{
                position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                width: 52, height: 52, borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)",
                color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#22d3a5"; e.currentTarget.style.color = "#22d3a5" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#fff" }}
              ><ChevronLeft style={{ width: 22, height: 22 }} /></button>

              <button onClick={nextImg} style={{
                position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                width: 52, height: 52, borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)",
                color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#22d3a5"; e.currentTarget.style.color = "#22d3a5" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#fff" }}
              ><ChevronRight style={{ width: 22, height: 22 }} /></button>
            </>)}
          </div>

          {/* Modal thumbnails */}
          {imgs.length > 1 && (
            <div style={{
              display: "flex", justifyContent: "center", gap: 8, padding: "16px 24px",
              borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0,
            }} onClick={e => e.stopPropagation()}>
              {imgs.map((img, i) => (
                <button key={i} onClick={() => transition(() => setImgIdx(i))} style={{
                  width: 80, height: 52, borderRadius: 6, overflow: "hidden",
                  border: i === imgIdx ? "2px solid #22d3a5" : "2px solid rgba(255,255,255,0.1)",
                  cursor: "pointer", opacity: i === imgIdx ? 1 : 0.4, transition: "all 0.2s ease",
                  boxShadow: i === imgIdx ? "0 0 16px rgba(34,211,165,0.3)" : "none",
                  background: "#0d0d14", flexShrink: 0, padding: 0,
                }}>
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
