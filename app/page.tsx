"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [isJokeRevealed, setIsJokeRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsJokeRevealed(true);
    }, 2000); // Surprise after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {!isJokeRevealed ? (
        <motion.h1 
          className="text-6xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          404: Oops! Wrong Turn?
        </motion.h1>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl font-bold mb-4">Just Kidding!</h1>
          <p className="text-lg mb-6">Welcome to the most unexpected homepage on the internet.</p>

          <Link href="/valentine">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md transition"
            >
              Take Me Home (Wait… I’m already home?)
            </motion.button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
