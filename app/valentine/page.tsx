"use client";

import { JSX, useState } from "react";
import { motion } from "framer-motion";

export default function ValentineProposal(): JSX.Element {
  const [accepted, setAccepted] = useState<boolean>(false);
  const [noButtonPosition, setNoButtonPosition] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

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
          0% {
            background: rgba(255, 182, 193, 0.8); /* Light pink with a slight transparency */
          }
          50% {
            background: rgba(255, 105, 180, 0.8); /* Slightly darker pink */
          }
          100% {
            background: rgba(255, 182, 193, 0.8); /* Light pink with a slight transparency */
          }
        }

        .gradient-background {
          background: rgba(255, 182, 193, 0.8); /* Light pink with transparency */
          animation: pink-gradient 6s ease infinite; /* Smooth animation of color shift */
        }

        .text-shadow {
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Soft dark shadow for text */
        }

        .button-shadow {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4); /* Subtle shadow for buttons */
        }

        .image-shadow {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); /* Strong shadow for images */
        }

        .gradient-text {
          background: linear-gradient(45deg, #ff7f7f, #ff1493); /* Pink to hot pink gradient */
          -webkit-background-clip: text;
          color: transparent; /* Makes text transparent so background shows */
          font-weight: bold;
        }
      `}</style>

      <div
        className="relative flex flex-col items-center justify-center min-h-screen text-center p-4 overflow-hidden gradient-background"
      >
        {!accepted ? (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/Background.JPG')",
              backgroundSize: "auto", // Makes the image fill the container without distortion
              backgroundPosition: "center", // Centers the image
              backgroundRepeat: "no-repeat",
              filter: "blur(3px) brightness(0.7)",
            }}
          ></div>
        ) : (
          <video
            className="absolute inset-0 w-full h-full object-cover" // Ensures the video covers the entire area
            autoPlay
            loop
            controls
            style={{ filter: "brightness(0.7)" }}
          >
            <source src="/romantic_video.MP4" type="video/mp4" />
          </video>
        )}
        <div className="relative z-10 flex flex-col items-center">
          {!accepted ? (
            <>
              <motion.h1
                className="text-4xl md:text-5xl mb-6 text-white drop-shadow-lg text-shadow gradient-text"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Bini, will you be my Valentine? ❤️
              </motion.h1>
              <div className="flex space-x-6 relative">
                <button
                  onClick={() => setAccepted(true)}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 text-lg rounded-full shadow-lg button-shadow"
                >
                  Yes
                </button>
                <motion.button
                  className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 text-lg rounded-full shadow-lg button-shadow"
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
                className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg text-shadow"
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
                <motion.img
                  src="/Image1.JPG"
                  alt="Romantic moment 1"
                  className="w-64 rounded-lg shadow-lg opacity-70 image-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.7, y: [-10, 10, -10] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.img
                  src="/Image2.JPG"
                  alt="Romantic moment 2"
                  className="w-64 rounded-lg shadow-lg opacity-70 image-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.7, y: [-10, 10, -10] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.img
                  src="/Background.JPG"
                  alt="Romantic moment 3"
                  className="w-64 rounded-lg shadow-lg opacity-70 image-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.7, y: [-10, 10, -10] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
