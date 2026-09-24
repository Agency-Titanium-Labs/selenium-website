"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import PhoneMockup from "@/components/phone-mockup";
import ProjectImageSwiper from "@/components/project-image-swiper";
import { useContactModal } from "@/contexts/contact-modal-context";
import { getCategoryColorInfo } from "@/components/icons/service-icon";
import type { Project } from "@/app/(frontend)/projects/page";

interface ProjectDetailViewProps {
  project: Project;
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const { openModal } = useContactModal();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Normalize images for the 2x2 + 1 tall grid layout
  const rawImages = project.images || [];
  const displayImages: string[] = [];
  for (let i = 0; i < 5; i++) {
    if (rawImages.length > 0) {
      displayImages.push(rawImages[i % rawImages.length]);
    }
  }

  return (
    <div className="relative w-full overflow-x-hidden min-h-screen">
      {/* Background golden light in top-left */}
      <Image
        src="/background light.svg"
        alt=""
        width={800}
        height={800}
        className="absolute top-0 left-0 w-1/3 max-w-xl h-auto pointer-events-none select-none blur-[10vw] -z-10 opacity-70"
      />

      {/* Subtle decorative golden border frame on the right side */}
      <div className="absolute top-36 right-0 w-24 sm:w-36 h-[70vh] border-r-2 border-primary/20 pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-32 lg:pt-40 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Colonne gauche : Contenu défilant */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            {/* SCREEN 1 : Première section plein écran */}
            <div className="min-h-[calc(100dvh-13rem)] pb-8 flex flex-col justify-between">
              {/* En-tête : Badges, Titre, Description, À propos, CTA */}
              <div className="flex flex-col justify-center flex-1">
                {/* Badges de services */}
                <div className="flex flex-wrap items-center gap-2.5 mb-4 sm:mb-5">
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
                <h1 className="font-orbitron font-bold text-3xl sm:text-4xl md:text-5xl text-grey-lightest tracking-tight leading-tight">
                  {project.title}
                </h1>

                {/* Sous-titre / Description courte */}
                <p className="font-outfit text-grey-light text-base sm:text-lg mt-2 sm:mt-3 leading-relaxed max-w-xl">
                  {project.description}
                </p>

                {/* Section À propos */}
                <div className="mt-6 sm:mt-8">
                  <h2 className="font-orbitron font-bold text-primary text-base sm:text-lg tracking-wide mb-2 sm:mb-3">
                    À propos
                  </h2>
                  <p className="font-outfit text-grey-lighter/90 text-sm leading-relaxed max-w-xl">
                    {project.about}
                  </p>
                </div>

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

          {/* Colonne droite : Mockup téléphone STICKY */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center items-center lg:sticky lg:top-40 lg:self-start h-[55dvh] lg:h-[calc(100dvh-13rem)]">
            <PhoneMockup
              url={project.link}
              title={project.title}
              accentColor={project.accentColor}
            />
          </div>
        </div>
      </div>

      {/* Modal Lightbox avec le Swiper complet de photos */}
      {isGalleryOpen && rawImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-center items-center p-4 sm:p-8"
          onClick={() => setIsGalleryOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-grey-darkest/95 border border-primary/30 p-4 sm:p-6 [clip-path:polygon(20px_0,100%_0,100%_100%,0_100%,0_20px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="font-orbitron font-bold text-lg text-white">
                {project.title} — Galerie
              </h3>
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                className="text-white/60 hover:text-white px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors font-mono text-sm cursor-pointer"
                aria-label="Fermer"
              >
                ✕ Fermer
              </button>
            </div>

            <ProjectImageSwiper
              images={rawImages}
              title={project.title}
              accentColor={project.accentColor}
            />
          </div>
        </div>
      )}
    </div>
  );
}
