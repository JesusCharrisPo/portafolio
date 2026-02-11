"use client"

import { useRef, useState, MouseEvent } from "react"
import {
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  Sparkles,
  Video,
  Newspaper,
} from "lucide-react"
import { motion } from "framer-motion"

const articles = [
  {
    id: 1,
    icon: Sparkles,
    title: "Cómo Usar IA para Optimizar tus Campañas de Marketing",
    description:
      "Guía práctica para implementar inteligencia artificial en tu estrategia de marketing digital y mejorar resultados.",
    category: "IA Aplicada",
    readTime: "8 min",
  },
  {
    id: 2,
    icon: Video,
    title: "Video Marketing: Tendencias para Este Año",
    description:
      "Las tendencias de video marketing que están dominando el mercado y cómo aplicarlas a tu negocio.",
    category: "Audiovisual",
    readTime: "6 min",
  },
  {
    id: 3,
    icon: BookOpen,
    title: "Embudos de Conversión: Guía Completa",
    description:
      "Todo lo que necesitas saber para diseñar e implementar embudos de ventas que convierten.",
    category: "Marketing Digital",
    readTime: "12 min",
  },
]

const resources = [
  {
    id: 1,
    icon: FileText,
    title: "Checklist de Lanzamiento Digital",
    description: "Lista completa para lanzar tu producto o servicio online",
    type: "PDF",
  },
  {
    id: 2,
    icon: FileText,
    title: "Plantilla de Plan de Marketing",
    description: "Estructura tu estrategia de marketing paso a paso",
    type: "Template",
  },
  {
    id: 3,
    icon: FileText,
    title: "Guía de Prompts para IA",
    description: "Colección de prompts efectivos para ChatGPT y herramientas IA",
    type: "PDF",
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
            background: `radial-gradient(200px circle at ${pos.x}px ${pos.y}px, rgba(0,255,200,0.07), transparent 60%)`,
          }}
        />
      )}
      {children}
    </div>
  )
}

/* ─── Main Component ──────────────────────────────────────────────── */

export function Blog() {
  return (
    <section id="blog" className="relative py-16 sm:py-24 bg-[#07080d] overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[400px] bg-cyan-600/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[350px] bg-green-500/[0.02] rounded-full blur-[120px]" />
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
            <Newspaper className="h-3 w-3 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-widest uppercase">
              Blog & Recursos
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-mono tracking-tight">
            Conocimiento{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              Gratuito
            </span>
          </h2>

          <p className="text-white/35 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed px-4">
            Artículos, guías y recursos sobre marketing digital, desarrollo web, producción audiovisual e IA aplicada.
          </p>
        </motion.div>

        {/* ── Articles ── */}
        <div className="mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-mono text-white/50 tracking-widest uppercase mb-5 sm:mb-6"
          >
            Artículos Recientes
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {articles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <SpotlightCard>
                  <div className="relative h-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 group cursor-pointer hover:border-cyan-500/15 transition-all duration-300">
                    {/* Top glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded border border-cyan-500/15 bg-cyan-500/[0.05] text-cyan-400/60 font-mono tracking-wider uppercase">
                        {article.category}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-white/20 font-mono">
                        {article.readTime}
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-lg border border-white/[0.06] bg-white/[0.03] flex items-center justify-center mb-4 group-hover:border-cyan-500/15 transition-colors">
                      <article.icon className="h-4 w-4 text-white/20 group-hover:text-cyan-400/50 transition-colors" />
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-white/70 group-hover:text-white/90 transition-colors font-mono mb-2 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-[10px] sm:text-xs text-white/25 leading-relaxed mb-5 line-clamp-3">
                      {article.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-cyan-400/50 group-hover:text-cyan-400/80 transition-colors">
                      <span className="text-[10px] sm:text-xs font-mono tracking-wider">Leer artículo</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/0 group-hover:border-cyan-500/15 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/0 group-hover:border-cyan-500/15 transition-colors duration-500" />
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Resources ── */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-mono text-white/50 tracking-widest uppercase mb-5 sm:mb-6"
          >
            Recursos Descargables
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {resources.map((resource, i) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <SpotlightCard>
                  <div className="relative flex items-start gap-4 p-4 sm:p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] group cursor-pointer hover:border-cyan-500/15 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg border border-white/[0.06] bg-white/[0.03] flex items-center justify-center flex-shrink-0 group-hover:border-cyan-500/15 transition-colors">
                      <resource.icon className="h-4 w-4 text-white/20 group-hover:text-cyan-400/50 transition-colors" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-xs sm:text-sm font-bold text-white/70 group-hover:text-white/90 transition-colors font-mono truncate">
                          {resource.title}
                        </h4>
                        <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded border border-white/[0.08] bg-white/[0.03] text-white/25 font-mono tracking-wider uppercase flex-shrink-0">
                          {resource.type}
                        </span>
                      </div>

                      <p className="text-[10px] sm:text-xs text-white/25 leading-relaxed mb-3">
                        {resource.description}
                      </p>

                      <div className="flex items-center gap-1.5 text-cyan-400/50 group-hover:text-cyan-400/80 transition-colors">
                        <Download className="h-3 w-3" />
                        <span className="text-[10px] sm:text-xs font-mono tracking-wider">Descargar</span>
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/0 group-hover:border-cyan-500/15 transition-colors duration-500" />
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}