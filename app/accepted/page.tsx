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
      <div className="flex items-center justify-center min-h-screen celebration-background overflow-hidden">
        <motion.div
          className="text-4xl md:text-6xl font-bold text-white"
          style={{
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)", // Better contrast
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: [20, -20, 20] }}
          transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
        >
          IT&apos;S PARTY TIME! 🎉💃🔥
        </motion.div>

        {/* Confetti Celebration */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
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
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center p-6 overflow-hidden bg-pink-200">
      {/* Confetti Celebration Inside */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
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

      {/* Enlarged Frame with Images, Video, and Overlay Text */}
      <div className="relative z-10 w-full max-w-[85vw] md:max-w-[75vw] lg:max-w-[65vw] h-[75vh] md:h-[85vh] border-8 border-white rounded-lg shadow-xl overflow-hidden bg-pink-200">
        <div className="relative flex flex-row w-full h-full">
          {/* Left-side Image */}
          <div className="w-1/3 h-full relative">
            <Image
              src={images[0]}
              alt="Left Side Image"
              layout="fill"
              objectFit="cover"
              className="rounded-l-lg"
            />
          </div>

          {/* Video in the center */}
          <div className="w-1/3 h-full relative flex items-center justify-center bg-pink-200">
            <video
              className="w-full h-full object-cover rounded-lg"
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
              src={images[1]}
              alt="Right Side Image"
              layout="fill"
              objectFit="cover"
              className="rounded-r-lg"
            />
          </div>
        </div>

        {/* Overlay Text on Top of Media */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-30">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [-10, 10, -10] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          >
            Yay! ❤️ Can&apos;t wait to celebrate with you!
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: [-10, 10, -10], opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="text-2xl md:text-3xl text-white"
          >
            🎈🎉💖
          </motion.div>
        </div>
      </div>
    </div>
  );
}
