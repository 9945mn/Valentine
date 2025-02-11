"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function MysteryPage() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingDelayOver, setLoadingDelayOver] = useState(false);
  const [stage, setStage] = useState(0);
  const [mysteryActive, setMysteryActive] = useState(false);

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

          setTimeout(() => {
            setLoadingDelayOver(true);
            setMysteryActive(true);
            setTimeout(() => setStage(1), 5000);
          }, 5000);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
      };
    });
  }, []);

  if (!imagesLoaded || !loadingDelayOver) {
    return (
      <div className="flex items-center justify-center min-h-screen mystery-loading">
        <motion.div
          className="text-3xl md:text-5xl font-bold text-yellow-300 mystery-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading the Unknown... 🔮
        </motion.div>

        <style>
          {`
            @keyframes flicker {
              0% { opacity: 0.2; text-shadow: 0 0 5px #fff; }
              50% { opacity: 1; text-shadow: 0 0 20px #fff; }
              100% { opacity: 0.2; text-shadow: 0 0 5px #fff; }
            }
            .mystery-text {
              animation: flicker 1.5s infinite;
            }
            .mystery-loading {
              background: radial-gradient(circle, #3a1c71, #d76d77, #ffaf7b);
              animation: mystery-bg 3s infinite alternate;
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div className={`relative w-full min-h-screen flex flex-col items-center justify-center text-center font-mono overflow-hidden ${mysteryActive ? "mystery-background" : ""}`}>
      {/* Mist & Particles */}
      <div className="mist"></div>
      <div className="mist2"></div>
      <div className="particles"></div>

      {/* Image Container */}
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

      {/* Mystery Message */}
      <AnimatePresence>
        {stage === 0 && (
          <motion.h1
            className="text-4xl font-bold relative z-10 mt-8 mystery-glow"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
          >
            Something strange is happening...
          </motion.h1>
        )}
      </AnimatePresence>

      {/* Secret Reveal */}
      {stage === 1 && (
        <motion.div
          className="relative z-10 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 mystery-text">
            Want to discover the truth?
          </h2>
          <Link href="/valentine">
            <motion.button
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9, rotate: 5 }}
              className="mystery-button"
            >
              Reveal the Secret
            </motion.button>
          </Link>
        </motion.div>
      )}

      <style>
        {`
          /* New Mysterious Background */
          .mystery-background {
            background: linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b);
            transition: background 3s ease-in-out;
          }

          /* Glowing Text */
          .mystery-glow {
            text-shadow: 0 0 10px #FF00FF, 0 0 20px #FF00FF;
          }

          /* Floating Mist */
          .mist, .mist2 {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('/mist.png') repeat-x;
            opacity: 0.5;
          }
          .mist {
            animation: mistMove 15s linear infinite;
          }
          .mist2 {
            animation: mistMove 20s linear infinite reverse;
          }
          @keyframes mistMove {
            0% { transform: translateX(-10%) translateY(-5%); }
            50% { transform: translateX(10%) translateY(5%); }
            100% { transform: translateX(-10%) translateY(-5%); }
          }

          /* Sparkling Particles */
          .particles {
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
            opacity: 0.3;
            animation: sparkle 10s infinite alternate;
          }
          @keyframes sparkle {
            0% { opacity: 0.1; }
            50% { opacity: 0.3; }
            100% { opacity: 0.1; }
          }

          /* Mystery Button */
          .mystery-button {
            padding: 12px 24px;
            border-radius: 8px;
            background: linear-gradient(135deg, #ff00ff, #ff7300);
            color: #fff;
            text-shadow: 0 0 5px #000;
            transition: all 0.3s ease-in-out;
          }
          .mystery-button:hover {
            box-shadow: 0 0 15px #ff00ff;
          }
        `}
      </style>
    </div>
  );
}
