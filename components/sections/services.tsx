"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/LenisProvider";
import ServiceIcon from "@/components/icons/service-icon";
import type { Service, Media } from "@/payload-types";

gsap.registerPlugin(ScrollTrigger);

const iconsClassName = "h-20 w-auto";

export interface ServiceGroup {
  category: string;
  list: Service[];
}

interface ServicesProps {
  services?: ServiceGroup[];
}

export default function Services({ services = [] }: ServicesProps) {
  const activeServices: ServiceGroup[] = services;
  const { lenis } = useLenis();
  const [hoveredService, setHoveredService] = useState<string>("");
  const backgroundShapeRef = useRef<HTMLImageElement>(null);
  const backgroundLightLeftRef = useRef<HTMLImageElement>(null);

  const getColumnSpan = (categoryIndex: number) => {
    const listLength = activeServices[categoryIndex]?.list.length || 0;
    return Math.max(1, Math.ceil(listLength / 3));
  };

  const getNumberOfColumns = () => {
    return activeServices.reduce(
      (sum: number, _, index: number) => sum + getColumnSpan(index),
      0,
    );
  };

  useGSAP(
    () => {
      if (!lenis || activeServices.length === 0) return;

      gsap.to(backgroundShapeRef.current, {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: backgroundShapeRef.current,
          scroller: "#scroll-wrapper",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(backgroundLightLeftRef.current, {
        yPercent: 100,
        ease: "none",
        scrollTrigger: {
          trigger: backgroundLightLeftRef.current,
          scroller: "#scroll-wrapper",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { dependencies: [lenis, activeServices] },
  );

  if (activeServices.length === 0) {
    return null;
  }

  return (
    <section
      id="services"
      className="relative flex flex-col items-center gap-8 px-8 py-16 md:py-24"
    >
      <Image
        ref={backgroundShapeRef}
        src="/background shape full.svg"
        alt=""
        width={800}
        height={800}
        className="absolute top-0 right-0 transform translate-y-1/2 w-1/3 md:w-2/7 h-auto opacity-15 pointer-events-none select-none -z-10"
      />
      <Image
        ref={backgroundLightLeftRef}
        src="/background light.svg"
        alt=""
        width={800}
        height={800}
        className="absolute bottom-0 left-0 w-1/4 h-auto pointer-events-none select-none blur-[10vw] -z-10"
      />
      <h2 className="text-3xl font-bold text-center">Nos Services</h2>
      <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
        <div
          className="grid max-md:grid-cols-2! gap-y-8 w-full"
          style={{
            gridTemplateColumns: `repeat(${getNumberOfColumns()}, minmax(0, 1fr))`,
          }}
        >
          {activeServices.map((service, index) => {
            const colorIndex = (index % 4) + 1;
            return (
              <div
                key={service.category}
                className={`grid grid-rows-[auto_1fr] gap-8 pt-3 text-${colorIndex} hover:bg-${colorIndex}/15 transition-colors duration-300 ease-in-out`}
                style={{ gridColumn: `span ${getColumnSpan(index)}` }}
              >
                <h3 className="text-sm xl:text-base font-outfit! text-center place-self-center px-3">
                  {service.category}
                </h3>
                <ul
                  className="grid place-content-start md:place-content-end"
                  style={{
                    gridTemplateColumns: `repeat(${getColumnSpan(
                      index,
                    )}, minmax(0, 1fr))`,
                  }}
                >
                  {index > activeServices.length / 2 &&
                    (service.list.length + 1) % 3 === 0 && (
                      <div className="max-md:hidden"></div>
                    )}
                  {service.list.map((item) => (
                    <li
                      key={item.slug || item.title}
                      onMouseEnter={() => setHoveredService(item.description)}
                      onMouseLeave={() => setHoveredService("")}
                      className={`group relative grid justify-items-center gap-2 py-4 px-4 bg-grey-lightest/5 hover:bg-${colorIndex}/10 hover:z-10 transition-all duration-300 ease-in-out`}
                    >
                      <div
                        className={`absolute -inset-px -z-1 bg-linear-to-br from-grey-dark via-grey-dark to-grey-dark group-hover:from-primary-lighter group-hover:via-${colorIndex} group-hover:to-${colorIndex}-dark transition-all duration-300 ease-in-out`}
                        style={
                          {
                            "--border-width": "2px",
                            clipPath: `polygon(
                            0 0,
                            calc(100% - var(--border-width)) 0,
                            calc(100% - var(--border-width)) var(--border-width),
                            var(--border-width) var(--border-width),
                            var(--border-width) calc(100% - var(--border-width)),
                            calc(100% - var(--border-width)) calc(100% - var(--border-width)),
                            calc(100% - var(--border-width)) 0,
                            100% 0,
                            100% 100%,
                            0 100%
                          )`,
                          } as React.CSSProperties
                        }
                      ></div>
                      <ServiceIcon
                        name={item.icon}
                        customSvg={item.customSvg}
                        mediaUrl={
                          typeof item.iconMedia === "object" &&
                          item.iconMedia !== null
                            ? (item.iconMedia as Media).url || undefined
                            : undefined
                        }
                        className={iconsClassName}
                      />
                      <h4 className="font-outfit! text-center text-grey-lightest text-xs xl:text-sm font-bold">
                        {item.title}
                      </h4>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        {hoveredService ? (
          <p className="text-center text-balance text-grey-lightest max-md:hidden">
            {hoveredService}
          </p>
        ) : (
          <p className="text-center text-balance text-grey-light italic max-md:hidden">
            Survolez un service pour voir sa description
          </p>
        )}
      </div>
    </section>
  );
}
