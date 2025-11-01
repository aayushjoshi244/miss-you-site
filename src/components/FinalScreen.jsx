"use client"

import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect } from "react"

export default function FinalScreen({ herImageSrc = "/images/16.jpg", ...motionProps }) {
  // --- Primary typing (your original message) ---
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  const finalMessage =
    "Happy Birthday My love💖, you're all I think about. Every second without you feels incomplete. I love your smile, your laugh, your voice — everything. You are my peace in this noisy world. No matter what happens, you'll always live in my heart. Can't wait for the day I make you completely mine. Until then, just know... I adore you more than words can ever say, and be happy because you shine when you smile🌙💕"

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < finalMessage.length) {
        setDisplayText((prev) => prev + finalMessage[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      } else {
        setIsTyping(false)
      }
    }, 30)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  // --- Modal state for the “Will you be with me forever?” question ---
  const [showQuestion, setShowQuestion] = useState(false)
  const openQuestion = () => setShowQuestion(true)

  // --- After choosing Yes/No: show image + pink drop + second typed note ---
  const [answered, setAnswered] = useState(false)
  const [secondText, setSecondText] = useState("")
  const [secondIndex, setSecondIndex] = useState(0)

  const secondMessage =
    "No matter what you choose — yes or no — I will always choose you. Once again, Happy Birthday Love💖✨, may you achieve everything in life."

  useEffect(() => {
    if (!answered) return
    // type out the second message
    const t = setTimeout(() => {
      if (secondIndex < secondMessage.length) {
        setSecondText((p) => p + secondMessage[secondIndex])
        setSecondIndex((p) => p + 1)
      }
    }, 30)
    return () => clearTimeout(t)
  }, [answered, secondIndex, secondMessage])

  const handleAnswer = () => {
    setShowQuestion(false)
    setAnswered(true)
  }

  return (
    <motion.div {...motionProps} className="min-h-screen flex items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Pink background DROP appears only after answer */}
      <AnimatePresence>
        {answered && (
          <motion.div
            key="pink-drop"
            className="absolute inset-0 bg-pink-600"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 8, ease: "easeInOut" }}
            style={{ zIndex: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Foreground content */}
      <div className="max-w-4xl z-10">
        {/* Top GIF */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <img src="/gifs/birthday.gif" alt="us gif" className="w-48" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Forever Yours
        </motion.h2>

        {/* First typed message */}
        <motion.div
          className="bg-gray-950/50 backdrop-blur-md border border-pink-500/10 rounded-3xl p-5 md:p-10 shadow-2xl mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-lg md:text-2xl text-white leading-relaxed font-light">
            {displayText}
            {isTyping && (
              <motion.span
                className="inline-block w-0.5 h-6 bg-pink-400 ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
            )}
          </p>
        </motion.div>

        {/* Ask button (only before answering) */}
        {!answered && (
          <motion.button
            className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-pink-500/25 transition-all"
            onClick={openQuestion}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            One more thing…
          </motion.button>
        )}

        {/* After answering: her picture + second typed message */}
        <AnimatePresence>
          {answered && (
            <motion.div
              key="answer-block"
              className="mt-10 flex flex-col items-center"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Her image */}
              <motion.div
                className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white/70 shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={herImageSrc}
                  alt="her"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Second typed note */}
              <motion.div
                className="mt-8 bg-black/30 backdrop-blur-md border border-white/15 rounded-3xl p-5 md:p-8 shadow-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <p className="text-base md:text-xl text-white/95 leading-relaxed font-light max-w-2xl">
                  {secondText}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal: the question */}
      <AnimatePresence>
        {showQuestion && !answered && (
          <motion.div
            key="question-modal"
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Card */}
            <motion.div
              className="relative z-10 w-[90vw] max-w-md rounded-3xl overflow-hidden border border-white/10 bg-gray-950/80 shadow-2xl p-6 text-white"
              initial={{ scale: 0.96, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 10, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-center">
                Will you be with me forever?
              </h3>
              <p className="text-white/80 text-sm text-center mb-6">
                Select your answer carefully — I will store it as a log in my heart.
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleAnswer}
                  className="px-6 py-2 rounded-full bg-pink-600 hover:bg-pink-500 font-medium shadow"
                >
                  Yes
                </button>
                <button
                  onClick={handleAnswer}
                  className="px-6 py-2 rounded-full bg-gray-700 hover:bg-gray-600 font-medium shadow"
                >
                  No
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
