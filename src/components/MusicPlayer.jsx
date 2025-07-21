"use client"

import { useRef, useEffect } from "react"

export default function MusicPlayer({ musicPlaying }) {
    const audioRef = useRef(null)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5; // Adjust the song volume here
            if (musicPlaying) {
                audioRef.current.play().catch(console.error)
            } else {
                audioRef.current.pause()
            }
        }
    }, [musicPlaying])

    return (
        <div>
            <audio ref={audioRef} loop>
                <source src="/audio/bg.mp3" type="audio/mpeg" />
            </audio>
        </div>
    )
}