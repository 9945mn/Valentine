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
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-center p-4">
      {!accepted ? (
        <>
          <motion.h1 
            className="text-3xl font-bold mb-6" 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 0.5 }}
          >
            Bini, will you be my Valentine? ❤️
          </motion.h1>
          <div className="flex space-x-6 relative">
            <button
              onClick={() => setAccepted(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 text-lg"
            >
              Yes
            </button>
            <motion.button
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 text-lg rounded-full"
              animate={{ x: noButtonPosition }}
              transition={{ type: "spring", stiffness: 100 }}
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
          <h1 className="text-3xl font-bold text-pink-600">Yay! ❤️ Can`t wait to celebrate with you! 🎉</h1>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: -20, opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="mt-4"
          >
            🎈🎉💖
          </motion.div>
          <div className="flex space-x-4 mt-6">
            <motion.img 
              src="/Image1.jpg" 
              alt="Romantic moment 1" 
              className="w-64 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            />
            <motion.img 
              src="/Image2.jpg" 
              alt="Romantic moment 2" 
              className="w-64 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
