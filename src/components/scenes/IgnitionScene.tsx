"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import KineticText from "@/components/KineticText";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Cena 1 — Ignição. Toca na carga da página, não no scroll: é o corte de abertura do filme. */
export default function IgnitionScene() {
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!lineRef.current || reduced) return;
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.1, ease: "power3.inOut" }
    );
  }, [reduced]);

  return (
    <section className="relative flex h-[100svh] flex-col items-center justify-center overflow-hidden bg-nero px-6 text-center">
      <Image
        src="/images/wet-asphalt.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="photo-duotone object-cover opacity-30"
      />
      <div className="photo-duotone-overlay absolute inset-0" />

      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-6 font-body text-xs uppercase tracking-[0.4em] text-avorio/50">
          Redesign Conceptual — Non Ufficiale
        </span>

        <div
          ref={lineRef}
          className="mb-8 h-px w-24 origin-center bg-rosso"
          style={{ transform: "scaleX(0)" }}
        />

        <KineticText
          as="h1"
          trigger="load"
          delay={0.25}
          className="font-display text-[clamp(3.2rem,15vw,11rem)] leading-[0.85] tracking-tight text-avorio"
        >
          FERRARI
        </KineticText>

        <KineticText
          as="p"
          trigger="load"
          delay={0.9}
          className="mt-6 max-w-md font-body text-sm text-avorio/60 sm:text-base"
        >
          Maranello, 1947. Velocità è eredità — uma cerimônia de ignição, do
          silêncio ao vermelho absoluto.
        </KineticText>
      </div>

      <div className="absolute bottom-10 z-10 flex flex-col items-center gap-3 text-avorio/40">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="motion-safe-only h-10 w-px animate-pulse bg-avorio/40" />
      </div>
    </section>
  );
}
