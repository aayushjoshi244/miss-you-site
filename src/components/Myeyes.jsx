"use client"

import { motion } from "motion/react"
import { useMemo } from "react"

export default function Myeyes({ onNext, ...motionProps }) {
  // If you want IntelliSense without TS, you can keep this JSDoc typedef:
  /** @type {Array<{id:number,imgSrc:string,title:string,emoji:string,color:string}>} */
  const memories = useMemo(
    () => [
      { id: 1, imgSrc: "./images/6.jpg", title: "You are always stunning", emoji: "💕", color: "from-pink-400 to-purple-500" },
      { id: 2, imgSrc: "./images/7.jpg", title: "Who could beat those beautiful eyes", emoji: "👀", color: "from-purple-400 to-pink-500" },
      { id: 3, imgSrc: "./images/9.jpg", title: "Always the great achiever", emoji: "🏆", color: "from-blue-400 to-purple-500" },
      { id: 4, imgSrc: "./images/12.jpg", title: "A perfect teammate", emoji: "🫂", color: "from-orange-400 to-pink-500" },
      { id: 5, imgSrc: "./images/13.jpg", title: "Goofy Moments", emoji: "🤪", color: "from-fuchsia-400 to-rose-500" },
      { id: 6, imgSrc: "./images/15.jpg", title: "Will keep on staring", emoji: "🛕", color: "from-emerald-400 to-teal-500" },
    ],
    []
  )

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

      {/* Optional header GIF */}
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
        This how I see you… they make me love you even more❤️
      </motion.p>

      {/* 6-card grid: md+ = 3 cols × 2 rows */}
      <motion.div
        className="w-full max-w-5xl z-10"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 120, damping: 20 }}
      >
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {memories.map((memory, idx) => (
            <motion.figure
              key={memory.id}
              className={`
                group relative overflow-hidden rounded-3xl shadow-2xl
                bg-gradient-to-br ${memory.color}
                aspect-[4/5]
                flex items-center justify-center
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + idx * 0.05 }}
              whileHover={{ scale: 1.03, rotate: -0.6 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Image */}
              <img
                src={memory.imgSrc}
                alt={memory.title}
                className="absolute inset-0 h-full w-full object-cover opacity-95 transition duration-300 group-hover:opacity-100"
                loading="lazy"
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
                <span>{memory.emoji}</span>
                <span className="font-medium">{memory.title}</span>
              </figcaption>

              {/* Border glow on hover */}
              <div
                className="
                  absolute inset-0 rounded-3xl
                  ring-0 ring-pink-400/0 group-hover:ring-4 group-hover:ring-pink-400/30
                  transition duration-300
                "
              />
            </motion.figure>
          ))}
        </div>
      </motion.div>

      <motion.button
        className="mt-10 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-8 py:4 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-teal-500/25 transition-all"
        onClick={onNext}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        There is something more...😂
      </motion.button>
    </motion.div>
  )
}
