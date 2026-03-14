"use client"

import { useState, useRef, useEffect, FormEvent } from "react"
import { Send, CheckCircle, AlertCircle, Zap, User, Mail, Phone, MessageSquare, ChevronRight } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────

type FormState = "idle" | "sending" | "success" | "error"

type Field = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

// ─── Particles ────────────────────────────────────────────────────────

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; pulse: number }[] = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height,
        vx:      (Math.random() - 0.5) * 0.3,
        vy:      (Math.random() - 0.5) * 0.3,
        size:    Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        pulse:   Math.random() * Math.PI * 2,
      })
    }

    let raf: number
    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.01

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.02

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,225,${alpha})`
        ctx.fill()

        // Connect nearby particles
        particles.slice(i + 1).forEach((p2) => {
          const dx   = p.x - p2.x
          const dy   = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0,255,225,${0.08 * (1 - dist / 100)})`
            ctx.lineWidth   = 0.5
            ctx.stroke()
          }
        })
      })

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}

// ─── Scanline ─────────────────────────────────────────────────────────

function Scanline() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,255,225,0.015) 3px,rgba(0,255,225,0.015) 4px)",
      }}
    />
  )
}

// ─── Corner Brackets ─────────────────────────────────────────────────

function Brackets({ size = 16, color = "#00ffe1", opacity = 0.6 }: { size?: number; color?: string; opacity?: number }) {
  const s = { position: "absolute" as const, width: size, height: size, opacity }
  const c = color
  return (
    <>
      <span style={{ ...s, top: 0, left: 0,    borderTop: `1.5px solid ${c}`, borderLeft:  `1.5px solid ${c}` }} />
      <span style={{ ...s, top: 0, right: 0,   borderTop: `1.5px solid ${c}`, borderRight: `1.5px solid ${c}` }} />
      <span style={{ ...s, bottom: 0, left: 0,  borderBottom: `1.5px solid ${c}`, borderLeft:  `1.5px solid ${c}` }} />
      <span style={{ ...s, bottom: 0, right: 0, borderBottom: `1.5px solid ${c}`, borderRight: `1.5px solid ${c}` }} />
    </>
  )
}

// ─── Typing Label ─────────────────────────────────────────────────────

function TypingLabel({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("")
  const [done,      setDone]      = useState(false)

  useEffect(() => {
    setDisplayed("")
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(id); setDone(true) }
    }, 35)
    return () => clearInterval(id)
  }, [text])

  return (
    <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(0,255,225,0.5)" }}>
      {displayed}
      {!done && <span className="animate-pulse">▌</span>}
    </span>
  )
}

// ─── Input Field ──────────────────────────────────────────────────────

function FormField({
  label, icon, type = "text", value, onChange, placeholder, required, rows,
}: {
  label: string
  icon: React.ReactNode
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  required?: boolean
  rows?: number
}) {
  const [focused, setFocused] = useState(false)
  const filled = value.length > 0
  const Tag = rows ? "textarea" : "input"

  return (
    <div className="relative group">
      {/* Label */}
      <div className="flex items-center gap-2 mb-2">
        <span style={{ color: focused ? "#00ffe1" : "rgba(255,255,255,0.3)", transition: "color 0.2s" }}>
          {icon}
        </span>
        <span
          className="text-[10px] font-mono tracking-[0.2em] uppercase transition-colors duration-200"
          style={{ color: focused ? "rgba(0,255,225,0.8)" : "rgba(255,255,255,0.3)" }}
        >
          {label}
        </span>
        {required && <span className="text-[#b400ff] text-[10px]">*</span>}
      </div>

      {/* Input wrapper */}
      <div className="relative">
        {/* Glow border */}
        <div
          className="absolute -inset-px pointer-events-none transition-opacity duration-300"
          style={{ opacity: focused ? 1 : 0, background: "linear-gradient(135deg,rgba(0,255,225,0.3),rgba(180,0,255,0.2))", borderRadius: 2 }}
        />

        {/* Field */}
        <Tag
          type={type as any}
          value={value}
          onChange={(e: any) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className="w-full font-mono text-sm text-white placeholder-white/20 outline-none resize-none"
          style={{
            background:   focused ? "rgba(0,255,225,0.04)" : "rgba(255,255,255,0.02)",
            border:       `1px solid ${focused ? "rgba(0,255,225,0.35)" : "rgba(255,255,255,0.07)"}`,
            borderRadius: 2,
            padding:      rows ? "14px 16px" : "12px 16px",
            transition:   "all 0.2s ease",
            fontSize:     13,
            lineHeight:   rows ? 1.7 : "normal",
          }}
        />

        {/* Filled indicator */}
        {filled && !focused && (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
            style={{ background: "#00ffe1", boxShadow: "0 0 6px rgba(0,255,225,0.9)" }}
          />
        )}

        {/* Bottom scan line on focus */}
        <div
          className="absolute bottom-0 left-0 h-px transition-all duration-500"
          style={{
            width:      focused ? "100%" : "0%",
            background: "linear-gradient(to right,#00ffe1,#b400ff)",
            boxShadow:  "0 0 8px rgba(0,255,225,0.6)",
          }}
        />
      </div>
    </div>
  )
}

// ─── Success Screen ───────────────────────────────────────────────────

function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6" style={{ animation: "revealUp 0.5s ease both" }}>
      <div className="relative">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ border: "1px solid rgba(0,255,225,0.3)", background: "rgba(0,255,225,0.06)", boxShadow: "0 0 40px rgba(0,255,225,0.15)" }}
        >
          <CheckCircle className="h-9 w-9 text-[#00ffe1]" />
        </div>
        <Brackets size={12} color="#00ffe1" opacity={0.5} />
      </div>

      <div className="text-center">
        <p className="text-[9px] font-mono tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(0,255,225,0.5)" }}>
          TRANSMISIÓN COMPLETADA
        </p>
        <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Rajdhani',sans-serif", letterSpacing: "0.04em" }}>
          MENSAJE ENVIADO
        </h3>
        <p className="text-sm font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
          Jesus responderá en menos de 24 horas
        </p>
      </div>

      <div className="flex items-center gap-2 px-4 py-2" style={{ border: "1px solid rgba(0,255,225,0.15)", background: "rgba(0,255,225,0.04)" }}>
        <div className="w-1.5 h-1.5 rounded-full bg-[#00ffe1] animate-pulse" style={{ boxShadow: "0 0 6px rgba(0,255,225,1)" }} />
        <span className="text-[9px] font-mono text-[#00ffe1]/60 tracking-[0.2em]">charrisjesus167@outlook.com</span>
      </div>

      <button
        onClick={onReset}
        className="text-[10px] font-mono tracking-[0.2em] uppercase transition-colors duration-200"
        style={{ color: "rgba(255,255,255,0.25)" }}
        onMouseEnter={e => (e.currentTarget.style.color = "rgba(0,255,225,0.6)")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
      >
        Enviar otro mensaje →
      </button>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────

export default function ContactForm() {
  const [fields, setFields] = useState<Field>({ name: "", email: "", phone: "", subject: "", message: "" })
  const [state,  setState]  = useState<FormState>("idle")
  const [error,  setError]  = useState("")

  const set = (key: keyof Field) => (v: string) => setFields(f => ({ ...f, [key]: v }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setState("sending")
    setError("")

    try {
      // Using EmailJS or a simple mailto fallback
      // Replace with your EmailJS service/template IDs or API endpoint
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          to:      "charrisjesus167@outlook.com",
          name:    fields.name,
          email:   fields.email,
          phone:   fields.phone,
          subject: fields.subject || "Nuevo mensaje desde el portafolio",
          message: fields.message,
        }),
      })

      if (!res.ok) throw new Error("Error al enviar")
      setState("success")
    } catch {
      // Fallback: mailto link
      const mailtoUrl = `mailto:charrisjesus167@outlook.com?subject=${encodeURIComponent(fields.subject || "Nuevo mensaje desde el portafolio")}&body=${encodeURIComponent(`Nombre: ${fields.name}\nEmail: ${fields.email}\nTeléfono: ${fields.phone}\n\n${fields.message}`)}`
      window.open(mailtoUrl, "_blank")
      setState("success")
    }
  }

  const reset = () => {
    setFields({ name: "", email: "", phone: "", subject: "", message: "" })
    setState("idle")
    setError("")
  }

  const subjects = [
    "Marketing Digital",
    "Desarrollo Web",
    "Producción Audiovisual",
    "IA Generativa",
    "Consulta General",
  ]

  return (
    <section
      id="contacto-form"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: "#03050c" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');
        @keyframes revealUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scanDown  { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes floatGlow { 0%,100%{opacity:0.05;transform:scale(1)} 50%{opacity:0.09;transform:scale(1.06)} }
        @keyframes spin      { to{transform:rotate(360deg)} }
        @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
        * { box-sizing:border-box; }
      `}</style>

      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,255,225,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,225,0.6) 1px,transparent 1px)",
            backgroundSize:  "64px 64px",
          }}
        />
        {/* Glows */}
        <div className="absolute top-[-15%] left-[30%] w-[600px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse,rgba(0,200,180,0.06) 0%,transparent 70%)", animation: "floatGlow 9s ease infinite" }} />
        <div className="absolute bottom-[-15%] right-[20%] w-[500px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse,rgba(180,0,255,0.06) 0%,transparent 70%)", animation: "floatGlow 11s ease infinite 2s" }} />
        {/* Scanlines */}
        <Scanline />
        {/* Particles */}
        <Particles />
      </div>

      {/* Scan beam */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none z-10"
        style={{ background: "linear-gradient(90deg,transparent,rgba(0,255,225,0.2),transparent)", animation: "scanDown 12s linear infinite", boxShadow: "0 0 12px rgba(0,255,225,0.15)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADER ── */}
        <div className="text-center mb-14" style={{ animation: "revealUp 0.6s ease both" }}>
          <div className="inline-flex items-center gap-3 px-4 py-2 mb-6"
            style={{ border: "1px solid rgba(0,255,225,0.2)", background: "rgba(0,255,225,0.04)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ffe1] animate-pulse" style={{ boxShadow: "0 0 8px rgba(0,255,225,1)" }} />
            <span className="text-[9px] font-mono text-[#00ffe1]/60 tracking-[0.3em] uppercase">
              CANAL DE TRANSMISIÓN // ABIERTO
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ffe1] animate-pulse" style={{ boxShadow: "0 0 8px rgba(0,255,225,1)" }} />
          </div>

          <h2
            className="font-bold text-white leading-none mb-4"
            style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", letterSpacing: "0.02em" }}
          >
            INICIA{" "}
            <span
              className="text-transparent"
              style={{ background: "linear-gradient(90deg,#00ffe1,#b400ff,#00ffe1)", backgroundClip: "text", WebkitBackgroundClip: "text" }}
            >
              TRANSMISIÓN
            </span>
          </h2>

          <p className="font-mono text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.3)", lineHeight: 1.7 }}>
            Cuéntame tu proyecto. Respondo en menos de 24 horas.
          </p>
        </div>

        {/* ── MAIN PANEL ── */}
        <div
          className="grid lg:grid-cols-[1fr_420px] gap-6"
          style={{ animation: "revealUp 0.6s ease both 0.1s" }}
        >

          {/* LEFT: Form */}
          <div className="relative p-6 sm:p-8" style={{ border: "1px solid rgba(0,255,225,0.1)", background: "rgba(0,255,225,0.02)", backdropFilter: "blur(12px)" }}>
            <Brackets size={14} color="#00ffe1" opacity={0.4} />

            {/* Top line glow */}
            <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg,transparent,#00ffe1,transparent)", boxShadow: "0 0 10px rgba(0,255,225,0.5)" }} />

            {/* Form header */}
            <div className="flex items-center justify-between mb-8">
              <TypingLabel text="// FORMULARIO DE CONTACTO" />
              <div className="flex gap-1.5">
                {["#ff5f57","#ffbd2e","#28c840"].map((c,i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
                ))}
              </div>
            </div>

            {state === "success" ? (
              <SuccessScreen onReset={reset} />
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Name + Email row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    label="Nombre"
                    icon={<User className="h-3.5 w-3.5" />}
                    value={fields.name}
                    onChange={set("name")}
                    placeholder="Tu nombre completo"
                    required
                  />
                  <FormField
                    label="Email"
                    icon={<Mail className="h-3.5 w-3.5" />}
                    type="email"
                    value={fields.email}
                    onChange={set("email")}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                {/* Phone */}
                <FormField
                  label="Teléfono / WhatsApp"
                  icon={<Phone className="h-3.5 w-3.5" />}
                  type="tel"
                  value={fields.phone}
                  onChange={set("phone")}
                  placeholder="+57 300 000 0000"
                  required
                />

                {/* Subject chips */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ChevronRight className="h-3.5 w-3.5" style={{ color: "rgba(255,255,255,0.3)" }} />
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
                      Servicio de interés
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((s) => {
                      const active = fields.subject === s
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => set("subject")(s)}
                          className="px-3 py-1.5 text-[10px] font-mono tracking-wider transition-all duration-200"
                          style={{
                            border:     active ? "1px solid rgba(0,255,225,0.5)" : "1px solid rgba(255,255,255,0.08)",
                            background: active ? "rgba(0,255,225,0.08)" : "rgba(255,255,255,0.02)",
                            color:      active ? "#00ffe1" : "rgba(255,255,255,0.35)",
                            boxShadow:  active ? "0 0 12px rgba(0,255,225,0.15)" : "none",
                          }}
                        >
                          {active && "✦ "}{s}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Message */}
                <FormField
                  label="Mensaje"
                  icon={<MessageSquare className="h-3.5 w-3.5" />}
                  value={fields.message}
                  onChange={set("message")}
                  placeholder="Cuéntame sobre tu proyecto, objetivos y presupuesto estimado..."
                  required
                  rows={5}
                />

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 px-3 py-2" style={{ border: "1px solid rgba(255,60,60,0.3)", background: "rgba(255,60,60,0.06)" }}>
                    <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span className="text-xs font-mono text-red-400">{error}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="relative overflow-hidden flex items-center justify-center gap-3 px-8 py-4 font-mono text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 group"
                  style={{
                    background: state === "sending" ? "rgba(0,255,225,0.06)" : "rgba(0,255,225,0.08)",
                    border:     "1px solid rgba(0,255,225,0.35)",
                    color:      "#00ffe1",
                    boxShadow:  "0 0 20px rgba(0,255,225,0.08)",
                    cursor:     state === "sending" ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={e => {
                    if (state !== "sending") {
                      e.currentTarget.style.background  = "rgba(0,255,225,0.14)"
                      e.currentTarget.style.borderColor = "rgba(0,255,225,0.6)"
                      e.currentTarget.style.boxShadow   = "0 0 30px rgba(0,255,225,0.2)"
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background  = "rgba(0,255,225,0.08)"
                    e.currentTarget.style.borderColor = "rgba(0,255,225,0.35)"
                    e.currentTarget.style.boxShadow   = "0 0 20px rgba(0,255,225,0.08)"
                  }}
                >
                  {/* Sweep */}
                  <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                    style={{ background: "linear-gradient(90deg,transparent,rgba(0,255,225,0.08),transparent)" }}
                  />
                  <Brackets size={8} color="#00ffe1" opacity={0.5} />

                  {state === "sending" ? (
                    <>
                      <div className="w-4 h-4 border border-[#00ffe1]/30 border-t-[#00ffe1] rounded-full" style={{ animation: "spin 0.8s linear infinite" }} />
                      ENVIANDO...
                    </>
                  ) : (
                    <>
                      <Send className="relative z-10 h-4 w-4" />
                      <span className="relative z-10">ENVIAR MENSAJE</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.15)" }}>
                  → charrisjesus167@outlook.com // respuesta &lt;24h
                </p>
              </form>
            )}
          </div>

          {/* RIGHT: Info panel */}
          <div className="flex flex-col gap-4" style={{ animation: "revealUp 0.6s ease both 0.2s" }}>

            {/* Contact cards */}
            {[
              {
                label: "WhatsApp",
                value: "+57 304 381 9731",
                sub:   "Respuesta inmediata",
                color: "#00ffe1",
                href:  "https://wa.me/573043819731",
              },
              {
                label: "Email",
                value: "charrisjesus167",
                sub:   "@outlook.com",
                color: "#b400ff",
                href:  "mailto:charrisjesus167@outlook.com",
              },
              {
                label: "Ubicación",
                value: "Colombia 🇨🇴",
                sub:   "Proyectos remotos globales",
                color: "#00ffe1",
                href:  undefined,
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target={item.href ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="relative group flex items-center gap-4 p-5 transition-all duration-300"
                style={{
                  border:          `1px solid rgba(255,255,255,0.06)`,
                  background:      "rgba(255,255,255,0.015)",
                  backdropFilter:  "blur(8px)",
                  textDecoration:  "none",
                  cursor:          item.href ? "pointer" : "default",
                  animation:       `revealUp 0.5s ease both ${0.25 + i * 0.08}s`,
                }}
                onMouseEnter={e => {
                  if (!item.href) return
                  e.currentTarget.style.borderColor = `rgba(${item.color === "#00ffe1" ? "0,255,225" : "180,0,255"},0.3)`
                  e.currentTarget.style.background  = `rgba(${item.color === "#00ffe1" ? "0,255,225" : "180,0,255"},0.04)`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"
                  e.currentTarget.style.background  = "rgba(255,255,255,0.015)"
                }}
              >
                <Brackets size={8} color={item.color} opacity={0.25} />
                <div
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-sm"
                  style={{ border: `1px solid ${item.color}30`, background: `${item.color}08` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-mono tracking-[0.2em] uppercase mb-0.5" style={{ color: `${item.color}80` }}>{item.label}</p>
                  <p className="text-sm font-mono font-bold text-white truncate">{item.value}</p>
                  <p className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>{item.sub}</p>
                </div>
              </a>
            ))}

            {/* Status card */}
            <div
              className="relative p-5 mt-2"
              style={{ border: "1px solid rgba(0,255,225,0.12)", background: "rgba(0,255,225,0.03)" }}
            >
              <Brackets size={10} color="#00ffe1" opacity={0.3} />
              <p className="text-[9px] font-mono tracking-[0.25em] uppercase mb-4" style={{ color: "rgba(0,255,225,0.4)" }}>
                // ESTADO DEL SISTEMA
              </p>
              {[
                { label: "Disponibilidad",  value: "Abierto a proyectos", ok: true },
                { label: "Tiempo respuesta", value: "< 24 horas",          ok: true },
                { label: "Consulta inicial", value: "Gratuita",             ok: true },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>{row.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00ffe1] animate-pulse" style={{ boxShadow: "0 0 4px rgba(0,255,225,0.9)" }} />
                    <span className="text-[10px] font-mono" style={{ color: "rgba(0,255,225,0.7)" }}>{row.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
