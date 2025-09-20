"use client";

import { useRef } from "react";
import Image from "next/image";
import Button from "./ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const backgroundLightTopRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.to(backgroundLightTopRef.current, {
      yPercent: 40,
      ease: "none",
      scrollTrigger: {
        trigger: backgroundLightTopRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center gap-12 min-h-svh px-4">
      <Image
        ref={backgroundLightTopRef}
        src="/background light.svg"
        alt=""
        width={800}
        height={800}
        className="absolute top-0 left-8 w-1/4 h-auto pointer-events-none select-none blur-[10vw] -z-10"
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
      <div className="relative grid sm:grid-cols-2 gap-4">
        <Button>Nous contacter</Button>
        <Button variant="outline">Nos projets</Button>
      </div>
    </section>
  );
}
