"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    value: 1950,
    decimals: 0,
    prefix: "",
    label: "Única equipe presente desde a primeira temporada da Fórmula 1.",
  },
  {
    value: 16,
    decimals: 0,
    prefix: "",
    label: "Títulos de construtores — o maior número da história da categoria.",
  },
  {
    value: 240,
    decimals: 0,
    prefix: "+",
    label: "Vitórias em Grandes Prêmios ao longo de mais de sete décadas.",
  },
];

/** Cena — sem pin, sem foto: só números gigantes. O luxo aqui é a pausa visual. */
export default function NumbersScene() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center bg-nero px-6 py-32 text-center">
      <span className="mb-16 font-body text-xs uppercase tracking-[0.4em] text-avorio/50">
        Numeri
      </span>

      <div className="grid w-full max-w-5xl gap-16 sm:grid-cols-3">
        {STATS.map((stat, i) => (
          <StatBlock key={stat.label} {...stat} delay={i * 0.15} />
        ))}
      </div>
    </section>
  );
}

function StatBlock({
  value,
  decimals,
  prefix,
  label,
  delay,
}: {
  value: number;
  decimals: number;
  prefix: string;
  label: string;
  delay: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!wrapRef.current || !numberRef.current) return;

    if (reduced) {
      gsap.set(wrapRef.current, { opacity: 1, y: 0 });
      numberRef.current.textContent = prefix + value.toFixed(decimals);
      return;
    }

    const ctx = gsap.context(() => {
      const counter = { val: 0 };

      gsap.fromTo(
        wrapRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "expo.out",
          scrollTrigger: { trigger: wrapRef.current, start: "top 85%" },
        }
      );

      gsap.to(counter, {
        val: value,
        duration: 1.6,
        delay: delay + 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: wrapRef.current, start: "top 85%" },
        onUpdate: () => {
          if (numberRef.current)
            numberRef.current.textContent =
              prefix + counter.val.toFixed(decimals);
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [reduced, value, decimals, prefix, delay]);

  return (
    <div ref={wrapRef} className="flex flex-col items-center gap-4 opacity-0">
      <span className="font-display text-[clamp(3.5rem,10vw,6.5rem)] leading-none text-rosso">
        <span ref={numberRef}>0</span>
      </span>
      <p className="max-w-[220px] font-body text-sm text-avorio/60">{label}</p>
    </div>
  );
}
