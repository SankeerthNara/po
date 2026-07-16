import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Backdrop from "./components/Backdrop";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import LoadingIntro from "./components/LoadingIntro";
import PageTransition from "./components/PageTransition";
import About from "./pages/About";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import { useTheme } from "./context/ThemeContext";

const AppShell = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleTheme } = useTheme();
  const [transitioning, setTransitioning] = useState(false);
  const [pending, setPending] = useState(null);
  const [themeSweeping, setThemeSweeping] = useState(false);

  const handleNavigate = useCallback(
    (path) => {
      if (transitioning || path === location.pathname) return;
      setPending(path);
      setTransitioning(true);
      // Switch route at the midpoint of the sweep
      setTimeout(() => {
        navigate(path);
      }, 520);
    },
    [transitioning, location.pathname, navigate]
  );

  const handleFinish = () => {
    setTransitioning(false);
    setPending(null);
  };

  const handleThemeToggle = useCallback(() => {
    if (themeSweeping) return;
    setThemeSweeping(true);
    // Flip the theme at the same midpoint the route sweep uses to swap pages
    setTimeout(() => {
      toggleTheme();
    }, 520);
  }, [themeSweeping, toggleTheme]);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      <Backdrop />
      <TopBar onToggleTheme={handleThemeToggle} />
      <Sidebar onNavigate={handleNavigate} />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Routes location={location}>
              <Route path="/" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <PageTransition active={transitioning} onFinish={handleFinish} />
      <PageTransition active={themeSweeping} onFinish={() => setThemeSweeping(false)} />
    </div>
  );
};

function App() {
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    // hard cap in case animation callback doesn't fire
    const t = setTimeout(() => setIntro(false), 4400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AnimatePresence>
          {intro && (
            <LoadingIntro key="intro" onDone={() => setIntro(false)} />
          )}
        </AnimatePresence>
        <AppShell />
      </BrowserRouter>
    </div>
  );
}

export default App;
