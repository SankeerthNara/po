import React from "react";

// Subtle diagonal-lines noise-ish backdrop identical in feel to the reference.
const Backdrop = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-background" />
      {/* diagonal accent lines - currentColor so it follows the theme */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.25] text-foreground/[0.14]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="diagonals"
            width="260"
            height="260"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-24)"
          >
            <line x1="0" y1="0" x2="0" y2="260" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonals)" />
      </svg>
      {/* faint vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.55)_100%)]" />
      {/* subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")"
        }}
      />
    </div>
  );
};

export default Backdrop;
