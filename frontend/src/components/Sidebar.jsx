import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navItems } from "../mock";

const Sidebar = ({ onNavigate }) => {
  const location = useLocation();

  return (
    <nav className="fixed left-8 md:left-14 top-1/2 -translate-y-1/2 z-40 select-none">
      <ul className="flex flex-col gap-8">
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
                className={`flex items-center gap-3 text-[13px] tracking-[0.14em] uppercase transition-colors duration-500 ${
                  active ? "text-foreground" : "text-foreground/45 hover:text-foreground/90"
                }`}
              >
                <span
                  className={`inline-block h-[2px] transition-all duration-500 ${
                    active
                      ? "w-6 bg-[#6b3aef]"
                      : "w-0 bg-foreground/40 group-hover:w-4"
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
