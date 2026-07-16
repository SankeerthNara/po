import React from "react";
import { motion } from "framer-motion";
import { profile, skills, goals } from "../mock";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
};

const About = () => {
  return (
    <section className="relative z-10 min-h-screen w-full px-6 pt-28 pb-40 md:pl-[220px] md:pr-24 md:pt-40 md:pb-24 lg:pl-[260px] lg:pr-32">
      <div className="max-w-[900px]">
        {/* Headline */}
        <div className="space-y-[-2px] leading-[1.05]">
          {profile.headline.map((line, i) => (
            <motion.h1
              key={line}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-foreground font-light tracking-[-0.02em] text-[42px] sm:text-[56px] md:text-[104px]"
              style={{ fontFamily: "'Instrument Sans', 'Inter', system-ui, sans-serif" }}
            >
              {line}
              {i === profile.headline.length - 1 && (
                <motion.span
                  className="inline-block ml-2 w-[4px] md:w-[6px] h-[38px] sm:h-[50px] md:h-[92px] align-middle bg-[#6b3aef]"
                  animate={{ opacity: [1, 0.15, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              )}
            </motion.h1>
          ))}
        </div>

        {/* In short */}
        <motion.div
          className="mt-28 grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-10 md:gap-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-foreground/80 text-[13px] tracking-[0.22em] uppercase pt-1">
            In short
          </div>
          <p className="text-foreground/55 text-[15px] leading-[1.7] max-w-[320px]">
            {profile.inShort.left}
          </p>
          <p className="text-foreground/55 text-[15px] leading-[1.7] max-w-[340px]">
            {profile.inShort.right}
          </p>
        </motion.div>

        {/* Skills row */}
        <motion.div
          className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {Object.entries(skills).map(([group, items]) => (
            <div key={group}>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-[6px] w-[6px] bg-[#6b3aef]" />
                <h4 className="text-foreground/80 text-[12px] tracking-[0.25em] uppercase">
                  {group}
                </h4>
              </div>
              <ul className="space-y-2">
                {items.map((s) => (
                  <li
                    key={s}
                    className="text-foreground/55 text-[14px] tracking-wide hover:text-foreground transition-colors duration-300"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Goals */}
        <motion.div
          className="mt-28 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-foreground/80 text-[13px] tracking-[0.22em] uppercase pt-1">
            Now
          </div>
          <ul className="space-y-4 max-w-[520px]">
            {goals.map((g, i) => (
              <li key={g} className="flex items-start gap-4 group">
                <span className="text-[#6b3aef] text-[12px] pt-[6px] tracking-widest">
                  0{i + 1}
                </span>
                <span className="text-foreground/70 text-[15px] leading-[1.6] group-hover:text-foreground transition-colors duration-300">
                  {g}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
