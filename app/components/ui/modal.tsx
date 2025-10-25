"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { useLenis } from "../LenisProvider";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { stop, start } = useLenis();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflowY = "hidden";
      stop();
    } else {
      document.body.style.overflowY = "auto";
      start();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflowY = "auto";
      start();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-grey-darkest/30 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={twMerge(
          "relative bg-grey-darkest mx-4 p-8 max-w-xl max-h-[90vh] overflow-y-auto",
          className
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
        ></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-grey-medium hover:text-grey-light transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}
