import React from "react";
import { motion } from "framer-motion";

const AnimatedWord = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 1,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };
  return (
    <motion.div variants={container} initial="hidden" animate="visible" className={`overflow-hidden flex ${className}`}>
      {words.map((word, index) => (
        <motion.span variants={child} className="mr-2" key={index}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedWord;
