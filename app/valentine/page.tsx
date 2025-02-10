"use client";

import { JSX, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ValentineProposal(): JSX.Element {
  const router = useRouter();
  const [noButtonPosition, setNoButtonPosition] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
      setIsLoaded(true);
    }
  }, [loadedCount]);

  const moveNoButton = (): void => {
    if (noButtonPosition >= 150) {
      setDirection(-1);
    } else if (noButtonPosition <= -150) {
      setDirection(1);
    }
    setNoButtonPosition(noButtonPosition + 50 * direction);
  };

  return (
    <>
      <style jsx>{`
        @keyframes pink-gradient {
          0% { background: rgba(255, 182, 193, 0.8); }
          50% { background: rgba(255, 105, 180, 0.8); }
          100% { background: rgba(255, 182, 193, 0.8); }
        }
        .gradient-background { animation: pink-gradient 6s ease infinite; }
      `}</style>

      {!isLoaded ? (
        <div className="flex items-center justify-center min-h-screen bg-pink-200">
          <motion.div
            className="text-2xl text-pink-700 font-bold"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          >
            Loading... 💖
          </motion.div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-center min-h-screen text-center p-4 overflow-hidden gradient-background">
          {/* Frame Container */}
          <div className="relative z-10 w-full max-w-5xl h-3/4 border-8 border-white rounded-lg shadow-xl overflow-hidden">
            <img 
              src="/Image3.JPG" 
              alt="Valentine Background" 
              className="w-full h-full object-contain bg-black"
            />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
            <motion.h1
              className="text-4xl md:text-5xl mb-6 text-white drop-shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Bini, will you be my Valentine? ❤️
            </motion.h1>
            <div className="flex space-x-6 relative">
              <button
                onClick={() => router.push("/accepted")}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 text-lg rounded-full shadow-lg"
              >
                Yes
              </button>
              <motion.button
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 text-lg rounded-full shadow-lg"
                animate={{ x: noButtonPosition }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
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
