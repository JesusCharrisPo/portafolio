"use client"

import { useRef, useState, MouseEvent } from "react"
import {
  ExternalLink,
  Play,
  X,
  BarChart3,
  Globe,
  Video,
  Bot,
  Briefcase,
  ChevronRight,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const categories = [
  { id: "all", label: "Todos" },
  { id: "marketing", label: "Marketing Digital" },
  { id: "web", label: "Desarrollo Web" },
  { id: "audiovisual", label: "Audiovisual" },
  { id: "ia", label: "IA Aplicada" },
]

const projects = [
  {
    id: 1,
    title: "Campaña de Lanzamiento E-commerce",
    category: "marketing",
    icon: BarChart3,
    description:
      "Estrategia multicanal para lanzamiento de tienda online con +200% ROAS en 3 meses",
    metrics: ["ROAS 3.2x", "+150% Conversiones", "-40% CAC"],
    color: "cyan",
  },
  {
    id: 2,
    title: "Plataforma SaaS B2B",
    category: "web",
    icon: Globe,
    description:
      "Desarrollo completo de plataforma web con integraciones CRM y automatizaciones",
    metrics: ["99.9% Uptime", "Core Web Vitals A+", "+60% Leads"],
    color: "cyan",
  },
  {
    id: 3,
    title: "Video Corporativo Institucional",
    category: "audiovisual",
    icon: Video,
    description:
      "Producción audiovisual completa para presentación corporativa internacional",
    metrics: ["500K Views", "4.8/5 Rating", "12 Idiomas"],
    color: "purple",
  },
  {
    id: 4,
    title: "Chatbot de Atención al Cliente",
    category: "ia",
    icon: Bot,
    description:
      "Implementación de asistente virtual con IA para automatizar soporte 24/7",
    metrics: ["-70% Tickets", "95% Precisión", "24/7 Disponible"],
    color: "green",
  },
  {
    id: 5,
    title: "Embudo de Ventas High-Ticket",
    category: "marketing",
    icon: BarChart3,
    description:
      "Diseño e implementación de funnel para servicios premium con webinars",
    metrics: ["$250K Generados", "8% Conversión", "LTV +180%"],
    color: "cyan",
  },
  {
    id: 6,
    title: "Landing Page de Alta Conversión",
    category: "web",
    icon: Globe,
    description:
      "Diseño y desarrollo de landing page optimizada con pruebas A/B continuas",
    metrics: ["12% Conversión", "-50% Bounce", "+3min Tiempo"],
    color: "cyan",
  },
]

/* ─── Spotlight Card ──────────────────────────────────────────────── */

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

  const move = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative ${className}`}
    >
      {hovered && (
        <div
          className="absolute -inset-px rounded-xl pointer-events-none z-10"
          style={{
            background: `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, rgba(0,255,200,0.07), transparent 60%)`,
          }}
        />
      )}
      {children}
    </div>
  )
}

/* ─── Main Component ──────────────────────────────────────────────── */

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="portafolio" className="relative py-16 sm:py-24 bg-[#07080d] overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-cyan-600/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[350px] bg-purple-600/[0.02] rounded-full blur-[120px]" />
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
            <Briefcase className="h-3 w-3 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-widest uppercase">
              Portafolio
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-mono tracking-tight">
            Proyectos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              Destacados
            </span>
          </h2>

          <p className="text-white/35 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed px-4">
            Casos de éxito que demuestran resultados medibles y el impacto de estrategias bien ejecutadas.
          </p>
        </motion.div>

        {/* ── Category Filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-12"
        >
          {categories.map((cat) => {
            const active = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-mono text-[10px] sm:text-xs tracking-wider uppercase transition-all duration-300 border ${
                  active
                    ? "border-cyan-500/30 bg-cyan-500/[0.08] text-cyan-400"
                    : "border-white/[0.06] bg-white/[0.02] text-white/30 hover:text-white/50 hover:border-white/10"
                }`}
              >
                {active && (
                  <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                )}
                {cat.label}
              </button>
            )
          })}
        </motion.div>

        {/* ── Projects Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
              >
                <SpotlightCard>
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden cursor-pointer group"
                  >
                    {/* Thumbnail area */}
                    <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <project.icon className="h-10 w-10 sm:h-12 sm:w-12 text-white/[0.06] group-hover:text-cyan-500/10 transition-colors duration-500" />
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center backdrop-blur-sm">
                          <Play className="h-4 w-4 text-cyan-400 ml-0.5" />
                        </div>
                      </div>
                      {/* Category badge */}
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded border border-white/[0.08] bg-black/40 backdrop-blur-sm">
                        <span className="text-[9px] sm:text-[10px] font-mono text-white/40 tracking-wider uppercase">
                          {categories.find((c) => c.id === project.category)?.label}
                        </span>
                      </div>
                      {/* Top glow */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5">
                      <h3 className="text-xs sm:text-sm font-bold text-white/70 group-hover:text-white/90 transition-colors font-mono mb-2 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-white/25 leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.metrics.slice(0, 2).map((metric, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded border border-cyan-500/15 bg-cyan-500/[0.05] text-cyan-400/60 font-mono"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/0 group-hover:border-cyan-500/15 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/0 group-hover:border-cyan-500/15 transition-colors duration-500" />
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Modal ── */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-xl border border-white/[0.08] bg-[#0a0b10] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                {/* Thumbnail */}
                <div className="aspect-video relative bg-gradient-to-br from-white/[0.03] to-transparent">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <selectedProject.icon className="h-14 w-14 sm:h-16 sm:w-16 text-white/[0.06]" />
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur-sm flex items-center justify-center hover:border-white/20 transition-colors"
                    aria-label="Cerrar"
                  >
                    <X className="h-3.5 w-3.5 text-white/50" />
                  </button>
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2 py-0.5 rounded border border-white/[0.08] bg-black/40 backdrop-blur-sm">
                    <span className="text-[9px] sm:text-[10px] font-mono text-white/40 tracking-wider uppercase">
                      {categories.find((c) => c.id === selectedProject.category)?.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-white font-mono tracking-tight mb-3">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/30 leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-[10px] sm:text-xs font-mono text-white/40 tracking-widest uppercase mb-3">
                      Resultados Clave
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.metrics.map((metric, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] sm:text-xs px-3 py-1 rounded-lg border border-cyan-500/15 bg-cyan-500/[0.05] text-cyan-400/70 font-mono"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#contacto"
                    onClick={() => setSelectedProject(null)}
                    className="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-mono text-[10px] sm:text-xs tracking-wider uppercase overflow-hidden transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-500 opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-300/20 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative z-10 text-white font-semibold">Solicitar Proyecto Similar</span>
                    <ChevronRight className="relative z-10 h-3.5 w-3.5 text-white/70 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/15" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/15" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}