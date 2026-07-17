import React from "react";
import { motion } from "framer-motion";
import { profile } from "../mock";

// Recreates the intro seen in the reference: name fades in, a square, circle,
// and inverted triangle step down, then a purple sheet sweeps up to reveal the site.
const LoadingIntro = ({ onDone }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[80] bg-background flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      {/* Name text */}
      <motion.div
        className="absolute top-[38%] text-foreground/80 text-[11px] tracking-[0.4em] uppercase"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 1, 1, 0], y: 0 }}
        transition={{ duration: 2.4, times: [0, 0.15, 0.8, 1] }}
      >
        {profile.nameShort}
      </motion.div>

      {/* Square */}
      <motion.div
        className="absolute bg-[#6b3aef]"
        style={{ top: "46%", left: "50%", width: 26, height: 26 }}
        initial={{ scale: 0, x: "-50%", opacity: 0 }}
        animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.8, delay: 0.5, times: [0, 0.25, 0.85, 1] }}
      />
      {/* Circle - appears below */}
      <motion.div
        className="absolute bg-[#6b3aef] rounded-full"
        style={{ top: "55%", left: "50%", width: 22, height: 22 }}
        initial={{ scale: 0, x: "-50%", opacity: 0 }}
        animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.6, delay: 0.9, times: [0, 0.3, 0.85, 1] }}
      />
      {/* Inverted triangle */}
      <motion.svg
        className="absolute"
        style={{ top: "63%", left: "50%", width: 24, height: 20 }}
        viewBox="0 0 24 20"
        initial={{ scale: 0, x: "-50%", opacity: 0 }}
        animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.4, delay: 1.2, times: [0, 0.35, 0.85, 1] }}
      >
        <polygon points="0,0 24,0 12,20" fill="#6b3aef" />
      </motion.svg>

      {/* Sweep reveal */}
      <motion.div
        className="absolute inset-0 bg-[#6b3aef] origin-bottom"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [0, 1, 1, 0] }}
        transition={{
          duration: 1.6,
          delay: 2.4,
          times: [0, 0.35, 0.55, 1],
          ease: [0.76, 0, 0.24, 1]
        }}
        onAnimationComplete={() => onDone && onDone()}
      />
    </motion.div>
  );
};

export default LoadingIntro;
