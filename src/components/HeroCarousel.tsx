"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Slide {
  src: string;
  alt: string;
}

interface Props {
  slides: Slide[];
  children: React.ReactNode;
  autoplayMs?: number;
}

export default function HeroCarousel({ slides, children, autoplayMs = 5000 }: Props) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    const timer = setInterval(next, autoplayMs);
    return () => clearInterval(timer);
  }, [next, autoplayMs]);

  return (
    <section className="relative h-[469px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-primary/55" />

      <div className="absolute inset-0 flex items-center">
        <div className="container-boxed w-full">
          {children}

          <div className="mt-5 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`block h-[3px] w-7 transition-colors duration-300 ${
                  i === current ? "bg-accent" : "bg-accent/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
