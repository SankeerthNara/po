import React from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

// onToggle: optional handler from a parent that wants to run the page-sweep
// animation before flipping the theme (see AppShell). Falls back to an
// immediate toggle if used standalone.
const ThemeToggle = ({ className = "", onToggle }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const handleClick = onToggle || toggleTheme;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative h-8 w-8 flex items-center justify-center rounded-full border border-foreground/15 text-foreground/70 hover:text-foreground hover:border-[#6b3aef] transition-colors duration-300 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
