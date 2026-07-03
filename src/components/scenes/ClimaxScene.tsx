"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const LINES = Array.from({ length: 10 });

/** Cena 5 — clímax único da página. O vermelho toma a tela; o selo final marca o fim da corrida. */
export default function ClimaxScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    if (reduced) {
      gsap.set(burstRef.current, { clipPath: "circle(150% at 50% 50%)" });
      gsap.set(stampRef.current, { opacity: 1, scale: 1, rotate: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2200",
          pin: true,
          scrub: 1,
        },
      });

      tl.to(
        burstRef.current,
        { clipPath: "circle(150% at 50% 50%)", ease: "none", duration: 1.6 },
        0
      );

      const lineEls =
        linesRef.current?.querySelectorAll<HTMLElement>(".speed-line") ?? [];
      lineEls.forEach((el) => {
        tl.fromTo(
          el,
          { xPercent: -120 },
          { xPercent: 120, ease: "none", duration: 1.8 },
          0.1
        );
      });

      tl.fromTo(
        stampRef.current,
        { opacity: 0, scale: 1.6, rotate: -4 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          ease: "back.out(1.6)",
          duration: 0.7,
        },
        1.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden bg-nero"
    >
      <Image
        src="/images/tire-smoke.jpg"
        alt=""
        fill
        sizes="100vw"
        className="photo-duotone object-cover opacity-50"
      />

      <div
        ref={burstRef}
        className="absolute inset-0 bg-rosso mix-blend-multiply"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      />

      <div
        ref={linesRef}
        className="mix-blend-overlay absolute inset-0 flex flex-col justify-between py-16"
      >
        {LINES.map((_, i) => (
          <div
            key={i}
            className="speed-line h-[2px] w-1/2 bg-avorio/70"
            style={{ marginLeft: `${(i % 2) * 50}%` }}
          />
        ))}
      </div>

      <div
        ref={stampRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center opacity-0"
      >
        <span className="font-display text-[clamp(3rem,13vw,9rem)] leading-[0.9] tracking-tight text-avorio">
          FORZA FERRARI
        </span>
        <span className="font-body text-xs uppercase tracking-[0.4em] text-avorio/60">
          Il grido della tifoseria
        </span>
      </div>
    </section>
  );
}
