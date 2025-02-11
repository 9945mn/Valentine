"use client";
import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.volume = 0.5; // Set volume
        audioRef.current.muted = false; // Ensure it's unmuted

        // Attempt to play audio
        audioRef.current.play().then(() => {
          setIsPlaying(true); // Mark audio as playing
          console.log("Music started playing 🎵");
        }).catch((error) => {
          console.error("Autoplay blocked. Waiting for user interaction.", error);
        });
      }
    };

    // Start music when user interacts with page
    document.addEventListener("click", playAudio);
    document.addEventListener("keydown", playAudio);

    return () => {
      document.removeEventListener("click", playAudio);
      document.removeEventListener("keydown", playAudio);
    };
  }, [isPlaying]);

  return (
    <>
      {!isPlaying && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.play();
                setIsPlaying(true);
              }
            }}
            className="bg-pink-600 text-white px-6 py-2 rounded-full shadow-lg hover:scale-110 transition-all"
          >
            Play Music 🎶
          </button>
        </div>
      )}

      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
}