"use client"

import { motion } from "motion/react"
import { useState, useEffect } from "react"

export default function MissCounterScreen({ onNext, ...motionProps }) {
  const [counter, setCounter] = useState(0)
  const [showInfinity, setShowInfinity] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 9999) {
          setShowInfinity(true)
          return prev
        }
        return prev + Math.floor(Math.random() * 150) + 50
      })
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div {...motionProps} className="min-h-screen flex items-center justify-center text-center px-6 relative">

      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-2xl"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}

        />
      </div>

      <div className="max-w-2xl z-10">
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-4"><img src="/gifs/crying.gif" alt="cry gif" className="w-48" /></div>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          I miss you...
        </motion.h2>

        <motion.div
          className="relative mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <motion.div
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            transition={{ duration: 2 }}
          >
            {showInfinity ? "∞" : counter.toLocaleString()}
          </motion.div>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {showInfinity ? "times… and forever more" : "times every moment"}
        </motion.p>

        <motion.button
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all"
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 7.4 }}
          disabled={!showInfinity}
        >
          Hear my heart💗
        </motion.button>
      </div>
    </motion.div>
  )
}
