"use client";

import { useEffect, useState } from "react";

interface PhoneMockupProps {
  url: string;
  title: string;
  accentColor?: string | null;
  scale?: number;
  className?: string;
}

interface SideButtonProps {
  side?: "left" | "right";
  top: string;
  height: string;
}

function SideButton({ side = "left", top, height }: SideButtonProps) {
  const isLeft = side === "left";
  return (
    <div
      className={`absolute w-[1.9cqw] bg-grey-lighter pointer-events-none ${
        isLeft
          ? "left-[-1cqw] rounded-l-[0.4cqw]"
          : "right-[-1cqw] rounded-r-[0.4cqw]"
      }`}
      style={{
        top,
        height,
        boxShadow: isLeft
          ? "inset 0 0.25cqw 0.25cqw #ffffff, inset 0 -0.25cqw 0.35cqw rgba(0, 0, 0, 0.16), inset -0.35cqw 0 0.5cqw rgba(0, 0, 0, 0.1), -0.25cqw 0.5cqw 1cqw rgba(0, 0, 0, 0.25)"
          : "inset 0 0.25cqw 0.25cqw #ffffff, inset 0 -0.25cqw 0.35cqw rgba(0, 0, 0, 0.16), inset 0.35cqw 0 0.5cqw rgba(0, 0, 0, 0.1), 0.25cqw 0.5cqw 1cqw rgba(0, 0, 0, 0.25)",
      }}
    />
  );
}

export default function PhoneMockup({
  url,
  title,
  accentColor,
  scale = 0.6,
  className = "",
}: PhoneMockupProps) {
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("9:41");

  // Keep phone status bar clock synchronized with real local time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const previewUrl = `/api/preview?url=${encodeURIComponent(url)}`;

  // Automatically dismiss the loading overlay after 2.5s maximum
  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [isLoading, iframeKey]);

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center h-full max-h-full aspect-9/19 w-auto max-w-full ${className}`}
      style={{
        containerType: "size",
        aspectRatio: "9 / 19",
      }}
    >
      {/* Side Buttons Simulation */}
      <SideButton top="16%" height="4.2%" />
      <SideButton top="22.5%" height="7.5%" />
      <SideButton top="32%" height="7.5%" />
      <SideButton side="right" top="23%" height="11%" />

      {/* Outer Phone Shell (Contour principal blanc avec dégradé vers le gris vers l'extérieur) */}
      <div
        className="relative z-10 w-full h-full p-[1.5cqw] rounded-[13cqw] bg-grey-lighter"
        style={{
          boxShadow:
            "inset 0 0 1.1cqw 0.15cqw var(--color-grey-dark), 0 5cqw 12cqw -2.5cqw rgba(0,0,0,0.65)",
        }}
      >
        {/* Screen Bezel & Display Area (Zone morte noire + Réflexion incurvée) */}
        <div className="relative w-full h-full p-[1cqw] rounded-[11.6cqw] overflow-hidden bg-black flex flex-col border border-black">
          {/* Reflet de l'écran incurvé (plus fort en haut qu'en bas) */}
          <div
            className="absolute inset-0 z-40 rounded-[11.6cqw] pointer-events-none"
            style={{
              boxShadow:
                "inset 0 0.8cqw 0.8cqw -0.2cqw rgba(255, 255, 255, 0.45), inset 0 -0.25cqw 0.4cqw rgba(255, 255, 255, 0.18), inset 0.3cqw 0 0.4cqw rgba(255, 255, 255, 0.15), inset -0.3cqw 0 0.4cqw rgba(255, 255, 255, 0.15)",
            }}
          />

          {/* Active Screen Surface */}
          <div className="relative w-full h-full rounded-[11cqw] overflow-hidden bg-black flex flex-col">
            {/* Status Bar / Dynamic Island */}
            <div className="relative z-30 flex items-center justify-between px-[4cqw] pt-[2cqw] pb-[1.6cqw] bg-black/90 backdrop-blur-md select-none">
              {/* Clock */}
              <span
                className="text-[3.6cqw] font-semibold text-white/90 tracking-tight font-mono leading-none"
                suppressHydrationWarning
              >
                {currentTime}
              </span>

              {/* Dynamic Island Pill */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[1.6cqw] w-[26cqw] h-[5.6cqw] bg-black rounded-full flex items-center justify-between px-[2.2cqw] ring-[0.25cqw] ring-white/10 shadow-inner">
                <div className="w-[1.6cqw] h-[1.6cqw] rounded-full bg-[#0c0d12]" />
                <div className="w-[2.4cqw] h-[2.4cqw] rounded-full bg-[#080811] ring-[0.2cqw] ring-[#1e293b] flex items-center justify-center">
                  <div className="w-[0.9cqw] h-[0.9cqw] rounded-full bg-[#312e81]/60" />
                </div>
              </div>

              {/* Actions: Refresh + Open external link */}
              <div className="flex items-center gap-[1.5cqw] text-white/70">
                <button
                  type="button"
                  onClick={handleRefresh}
                  title="Recharger la page"
                  className="p-[1cqw] hover:text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
                  aria-label="Recharger"
                >
                  <svg
                    className={`w-[3.8cqw] h-[3.8cqw] ${isLoading ? "animate-spin text-white" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Ouvrir dans un nouvel onglet"
                  className="p-[1cqw] hover:text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
                  aria-label="Ouvrir dans un nouvel onglet"
                >
                  <svg
                    className="w-[3.8cqw] h-[3.8cqw]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Viewport content */}
            <div className="relative flex-1 w-full bg-neutral-950 overflow-hidden">
              {/* Top progress indicator */}
              {isLoading && (
                <div className="absolute top-0 left-0 right-0 z-20 h-[0.8cqw] bg-white/10 overflow-hidden pointer-events-none">
                  <div
                    className="h-full animate-pulse transition-all duration-300"
                    style={{
                      width: "80%",
                      backgroundColor:
                        accentColor || "var(--color-primary, #fcca46)",
                    }}
                  />
                </div>
              )}

              {/* Soft fading loader */}
              <div
                className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/75 backdrop-blur-xs text-white/70 gap-[3cqw] transition-opacity duration-300 pointer-events-none ${
                  isLoading ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className="w-[9cqw] h-[9cqw] rounded-full animate-spin"
                  style={{
                    border: "0.6cqw solid rgba(255, 255, 255, 0.2)",
                    borderTopColor: accentColor || "#ffffff",
                  }}
                />
                <span className="text-[3.8cqw] font-mono leading-none">
                  Chargement du site...
                </span>
              </div>

              <iframe
                key={iframeKey}
                src={previewUrl}
                title={`Mockup de ${title}`}
                className="border-0 bg-white"
                style={{
                  width: `${(100 / scale).toFixed(3)}%`,
                  height: `${(100 / scale).toFixed(3)}%`,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
                onLoad={() => setIsLoading(false)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>

            {/* Home Indicator bar */}
            <div className="relative z-30 h-[4.5cqw] bg-black flex items-center justify-center pointer-events-none select-none">
              <div className="w-[32cqw] h-[1cqw] bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
