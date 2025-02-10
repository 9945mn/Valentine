"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function MysteryPage() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 5000), // After 5s, show second message
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center text-gray-900 dark:text-gray-100 font-comic overflow-hidden">
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <div className="relative w-[95vw] h-[90vh] max-w-6xl max-h-[90vh] flex flex-row overflow-hidden rounded-lg shadow-lg border-4 border-white">
          <div className="w-1/2 h-full relative">
            <Image
              src="/Image5.JPG"
              alt="First Half"
              layout="fill"
              objectFit="cover"
              className="rounded-l-lg"
            />
          </div>
          <div className="w-1/2 h-full relative">
            <Image
              src="/Image6.JPG"
              alt="Second Half"
              layout="fill"
              objectFit="cover"
              className="rounded-r-lg"
            />
          </div>
        </div>
      </div>

      <motion.div className="relative z-10 mt-8">
        {stage === 0 && (
          <motion.h1
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Or do you think this webpage is all about you?
          </motion.h1>
        )}

        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">If you want to know, click this button</h2>
          <Link href="/valentine">
            <motion.button
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9, rotate: 5 }}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md transition"
            >
              Reveal the Secret
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
