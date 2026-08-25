"use client";

import { useEffect, useRef, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { useLenis } from "@/components/LenisProvider";

interface FolderTransitionProps {
  children: React.ReactNode;
}

// Configuration de la transition (modifiez ces valeurs pour ajuster l'effet)
export const TRANSITION_CONFIG = {
  scale: 0.4, // Niveau de dézoom
  duration: 0.5, // Durée du zoom / dézoom (en secondes)
  flapDuration: 0.3, // Durée d'ouverture / fermeture de la couverture (en secondes)
  flapOffset: 0.1, // Décalage temporel de la couverture (en secondes)
  pauseDuration: 0.5, // Durée de la pause au milieu avec dossier fermé (en secondes)
};

export default function FolderTransition({ children }: FolderTransitionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const { lenis } = useLenis();

  const containerRef = useRef<HTMLDivElement>(null);
  const folderRef = useRef<HTMLDivElement>(null);
  const backCoverRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const sheetWrapperRef = useRef<HTMLDivElement>(null);
  const sheetContentRef = useRef<HTMLDivElement>(null);

  const prevPathnameRef = useRef(pathname);
  const isTransitioningRef = useRef(false);

  // ==========================================
  // PHASE 2 : Quand la nouvelle route arrive (la couverture s'ouvre et la page ré-agrandit)
  // ==========================================
  useEffect(() => {
    if (pathname === prevPathnameRef.current) return;

    prevPathnameRef.current = pathname;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!folderRef.current || prefersReducedMotion) {
      isTransitioningRef.current = false;
      return;
    }

    const container = containerRef.current;
    const folder = folderRef.current;
    const backCover = backCoverRef.current;
    const flap = flapRef.current;
    const sheetWrapper = sheetWrapperRef.current;
    const sheet = sheetContentRef.current;

    // Maintenir le conteneur et la feuille verrouillés au viewport
    if (container) {
      container.style.position = "fixed";
      container.style.inset = "0";
      container.style.width = "100vw";
      container.style.height = "100vh";
      container.style.overflow = "hidden";
      container.style.zIndex = "40";
    }

    if (sheetWrapper) {
      sheetWrapper.style.width = "100vw";
      sheetWrapper.style.height = "100vh";
      sheetWrapper.style.overflow = "hidden";
    }

    if (sheet) {
      sheet.style.transform = "translateY(0px)";
    }
    window.scrollTo(0, 0);

    const tl = gsap.timeline({
      onComplete: () => {
        if (container) {
          container.style.position = "";
          container.style.inset = "";
          container.style.width = "";
          container.style.height = "";
          container.style.overflow = "";
          container.style.zIndex = "";
        }
        if (sheetWrapper) {
          sheetWrapper.style.width = "";
          sheetWrapper.style.height = "";
          sheetWrapper.style.overflow = "";
        }
        if (sheet) {
          sheet.style.transform = "";
        }
        gsap.set([folder, backCover, flap, sheetWrapper], {
          clearProps: "transform,opacity",
        });
        if (backCover) {
          backCover.style.display = "none";
        }
        if (flap) {
          flap.style.display = "none";
        }
        if (lenis) {
          lenis.start();
          lenis.scrollTo(0, { immediate: true });
        }
        isTransitioningRef.current = false;
      },
    });

    // 1. Afficher les éléments du dossier
    if (backCover) backCover.style.display = "block";
    if (flap) flap.style.display = "flex";

    // 2. Pause marquée au milieu (dossier fermé au centre)
    tl.to({}, { duration: TRANSITION_CONFIG.pauseDuration });

    // 3. La couverture commence à s'ouvrir vers le bas
    if (flap) {
      tl.fromTo(
        flap,
        {
          rotateX: 0,
          opacity: 1,
          transformOrigin: "bottom center",
        },
        {
          rotateX: -90,
          opacity: 0,
          duration: TRANSITION_CONFIG.flapDuration,
          ease: "power3.out",
        },
      );
    }

    // 4. En léger décalé : La page zoome pour revenir à 100% (plein écran)
    tl.fromTo(
      folder,
      {
        scale: TRANSITION_CONFIG.scale,
        transformOrigin: "center center",
      },
      {
        scale: 1,
        duration: TRANSITION_CONFIG.duration,
        ease: "power3.out",
      },
      `<+=${TRANSITION_CONFIG.flapOffset}`,
    );
  }, [pathname, lenis]);

  // ==========================================
  // PHASE 1 : Clic sur un lien -> dézoom et fermeture de la couverture
  // ==========================================
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignorer liens externes, nouvel onglet, téléchargement, etc.
      if (
        target.target === "_blank" ||
        target.hasAttribute("download") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      let targetUrl: URL;
      try {
        targetUrl = new URL(href, window.location.origin);
      } catch {
        return;
      }

      if (targetUrl.origin !== window.location.origin) return;

      const currentUrl = new URL(window.location.href);

      // Si c'est une ancre sur la même page -> laisser Lenis scroller
      if (
        currentUrl.pathname === targetUrl.pathname &&
        (targetUrl.hash || currentUrl.search === targetUrl.search)
      ) {
        return;
      }

      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      isTransitioningRef.current = true;

      if (!folderRef.current || prefersReducedMotion) {
        router.push(href);
        isTransitioningRef.current = false;
        return;
      }

      if (lenis) lenis.stop();

      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      const container = containerRef.current;
      const folder = folderRef.current;
      const backCover = backCoverRef.current;
      const flap = flapRef.current;
      const sheetWrapper = sheetWrapperRef.current;
      const sheet = sheetContentRef.current;

      // Figer la vue exactement sur ce que l'utilisateur voit
      if (container) {
        container.style.position = "fixed";
        container.style.inset = "0";
        container.style.width = "100vw";
        container.style.height = "100vh";
        container.style.overflow = "hidden";
        container.style.zIndex = "40";
      }

      if (sheetWrapper) {
        sheetWrapper.style.width = "100vw";
        sheetWrapper.style.height = "100vh";
        sheetWrapper.style.overflow = "hidden";
      }

      if (sheet) {
        sheet.style.transform = `translateY(-${currentScrollY}px)`;
      }

      if (backCover) {
        backCover.style.display = "block";
      }

      if (flap) {
        flap.style.display = "flex";
      }

      const tl = gsap.timeline({
        onComplete: () => {
          // Navigation vers la nouvelle page une fois le dossier fermé
          startTransition(() => {
            router.push(href);
          });
        },
      });

      // 1. Dézoom de la page
      tl.to(
        folder,
        {
          scale: TRANSITION_CONFIG.scale,
          duration: TRANSITION_CONFIG.duration,
          ease: "power2.inOut",
          transformOrigin: "center center",
        },
        0,
      );

      // 2. En léger décalé : La couverture avant en blur se referme (rotateX -35° -> 0°)
      if (flap) {
        tl.fromTo(
          flap,
          {
            rotateX: -90,
            opacity: 0,
            transformOrigin: "bottom center",
          },
          {
            rotateX: 0,
            opacity: 1,
            duration: TRANSITION_CONFIG.flapDuration,
            ease: "power2.inOut",
          },
          TRANSITION_CONFIG.flapOffset,
        );
      }

      // Pause avec le dossier fermé au centre
      tl.to({}, { duration: TRANSITION_CONFIG.pauseDuration });
    };

    document.addEventListener("click", handleLinkClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleLinkClick, {
        capture: true,
      });
    };
  }, [router, lenis]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen">
      <div
        ref={folderRef}
        className="relative w-full h-full will-change-[transform,opacity,filter] transform-gpu transform-3d perspective-distant"
      >
        {/* 1. FOND EN PRIMARY (Back cover façon project card avec coin biseauté) */}
        <div
          ref={backCoverRef}
          className="pointer-events-none absolute -inset-12 backdrop-blur-md [--corner-size:60px] origin-bottom bg-[#866B25] z-0 shadow-2xl"
          style={{
            display: "none",
            clipPath: `polygon(
              0 0,
              calc(100% - var(--corner-size)) 0,
              100% var(--corner-size),
              100% 100%,
              0 100%,
              0 0
            )`,
          }}
        >
          <div
            className="absolute inset-0 bg-linear-160 from-primary-lighter/50 via-primary/50 to-primary-dark/50"
            style={
              {
                "--border-width": "2px",
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
          />
        </div>

        {/* 2. MILIEU : CONTENU DE LA PAGE (comme l'image dans la project card) */}
        <div
          ref={sheetWrapperRef}
          className="relative w-full h-full z-10 origin-bottom transform-gpu"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div ref={sheetContentRef} className="relative w-full min-h-screen">
            <div className="absolute inset-0 bg-grey-darkest -z-100" />
            {children}
          </div>
        </div>

        {/* 3. DEVANT : COUVERTURE EN BLUR (Pochette avant avec découpe onglet) */}
        <div
          ref={flapRef}
          className="pointer-events-none absolute -inset-12 backdrop-blur-md [--corner-size-x:80px] [--corner-size-y:60px] [--left-size:200px] p-6 flex flex-col justify-end origin-bottom bg-primary z-20 shadow-2xl"
          style={{
            display: "none",
            clipPath: `polygon(
              0 0,
              var(--left-size) 0,
              calc(var(--left-size) + var(--corner-size-x)) var(--corner-size-y),
              100% var(--corner-size-y),
              100% 100%,
              0 100%,
              0 0
            )`,
          }}
        />
      </div>
    </div>
  );
}
