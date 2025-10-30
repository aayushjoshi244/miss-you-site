"use client"

import { motion } from "motion/react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"

export default function MemoriesScreen({ onNext, ...motionProps }) {
    const memories = [
        { id: 1, imgSrc: "./images/1.jpg", title: "Our First Date", emoji: "💕", color: "from-pink-400 to-purple-500" },
        { id: 2, imgSrc: "./images/2.jpg", title: "That Cute Selfie", emoji: "📸", color: "from-purple-400 to-pink-500" },
        { id: 3, imgSrc: "./images/3.jpg", title: "Dancing Together", emoji: "💃", color: "from-blue-400 to-purple-500" },
        { id: 4, imgSrc: "./images/4.jpg", title: "Sunset Walks", emoji: "🌅", color: "from-orange-400 to-pink-500" },
    ]

    return (
        <motion.div {...motionProps} className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 flex justify-center"
            >
                <div className="mb-4"><img src="/gifs/cute.gif" alt="cute gif" className="w-48" /></div>
            </motion.div>

            <motion.p
                className="text-gray-300 text-lg mb-8 text-center font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                These memories… they make me miss you even more❤️
            </motion.p>

            <motion.div
                className="w-full max-w-5xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 }}
            >
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination]}
                    className="memories-swiper"
                >
                    {memories.map((memory) => (
                        <SwiperSlide key={memory.id} className="!w-80 !h-80">
                            <div
                                className={`w-full h-full bg-gradient-to-br ${memory.color} rounded-3xl flex flex-col items-center justify-center text-white shadow-2xl relative overflow-hidden`}
                            >
                                <img src={memory.imgSrc} alt="" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>

            <motion.button
                className="mt-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-teal-500/25 transition-all"
                onClick={onNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
            >
                One Last Thing💝
            </motion.button>
        </motion.div>
    )
}
