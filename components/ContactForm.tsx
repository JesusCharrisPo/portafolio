"use client"

import { useState, useRef, useEffect, FormEvent } from "react"
import { Send, CheckCircle, User, Mail, Phone, MessageSquare, Sparkles, Zap, MapPin, Clock, ArrowRight } from "lucide-react"

type FormState = "idle" | "sending" | "success"
type Field = { name: string; email: string; phone: string; subject: string; message: string }

const SUBJECTS = ["Marketing Digital", "Desarrollo Web", "Producción Audiovisual", "IA Generativa", "Consulta General"]

const WHATSAPP_URL = "https://wa.me/573043819731"

// ─── Canvas particles (same as hero) ─────────────────────────────────
function ParticlesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let raf: number
    let W = canvas.offsetWidth, H = canvas.offsetHeight
    canvas.width = W; canvas.height = H
    const COLS = ["rgba(139,92,246,", "rgba(6,182,212,", "rgba(217,70,239,"]
    type P = { x:number; y:number; vx:number; vy:number; r:number; op:number; c:string; pulse:number }
    const pts: P[] = Array.from({ length: 50 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-.5)*.2, vy: (Math.random()-.5)*.2,
      r: Math.random()*1.5+.3, op: Math.random()*.2+.04,
      c: COLS[Math.floor(Math.random()*COLS.length)], pulse: Math.random()*Math.PI*2,
    }))
    const draw = () => {
      ctx.clearRect(0,0,W,H)
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy; p.pulse+=.025
        if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r*(1+Math.sin(p.pulse)*.3),0,Math.PI*2)
        ctx.fillStyle=p.c+(p.op*(1+Math.sin(p.pulse)*.3))+")"; ctx.fill()
      })
      pts.forEach((a,i)=>pts.slice(i+1).forEach(b=>{
        const d=Math.hypot(a.x-b.x,a.y-b.y)
        if(d<80){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y)
        ctx.strokeStyle=`rgba(139,92,246,${.03*(1-d/80)})`;ctx.lineWidth=.4;ctx.stroke()}
      }))
      raf=requestAnimationFrame(draw)
    }
    draw()
    const onResize=()=>{W=canvas.offsetWidth;H=canvas.offsetHeight;canvas.width=W;canvas.height=H}
    window.addEventListener("resize",onResize)
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",onResize)}
  },[])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

// ─── Holo Input ───────────────────────────────────────────────────────
function HoloInput({ label, icon: Icon, type="text", value, onChange, placeholder, required, rows, color="#a78bfa" }: {
  label:string; icon:any; type?:string; value:string; onChange:(v:string)=>void
  placeholder:string; required?:boolean; rows?:number; color?:string
}) {
  const [focused, setFocused] = useState(false)
  const Tag = rows ? "textarea" : "input"
  return (
    <div className="group">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-3.5 w-3.5 transition-colors duration-200"
          style={{ color: focused ? color : "rgba(255,255,255,0.25)" }} />
        <span className="text-[9px] font-mono tracking-widest uppercase transition-colors duration-200"
          style={{ color: focused ? color+"cc" : "rgba(255,255,255,0.25)" }}>
          {label}{required && <span className="ml-1" style={{ color }}>*</span>}
        </span>
      </div>
      <div className="relative">
        {/* Glow border */}
        <div className="absolute -inset-px rounded-xl pointer-events-none transition-opacity duration-300"
          style={{ opacity: focused ? 1 : 0, background: `linear-gradient(135deg,${color}50,rgba(34,211,238,0.3))`, borderRadius: 12 }} />
        <Tag
          type={type as any} value={value}
          onChange={(e:any) => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={placeholder} required={required} rows={rows}
          className="w-full rounded-xl font-mono text-sm text-white/80 placeholder-white/15 outline-none resize-none transition-all duration-300"
          style={{
            background: focused ? color+"0a" : "rgba(255,255,255,0.02)",
            border: `1px solid ${focused ? color+"50" : "rgba(255,255,255,0.06)"}`,
            padding: rows ? "14px 16px" : "12px 16px",
            fontSize: 13, lineHeight: rows ? 1.7 : "normal",
          }} />
        {/* Bottom scan line */}
        <div className="absolute bottom-0 left-0 h-px rounded-full transition-all duration-500"
          style={{ width: focused ? "100%" : "0%", background: `linear-gradient(90deg,${color},#22d3ee)`, boxShadow: `0 0 8px ${color}` }} />
        {/* Filled dot */}
        {value && !focused && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
        )}
      </div>
    </div>
  )
}

// ─── Success screen ───────────────────────────────────────────────────
function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6"
      style={{ animation: "form-in .5s ease both" }}>
      <div className="relative">
        <div className="absolute inset-0 rounded-full blur-2xl opacity-30 scale-150"
          style={{ background: "radial-gradient(#a78bfa,#22d3ee)" }} />
        <div className="relative w-20 h-20 rounded-full border flex items-center justify-center"
          style={{ borderColor: "rgba(167,139,250,.4)", background: "rgba(167,139,250,.08)", boxShadow: "0 0 40px rgba(167,139,250,.2)" }}>
          <CheckCircle className="h-9 w-9 text-violet-400" />
        </div>
        {/* HUD corners */}
        {["top-0 left-0","top-0 right-0","bottom-0 left-0","bottom-0 right-0"].map((pos,i)=>(
          <div key={i} className={`absolute ${pos} w-3 h-3`}
            style={{
              borderTop: i<2?"1px solid rgba(167,139,250,.6)":"none",
              borderBottom: i>=2?"1px solid rgba(167,139,250,.6)":"none",
              borderLeft: i%2===0?"1px solid rgba(167,139,250,.6)":"none",
              borderRight: i%2===1?"1px solid rgba(167,139,250,.6)":"none",
            }} />
        ))}
      </div>
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] font-mono text-emerald-400/70 tracking-widest uppercase">Transmisión completada</span>
        </div>
        <h3 className="text-2xl font-black text-white" style={{ fontFamily:"'Syne',sans-serif" }}>
          ¡Mensaje enviado!
        </h3>
        <p className="text-sm text-white/30 font-mono">Respondo en menos de 24 horas</p>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-violet-500/20 bg-violet-500/[0.06]">
        <span className="w-1 h-1 rounded-full bg-violet-400 animate-pulse" />
        <span className="text-[9px] font-mono text-violet-400/60 tracking-wide">charrisjesus167@outlook.com</span>
      </div>
      <button onClick={onReset}
        className="text-[10px] font-mono tracking-widest uppercase text-white/20 hover:text-violet-400 transition-colors duration-200">
        Enviar otro mensaje →
      </button>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────
export default function ContactForm() {
  const [fields, setFields] = useState<Field>({ name:"", email:"", phone:"", subject:"", message:"" })
  const [state, setState]   = useState<FormState>("idle")
  const [vis, setVis]       = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ob = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVis(true) },{ threshold:.1 })
    if(sectionRef.current) ob.observe(sectionRef.current)
    return ()=>ob.disconnect()
  },[])

  const set = (k: keyof Field) => (v: string) => setFields(f=>({...f,[k]:v}))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setState("sending")
    try {
      const res = await fetch("/api/contact",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ to:"charrisjesus167@outlook.com", ...fields }),
      })
      if(!res.ok) throw new Error()
      setState("success")
    } catch {
      const url = `mailto:charrisjesus167@outlook.com?subject=${encodeURIComponent(fields.subject||"Mensaje desde portafolio")}&body=${encodeURIComponent(`Nombre: ${fields.name}\nEmail: ${fields.email}\nTel: ${fields.phone}\n\n${fields.message}`)}`
      window.open(url,"_blank")
      setState("success")
    }
  }

  const r = (d:number): React.CSSProperties => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "none" : "translateY(24px)",
    transition: `opacity .8s ease ${d}ms, transform .8s cubic-bezier(.22,1,.36,1) ${d}ms`,
  })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@300;400&display=swap');
        @keyframes form-in { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes glow-pulse { 0%,100%{opacity:.4} 50%{opacity:.8} }
      `}</style>

      <section ref={sectionRef} id="contacto-form" className="relative py-20 sm:py-28 bg-[#03030a] overflow-hidden">

        {/* ── Ambient ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[180px]"
            style={{ background:"radial-gradient(ellipse,rgba(139,92,246,.07) 0%,rgba(34,211,238,.04) 50%,transparent 70%)", animation:"glow-pulse 6s ease infinite" }} />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage:"linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)", backgroundSize:"44px 44px" }} />
          <ParticlesCanvas />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div style={r(0)} className="text-center mb-12 sm:mb-16 px-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/[0.06] mb-5">
              <Zap className="h-3 w-3 text-violet-400" />
              <span className="text-[9px] font-mono text-violet-400 tracking-[.18em] uppercase">Contacto</span>
            </div>
            <h2 className="font-black text-white leading-tight mb-4 text-center break-words"
              style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.8rem,5vw,4.5rem)" }}>
              Inicia la{" "}
              <span style={{ background:"linear-gradient(135deg,#a78bfa,#e879f9,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Conversación
              </span>
            </h2>
            <p className="text-white/28 text-sm max-w-md mx-auto leading-relaxed px-4"
              style={{ fontFamily:"'DM Mono',monospace", fontWeight:300 }}>
              Cuéntame tu proyecto. Respondo en menos de 24 horas.
            </p>
          </div>

          {/* ── Two column layout ── */}
          <div className="grid lg:grid-cols-[1fr_360px] gap-5 sm:gap-6">

            {/* ── FORM ── */}
            <div style={r(100)} className="relative rounded-2xl overflow-hidden"
              style={{ ...r(100), border:"1px solid rgba(167,139,250,.12)", background:"rgba(255,255,255,.015)", backdropFilter:"blur(12px)" }}>

              {/* Top glow line */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background:"linear-gradient(90deg,transparent,rgba(167,139,250,.6),rgba(34,211,238,.4),transparent)" }} />

              {/* HUD corners */}
              {[["top-3 left-3","border-t border-l border-violet-500/30"],["top-3 right-3","border-t border-r border-violet-500/30"],
                ["bottom-3 left-3","border-b border-l border-cyan-500/20"],["bottom-3 right-3","border-b border-r border-cyan-500/20"]
              ].map(([pos,cls],i)=>(
                <div key={i} className={`absolute ${pos} w-3 h-3 ${cls}`} />
              ))}

              <div className="p-6 sm:p-8">
                {/* Panel label */}
                <div className="flex items-center justify-between mb-7">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    <span className="text-[9px] font-mono text-violet-400/60 tracking-widest uppercase">
                      // Formulario de contacto
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    {["#ff5f57","#ffbd2e","#28c840"].map((c,i)=>(
                      <div key={i} className="w-2 h-2 rounded-full opacity-60" style={{ background:c }} />
                    ))}
                  </div>
                </div>

                {state === "success" ? <SuccessScreen onReset={()=>{ setFields({name:"",email:"",phone:"",subject:"",message:""}); setState("idle") }} /> : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <HoloInput label="Nombre" icon={User} value={fields.name} onChange={set("name")} placeholder="Tu nombre completo" required color="#a78bfa" />
                      <HoloInput label="Email" icon={Mail} type="email" value={fields.email} onChange={set("email")} placeholder="tu@email.com" required color="#22d3ee" />
                    </div>

                    {/* Phone */}
                    <HoloInput label="Teléfono / WhatsApp" icon={Phone} type="tel" value={fields.phone} onChange={set("phone")} placeholder="+57 300 000 0000" required color="#e879f9" />

                    {/* Subject chips */}
                    <div>
                      <p className="text-[9px] font-mono tracking-widest uppercase text-white/22 mb-3">Servicio de interés</p>
                      <div className="flex flex-wrap gap-2">
                        {SUBJECTS.map(s => {
                          const active = fields.subject === s
                          return (
                            <button key={s} type="button" onClick={() => set("subject")(s)}
                              className="px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wide transition-all duration-200 border"
                              style={{
                                borderColor: active ? "rgba(167,139,250,.5)" : "rgba(255,255,255,.07)",
                                background: active ? "rgba(167,139,250,.1)" : "rgba(255,255,255,.02)",
                                color: active ? "#a78bfa" : "rgba(255,255,255,.3)",
                                boxShadow: active ? "0 0 14px rgba(167,139,250,.15)" : "none",
                              }}>
                              {active && "✦ "}{s}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Message */}
                    <HoloInput label="Mensaje" icon={MessageSquare} value={fields.message} onChange={set("message")} placeholder="Cuéntame sobre tu proyecto, objetivos y presupuesto estimado..." required rows={5} color="#a78bfa" />

                    {/* Submit */}
                    <button type="submit" disabled={state==="sending"}
                      className="group relative flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-mono text-xs tracking-wider uppercase overflow-hidden hover:scale-[1.02] transition-transform duration-300"
                      style={{ cursor: state==="sending" ? "not-allowed" : "pointer" }}>
                      <div className="absolute inset-0 rounded-xl transition-all duration-300"
                        style={{ background:"rgba(167,139,250,.1)", border:"1px solid rgba(167,139,250,.3)" }} />
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background:"rgba(167,139,250,.18)" }} />
                      {/* Sweep */}
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                        style={{ background:"linear-gradient(90deg,transparent,rgba(167,139,250,.12),transparent)" }} />
                      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-violet-400/50 rounded-tl-xl" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/50 rounded-br-xl" />

                      {state==="sending" ? (
                        <>
                          <div className="w-4 h-4 border border-violet-400/30 border-t-violet-400 rounded-full"
                            style={{ animation:"spin .8s linear infinite" }} />
                          <span className="relative z-10 text-violet-300">Enviando...</span>
                        </>
                      ) : (
                        <>
                          <Send className="relative z-10 h-4 w-4 text-violet-400" />
                          <span className="relative z-10 text-violet-300">Enviar Mensaje</span>
                        </>
                      )}
                    </button>

                    <p className="text-center text-[9px] font-mono text-white/15">
                      → charrisjesus167@outlook.com · respuesta &lt;24h
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* ── INFO PANEL ── */}
            <div className="flex flex-col gap-3" style={r(200)}>

              {/* Contact cards */}
              {[
                { icon: Sparkles, label:"WhatsApp", val:"+57 304 381 9731", sub:"Respuesta inmediata", color:"#22d3ee", glow:"rgba(34,211,238,", href:WHATSAPP_URL },
                { icon: Mail,     label:"Email",    val:"charrisjesus167@outlook.com", sub:"Respuesta en <24h", color:"#a78bfa", glow:"rgba(167,139,250,", href:"mailto:charrisjesus167@outlook.com" },
                { icon: MapPin,   label:"Ubicación",val:"Colombia 🇨🇴",  sub:"Proyectos remotos globales", color:"#e879f9", glow:"rgba(232,121,249,", href:undefined },
              ].map((item,i)=>{
                const Icon = item.icon
                return (
                  <a key={i} href={item.href} target={item.href?"_blank":undefined} rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300"
                    style={{
                      borderColor:"rgba(255,255,255,.05)", background:"rgba(255,255,255,.015)",
                      textDecoration:"none", cursor: item.href?"pointer":"default",
                    }}
                    onMouseEnter={e=>{ if(!item.href)return; const el=e.currentTarget; el.style.borderColor=item.color+"35"; el.style.background=item.glow+"0.05)" }}
                    onMouseLeave={e=>{ const el=e.currentTarget; el.style.borderColor="rgba(255,255,255,.05)"; el.style.background="rgba(255,255,255,.015)" }}>

                    <div className="shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300"
                      style={{ borderColor:item.color+"25", background:item.glow+"0.08)", boxShadow:`0 0 16px ${item.glow}0.15)` }}>
                      <Icon className="h-4 w-4" style={{ color:item.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[8px] font-mono tracking-widest uppercase mb-0.5" style={{ color:item.color+"70" }}>{item.label}</p>
                      <p className="text-xs font-bold text-white/80 truncate" style={{ fontFamily:"'Syne',sans-serif" }}>{item.val}</p>
                      <p className="text-[10px] font-mono text-white/22">{item.sub}</p>
                    </div>
                    {item.href && <ArrowRight className="shrink-0 h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5" style={{ color:item.color }} />}
                  </a>
                )
              })}

              {/* Status card */}
              <div className="relative p-5 rounded-2xl border mt-1"
                style={{ borderColor:"rgba(167,139,250,.12)", background:"rgba(167,139,250,.03)" }}>
                <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                  style={{ background:"linear-gradient(90deg,transparent,rgba(167,139,250,.4),transparent)" }} />

                <p className="text-[9px] font-mono tracking-widest uppercase mb-4" style={{ color:"rgba(167,139,250,.5)" }}>
                  // Estado del sistema
                </p>
                {[
                  { label:"Disponibilidad",   val:"Abierto a proyectos" },
                  { label:"Tiempo respuesta", val:"Menos de 24 horas"   },
                  { label:"Consulta inicial", val:"Gratuita"             },
                ].map((row,i)=>(
                  <div key={i} className="flex items-center justify-between py-2.5"
                    style={{ borderBottom: i<2 ? "1px solid rgba(255,255,255,.04)" : "none" }}>
                    <span className="text-[10px] font-mono text-white/28">{row.label}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-mono text-emerald-400/70">{row.val}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick WhatsApp CTA */}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl font-mono text-xs tracking-wider uppercase overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute inset-0 rounded-2xl transition-all duration-300"
                  style={{ background:"rgba(34,211,238,.08)", border:"1px solid rgba(34,211,238,.25)" }} />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background:"rgba(34,211,238,.15)" }} />
                <span className="relative z-10 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  ⚡ Respuesta inmediata por WhatsApp
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}