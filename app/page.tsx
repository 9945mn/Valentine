"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const [stage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timers = [
      setTimeout(() => router.push('/mystery'), 5000), // After 5s, route to mystery page
    ];
    return () => timers.forEach(clearTimeout);
  }, [router]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-8 text-center transition-all duration-1000 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative w-full font-comic"
    >
      <div className="relative z-10">
        <AnimatePresence>
          {stage === 0 && (
            <motion.h1
              key="not-found"
              className="text-6xl font-bold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, rotate: 5 }}
              exit={{ opacity: 0, scale: 1.5, rotate: -5 }}
              transition={{ duration: 1 }}
            >
              404 Not Found?
            </motion.h1>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
