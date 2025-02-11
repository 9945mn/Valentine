"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showButton, setShowButton] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadingDelayOver, setLoadingDelayOver] = useState(false); // 5s delay for scary loading
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/funnyImage.JPG";
    img.onload = () => {
      setImageLoaded(true);
      console.log("Image preloaded successfully! ✅");
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.muted = false;
      audioRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
    }

    setShowButton(false);
    setShowImage(true);

    // 5s scary loading delay before showing funnyImage
    setTimeout(() => {
      setLoadingDelayOver(true);

      // Redirect to next funny page after 10s
      setTimeout(() => router.push("/nextfunnypage"), 10000);
    }, 5000);
  };

  if (!imageLoaded || (showImage && !loadingDelayOver)) {
    return (
      <div className="flex items-center justify-center min-h-screen scary-background">
        <motion.div
          className="text-3xl md:text-5xl font-bold text-red-500 scary-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading... 😱
        </motion.div>

        {/* Scary CSS */}
        <style>
          {`
            @keyframes scary-bg {
              0% { background: #300000; }
              50% { background: #200000; }
              100% { background: #300000; }
            }

            .scary-background {
              animation: scary-bg 2s infinite alternate;
            }

            @keyframes flicker {
              0% { opacity: 0.2; }
              50% { opacity: 1; }
              100% { opacity: 0.2; }
            }

            .scary-text {
              animation: flicker 1.5s infinite;
              text-shadow: 0px 0px 15px rgba(255, 0, 0, 0.8);
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-8 text-center relative w-full transition-all duration-700 ${
        showImage ? "bg-crazy-gradient" : "bg-gradient-to-r from-red-900 to-black"
      }`}
      style={{
        fontFamily: "'Creepster', cursive",
      }}
    >
      <style>
        {`
          @keyframes crazy-gradient {
            0% { background: linear-gradient(45deg, #ff0000, #ff6600, #ffff00); }
            25% { background: linear-gradient(45deg, #00ff00, #00ffff, #0000ff); }
            50% { background: linear-gradient(45deg, #800080, #ff1493, #ff4500); }
            75% { background: linear-gradient(45deg, #ff0000, #ff6600, #ffff00); }
            100% { background: linear-gradient(45deg, #00ff00, #00ffff, #0000ff); }
          }

          .bg-crazy-gradient {
            animation: crazy-gradient 4s infinite alternate;
          }
        `}
      </style>

      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {showImage ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <img
            src="/funnyImage.JPG"
            alt="Funny Music Image"
            className="absolute inset-0 max-w-full max-h-full w-auto h-auto mx-auto"
          />
          <motion.h1
            className="relative z-10 text-4xl md:text-6xl font-bold text-white mt-10 text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            Like this music? 🎶  
            Let&apos;s play it for 10 seconds, please! 😈
          </motion.h1>
        </div>
      ) : (
        <div className="relative z-10">
          <AnimatePresence>
            <motion.h1
              key="not-found"
              className="text-6xl font-bold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: [5, -5, 5],
                y: [0, -10, 0, 10, 0],
              }}
              exit={{ opacity: 0, scale: 1.5, rotate: -5 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              style={{
                textShadow: "0px 0px 10px rgba(255, 0, 0, 0.8)",
              }}
            >
              404 Not Found?
            </motion.h1>
          </AnimatePresence>

          {showButton && (
            <motion.button
              onClick={handleButtonClick}
              className="mt-8 px-6 py-3 text-xl font-bold text-black bg-red-500 border-4 border-black rounded-lg shadow-lg hover:scale-110 transition-transform"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              Proceed? Click Here!!! 😈
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}
