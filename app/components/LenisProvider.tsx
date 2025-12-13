"use client";

import { ReactNode, useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LenisProviderProps {
  children: ReactNode;
}

interface LenisContextType {
  lenis: Lenis | null;
  start: () => void;
  stop: () => void;
}

const LenisContext = createContext<LenisContextType | null>(null);

export function useLenis() {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenis must be used within a LenisProvider");
  }
  return context;
}

export default function LenisProvider({
  children,
}: Readonly<LenisProviderProps>) {
  const lenisRef = useRef<Lenis | null>(null);

  const start = () => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  };

  const stop = () => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
    });

    lenisRef.current = lenis;

    // === 1. Synchroniser Lenis avec requestAnimationFrame ===
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // === 2. Configurer scrollerProxy pour GSAP ScrollTrigger ===
    // 1) Dire à ScrollTrigger d’utiliser lenis.scrollTo() quand on veut changer la position
    // 2) Obtenir la position de Lenis quand on veut connaître la valeur du scroll
    // 3) Mettre à jour ScrollTrigger quand lenis émet un événement de scroll
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },

      getBoundingClientRect() {
        // Utile pour certaines fonctionnalités de ScrollTrigger
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // Permet de gérer le pinning
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    // À chaque scroll de Lenis, on informe ScrollTrigger
    function updateScrollTrigger() {
      ScrollTrigger.update();
    }
    lenis.on("scroll", updateScrollTrigger);

    // Cleanup
    return () => {
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, start, stop }}>
      {children}
    </LenisContext.Provider>
  );
}
