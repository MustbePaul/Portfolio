"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/portfolio";

const headerNavigation = navigation.filter((item) =>
  ["Home", "Experience", "Projects", "Contact"].includes(item),
);

export default function HeaderClient() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.menuOpen = String(open);
    return () => {
      delete document.body.dataset.menuOpen;
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          href="#home"
          className="brand"
          aria-label="Paul Napoleon Phiri, home"
        >
          PP<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary">
          {headerNavigation.map((item) => {
            const id = item.toLowerCase();
            return (
              <a key={item} href={`#${id}`}>
                {item}
              </a>
            );
          })}
        </nav>
        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {headerNavigation.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
            >
              {item}
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
