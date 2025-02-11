"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function NextFunnyPage() {
  const [showButton, setShowButton] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadingDelayOver, setLoadingDelayOver] = useState(false); // New state for 5s delay
  const router = useRouter();

  useEffect(() => {
    const img = new Image();
    img.src = "/funnyImage2.JPG";
    img.onload = () => {
      setImageLoaded(true);
      console.log("FunnyImage2 preloaded! ✅");

      // Start 5s annoying loading delay
      setTimeout(() => {
        setLoadingDelayOver(true);
        setTimeout(() => setShowButton(true), 8000); // 5s delay before showing button
      }, 8000);
    };
  }, []);

  if (!imageLoaded || !loadingDelayOver) {
    return (
      <div className="flex items-center justify-center min-h-screen annoying-background">
        <motion.div
          className="text-3xl md:text-5xl font-bold annoying-text"
          initial={{ opacity: 1, x: 0 }}
          animate={{ 
            opacity: [1, 0.5, 1], 
            x: [-10, 10, -10, 10, 0], 
            rotate: [-5, 5, -5, 5, 0] 
          }}
          transition={{ duration: 0.2, repeat: Infinity }}
        >
          Loading... 🤬😡😖
        </motion.div>

        {/* Annoying CSS */}
        <style>
          {`
            @keyframes annoying-bg {
              0% { background: #ff0000; }
              20% { background: #00ff00; }
              40% { background: #0000ff; }
              60% { background: #ffff00; }
              80% { background: #ff00ff; }
              100% { background: #ff0000; }
            }

            .annoying-background {
              animation: annoying-bg 0.3s infinite; /* Extremely fast color switching */
            }

            @keyframes annoying-text {
              0% { transform: scale(1) rotate(0deg); }
              25% { transform: scale(1.2) rotate(5deg); }
              50% { transform: scale(0.8) rotate(-5deg); }
              75% { transform: scale(1.3) rotate(10deg); }
              100% { transform: scale(1) rotate(0deg); }
            }

            .annoying-text {
              animation: annoying-text 0.2s infinite;
              text-shadow: 0px 0px 15px rgba(255, 255, 255, 1);
              color: #ffffff;
              font-family: "Comic Sans MS", cursive, sans-serif;
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center min-h-screen w-full p-8 text-center transition-all duration-700 bg-crazy-gradient"
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

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Background Image */}
        <img
          src="/funnyImage2.JPG"
          alt="Funny Image 2"
          className="absolute inset-0 max-w-full max-h-full w-auto h-auto mx-auto object-cover"
        />

        {/* Text & Button Overlay */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white text-center px-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            style={{
              textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)", // Glow effect
            }}
          >
            Are you sure you want to see what&apos;s coming next? 🤔
          </motion.h1>

          {/* Button appears after 5 seconds */}
          {showButton && (
            <motion.button
              onClick={() => router.push("/mystery")}
              className="mt-8 px-6 py-3 text-xl font-bold text-black bg-yellow-500 border-4 border-black rounded-lg shadow-lg hover:scale-110 transition-transform"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              I guess you can click here now!!! 😈
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
