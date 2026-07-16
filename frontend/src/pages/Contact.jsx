import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile, socials } from "../mock";

const Contact = () => {
  return (
    <section className="relative z-10 min-h-screen w-full pl-[220px] pr-24 md:pl-[260px] md:pr-32 pt-32 pb-24 flex flex-col">
      <div className="max-w-[1000px]">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-foreground/60 text-[12px] tracking-[0.3em] uppercase"
        >
          Let's build something
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-foreground font-light text-[64px] md:text-[104px] leading-[1.05] tracking-[-0.02em]"
          style={{ fontFamily: "'Instrument Sans', 'Inter', sans-serif" }}
        >
          Get in
          <br />
          touch<span className="text-[#6b3aef]">.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-10 text-foreground/55 text-[16px] leading-[1.7] max-w-[560px]"
        >
          I'm currently open to internships, open-source collaborations and
          interesting side projects. If you're building something meaningful,
          I'd love to hear from you.
        </motion.p>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-1 max-w-[820px]">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.08 }}
              className="group flex items-center justify-between py-6 border-b border-foreground/[0.08] hover:border-[#6b3aef] transition-colors duration-500"
            >
              <div>
                <div className="text-foreground/40 text-[11px] tracking-[0.3em] uppercase">
                  {s.label}
                </div>
                <div
                  className="mt-2 text-foreground text-[24px] md:text-[28px] font-light tracking-[-0.01em] group-hover:text-[#a78dff] transition-colors duration-500"
                  style={{ fontFamily: "'Instrument Sans', 'Inter', sans-serif" }}
                >
                  {s.handle}
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-foreground/40 group-hover:text-[#6b3aef] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
            </motion.a>
          ))}
        </div>

        <div className="mt-24 pt-10 border-t border-foreground/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="text-foreground/40 text-[11px] tracking-[0.3em] uppercase">
            © {new Date().getFullYear()}  ·  {profile.name}
          </span>
          <span className="text-foreground/30 text-[11px] tracking-[0.3em] uppercase">
            Crafted with care from IIIT Hyderabad
          </span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
