"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useRef } from "react";
import gsap from "gsap";

const projects = [
  {
    title: "Selenium Studio",
    description:
      "Agence web spécialisée en développement web, automatisation et design UI/UX. Nous créons des sites, applications et outils sur mesure adaptés à vos besoins.",
    images: [
      "/projects/selenium-studio-hero.png",
      "/projects/selenium-studio-hero.png",
      "/projects/selenium-studio-hero.png",
    ],
    link: "https://selenium-studio.com",
  },
  {
    title: "Selenium Studio",
    description:
      "Agence web spécialisée en développement web, automatisation et design UI/UX. Nous créons des sites, applications et outils sur mesure adaptés à vos besoins.",
    images: [
      "/projects/selenium-studio-hero.png",
      "/projects/selenium-studio-hero.png",
    ],
    link: "https://selenium-studio.com",
  },
  {
    title: "Selenium Studio",
    description:
      "Agence web spécialisée en développement web, automatisation et design UI/UX. Nous créons des sites, applications et outils sur mesure adaptés à vos besoins.",
    images: ["/projects/selenium-studio-hero.png"],
    link: "https://selenium-studio.com",
  },
  {
    title: "Portfolio Antoine Favereau",
    description: "Portfolio de Antoine Favereau, développeur Full Stack",
    images: ["/projects/portfolio-antoine-hero.png"],
    link: "https://antoinefavereau.fr",
    accentColor: "#00adb5",
  },
  {
    title: "Selenium Studio",
    description:
      "Agence web spécialisée en développement web, automatisation et design UI/UX. Nous créons des sites, applications et outils sur mesure adaptés à vos besoins.",
    images: [
      "/projects/selenium-studio-hero.png",
      "/projects/selenium-studio-hero.png",
      "/projects/selenium-studio-hero.png",
    ],
    link: "https://selenium-studio.com",
  },
  {
    title: "Selenium Studio",
    description:
      "Agence web spécialisée en développement web, automatisation et design UI/UX. Nous créons des sites, applications et outils sur mesure adaptés à vos besoins.",
    images: [
      "/projects/selenium-studio-hero.png",
      "/projects/selenium-studio-hero.png",
      "/projects/selenium-studio-hero.png",
    ],
    link: "https://selenium-studio.com",
  },
  {
    title: "Selenium Studio",
    description:
      "Agence web spécialisée en développement web, automatisation et design UI/UX. Nous créons des sites, applications et outils sur mesure adaptés à vos besoins.",
    images: [
      "/projects/selenium-studio-hero.png",
      "/projects/selenium-studio-hero.png",
      "/projects/selenium-studio-hero.png",
    ],
    link: "https://selenium-studio.com",
  },
  {
    title: "Selenium Studio",
    description:
      "Agence web spécialisée en développement web, automatisation et design UI/UX. Nous créons des sites, applications et outils sur mesure adaptés à vos besoins.",
    images: [
      "/projects/selenium-studio-hero.png",
      "/projects/selenium-studio-hero.png",
      "/projects/selenium-studio-hero.png",
    ],
    link: "https://selenium-studio.com",
  },
  {
    title: "Selenium Studio",
    description:
      "Agence web spécialisée en développement web, automatisation et design UI/UX. Nous créons des sites, applications et outils sur mesure adaptés à vos besoins.",
    images: [
      "/projects/selenium-studio-hero.png",
      "/projects/selenium-studio-hero.png",
      "/projects/selenium-studio-hero.png",
    ],
    link: "https://selenium-studio.com",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.1,
      duration: 0.5,
      ease: "power2.out",
      overwrite: true,
    });

    // Parallax effect for the background and text
    const bg = cardRef.current.querySelector(".bg-parallax");
    if (bg) {
      gsap.to(bg, {
        x: (x - centerX) / 20,
        y: (y - centerY) / 20,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      overwrite: true,
    });

    const bg = cardRef.current.querySelector(".bg-parallax");
    if (bg) {
      gsap.to(bg, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex items-end aspect-video transform-3d perspective-distant hover:z-10"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className={twMerge(
          "absolute top-0 left-0 w-full h-full backdrop-blur-md [--corner-size:30px] transform rotate-x-0 origin-bottom group-hover:rotate-x-2 transition-transform duration-300 bg-parallax",
          !project.accentColor && "bg-[#866B25]",
        )}
        style={
          {
            ...(project.accentColor && {
              backgroundColor: `color-mix(
                in srgb, 
                ${project.accentColor} 40%, 
                black
              )`,
            }),
            clipPath: `polygon(
              0 0,
              calc(100% - var(--corner-size)) 0,
              100% var(--corner-size),
              100% 100%,
              0 100%,
              0 0
            )`,
          } as React.CSSProperties
        }
      >
        <div
          className={twMerge(
            "absolute inset-0 -z-1",
            !project.accentColor &&
              "bg-linear-160 from-primary-lighter/50 via-primary/50 to-primary-dark/50",
          )}
          style={
            {
              ...(project.accentColor && {
                backgroundColor: `color-mix(
                in srgb, 
                ${project.accentColor} 50%, 
                black
              )`,
              }),
              "--border-width": "1px",
              clipPath: `polygon(
                0 0,
                calc(100% - var(--corner-size)) 0,
                100% var(--corner-size),
                100% 100%,
                0 100%,
                0 var(--border-width),
                var(--border-width) var(--border-width),
                var(--border-width) calc(100% - var(--border-width)),
                calc(100% - var(--border-width)) calc(100% - var(--border-width)),
                calc(100% - var(--border-width)) calc(var(--corner-size) + var(--border-width) / 2),
                calc(100% - var(--corner-size) - var(--border-width) / 2) var(--border-width),
                0 var(--border-width),
                0 0
              )`,
            } as React.CSSProperties
          }
        ></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-6 space-x-[-60%] group-hover:space-x-[-20%] transform -rotate-x-0 origin-bottom group-hover:-rotate-x-10 transition-all duration-300">
        {project.images.map((image, i) => {
          const total = project.images.length;
          const rotation = (i - (total - 1) / 2 + 0.3) * 15;
          return (
            <div
              key={i}
              className={twMerge(
                "relative grow aspect-video origin-bottom rotate-0 transition-all duration-300",
                "group-hover:mb-[30%] group-hover:[transform:rotate(var(--rotation))]",
              )}
              style={
                {
                  zIndex: total - i,
                  "--rotation": `${rotation}deg`,
                } as React.CSSProperties
              }
            >
              <Image src={image} alt="" fill className="object-cover rounded" />
            </div>
          );
        })}
      </div>
      <div
        className="relative h-5/6 bg-grey-lightest/20 backdrop-blur-md [--corner-size-x:40px] [--corner-size-y:30px] [--left-size:100px] p-6 flex flex-col justify-end transform -rotate-x-0 origin-bottom group-hover:-rotate-x-30 transition-transform duration-300 z-4"
        style={
          {
            clipPath: `polygon(
              0 0,
              var(--left-size) 0,
              calc(var(--left-size) + var(--corner-size-x)) var(--corner-size-y),
              100% var(--corner-size-y),
              100% 100%,
              0 100%,
              0 0
            )`,
          } as React.CSSProperties
        }
      >
        <div
          className={twMerge(
            "absolute inset-0 -z-1",
            !project.accentColor &&
              "bg-linear-160 from-primary-lighter/50 via-primary/50 to-primary-dark/50",
          )}
          style={
            {
              ...(project.accentColor && {
                backgroundColor: `color-mix(
                in srgb, 
                ${project.accentColor} 50%, 
                black
              )`,
              }),
              "--border-width": "1px",
              clipPath: `polygon(
                0 0,
                var(--left-size) 0,
                calc(var(--left-size) + var(--corner-size-x)) var(--corner-size-y),
                100% var(--corner-size-y),
                100% 100%,
                0 100%,
                0 var(--border-width),
                var(--border-width) var(--border-width),
                var(--border-width) calc(100% - var(--border-width)),
                calc(100% - var(--border-width)) calc(100% - var(--border-width)),
                calc(100% - var(--border-width)) calc(var(--corner-size-y) + var(--border-width)),
                calc(var(--left-size) + var(--corner-size-x) - var(--border-width) / 2) calc(var(--corner-size-y) + var(--border-width)),
                calc(var(--left-size) - var(--border-width) / 2) var(--border-width),
                0 var(--border-width),
                0 0
              )`,
            } as React.CSSProperties
          }
        ></div>
        <div>
          <h2 className="font-bold text-lg line-clamp-1">{project.title}</h2>
          <p className="text-sm line-clamp-2">{project.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div className="grid place-items-center px-8 py-16">
      <div className="w-full max-w-5xl grid grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title + index}
            project={project}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
