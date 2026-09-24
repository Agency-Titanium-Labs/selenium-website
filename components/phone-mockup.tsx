"use client";

import { useEffect, useState } from "react";

interface PhoneMockupProps {
  url: string;
  title: string;
  accentColor?: string | null;
  scale?: number;
  className?: string;
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
      {/* Ambient glow behind the phone */}
      <div
        className="absolute inset-[-5cqw] rounded-[18cqw] opacity-20 blur-2xl pointer-events-none -z-10 transition-colors duration-500"
        style={{
          backgroundColor: accentColor || "var(--color-primary, #fcca46)",
        }}
      />

      {/* Outer Phone Shell */}
      <div
        className="relative w-full h-full p-[2.5cqw] rounded-[14cqw] bg-linear-to-b from-[#3a3b40] via-[#232428] to-[#121316] border border-white/10"
        style={
          {
            boxShadow:
              "0 3cqw 7cqw -1.5cqw rgba(0,0,0,0.8), inset 0 0.3cqw 0.5cqw rgba(255,255,255,0.2)",
            ...(accentColor ? { "--phone-accent": accentColor } : {}),
          } as React.CSSProperties
        }
      >
        {/* Subtle Side Buttons Simulation */}
        <div className="absolute left-[-1cqw] top-[16%] w-[1.2cqw] h-[6%] bg-[#2c2d31] rounded-l-[0.4cqw]" />
        <div className="absolute left-[-1cqw] top-[24%] w-[1.2cqw] h-[9%] bg-[#2c2d31] rounded-l-[0.4cqw]" />
        <div className="absolute left-[-1cqw] top-[35%] w-[1.2cqw] h-[9%] bg-[#2c2d31] rounded-l-[0.4cqw]" />
        <div className="absolute right-[-1cqw] top-[26%] w-[1.2cqw] h-[12%] bg-[#2c2d31] rounded-r-[0.4cqw]" />

        {/* Screen Bezel & Display Area */}
        <div className="relative w-full h-full rounded-[11.5cqw] overflow-hidden bg-black flex flex-col border border-white/5">
          {/* Status Bar / Dynamic Island */}
          <div className="relative z-30 flex items-center justify-between px-[4.5cqw] pt-[2.2cqw] pb-[1.8cqw] bg-black/90 backdrop-blur-md select-none">
            {/* Clock */}
            <span className="text-[3.8cqw] font-semibold text-white/90 tracking-tight font-mono leading-none">
              9:41
            </span>

            {/* Dynamic Island Pill */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[1.8cqw] w-[30cqw] h-[6.5cqw] bg-black rounded-full flex items-center justify-end pr-[2cqw] ring-[0.3cqw] ring-white/10 shadow-inner">
              <div className="w-[3cqw] h-[3cqw] rounded-full bg-[#0a0a0f] ring-[0.2cqw] ring-white/10 flex items-center justify-center">
                <div className="w-[1.2cqw] h-[1.2cqw] rounded-full bg-[#1e293b]" />
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
  );
}
