"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AcceptedPage() {
  const images = ["/Image1.JPG", "/Image2.JPG", "/Image3.JPG"];
  const video = "/video.MP4";

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center p-4 overflow-hidden bg-pink-200">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        controls
        style={{ filter: "brightness(0.7)" }}
      >
        <source src={video} type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          className="text-5xl font-bold text-white drop-shadow-lg mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Yay! ❤️ Can’t wait to celebrate with you! 🎉
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
