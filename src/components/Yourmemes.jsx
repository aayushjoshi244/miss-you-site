"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import { motion } from "motion/react"

export default function Yourmeme({ onNext, onPauseMusic, onResumeMusic, ...motionProps }) {
  // Pause site music while this screen is visible; resume when leaving
  useEffect(() => {
    onPauseMusic?.()
    return () => onResumeMusic?.()
  }, [onPauseMusic, onResumeMusic])

  // Put your videos under /public/reels/*.mp4 and posters under /public/images/*.jpg
  /** @type {Array<{id:number,src:string,poster?:string,title:string,emoji:string,color:string}>} */
  const reels = useMemo(
    () => [
      { id: 1, src: "/reels/1.mp4", title: "Midnight giggles",       emoji: "🌙", color: "from-pink-400 to-purple-500" },
      { id: 2, src: "/reels/2.mp4", title: "You + memes = us",      emoji: "😂", color: "from-purple-400 to-pink-500" },
      { id: 3, src: "/reels/3.mp4", title: "POV: our calls",        emoji: "📞", color: "from-blue-400 to-purple-500" },
      { id: 4, src: "/reels/4.mp4", title: "Certified inside joke", emoji: "💅", color: "from-orange-400 to-pink-500" },
      { id: 5, src: "/reels/5.mp4", title: "Chaotic cute energy",   emoji: "🤪", color: "from-fuchsia-400 to-rose-500" },
      { id: 6, src: "/reels/6.mp4", title: "Replay forever",        emoji: "🔁", color: "from-emerald-400 to-teal-500" },
    ],
    []
  )

  const videoRefs = useRef([])                             // HTMLVideoElement[] (one per card)
  const [unmutedIds, setUnmutedIds] = useState(new Set()) // which cards are allowed to play with sound

  const playMuted = (idx) => {
    const v = videoRefs.current[idx]
    if (!v) return
    const shouldBeMuted = !unmutedIds.has(idx)
    v.muted = shouldBeMuted
    v.playsInline = true
    v.loop = true
    v.volume = shouldBeMuted ? 0 : 1
    v.play().catch(() => {})
  }

  const pauseVideo = (idx) => {
    const v = videoRefs.current[idx]
    if (!v) return
    v.pause()
    // v.currentTime = 0 // uncomment if you want to reset on hover-out
  }

  // Desktop: hover to (auto)play (muted or unmuted if user enabled)
  const handleHoverStart = (idx) => playMuted(idx)
  const handleHoverEnd   = (idx) => pauseVideo(idx)

  // Mobile: tap toggles play/pause (keeps current mute state)
  const handleTapToggle = (idx) => {
    const v = videoRefs.current[idx]
    if (!v) return
    v.playsInline = true
    v.loop = true
    if (v.paused) {
      v.muted = !unmutedIds.has(idx)
      v.volume = v.muted ? 0 : 1
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }

  // Explicit user gesture to allow sound on this card
  const handleUnmute = (idx) => {
    const v = videoRefs.current[idx]
    if (!v) return
    // Pause site music immediately when enabling video sound
    onPauseMusic?.()
    setUnmutedIds(prev => {
      const next = new Set(prev)
      next.add(idx)
      return next
    })
    v.muted = false
    v.volume = 1
    v.play().catch(() => {})
  }

  return (
    <motion.div
      {...motionProps}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative"
    >
      {/* Soft background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-3xl"
          animate={{ opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      {/* Header GIF */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mb-6 flex justify-center z-10"
      >
        <div className="mb-4">
          <img src="/gifs/cute.gif" alt="cute gif" className="w-36 md:w-44" />
        </div>
      </motion.div>

      <motion.p
        className="text-gray-300 text-lg mb-8 text-center font-light z-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        Your memes… the way to my heart ❤️ (hover to play • tap 🔊 for sound)
      </motion.p>

      {/* 6-card grid */}
      <motion.div
        className="w-full max-w-5xl z-10"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 120, damping: 20 }}
      >
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {reels.map((reel, idx) => {
            const isUnmuted = unmutedIds.has(idx)
            return (
              <motion.figure
                key={reel.id}
                className={`
                  group relative overflow-hidden rounded-3xl shadow-2xl
                  bg-gradient-to-br ${reel.color}
                  aspect-[4/5]
                  flex items-center justify-center
                  cursor-pointer
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + idx * 0.05 }}
                whileHover={{ scale: 1.03, rotate: -0.6 }}
                whileTap={{ scale: 0.99 }}
                onMouseEnter={() => handleHoverStart(idx)}
                onMouseLeave={() => handleHoverEnd(idx)}
                onTouchStart={() => handleTapToggle(idx)}
              >
                {/* Video */}
                <video
                  ref={(el) => (videoRefs.current[idx] = el)}
                  src={reel.src}
                  poster={reel.poster}
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Soft vignette */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300" />

                {/* Hover shine */}
                <div className="pointer-events-none absolute -inset-10 translate-x-[-120%] rotate-12 bg-white/20 blur-2xl group-hover:translate-x-[120%] transition-transform duration-700" />

                {/* Title pill on hover */}
                <figcaption
                  className="
                    absolute bottom-4 left-1/2 -translate-x-1/2
                    px-4 py-2 rounded-full text-white text-sm md:text-base
                    bg-black/40 backdrop-blur
                    opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0
                    transition duration-300
                    flex items-center gap-2
                  "
                >
                  <span>{reel.emoji}</span>
                  <span className="font-medium">{reel.title}</span>
                </figcaption>

                {/* Border glow on hover */}
                <div
                  className="
                    absolute inset-0 rounded-3xl
                    ring-0 ring-pink-400/0 group-hover:ring-4 group-hover:ring-pink-400/30
                    transition duration-300
                  "
                />

                {/* Speaker / Unmute button (explicit user gesture for sound) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleUnmute(idx)
                  }}
                  className={`
                    absolute top-3 left-3 z-20 text-xs text-white px-3 py-1 rounded-full
                    border border-white/10 backdrop-blur
                    transition
                    ${isUnmuted ? "bg-emerald-500/80 hover:bg-emerald-500/90" : "bg-black/50 hover:bg-black/60"}
                  `}
                  title={isUnmuted ? "Sound on" : "Tap to unmute"}
                >
                  {isUnmuted ? "🔊 Sound on" : "🔇 Tap to unmute"}
                </button>
              </motion.figure>
            )
          })}
        </div>
      </motion.div>

      <motion.button
        className="mt-10 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-teal-500/25 transition-all"
        onClick={onNext}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        Our Memories📸
      </motion.button>
    </motion.div>
  )
}
