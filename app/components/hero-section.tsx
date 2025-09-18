"use client";

import Button from "./ui/button";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const backgroundLightContainerRef = useRef<HTMLDivElement>(null);
  const backgroundLightRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.to(backgroundLightRef.current, {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: backgroundLightContainerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={backgroundLightContainerRef}
      className="flex flex-col items-center justify-center gap-12 min-h-screen px-4"
    >
      <Image
        ref={backgroundLightRef}
        src="/top background light.svg"
        alt="Élément décoratif lumineux en arrière-plan"
        width={800}
        height={800}
        className="absolute top-0 left-0 pointer-events-none select-none"
      />
      <h1 className="relative text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-center max-w-sm sm:max-w-lg md:max-w-2xl">
        L&apos;alliage parfait du{" "}
        <span
          className="text-transparent"
          style={{ WebkitTextStroke: "1px var(--color-primary)" }}
        >
          design
        </span>{" "}
        & du <span className="text-primary">dev</span>
      </h1>
      <div className="relative flex flex-col sm:flex-row items-center gap-4">
        <Button href="#contact">Nous contacter</Button>
        <Button variant="outline" href="#projects">Nos projets</Button>
      </div>
    </section>
  );
}
