"use client";

import { useRef } from "react";
import Image from "next/image";
import Button from "./ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Antoine",
    description:
      "Ingénieur informatique, il crée des interfaces rapides, responsives et accessibles. Pixel-perfect, animations et SEO technique : il optimise l'expérience utilisateur.",
    role: "Dev frontend",
    imageUrl: "/team/antoine.png",
    portfolioUrl: "https://antoinefavereau.fr/",
    tools: [
      {
        name: "Visual Studio Code",
        iconUrl: "/tools/vscode.svg",
      },
      {
        name: "Node.js",
        iconUrl: "/tools/nodejs.svg",
      },
      {
        name: "Chrome DevTools",
        iconUrl: "/tools/chrome.svg",
      },
    ],
  },
  {
    name: "Athéna",
    description:
      "Diplômée d'un master en design, elle conçoit des designs intuitifs et modernes, alliant branding, UX/UI et prototypage pour transformer vos outils digitaux en véritables atouts business.",
    role: "Design UX/UI",
    imageUrl: "/team/athena.png",
    portfolioUrl: "https://graine2pain.fr/",
    tools: [
      {
        name: "Visual Studio Code",
        iconUrl: "/tools/vscode.svg",
      },
      {
        name: "Node.js",
        iconUrl: "/tools/nodejs.svg",
      },
      {
        name: "Chrome DevTools",
        iconUrl: "/tools/chrome.svg",
      },
    ],
  },
  {
    name: "Anatholy",
    description:
      "Ingénieur informatique et expert en serveurs, API et bases de données, il construit des solutions robustes, sécurisées et performantes pour soutenir votre croissance digitale.",
    role: "Dev backend",
    imageUrl: "/team/anatholy.png",
    portfolioUrl: "https://anatholyb1.github.io/",
    tools: [
      {
        name: "Visual Studio Code",
        iconUrl: "/tools/vscode.svg",
      },
      {
        name: "Node.js",
        iconUrl: "/tools/nodejs.svg",
      },
      {
        name: "Chrome DevTools",
        iconUrl: "/tools/chrome.svg",
      },
    ],
  },
  {
    name: "Rémi",
    description:
      "Ingénieur de formation, il analyse marché, budget et stratégie pour rendre vos projets viables et rentables. De l'idée à la solution, il maximise la valeur de votre investissement.",
    role: "Business dev",
    imageUrl: "/team/remi.png",
    portfolioUrl: "https://remicostes.fr/",
    tools: [
      {
        name: "Visual Studio Code",
        iconUrl: "/tools/vscode.svg",
      },
      {
        name: "Node.js",
        iconUrl: "/tools/nodejs.svg",
      },
      {
        name: "Chrome DevTools",
        iconUrl: "/tools/chrome.svg",
      },
    ],
  },
];

export default function TeamSection() {
  const backgroundLightRightRef = useRef<HTMLImageElement>(null);
  const backgroundShapeRef = useRef<HTMLImageElement>(null);
  const backgroundLightLeftRef = useRef<HTMLImageElement>(null);
  const backgroundShapeOutlineRef = useRef<HTMLImageElement>(null);

  function animateBackground(
    ref: React.RefObject<HTMLImageElement | null>,
    yPercent: number
  ) {
    gsap.to(ref.current, {
      yPercent,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  useGSAP(() => {
    animateBackground(backgroundLightRightRef, 120);
    animateBackground(backgroundShapeRef, 70);
    animateBackground(backgroundLightLeftRef, 100);
    animateBackground(backgroundShapeOutlineRef, 50);
  }, []);

  return (
    <section
      id="team"
      className="relative flex flex-col items-center gap-12 px-4 py-16 md:py-24"
    >
      <Image
        ref={backgroundLightRightRef}
        src="/background light.svg"
        alt=""
        width={800}
        height={800}
        className="absolute top-0 right-0 transform -translate-y-1/2 w-1/4 h-auto pointer-events-none select-none blur-[10vw] -z-10"
      />
      <Image
        ref={backgroundShapeRef}
        src="/background shape full.svg"
        alt=""
        width={800}
        height={800}
        className="absolute top-0 right-0 transform -translate-y-1/3 w-1/3 md:w-1/4 h-auto pointer-events-none select-none -z-10"
      />
      <Image
        ref={backgroundLightLeftRef}
        src="/background light.svg"
        alt=""
        width={800}
        height={800}
        className="absolute bottom-0 left-0 transform -translate-y-1/2 w-1/4 h-auto pointer-events-none select-none blur-[10vw] -z-10"
      />
      <Image
        ref={backgroundShapeOutlineRef}
        src="/background shape outline.svg"
        alt=""
        width={800}
        height={800}
        className="absolute bottom-0 left-0 w-1/4 md:w-1/5 h-auto pointer-events-none select-none -z-10"
      />
      <h2 className="text-3xl font-bold mb-8 text-center">Notre équipe</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-12">
        {teamMembers.map((member) => (
          <li
            key={member.name}
            className="group team-member-card relative bg-grey-lightest/5 backdrop-blur-md w-full sm:max-w-3xs"
            style={
              {
                "--corner-size": "30px",
                clipPath: `polygon(
                  var(--corner-size) 0,
                  var(--corner-size) -50%,
                  100% -50%,
                  100% 100%,
                  0 100%,
                  0 var(--corner-size)
                )`,
              } as React.CSSProperties
            }
          >
            <div
              className="absolute inset-0 bg-linear-160 from-primary-lighter/50 via-primary/50 to-primary-dark/50 -z-1"
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
                    calc(100% - var(--border-width)) calc(100% - var(--border-width)),
                    calc(100% - var(--border-width)) 0,
                    100% 0,
                    100% 100%,
                    0 100%,
                    0 var(--corner-size)
                  )`,
                } as React.CSSProperties
              }
            ></div>
            <Image
              src="/background dots.svg"
              alt=""
              width={100}
              height={100}
              className="absolute top-40 left-6 w-16 h-auto pointer-events-none select-none"
            />
            <Image
              src={member.imageUrl}
              alt={member.name}
              width={500}
              height={500}
              className="relative w-full h-auto mt-8 scale-110 group-hover:scale-85 origin-top transition-transform duration-500 ease-in-out delay-100 group-hover:delay-0 [&]:[@media(hover:none)]:scale-85"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
                maskRepeat: "no-repeat",
                maskSize: "cover",
              }}
            />
            <p className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-2 py-1 text-sm font-orbitron font-medium bg-primary text-grey-darkest">
              {member.role}
            </p>
            <ul className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out delay-0 group-hover:delay-200 [&]:[@media(hover:none)]:opacity-100">
              {member.tools.map((tool) => (
                <li key={tool.name} title={tool.name}>
                  <Image
                    src={tool.iconUrl}
                    alt={tool.name}
                    width={32}
                    height={32}
                  />
                </li>
              ))}
            </ul>
            <div
              className="absolute bottom-0 left-0 w-full flex flex-col items-center gap-4 p-4 bg-grey-darkest/60 backdrop-blur-xs text-xl transform translate-y-[calc(100%-2rem-1.2em)] group-hover:translate-y-0 transition-transform duration-500 ease-in-out group-hover:delay-50 [&]:[@media(hover:none)]:translate-y-0"
              style={
                {
                  "--corner-size": "20px",
                  clipPath: `polygon(
                    0 var(--corner-size),
                    20% var(--corner-size),
                    calc(20% + var(--corner-size)) 0,
                    calc(80% - var(--corner-size)) 0,
                    80% var(--corner-size),
                    100% var(--corner-size),
                    100% 100%,
                    0 100%
                  )`,
                } as React.CSSProperties
              }
            >
              <div
                className="team-member-bg absolute inset-0 bg-linear-160 from-primary-lighter/50 via-primary/50 to-primary-dark/50 bg-[auto_200%] -z-1 transition-[background-position] duration-500 ease-in-out group-hover:delay-50"
                style={
                  {
                    "--corner-size": "20px",
                    "--border-width": "2px",
                    "--bg-pos-normal":
                      "center bottom calc(-100% - 2rem - 1.2em)",
                    "--bg-pos-hover": "center 100%",
                    backgroundPosition: "var(--bg-pos-normal)",
                    clipPath: `polygon(
                      0 var(--corner-size),
                      20% var(--corner-size),
                      calc(20% + var(--corner-size)) 0,
                      calc(80% - var(--corner-size)) 0,
                      80% var(--corner-size),
                      calc(100% - var(--border-width)) var(--corner-size),
                      calc(100% - var(--border-width)) calc(var(--corner-size) + var(--border-width)),
                      calc(80% - var(--border-width) / 2) calc(var(--corner-size) + var(--border-width)),
                      calc(80% - var(--corner-size) - var(--border-width) / 2) var(--border-width),
                      calc(20% + var(--corner-size) + var(--border-width) / 2) var(--border-width),
                      calc(20% + var(--border-width) / 2) calc(var(--corner-size) + var(--border-width)),
                      var(--border-width) calc(var(--corner-size) + var(--border-width)),
                      var(--border-width) calc(100% - var(--border-width)),
                      calc(100% - var(--border-width)) calc(100% - var(--border-width)),
                      calc(100% - var(--border-width)) var(--corner-size),
                      100% var(--corner-size),
                      100% 100%,
                      0 100%
                    )`,
                  } as React.CSSProperties
                }
              ></div>
              <h3 className="text-primary font-bold">{member.name}</h3>
              <p className="text-base">{member.description}</p>
              <Button variant="outline" href={member.portfolioUrl}>
                Portfolio{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                  className="inline"
                >
                  <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
                </svg>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
