import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Code2 } from "lucide-react";
import { projects, openSource } from "../mock";

const Work = () => {
  const [index, setIndex] = useState(0);
  const total = projects.length;

  const go = (dir) => {
    setIndex((p) => (p + dir + total) % total);
  };

  if (!total) {
    return (
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <p className="text-foreground/60 text-lg">No projects found.</p>
      </section>
    );
  }

  const current = projects[index];

  return (
    <section className="relative z-10 min-h-screen w-full px-6 pt-28 pb-40 md:pl-[220px] md:pr-24 md:pt-32 md:pb-24 lg:pl-[260px] lg:pr-32">
      <div className="max-w-[1100px]">
        {/* Section heading */}
        <div className="flex items-baseline gap-4 md:gap-6 mb-10 md:mb-14 flex-wrap">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-foreground font-light text-[44px] sm:text-[60px] md:text-[92px] tracking-[-0.02em] leading-none"
            style={{ fontFamily: "'Instrument Sans', 'Inter', system-ui, sans-serif" }}
          >
            Work
          </motion.h2>
          <span className="text-foreground/40 text-[12px] tracking-[0.3em] uppercase">
            Selected  ·  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* Project card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[6px] overflow-hidden border border-border bg-card"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr]">
                {/* Visual */}
                <div className="relative aspect-[16/11] md:aspect-auto md:min-h-[430px] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-muted"
                    style={{
                      background: `radial-gradient(120% 90% at 20% 10%, ${current.accent}22 0%, transparent 55%), hsl(var(--muted))`
                    }}
                  />
                  {/* Faux browser / device chrome */}
                  <div className="absolute inset-6 md:inset-8 rounded-[4px] border border-border bg-background/60 overflow-hidden">
                    <div className="flex items-center gap-1.5 px-4 h-8 border-b border-border">
                      <span className="h-2 w-2 rounded-full bg-foreground/15" />
                      <span className="h-2 w-2 rounded-full bg-foreground/15" />
                      <span className="h-2 w-2 rounded-full bg-foreground/15" />
                      <span className="ml-4 text-[10px] tracking-[0.3em] uppercase text-foreground/25">
                        {current.category}
                      </span>
                    </div>
                    <div className="relative h-[calc(100%-2rem)] flex items-center justify-center">
                      <div
                        className="absolute -inset-16 opacity-30 blur-3xl"
                        style={{ background: `radial-gradient(circle, ${current.accent}, transparent 60%)` }}
                      />
                      <div
                        className="relative text-[92px] md:text-[128px] font-light tracking-tight text-foreground/[0.08] select-none"
                        style={{ fontFamily: "'Instrument Sans', 'Inter', sans-serif" }}
                      >
                        {current.number}
                      </div>
                      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                        <span className="text-foreground/50 text-[11px] tracking-[0.3em] uppercase">
                          {current.stack}
                        </span>
                        <span className="text-foreground/30 text-[10px] tracking-[0.3em] uppercase">
                          {current.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-8 md:p-12 flex flex-col justify-between bg-card">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[#6b3aef] text-[12px] tracking-[0.35em] uppercase">
                        {current.number}
                      </span>
                      <span className="h-[1px] w-8 bg-foreground/15" />
                      <span className="text-foreground/45 text-[11px] tracking-[0.3em] uppercase">
                        {current.category}
                      </span>
                    </div>
                    <h3
                      className="text-foreground text-[26px] sm:text-[30px] md:text-[42px] font-light leading-[1.05] tracking-[-0.01em]"
                      style={{ fontFamily: "'Instrument Sans', 'Inter', sans-serif" }}
                    >
                      {current.title}
                    </h3>
                    <p className="mt-6 text-foreground/55 text-[14px] leading-[1.7] max-w-[380px]">
                      {current.summary}
                    </p>
                  </div>

                  <div className="mt-10 pt-6 border-t border-foreground/[0.08] flex items-center justify-between">
                    <span className="text-foreground/45 text-[11px] tracking-[0.3em] uppercase">
                      Tech  ·  {current.stack}
                    </span>
                    <div className="flex items-center gap-6">
                      <a
                        href={current.codeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 text-foreground/80 hover:text-[#6b3aef] transition-colors duration-300 text-[12px] tracking-[0.3em] uppercase"
                      >
                        <Code2 className="h-3.5 w-3.5" />
                        Code
                      </a>
                      {current.liveUrl ? (
                        <a
                          href={current.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-2 text-foreground/80 hover:text-[#6b3aef] transition-colors duration-300 text-[12px] tracking-[0.3em] uppercase"
                        >
                          Product <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev/Next controls */}
          <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
            <div className="text-foreground/60 text-[13px]">
              <span className="text-foreground text-[15px]">{current.title}</span>
              <span className="text-foreground/35 mx-3">/</span>
              <span className="text-foreground/50">{current.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous project"
                className="h-10 w-10 flex items-center justify-center border border-foreground/15 rounded-full text-foreground/70 hover:text-foreground hover:border-[#6b3aef] transition-colors duration-300"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next project"
                className="h-10 w-10 flex items-center justify-center border border-foreground/15 rounded-full text-foreground/70 hover:text-foreground hover:border-[#6b3aef] transition-colors duration-300"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Open source */}
        <div className="mt-24 md:mt-32">
          <div className="flex items-baseline gap-4 md:gap-6 mb-8 md:mb-10 flex-wrap">
            <h3
              className="text-foreground font-light text-[28px] sm:text-[36px] md:text-[46px] tracking-[-0.01em] leading-none"
              style={{ fontFamily: "'Instrument Sans', 'Inter', sans-serif" }}
            >
              Open Source
            </h3>
            <span className="text-foreground/40 text-[11px] tracking-[0.3em] uppercase">
              contributions
            </span>
          </div>

          <ul className="divide-y divide-foreground/[0.06] border-y border-foreground/[0.06]">
            {openSource.map((os, i) => (
              <li
                key={os.org}
                className="group grid grid-cols-1 md:grid-cols-[60px_220px_1fr] gap-6 py-8 hover:bg-foreground/[0.015] transition-colors duration-300"
              >
                <span className="text-foreground/35 text-[12px] tracking-[0.3em] uppercase">
                  0{i + 1}
                </span>
                <div>
                  <h4
                    className="text-foreground text-[22px] leading-tight font-light"
                    style={{ fontFamily: "'Instrument Sans', 'Inter', sans-serif" }}
                  >
                    {os.org}
                  </h4>
                  <span className="mt-1 inline-block text-[#6b3aef] text-[11px] tracking-[0.3em] uppercase">
                    {os.tag}
                  </span>
                </div>
                <ul className="space-y-3">
                  {os.points.map((p) => (
                    <li
                      key={p.slice(0, 40)}
                      className="text-foreground/55 text-[14px] leading-[1.7] group-hover:text-foreground/75 transition-colors duration-300"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Work;