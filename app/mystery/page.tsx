"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function MysteryPage() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [stage, setStage] = useState(0);

  // Preload images before rendering
  useEffect(() => {
    const imageSources = ["/Image5.JPG", "/Image6.JPG"];
    let loadedCount = 0;

    imageSources.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageSources.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
      };
    });
  }, []);

  useEffect(() => {
    if (imagesLoaded) {
      const timer = setTimeout(() => setStage(1), 5000); // Show next stage after 5s
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded]);

  if (!imagesLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-neon-green text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center font-mono overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #200122, #6f0000, #000000)",
        color: "#00FF41", // Neon green (matrix-like)
      }}
    >
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <div className="relative w-[95vw] h-[90vh] max-w-6xl max-h-[90vh] flex flex-row overflow-hidden rounded-lg shadow-lg border-4 border-white">
          <div className="w-1/2 h-full relative">
            <Image
              src="/Image5.JPG"
              alt="First Half"
              layout="fill"
              objectFit="cover"
              className="rounded-l-lg"
            />
          </div>
          <div className="w-1/2 h-full relative">
            <Image
              src="/Image6.JPG"
              alt="Second Half"
              layout="fill"
              objectFit="cover"
              className="rounded-r-lg"
            />
          </div>
        </div>
      </div>

      {/* Stage 0: Show initial message */}
      <AnimatePresence>
        {stage === 0 && (
          <motion.h1
            className="text-4xl font-bold relative z-10 mt-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            style={{ textShadow: "0 0 10px #FF0000, 0 0 20px #FF0000" }} // Glowing red effect
          >
            Or do you think this webpage is all about you?
          </motion.h1>
        )}
      </AnimatePresence>

      {/* Stage 1: Show the button and text only after Stage 0 disappears */}
      {stage === 1 && (
        <motion.div
          className="relative z-10 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h2
            className="text-2xl font-bold mb-4"
            style={{ textShadow: "0 0 8px #00FF41" }} // Neon green glow
          >
            If you want to know, click this button
          </h2>
          <Link href="/valentine">
            <motion.button
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9, rotate: 5 }}
              className="px-6 py-3 rounded-lg shadow-md transition"
              style={{
                background: "linear-gradient(135deg, #ff0000, #ff7300)",
                color: "#fff",
                textShadow: "0 0 5px #000",
              }}
            >
              Reveal the Secret
            </motion.button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
