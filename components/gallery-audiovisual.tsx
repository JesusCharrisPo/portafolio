function MediaCard({
  item,
  aspect,
  onClick,
}: {
  item: MediaItem
  index: number
  aspect: "vertical" | "horizontal"
  onClick: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleHoverStart = () => {
    setIsHovered(true)

    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }

  const handleHoverEnd = () => {
    setIsHovered(false)

    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const aspectClass =
    aspect === "vertical" ? "aspect-[9/16]" : "aspect-video"

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onClick={onClick}
      className="relative group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
    >
      {/* Spotlight glow */}
      <div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(200px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(168,85,247,0.2), transparent 60%)`
            : "none",
        }}
      />

      <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-500 group-hover:border-purple-500/20">

        {/* VIDEO PREVIEW */}
        <div className={`${aspectClass} relative bg-[#0a0b10] overflow-hidden`}>
          {item.type === "video" ? (
            <video
              ref={videoRef}
              src={item.url}
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080d] via-transparent to-transparent opacity-60" />

          {/* play button */}
          {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-purple-500/30 bg-purple-500/[0.1] backdrop-blur-sm flex items-center justify-center group-hover:border-purple-400/50 group-hover:bg-purple-500/[0.2] group-hover:scale-110 transition-all duration-300">
                <Play className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 ml-0.5 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              </div>
            </div>
          )}

          {/* duration */}
          {item.duration && (
            <div className="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded-md border border-white/[0.1] bg-black/60 backdrop-blur-sm">
              <span className="text-[10px] font-mono text-white/60 tracking-wider">
                {item.duration}
              </span>
            </div>
          )}

          {/* format badge */}
          <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md border border-purple-500/20 bg-black/40 backdrop-blur-sm">
            <span className="text-[9px] font-mono text-purple-400/70 tracking-wider uppercase">
              {aspect === "vertical" ? "9:16" : "16:9"}
            </span>
          </div>
        </div>

        {/* info */}
        <div className="p-3 space-y-1">
          <h3 className="text-xs sm:text-sm font-semibold text-white/80 font-mono truncate group-hover:text-white transition-colors">
            {item.title}
          </h3>

          <p className="text-[10px] sm:text-xs text-white/30 truncate">
            {item.description}
          </p>
        </div>

        {/* corner accents */}
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-purple-500/0 group-hover:border-purple-500/20 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-purple-500/0 group-hover:border-purple-500/20 transition-colors duration-500" />
      </div>
    </div>
  )
}