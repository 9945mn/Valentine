"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AcceptedPage() {
  const images = ["/Image9.JPG", "/Image10.JPG", "/Image3.JPG"];
  const video = "/video.MP4";
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [loadingDelayOver, setLoadingDelayOver] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = images.length + 1; // +1 for video

    // Load images
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalAssets) {
          setMediaLoaded(true);
          setTimeout(() => setLoadingDelayOver(true), 8000); // ⏳ 8 seconds delay
        }
      };
    });

    // Load video
    const vid = document.createElement("video");
    vid.src = video;
    vid.onloadeddata = () => {
      loadedCount++;
      if (loadedCount === totalAssets) {
        setMediaLoaded(true);
        setTimeout(() => setLoadingDelayOver(true), 8000); // ⏳ 8 seconds delay
      }
    };
  }, []);

  if (!mediaLoaded || !loadingDelayOver) {
    return (
      <div className="flex items-center justify-center min-h-screen celebration-background">
        <motion.div
          className="text-4xl md:text-6xl font-bold celebration-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: [20, -20, 20] }}
          transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
        >
          IT&apos;S PARTY TIME! 🎉💃🔥
        </motion.div>

        {/* Celebration Confetti & Background Animation */}
        <style>
          {`
            @keyframes confetti-fall {
              0% { transform: translateY(0) rotate(0); opacity: 1; }
              100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }

            .confetti {
              position: absolute;
              width: 12px;
              height: 12px;
              background: randomColor();
              opacity: 1;
              animation: confetti-fall 2s linear infinite;
            }

            .celebration-background {
              background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #00ff00, #00ffff, #0000ff, #ff00ff);
              background-size: 400% 400%;
              animation: gradient-move 2s infinite linear;
              overflow: hidden;
            }
          `}
        </style>

        {/* Generate 50 Confetti Pieces 🎊 */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 2 + 1}s`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
            }}
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center p-6 overflow-hidden bg-pink-200">
      {/* Frame containing two images + video in the center */}
      <div className="relative z-10 w-full max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] aspect-video border-8 border-white rounded-lg shadow-xl overflow-hidden flex bg-pink-200">
        {/* Left-side Image */}
        <div className="w-1/3 h-full relative">
          <Image
            src={images[0]} // Left image
            alt="Left Side Image"
            layout="fill"
            objectFit="cover"
            className="rounded-l-lg"
          />
        </div>

        {/* Video in the center with matching background color */}
        <div className="w-1/3 h-full relative flex items-center justify-center bg-pink-200">
          <video
            className="w-full h-full object-contain rounded-lg"
            autoPlay
            loop
            muted
            playsInline
            disableRemotePlayback
            onContextMenu={(e) => e.preventDefault()} // Prevents right-click menu
            controls={false} // Hides default video controls
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>

        {/* Right-side Image */}
        <div className="w-1/3 h-full relative">
          <Image
            src={images[1]} // Right image
            alt="Right Side Image"
            layout="fill"
            objectFit="cover"
            className="rounded-r-lg"
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center mt-6">
        <motion.h1
          className="text-5xl font-bold text-white drop-shadow-lg mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Yay! ❤️ Can&apos;t wait to celebrate with you!
        </motion.h1>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: [-20, 20, -20], opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="text-3xl"
        >
          🎈🎉💖
        </motion.div>
      </div>
    </div>
  );
}
