import React from "react";
import { motion } from "framer-motion";

// A vertical purple sheet that sweeps across on route change.
// Renders when `active` is true and calls onFinish after the animation completes.
const PageTransition = ({ active, onFinish }) => {
  if (!active) return null;
  return (
    <motion.div
      className="fixed inset-0 z-[70] bg-[#6b3aef] origin-top"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: [0, 1, 1, 0] }}
      transition={{
        duration: 1.15,
        times: [0, 0.45, 0.55, 1],
        ease: [0.76, 0, 0.24, 1]
      }}
      onAnimationComplete={() => onFinish && onFinish()}
    />
  );
};

export default PageTransition;
