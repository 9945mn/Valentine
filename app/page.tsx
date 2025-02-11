"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showButton, setShowButton] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Preload the image before rendering the page
  useEffect(() => {
    const img = new Image();
    img.src = "/funnyImage.JPG"; // Replace with your image path
    img.onload = () => {
      setImageLoaded(true);
      console.log("Image preloaded successfully! ✅");
    };
  }, []);

  useEffect(() => {
    // Show the "Proceed?" button after 5 seconds
    const timer = setTimeout(() => setShowButton(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume
      audioRef.current.muted = false; // Ensure it's unmuted
      audioRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
    }

    // Hide 404 text and button, show full-screen image & message
    setShowButton(false);
    setShowImage(true);

    // After 10 seconds, redirect to mystery page
    setTimeout(() => router.push("/mystery"), 10000);
  };

  if (!imageLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <motion.div
          className="text-2xl text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          Loading... 🎶
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-8 text-center relative w-full"
      style={{
        background: "linear-gradient(135deg, #300000, #000000)",
        color: "#ff0000",
        fontFamily: "'Creepster', cursive",
      }}
    >
      {/* Background Music (Initially Paused) */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Display the funny image and message after clicking "Proceed?" */}
      {showImage ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
          <img
            src="/funnyImage.JPG" // Replace with your image
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
                rotate: [5, -5, 5], // Slight eerie tilt effect
                y: [0, -10, 0, 10, 0], // Dancing up & down effect
              }}
              exit={{ opacity: 0, scale: 1.5, rotate: -5 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              style={{
                textShadow: "0px 0px 10px rgba(255, 0, 0, 0.8)", // Eerie glow effect
              }}
            >
              404 Not Found?
            </motion.h1>
          </AnimatePresence>

          {/* Funny "Proceed?" Button (Appears After 5 Seconds) */}
          {showButton && (
            <motion.button
              onClick={handleButtonClick}
              className="mt-8 px-6 py-3 text-xl font-bold text-black bg-red-500 border-4 border-black rounded-lg shadow-lg hover:scale-110 transition-transform"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              Proceed? 😈
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}
