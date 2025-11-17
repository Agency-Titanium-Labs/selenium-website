"use client";

import Button from "./ui/button";
import { useContactModal } from "../contexts/contact-modal-context";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type NavigationItem =
  | { name: string; href: string }
  | { name: string; action: string };

const navigation: NavigationItem[] = [
  { name: "À propos", href: "#" },
  { name: "Nos projets", href: "#" },
  { name: "Nous contacter", action: "contact" },
];

export default function Nav() {
  const { openModal } = useContactModal();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (action: string) => {
    if (action === "contact") {
      openModal();
    }
    setMenuOpen(false);
  };

  return (
    <>
      <div
        className={twMerge(
          "fixed inset-0 bg-black backdrop-blur-xs opacity-0 z-40 pointer-events-none transition-opacity duration-300",
          menuOpen && "opacity-50 pointer-events-auto"
        )}
        onClick={() => setMenuOpen(false)}
      ></div>
      <nav
        className="fixed top-8 left-1/2 transform -translate-x-1/2 w-max flex flex-col space-y-2 pl-10 sm:pl-16 pr-8 py-4 min-w-2/3 z-50 bg-grey-lightest/5 backdrop-blur-md"
        style={
          {
            "--corner-size": "30px",
            clipPath: `polygon(
                      var(--corner-size) 0,
                      100% 0,
                      100% calc(100% - var(--corner-size)),
                      calc(100% - var(--corner-size)) 100%,
                      0 100%,
                      0 var(--corner-size)
                    )`,
          } as React.CSSProperties
        }
      >
        <div
          className="absolute left-0 w-full top-0 h-full bg-linear-160 from-primary-lighter/50 via-primary/50 to-primary-dark/50 -z-1"
          style={
            {
              "--corner-size": "30px",
              "--border-width": "2px",
              clipPath: `polygon(
                      var(--corner-size) 0,
                      calc(100% - var(--border-width)) 0,
                      calc(100% - var(--border-width)) var(--border-width),
                      calc(var(--corner-size) + var(--border-width) / 2) var(--border-width),
                      var(--border-width) calc(var(--corner-size) + var(--border-width) / 2),
                      var(--border-width) calc(100% - var(--border-width)),
                      calc(100% - calc(var(--corner-size) + var(--border-width) / 2)) calc(100% - var(--border-width)),
                      calc(100% - var(--border-width)) calc(100% - calc(var(--corner-size) + var(--border-width) / 2)),
                      calc(100% - var(--border-width)) 0,
                      100% 0,
                      100% calc(100% - var(--corner-size)),
                      calc(100% - var(--corner-size)) 100%,
                      0 100%,
                      0 var(--corner-size)
                    )`,
            } as React.CSSProperties
          }
        ></div>
        <div className="flex justify-between items-center gap-8">
          <Image
            src="/logo-full.svg"
            alt="Selenium Logo"
            width={100}
            height={100}
            className="h-10 sm:h-12 md:h-14 w-auto"
          />
          <ul className="flex flex-col md:flex-row items-center gap-2 md:gap-4 max-md:hidden">
            {navigation.map((item) => (
              <li key={item.name}>
                <Button
                  variant="transparent"
                  {...("action" in item
                    ? { onClick: () => handleNavClick(item.action) }
                    : { href: item.href })}
                >
                  {item.name}
                </Button>
              </li>
            ))}
          </ul>
          <button
            className="relative flex flex-col gap-[4px] w-6 h-[17px] md:hidden"
            onClick={() => setMenuOpen((prev: boolean) => !prev)}
            aria-label="Toggle menu"
          >
            <div
              className={twMerge(
                "absolute w-6 h-[3px] bg-white top-0 transform transition-all duration-300 ease-in-out",
                menuOpen && "top-1/2 -rotate-45 -translate-y-1/2"
              )}
            ></div>
            <div
              className={twMerge(
                "absolute w-6 h-[3px] bg-white top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out",
                menuOpen && "opacity-0"
              )}
            ></div>
            <div
              className={twMerge(
                "absolute w-6 h-[3px] bg-white bottom-0 transform transition-all duration-300 ease-in-out",
                menuOpen && "bottom-1/2 rotate-45 translate-y-1/2"
              )}
            ></div>
          </button>
        </div>
        <ul
          className={twMerge(
            "flex flex-col md:flex-row items-center gap-2 md:gap-4 overflow-hidden md:hidden",
            !menuOpen && "hidden"
          )}
        >
          {navigation.map((item) => (
            <li key={item.name}>
              <Button
                variant="transparent"
                {...("action" in item
                  ? { onClick: () => handleNavClick(item.action) }
                  : { href: item.href })}
              >
                {item.name}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
