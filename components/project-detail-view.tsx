"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import PhoneMockup from "@/components/phone-mockup";
import ProjectImageSwiper from "@/components/project-image-swiper";
import { useContactModal } from "@/contexts/contact-modal-context";
import { getCategoryColorInfo } from "@/components/icons/service-icon";
import type { Project } from "@/app/(frontend)/projects/page";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLenis } from "@/components/LenisProvider";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailViewProps {
  project: Project;
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundLightTopRef = useRef<HTMLImageElement>(null);
  const { openModal } = useContactModal();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
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
    },
    { dependencies: [lenis] },
  );

  // Normalize images for the 2x2 + 1 tall grid layout
  const rawImages = project.images || [];
  const displayImages: string[] = [];
  for (let i = 0; i < 5; i++) {
    if (rawImages.length > 0) {
      displayImages.push(rawImages[i % rawImages.length]);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full overflow-x-hidden px-8">
      <Image
        ref={backgroundLightTopRef}
        src="/background light.svg"
        alt=""
        aria-hidden
        width={800}
        height={800}
        className="absolute top-[-25vw] left-[-25vw] w-1/2 h-auto pointer-events-none select-none blur-[10vw] -z-10"
      />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto pb-16 flex flex-col">
        {/* Hero Section */}
        <section className="min-h-screen lg:h-screen flex flex-col lg:flex-row gap-12 xl:gap-16 pt-48 pb-16">
          {/* Left Column: Content */}
          <div className="flex flex-col justify-between gap-4 flex-1">
            <div className="flex flex-col gap-4">
              {/* Badges de services */}
              <div className="flex flex-wrap items-center gap-2.5">
                {project.services?.map((service) => {
                  const colorInfo = getCategoryColorInfo(service.category);
                  return (
                    <span
                      key={service.slug || service.title}
                      className="text-xs px-3.5 py-1 rounded-full font-mono transition-colors"
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

              {/* Titre du projet */}
              <h1 className="font-orbitron font-bold text-2xl sm:text-3xl md:text-4xl text-grey-lightest tracking-tight leading-tight">
                {project.title}
              </h1>

              {/* Sous-titre / Description courte */}
              <p className="font-outfit text-grey-light text-base sm:text-lg leading-relaxed max-w-xl">
                {project.description}
              </p>
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
          </div>

          {/* Colonne droite : Mockup téléphone STICKY */}
          <div className="flex justify-center items-center lg:sticky lg:top-48 h-[60dvh] lg:h-full">
            <PhoneMockup
              url={project.link}
              title={project.title}
              accentColor={project.accentColor}
            />
          </div>
        </section>

        {/* Colonne gauche : Contenu défilant */}
        <div className="flex flex-col">
          {/* SCREEN 1 : Première section plein écran */}
          <div className="pb-8 flex flex-col justify-between">
            {/* Ligne de métadonnées en bas du Screen 1 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 mt-6 border-t border-white/5">
              <div>
                <span className="font-orbitron font-bold text-xs sm:text-sm text-grey-lightest block mb-1">
                  Client
                </span>
                <span className="font-outfit text-xs sm:text-sm text-grey-light block truncate">
                  {project.client || "—"}
                </span>
              </div>
              <div>
                <span className="font-orbitron font-bold text-xs sm:text-sm text-grey-lightest block mb-1">
                  Rôle
                </span>
                <span className="font-outfit text-xs sm:text-sm text-grey-light block truncate">
                  {project.role || "—"}
                </span>
              </div>
              <div>
                <span className="font-orbitron font-bold text-xs sm:text-sm text-grey-lightest block mb-1">
                  Durée
                </span>
                <span className="font-outfit text-xs sm:text-sm text-grey-light block truncate">
                  {project.duration || "—"}
                </span>
              </div>
              <div>
                <span className="font-orbitron font-bold text-xs sm:text-sm text-grey-lightest block mb-1">
                  Date de création
                </span>
                <span className="font-outfit text-xs sm:text-sm text-grey-light block truncate">
                  {project.year || "—"}
                </span>
              </div>
            </div>
          </div>

          {/* SCREEN 2 : Suite au défilement (Cartes et Galerie) */}
          <div className="pb-24 pt-4 sm:pt-8 flex flex-col gap-10">
            {/* Deux cartes : Fonctionnalités & Défis techniques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Carte Fonctionnalités */}
              <div className="relative pt-3">
                <div className="inline-block bg-primary text-grey-darkest font-orbitron font-bold text-xs px-4 py-1.5 [clip-path:polygon(8px_0,100%_0,100%_100%,0_100%,0_8px)] ml-4 z-10 relative">
                  Fonctionnalités
                </div>
                <div className="bg-grey-darker/35 backdrop-blur-xs border border-primary/30 p-6 pt-7 -mt-2.5 [clip-path:polygon(18px_0,100%_0,100%_100%,0_100%,0_18px)]">
                  <ul className="space-y-2.5 text-sm text-grey-lighter font-outfit">
                    {project.features && project.features.length > 0 ? (
                      project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-grey-medium">
                        Aucune fonctionnalité listée
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Carte Défis techniques */}
              <div className="relative pt-3">
                <div className="inline-block bg-primary text-grey-darkest font-orbitron font-bold text-xs px-4 py-1.5 [clip-path:polygon(8px_0,100%_0,100%_100%,0_100%,0_8px)] ml-4 z-10 relative">
                  Défis techniques
                </div>
                <div className="bg-grey-darker/35 backdrop-blur-xs border border-primary/30 p-6 pt-7 -mt-2.5 [clip-path:polygon(18px_0,100%_0,100%_100%,0_100%,0_18px)]">
                  <ul className="space-y-2.5 text-sm text-grey-lighter font-outfit">
                    {project.challenges && project.challenges.length > 0 ? (
                      project.challenges.map((challenge, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                          <span>{challenge}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-grey-medium">
                        Aucun défi technique listé
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Galerie de photos : 4 petites à gauche (2x2) + 1 grande à droite avec bouton */}
            {displayImages.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Grille 2x2 de miniatures à gauche */}
                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                  {displayImages.slice(0, 4).map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-video bg-grey-darker/60 overflow-hidden border border-white/10 hover:border-primary/50 transition-colors group cursor-pointer"
                      onClick={() => setIsGalleryOpen(true)}
                    >
                      <Image
                        src={img}
                        alt={`${project.title} miniature ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>

                {/* Grande image à droite avec le bouton "Voir toute les photos" */}
                <div
                  className="relative md:col-span-1 min-h-64 sm:min-h-72 bg-grey-darker/60 overflow-hidden border border-white/10 hover:border-primary/50 transition-colors group cursor-pointer flex items-end justify-center pb-4 px-3"
                  onClick={() => setIsGalleryOpen(true)}
                >
                  {displayImages[4] && (
                    <Image
                      src={displayImages[4]}
                      alt={`${project.title} aperçu principal`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="relative z-10 w-full flex justify-center">
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsGalleryOpen(true);
                      }}
                      className="text-xs px-3 py-1.5 w-auto"
                    >
                      Voir toute les photos
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
