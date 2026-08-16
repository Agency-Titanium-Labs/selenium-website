"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
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
  const [lenis, setLenis] = useState<Lenis | null>(null);

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
    const lenisInstance = new Lenis({
      duration: 1.2,
    });

    lenisRef.current = lenisInstance;
    queueMicrotask(() => {
      setLenis(lenisInstance);
    });

    // === 1. Synchroniser Lenis avec requestAnimationFrame ===
    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // === 2. Configurer scrollerProxy pour GSAP ScrollTrigger ===
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (typeof value === "number") {
          lenisInstance.scrollTo(value, { immediate: true });
        }
        return lenisInstance.scroll;
      },

      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    function updateScrollTrigger() {
      ScrollTrigger.update();
    }
    lenisInstance.on("scroll", updateScrollTrigger);

    return () => {
      lenisInstance.off("scroll", updateScrollTrigger);
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis, start, stop }}>
      {children}
    </LenisContext.Provider>
  );
}
