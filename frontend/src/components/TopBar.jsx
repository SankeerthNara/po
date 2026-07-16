import React from "react";
import { profile } from "../mock";
import ThemeToggle from "./ThemeToggle";

const TopBar = ({ onToggleTheme }) => {
  return (
    <>
      {/* Small name mark (upper-left area, above sidebar in some frames — placed near top-left area) */}
      <div className="fixed top-10 left-8 md:left-14 z-40 select-none">
        <div className="flex items-center gap-3">
          <div className="h-[8px] w-[8px] bg-[#6b3aef]" />
          <span className="text-foreground/80 text-[11px] tracking-[0.32em] uppercase">
            SN.dev
          </span>
        </div>
      </div>

      {/* Top-right name + theme toggle */}
      <div className="fixed top-8 right-10 md:right-16 z-40 select-none flex items-center gap-4">
        <span className="text-foreground/85 text-[11px] tracking-[0.32em] uppercase">
          {profile.nameShort}
        </span>
        <ThemeToggle onToggle={onToggleTheme} />
      </div>

      {/* Right vertical rotated label */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <div
          className="text-foreground/40 text-[10px] tracking-[0.4em] uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          <span>ver &nbsp;&middot;&nbsp; {profile.year}  &middot;  portfolio</span>
        </div>
      </div>

      {/* Bottom right small scroll indicator */}
      <div className="fixed bottom-10 right-10 md:right-16 z-30 hidden md:flex flex-col items-center gap-2">
        <div className="h-6 w-[1px] bg-foreground/25" />
        <span className="text-foreground/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
      </div>
    </>
  );
};

export default TopBar;
