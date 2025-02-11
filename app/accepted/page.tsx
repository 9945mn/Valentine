"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AcceptedPage() {
  const images = ["/Image1.JPG", "/Image2.JPG", "/Image3.JPG"];
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

        {/* Celebration Confetti & Crazy Background */}
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

            @keyframes gradient-move {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }

            @keyframes text-pop {
              0% { transform: scale(1) rotate(0deg); }
              25% { transform: scale(1.3) rotate(3deg); }
              50% { transform: scale(1) rotate(-3deg); }
              75% { transform: scale(1.4) rotate(5deg); }
              100% { transform: scale(1) rotate(0deg); }
            }

            .celebration-text {
              animation: text-pop 0.3s infinite;
              text-shadow: 0px 0px 15px rgba(255, 255, 255, 1);
              color: #ffffff;
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
      {/* Video inside a properly sized frame */}
      <div className="relative z-10 w-full max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw] aspect-video border-8 border-white rounded-lg shadow-xl overflow-hidden">
        <video
          className="w-full h-full rounded-lg"
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
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
