"use client";

import { JSX, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ValentineProposal(): JSX.Element {
  const [accepted, setAccepted] = useState<boolean>(false);
  const [noButtonPosition, setNoButtonPosition] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Assets list
  const images = ["/Image1.JPG", "/Image2.JPG", "/Image3.JPG"];
  const video = "/video.MP4";
  const totalAssets = images.length + 1; // 3 images + 1 video

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const loadedAssets = new Set(); // ✅ Prevent duplicate state updates

  // Preload images and track load completion
  useEffect(() => {
    images.forEach((src) => {
      if (loadedAssets.has(src)) return; // Prevent duplicate updates

      const img = document.createElement("img");
      img.src = src;

      const handleLoad = () => {
        loadedAssets.add(src);
        setLoadedCount((prev) => {
          const newCount = prev + 1;
          console.log(`✅ Image loaded! ${newCount} / ${totalAssets}`);
          return newCount;
        });
      };

      if (img.complete) {
        handleLoad();
      } else {
        img.onload = handleLoad;
      }
    });
  }, []); // ✅ Runs once on mount

  // Handle video load event
  const handleVideoLoad = () => {
    if (!loadedAssets.has(video)) {
      loadedAssets.add(video);
      setLoadedCount((prev) => {
        const newCount = prev + 1;
        console.log(`🎥 Video loaded! ${newCount} / ${totalAssets}`);
        return newCount;
      });
    }
  };

  // Check when all assets are loaded
  useEffect(() => {
    if (loadedCount >= totalAssets) {
      console.log("🎉 All assets loaded! Showing page.");
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
        // 🔥 Loading screen
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
          {!accepted ? (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: "url('/Image3.JPG')",
                filter: "blur(3px) brightness(0.7)",
              }}
            ></div>
          ) : (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              controls
              preload="auto"
              style={{ filter: "brightness(0.7)" }}
              onCanPlayThrough={handleVideoLoad} // ✅ More reliable video event
              onLoadedData={handleVideoLoad} // ✅ Backup event for video
            >
              <source src={video} type="video/mp4" />
            </video>
          )}

          <div className="relative z-10 flex flex-col items-center">
            {!accepted ? (
              <>
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
                    onClick={() => setAccepted(true)}
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
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center"
              >
                <motion.h1
                  className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg"
                  initial={{ y: 0 }}
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  Yay! ❤️ Can’t wait to celebrate with you! 🎉
                </motion.h1>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: [-20, 20, -20], opacity: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  className="mt-4 text-3xl"
                >
                  🎈🎉💖
                </motion.div>
                <div className="flex space-x-4 mt-6">
                  {images.map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 0.7, y: [-10, 10, -10] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <Image
                        src={img}
                        alt={`Romantic moment ${index + 1}`}
                        width={250}
                        height={250}
                        priority
                        className="rounded-lg shadow-lg opacity-70"
                        onLoad={() => {
                          if (!loadedAssets.has(img)) {
                            loadedAssets.add(img);
                            setLoadedCount((prev) => prev + 1);
                          }
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
