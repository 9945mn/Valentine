"use client";

import { JSX, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ValentineProposal(): JSX.Element {
  const router = useRouter();
  const [noButtonPosition, setNoButtonPosition] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [loadingDelayOver, setLoadingDelayOver] = useState<boolean>(false); // New state

  const images = ["/Image1.JPG", "/Image2.JPG", "/Image3.JPG"];
  const totalAssets = images.length;
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const loadedAssets = useRef(new Set());

  useEffect(() => {
    images.forEach((src) => {
      if (loadedAssets.current.has(src)) return;

      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedAssets.current.add(src);
        setLoadedCount((prev) => prev + 1);
      };
    });
  }, []);

  useEffect(() => {
    if (loadedCount >= totalAssets) {
      setTimeout(() => {
        setLoadingDelayOver(true); // After 5 seconds, show the actual content
      }, 5000);
    }
  }, [loadedCount]);

  const moveNoButton = (): void => {
    if (noButtonPosition >= 300) {
      setDirection(-1);
    } else if (noButtonPosition <= -300) {
      setDirection(1);
    }
    setNoButtonPosition(noButtonPosition + 160 * direction);
  };

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes:wght@400;600&family=Poppins:wght@400;600&display=swap');

        @keyframes pink-gradient {
          0% { background: rgba(255, 182, 193, 0.8); }
          50% { background: rgba(255, 105, 180, 0.8); }
          100% { background: rgba(255, 182, 193, 0.8); }
        }

        .gradient-background { 
          animation: pink-gradient 6s ease infinite; 
        }
      `}</style>

      {/* Show loading screen until images are loaded and delay is over */}
      {!loadingDelayOver ? (
        <div className="flex items-center justify-center min-h-screen bg-pink-200">
          <motion.div
            className="text-3xl font-bold text-pink-700"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          >
            Loading... 💖
          </motion.div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-center min-h-screen text-center p-4 overflow-hidden gradient-background">
          {/* Frame Container with perfect alignment */}
          <div
            className="relative z-10 border-8 border-white rounded-lg shadow-xl overflow-hidden flex w-[90vw] h-[90vh]"
          >
            {images.map((src, index) => (
              <img 
                key={index} 
                src={src} 
                alt={`Valentine Background ${index + 1}`} 
                className="w-1/3 h-full object-cover flex-shrink-0"
              />
            ))}
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold font-[Great Vibes] text-[#fff5e6] shadow-lg"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Bini, will you be my Valentine? ❤️
            </motion.h1>

            <div className="flex space-x-6 relative mt-6">
              <button
                onClick={() => router.push("/accepted")}
                className="text-lg md:text-xl font-semibold font-[Poppins] bg-pink-600 text-white px-8 py-3 rounded-full shadow-lg hover:scale-110 transition-all"
              >
                Yes
              </button>
              <motion.button
                className="text-lg md:text-xl font-semibold font-[Poppins] bg-pink-600 text-white px-8 py-3 rounded-full shadow-lg hover:scale-110 transition-all"
                animate={{ x: noButtonPosition }}
                transition={{ type: "spring", stiffness: 500, damping: 8 }}
                onMouseEnter={moveNoButton}
              >
                No
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
