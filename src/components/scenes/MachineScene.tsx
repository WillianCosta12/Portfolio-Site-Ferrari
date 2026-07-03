"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlueprintCar from "@/components/BlueprintCar";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const SPECS: {
  label: string;
  value: number;
  decimals: number;
  suffix: string;
  description: string;
  focus: React.CSSProperties;
}[] = [
  {
    label: "Aerodinâmica",
    value: 3.5,
    decimals: 1,
    suffix: "G",
    description: "Força lateral suportada em curva de alta velocidade.",
    focus: { transform: "scale(3.4) translate(-18%, -6%)" },
  },
  {
    label: "Potência",
    value: 1000,
    decimals: 0,
    suffix: "+ CV",
    description: "Energia combinada entre motor e sistemas híbridos.",
    focus: { transform: "scale(3.2) translate(4%, -4%)" },
  },
  {
    label: "Aceleração",
    value: 2.6,
    decimals: 1,
    suffix: "s",
    description: "De 0 a 100 km/h — o tempo entre a espera e o impacto.",
    focus: { transform: "scale(3.4) translate(24%, -4%)" },
  },
  {
    label: "Peso mínimo",
    value: 798,
    decimals: 0,
    suffix: "kg",
    description: "Carro e piloto juntos — cada grama é uma escolha.",
    focus: { transform: "scale(3.3) translate(-6%, 2%)" },
  },
  {
    label: "Velocidade máxima",
    value: 350,
    decimals: 0,
    suffix: "+ km/h",
    description: "Em retas longas, sem asas demais no caminho.",
    focus: { transform: "scale(3.5) translate(10%, -8%)" },
  },
  {
    label: "Câmbio",
    value: 8,
    decimals: 0,
    suffix: " marchas",
    description: "Trocas em milissegundos — sequenciais, semiautomáticas.",
    focus: { transform: "scale(3.2) translate(-2%, 4%)" },
  },
];

/** Cena 4 — sem pin: fragmentos técnicos revelados por clip-path, com contadores. */
export default function MachineScene() {
  return (
    <section className="relative bg-nero px-6 py-32">
      <Image
        src="/images/carbon-fiber.jpg"
        alt=""
        fill
        sizes="100vw"
        className="photo-duotone object-cover opacity-25"
      />
      <div className="photo-duotone-overlay absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <span className="font-body text-xs uppercase tracking-[0.4em] text-avorio/50">
          A máquina
        </span>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,6vw,4rem)] leading-[0.95] text-avorio">
          Cada número é uma decisão de engenharia em Maranello.
        </h2>

        <div className="mt-20 grid gap-8 sm:grid-cols-3">
          {SPECS.map((spec, i) => (
            <SpecTile key={spec.label} {...spec} delay={i * 0.1} />
          ))}
        </div>

        <p className="mt-10 max-w-xl font-body text-xs text-avorio/40">
          * Valores conceituais e ilustrativos — não representam dados
          oficiais de qualquer equipe ou carro real.
        </p>
      </div>
    </section>
  );
}

function SpecTile({
  label,
  value,
  decimals,
  suffix,
  description,
  focus,
  delay,
}: {
  label: string;
  value: number;
  decimals: number;
  suffix: string;
  description: string;
  focus: React.CSSProperties;
  delay: number;
}) {
  const tileRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!tileRef.current || !numberRef.current) return;

    if (reduced) {
      gsap.set(tileRef.current, { clipPath: "inset(0 0 0% 0)" });
      numberRef.current.textContent = value.toFixed(decimals);
      return;
    }

    const ctx = gsap.context(() => {
      const counter = { val: 0 };

      gsap.to(tileRef.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.1,
        ease: "expo.out",
        delay,
        scrollTrigger: { trigger: tileRef.current, start: "top 80%" },
      });

      gsap.to(counter, {
        val: value,
        duration: 1.4,
        delay: delay + 0.2,
        ease: "power2.out",
        scrollTrigger: { trigger: tileRef.current, start: "top 80%" },
        onUpdate: () => {
          if (numberRef.current)
            numberRef.current.textContent = counter.val.toFixed(decimals);
        },
      });
    }, tileRef);

    return () => ctx.revert();
  }, [reduced, value, decimals, delay]);

  return (
    <div
      ref={tileRef}
      className="reveal relative overflow-hidden border border-avorio/10 bg-nero-soft/80 p-8 backdrop-blur-sm"
      style={{ clipPath: "inset(0 0 100% 0)" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <div className="bp-static h-full w-full origin-center" style={focus}>
          <BlueprintCar className="h-full w-full" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        <span className="font-body text-xs uppercase tracking-[0.3em] text-avorio/50">
          {label}
        </span>
        <div className="flex items-baseline gap-1 font-display text-5xl text-rosso">
          <span ref={numberRef}>0</span>
          <span className="text-2xl">{suffix}</span>
        </div>
        <p className="font-body text-sm text-avorio/60">{description}</p>
      </div>
    </div>
  );
}
