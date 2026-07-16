import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navItems } from "../mock";

const Sidebar = ({ onNavigate }) => {
  const location = useLocation();

  return (
    <nav
      className="fixed z-40 select-none
      bottom-5 inset-x-0 flex justify-center
      md:bottom-auto md:inset-x-auto md:left-14 md:top-1/2 md:-translate-y-1/2 md:block"
    >
      <ul
        className="flex flex-row items-center gap-5 rounded-full border border-border bg-card/80 backdrop-blur px-5 py-2.5
        md:flex-col md:items-start md:gap-8 md:rounded-none md:border-none md:bg-transparent md:backdrop-blur-none md:px-0 md:py-0"
      >
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <li key={item.id} className="relative group">
              <NavLink
                to={item.path}
                onClick={(e) => {
                  if (onNavigate && location.pathname !== item.path) {
                    e.preventDefault();
                    onNavigate(item.path);
                  }
                }}
                className={`flex items-center gap-2 md:gap-3 text-[11px] md:text-[13px] tracking-[0.14em] uppercase transition-colors duration-500 ${
                  active ? "text-foreground" : "text-foreground/45 hover:text-foreground/90"
                }`}
              >
                <span
                  className={`hidden md:inline-block h-[2px] transition-all duration-500 ${
                    active
                      ? "w-6 bg-[#6b3aef]"
                      : "w-0 bg-foreground/40 group-hover:w-4"
                  }`}
                />
                <span
                  className={`md:hidden h-[4px] w-[4px] rounded-full transition-colors duration-500 ${
                    active ? "bg-[#6b3aef]" : "bg-foreground/25"
                  }`}
                />
                <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
