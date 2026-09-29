"use client";

import { useRef } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import PhoneMockup from "@/components/phone-mockup";
import { useContactModal } from "@/contexts/contact-modal-context";
import { getCategoryColorInfo } from "@/components/icons/service-icon";
import type { Project } from "@/app/(frontend)/projects/page";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLenis } from "@/components/LenisProvider";
import { twMerge } from "tailwind-merge";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailViewProps {
  project: Project;
}

interface ProjectInfoCardProps {
  title: string;
  items?: string[];
  emptyText?: string;
  className?: string;
}

function ProjectInfoCard({
  title,
  items,
  emptyText = "Aucun élément listé",
  className,
}: ProjectInfoCardProps) {
  return (
    <div
      className={twMerge(
        "group relative bg-grey-lightest/10 backdrop-blur-md w-full p-6 pt-8",
        className,
      )}
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
      />
      <p className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-2 py-1 text-sm font-orbitron font-medium bg-primary text-grey-darkest whitespace-nowrap">
        {title}
      </p>
      <ul className="list-disc list-inside text-sm">
        {items && items.length > 0 ? (
          items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {item}
            </li>
          ))
        ) : (
          <li className="text-grey-medium list-none">{emptyText}</li>
        )}
      </ul>
    </div>
  );
}

interface ProjectMetaItemProps {
  label: string;
  value?: string | number | null;
  className?: string;
}

function ProjectMetaItem({ label, value, className }: ProjectMetaItemProps) {
  return (
    <div className={twMerge("flex flex-col gap-1", className)}>
      <span className="font-orbitron font-bold text-xs sm:text-sm text-grey-medium">
        {label}
      </span>
      <span className="text-xs sm:text-sm">{value || "—"}</span>
    </div>
  );
}

interface ProjectGalleryProps {
  images?: string[];
  title: string;
}

function ProjectGallery({ images = [], title }: ProjectGalleryProps) {
  const displayImages = images.slice(0, 5);
  const count = displayImages.length;

  if (count === 0) return null;

  if (count === 1) {
    return (
      <Image
        src={displayImages[0]}
        alt={`${title} aperçu 1`}
        width={1920}
        height={1080}
        className="relative w-full h-auto bg-grey-darker"
      />
    );
  }

  if (count <= 4) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayImages.map((img, idx) => (
          <div
            key={idx}
            className={twMerge(
              "relative aspect-square bg-grey-darker",
              count === 3 && idx === 0 && "sm:col-span-2",
            )}
          >
            <Image
              src={img}
              alt={`${title} aperçu ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  // 5 images : 2x2 à gauche + 1 haute à droite
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayImages.slice(0, 4).map((img, idx) => (
          <div key={idx} className="relative aspect-square bg-grey-darker">
            <Image
              src={img}
              alt={`${title} aperçu ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="relative md:col-span-2 aspect-square bg-grey-darker">
        <Image
          src={displayImages[4]}
          alt={`${title} aperçu 5`}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundLightTopRef = useRef<HTMLImageElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroHeaderRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const { openModal } = useContactModal();
  const { lenis } = useLenis();

  useGSAP(
    () => {
      if (!lenis || !backgroundLightTopRef.current || !containerRef.current)
        return;

      gsap.to(backgroundLightTopRef.current, {
        yPercent: 80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: "#scroll-wrapper",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const getHeroScrollTrigger = () => ({
        trigger: heroSectionRef.current,
        scroller: "#scroll-wrapper",
        start: () =>
          "top " +
          (heroHeaderRef.current
            ? window.getComputedStyle(heroHeaderRef.current).top
            : "12rem"),
        end: () =>
          "+=" +
          Math.max(
            0,
            (heroSectionRef.current?.offsetHeight ?? 0) -
              (heroHeaderRef.current?.offsetHeight ?? 0),
          ),
        scrub: true,
        invalidateOnRefresh: true,
      });

      if (heroTitleRef.current && heroSectionRef.current) {
        gsap.to(heroTitleRef.current, {
          scale: 0.9,
          transformOrigin: "left top",
          ease: "power1.out",
          scrollTrigger: getHeroScrollTrigger(),
        });
      }

      if (heroDescRef.current && heroSectionRef.current) {
        gsap.to(heroDescRef.current, {
          scale: 0.8,
          y: -6,
          transformOrigin: "left top",
          ease: "power1.out",
          scrollTrigger: getHeroScrollTrigger(),
        });
      }

      if (mockupRef.current && heroSectionRef.current) {
        gsap.to(mockupRef.current, {
          scale: 0.8,
          transformOrigin: "center top",
          ease: "power1.out",
          scrollTrigger: getHeroScrollTrigger(),
        });
      }
    },
    { dependencies: [lenis] },
  );

  return (
    <div ref={containerRef} className="relative w-full px-8 bg-[#0F0F0F]">
      <Image
        ref={backgroundLightTopRef}
        src="/background light.svg"
        alt=""
        aria-hidden
        width={800}
        height={800}
        className="absolute top-[-25vw] left-[-25vw] w-1/2 h-auto pointer-events-none select-none blur-[10vw]"
      />

      {/* Main Container avec 2 colonnes en flex */}
      <div className="max-w-6xl mx-auto pb-16 flex flex-row gap-12 xl:gap-16 items-start">
        {/* Colonne gauche : Contenu défilant */}
        <div className="flex flex-col gap-32 flex-1">
          {/* En-tête : Badges, Titre, Description, À propos, Boutons */}
          <section className="min-h-screen lg:h-screen pt-48 pb-16 flex flex-col justify-between gap-8">
            <div ref={heroSectionRef} className="flex-1">
              <div
                ref={heroHeaderRef}
                className="sticky top-48 flex flex-col gap-4"
              >
                {/* Badges de services */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {project.services?.map((service) => {
                    const colorInfo = getCategoryColorInfo(service.category);
                    return (
                      <span
                        key={service.slug || service.title}
                        className="text-xs px-3.5 py-1 rounded-full"
                        style={{
                          color: colorInfo.color,
                          backgroundColor: `color-mix(in srgb, ${colorInfo.color} 12%, transparent)`,
                          border: `1px solid color-mix(in srgb, ${colorInfo.color} 40%, transparent)`,
                        }}
                      >
                        {service.title}
                      </span>
                    );
                  })}
                </div>

                {/* Titre et description du projet (dézoomés au scroll) */}
                <div className="flex flex-col gap-2">
                  <h1
                    ref={heroTitleRef}
                    className="font-orbitron font-bold text-2xl sm:text-3xl md:text-4xl text-grey-lightest"
                  >
                    {project.title}
                  </h1>

                  <p
                    ref={heroDescRef}
                    className="text-grey-medium text-lg sm:text-xl"
                  >
                    {project.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Section À propos */}
            <div className="flex flex-col gap-1">
              <h2 className="font-orbitron font-bold text-primary text-base sm:text-lg tracking-wide">
                À propos
              </h2>
              <p className="font-outfit text-grey-lighter/90 text-sm leading-relaxed">
                {project.about}
              </p>

              {/* Boutons d'action */}
              <div className="flex flex-wrap items-center gap-4 mt-6 sm:mt-8">
                <Button
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir le site ↗
                </Button>
                <Button variant="outline" onClick={openModal}>
                  Nous contacter
                </Button>
              </div>
            </div>
          </section>

          {/* Ligne de métadonnées */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <ProjectMetaItem label="Client" value={project.client} />
            <ProjectMetaItem label="Rôle" value={project.role} />
            <ProjectMetaItem label="Durée" value={project.duration} />
            <ProjectMetaItem label="Date de création" value={project.year} />
          </div>

          {/* Deux cartes : Fonctionnalités & Défis techniques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <ProjectInfoCard
              title="Fonctionnalités"
              items={project.features}
              emptyText="Aucune fonctionnalité listée"
            />
            <ProjectInfoCard
              title="Défis techniques"
              items={project.challenges}
              emptyText="Aucun défi technique listé"
            />
          </div>

          {/* Galerie d'images adaptative (1 à 5 photos, sans hover ni viewer) */}
          <ProjectGallery images={project.images} title={project.title} />
        </div>

        {/* Colonne droite : Mockup téléphone STICKY */}
        <div className="max-lg:hidden flex justify-center items-center sticky top-0 self-start h-screen pt-48 pb-16 shrink-0">
          <div
            ref={mockupRef}
            className="h-full flex items-center justify-center"
          >
            <PhoneMockup
              url={project.link}
              title={project.title}
              accentColor={project.accentColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
