"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Loader from "@/components/Loader"
import WelcomeScreen from "@/components/WelcomeScreen"
import MissCounterScreen from "@/components/MissCounterScreen"
import MessageScreen from "@/components/MessageScreen"
import MemoriesScreen from "@/components/MemoriesScreen"
import FinalScreen from "@/components/FinalScreen"
import BackgroundAnimation from "@/components/BackgroundAnimation"
import MusicPlayer from "@/components/MusicPlayer"
import Myeyes from "@/components/Myeyes"

export default function Home() {
  const TOTAL_SCREENS = 6 // indexes: 0..5
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [showMusicControl, setShowMusicControl] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  const nextScreen = () => {
    if (currentScreen === 0) {
      setShowMusicControl(true)
      setMusicPlaying(true)
    }
    setCurrentScreen((prev) => (prev + 1) % TOTAL_SCREENS) // <-- was % 5
  }

  if (isLoading) return <Loader />

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-cute">
      <BackgroundAnimation />

      {/* Background song */}
      {showMusicControl && (
        <div className="fixed top-4 right-4 z-50">
          <MusicPlayer musicPlaying={musicPlaying} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentScreen === 0 && (
          <WelcomeScreen
            key="welcome"
            onNext={nextScreen}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
        {currentScreen === 1 && (
          <MissCounterScreen
            key="counter"
            onNext={nextScreen}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
        {currentScreen === 2 && (
          <MessageScreen
            key="message"
            onNext={nextScreen}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
        {currentScreen === 3 && (
          <Myeyes
            key="eyes"
            onNext={nextScreen}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
        {currentScreen === 4 && (
          <MemoriesScreen
            key="memories"
            onNext={nextScreen}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
        {currentScreen === 5 && (
          <FinalScreen
            key="final"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-4 right-4 text-xs text-white/40 pointer-events-none select-none z-50 font-light"
      >
        @anujbuilds
      </motion.div>
    </div>
  )
}
