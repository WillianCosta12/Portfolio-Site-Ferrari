"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlueprintCar from "@/components/BlueprintCar";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/** Cena 2 — pinned. O monoposto se desenha como projeto técnico e então ganha a cor da corrida. */
export default function MonopostoScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carWrapRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !carWrapRef.current) return;

    const ctx = gsap.context(() => {
      const shapes = carWrapRef.current!.querySelectorAll(".bp-shape");

      if (reduced) {
        gsap.set(gridRef.current, { opacity: 1 });
        gsap.set(shapes, { strokeDashoffset: 0, fillOpacity: 1 });
        gsap.set(glowRef.current, { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3200",
          pin: true,
          scrub: 1,
        },
      });

      tl.to(gridRef.current, { opacity: 1, duration: 1 }, 0)
        .to(
          shapes,
          { strokeDashoffset: 0, stagger: 0.06, duration: 1, ease: "none" },
          0.4
        )
        .to(glowRef.current, { opacity: 1, duration: 1 }, 1.6)
        .to(
          shapes,
          { fillOpacity: 1, stagger: 0.04, duration: 1, ease: "none" },
          1.7
        )
        .to(
          carWrapRef.current,
          { scale: 1.03, duration: 0.6, ease: "power2.out" },
          2.4
        )
        .to(carWrapRef.current, { scale: 1, duration: 0.4 }, 3.0);
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden bg-nero"
    >
      <div
        ref={gridRef}
        className="blueprint-grid mask-fade-x absolute inset-0 opacity-0"
      />
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, var(--rosso-glow), transparent 60%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-10 px-6">
        <span className="font-body text-xs uppercase tracking-[0.4em] text-avorio/50">
          Architettura della velocità
        </span>
        <div ref={carWrapRef} className="w-full max-w-4xl">
          <BlueprintCar className="w-full" />
        </div>
        <span className="font-display text-2xl tracking-wide text-avorio sm:text-4xl">
          UNA FORMA, UNA FEDE
        </span>
      </div>
    </section>
  );
}
