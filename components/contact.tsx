"use client"

import { useRef, useState, MouseEvent } from "react"
import {
  Calendar,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
  MessageCircle,
  Zap,
  Signal,
} from "lucide-react"
import { motion } from "framer-motion"

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE_GENERAL =
  "🚀 ¡Hola Jesus! 👋 Vi tu portafolio y me gustaría hablar sobre un proyecto 💡 ¿Tienes disponibilidad para una llamada? 📞✨"
const WHATSAPP_MESSAGE_MEETING =
  "📅 ¡Hola Jesus! 👋 Me gustaría *agendar una consulta gratuita* de 30 minutos para conocer mi proyecto 🚀 ¿Cuál es tu disponibilidad? 📞✨"

// ─── Spotlight Card ───────────────────────────────────────────────────

function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group ${className}`}
    >
      {hovered && (
        <div
          className="absolute -inset-px rounded-xl pointer-events-none z-10"
          style={{
            background: `radial-gradient(200px circle at ${pos.x}px ${pos.y}px, rgba(0,255,200,0.08), transparent 60%)`,
          }}
        />
      )}
      {children}
    </div>
  )
}

// ─── Contact Link ─────────────────────────────────────────────────────

function ContactLink({
  href,
  icon: Icon,
  label,
  value,
  index,
  external = false,
}: {
  href?: string
  icon: typeof Phone
  label: string
  value: string
  index: number
  external?: boolean
}) {
  const Wrapper = href ? "a" : "div"
  const linkProps = href
    ? { href, ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}) }
    : {}

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <SpotlightCard>
        <Wrapper
          {...linkProps}
          className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-cyan-500/20 transition-all duration-300 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg border border-cyan-500/15 bg-cyan-500/[0.06] flex items-center justify-center group-hover:border-cyan-500/30 transition-colors">
            <Icon className="h-4 w-4 text-cyan-400/70 group-hover:text-cyan-400 transition-colors" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] sm:text-xs font-mono text-white/30 tracking-wider uppercase">
              {label}
            </p>
            <p className="text-xs sm:text-sm text-white/60 group-hover:text-white/80 transition-colors truncate">
              {value}
            </p>
          </div>
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/0 group-hover:border-cyan-500/20 transition-colors duration-500 rounded-tr-xl" />
        </Wrapper>
      </SpotlightCard>
    </motion.div>
  )
}

// ─── Stat Box ─────────────────────────────────────────────────────────

function StatBox({ value, label, index }: { value: string; label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
      className="text-center p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
    >
      <p className="text-xl sm:text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
        {value}
      </p>
      <p className="text-[10px] sm:text-xs text-white/30 font-mono tracking-wider uppercase mt-1">
        {label}
      </p>
    </motion.div>
  )
}

// ─── Social Button ────────────────────────────────────────────────────

function SocialButton({
  href,
  icon: Icon,
  label,
  index,
}: {
  href: string
  icon: typeof Linkedin
  label: string
  index: number
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 + index * 0.08, duration: 0.3 }}
      className="w-11 h-11 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center hover:border-cyan-500/20 hover:bg-cyan-500/[0.05] transition-all duration-300 group"
    >
      <Icon className="h-4 w-4 text-white/30 group-hover:text-cyan-400 transition-colors" />
    </motion.a>
  )
}

// ─── Main Component ───────────────────────────────────────────────────

export function Contact() {
  const whatsappUrlGeneral = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE_GENERAL)}`
  const whatsappUrlMeeting = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE_MEETING)}`

  return (
    <section id="contacto" className="relative py-16 sm:py-24 bg-[#07080d] overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[500px] bg-cyan-600/[0.03] rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-green-500/[0.02] rounded-full blur-[80px] sm:blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.05] mb-4 sm:mb-6">
            <Signal className="h-3 w-3 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-widest uppercase">
              Contacto
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-mono tracking-tight">
            Hablemos de tu{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              Proyecto
            </span>
          </h2>

          <p className="text-white/35 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed px-4">
            ¿Listo para llevar tu negocio al siguiente nivel? Escríbeme por WhatsApp y conversemos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ── Left: WhatsApp CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <SpotlightCard>
              <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 overflow-hidden">
                {/* Top glow line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                <div className="flex items-center gap-2 mb-6">
                  <Zap className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-sm sm:text-base font-bold text-white font-mono tracking-tight">
                    Escríbeme por WhatsApp
                  </h3>
                </div>

                <p className="text-white/30 text-xs sm:text-sm leading-relaxed mb-6">
                  La forma más rápida de contactarme. Respondo en menos de 24 horas y podemos agendar una llamada para conocer tu proyecto.
                </p>

                {/* WhatsApp box */}
                <div className="rounded-xl border border-green-500/20 bg-green-500/[0.05] p-5 sm:p-6 mb-6">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-11 h-11 rounded-xl border border-green-500/20 bg-green-500/[0.1] flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white font-mono">WhatsApp Directo</p>
                      <p className="text-xs text-white/30 font-mono">+57 301 913 2001</p>
                    </div>
                  </div>

                  <a
                    href={whatsappUrlGeneral}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center gap-2.5 w-full py-3 sm:py-3.5 rounded-lg font-mono text-xs sm:text-sm tracking-wider uppercase overflow-hidden transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-300/20 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <MessageCircle className="relative z-10 h-4 w-4 text-white" />
                    <span className="relative z-10 text-white font-semibold">Iniciar Conversación</span>
                  </a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <StatBox value="<24h" label="Respuesta" index={0} />
                  <StatBox value="100%" label="Consulta gratis" index={1} />
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/15" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/15" />
              </div>
            </SpotlightCard>
          </motion.div>

          {/* ── Right: Info ── */}
          <div className="space-y-6 sm:space-y-8">
            {/* Contact info */}
            <div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xs sm:text-sm font-mono text-white/50 tracking-widest uppercase mb-4"
              >
                Información de Contacto
              </motion.h3>

              <div className="space-y-3">
                <ContactLink
                  href={whatsappUrlGeneral}
                  icon={Phone}
                  label="WhatsApp / Teléfono"
                  value="+57 301 913 2001 🇨🇴"
                  index={0}
                  external
                />
                <ContactLink
                  href="mailto:contacto@jesuscharris.com"
                  icon={Mail}
                  label="Correo Electrónico"
                  value="contacto@jesuscharris.com"
                  index={1}
                />
                <ContactLink
                  icon={MapPin}
                  label="Ubicación"
                  value="Colombia 🇨🇴 — Proyectos remotos globales 🌎"
                  index={2}
                />
              </div>
            </div>

            {/* Schedule meeting */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <h3 className="text-xs sm:text-sm font-mono text-white/50 tracking-widest uppercase mb-4">
                Agendar Reunión
              </h3>

              <SpotlightCard>
                <a
                  href={whatsappUrlMeeting}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center gap-4 p-4 rounded-xl border border-cyan-500/15 bg-cyan-500/[0.04] hover:border-cyan-500/30 hover:bg-cyan-500/[0.08] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg border border-cyan-500/20 bg-cyan-500/[0.08] flex items-center justify-center group-hover:border-cyan-400/40 transition-colors">
                    <Calendar className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-white/70 group-hover:text-white/90 transition-colors font-mono">
                      Consulta gratuita
                    </p>
                    <p className="text-[10px] sm:text-xs text-white/30">
                      30 minutos para conocer tu proyecto
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400/50 tracking-wider">→</div>
                </a>
              </SpotlightCard>
            </motion.div>

            {/* Social links /}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <h3 className="text-xs sm:text-sm font-mono text-white/50 tracking-widest uppercase mb-4">
                Redes Sociales
              </h3>
              <div className="flex gap-2.5">
                <SocialButton href="https://linkedin.com" icon={Linkedin} label="LinkedIn" index={0} />
                <SocialButton href="https://youtube.com" icon={Youtube} label="YouTube" index={1} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}