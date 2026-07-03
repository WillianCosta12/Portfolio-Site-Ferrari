"use client";

import Image from "next/image";
import BlueprintCar from "@/components/BlueprintCar";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const MODELS = [
  {
    year: "1947",
    name: "125 S",
    note: "O primeiro carro a levar o nome Ferrari a uma pista de corrida.",
    rotate: -3,
  },
  {
    year: "1962",
    name: "250 GTO",
    note: "Escultura pura sobre rodas — hoje um dos carros mais valiosos do mundo.",
    rotate: 2,
  },
  {
    year: "1987",
    name: "F40",
    note: "O último desejo de Enzo Ferrari: velocidade sem filtros.",
    rotate: -2,
  },
  {
    year: "1995",
    name: "F50",
    note: "Um motor de Fórmula 1, adaptado para as ruas.",
    rotate: 3,
  },
  {
    year: "2002",
    name: "Enzo Ferrari",
    note: "Tecnologia de corrida sem compromisso — e o nome do fundador.",
    rotate: -2,
  },
  {
    year: "2013",
    name: "LaFerrari",
    note: "O primeiro hypercar híbrido da marca. O futuro, anunciado.",
    rotate: 2,
  },
];

/** Cena — sem pin. Galeria de modelos icônicos sobre textura de pista. */
export default function IconsScene() {
  return (
    <section className="relative bg-nero px-6 py-32">
      <Image
        src="/images/race-track.jpg"
        alt=""
        fill
        sizes="100vw"
        className="photo-duotone object-cover opacity-20"
      />
      <div className="photo-duotone-overlay absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <span className="font-body text-xs uppercase tracking-[0.4em] text-avorio/50">
          Icone
        </span>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,6vw,4rem)] leading-[0.95] text-avorio">
          Seis formas que definiram uma era.
        </h2>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {MODELS.map((model, i) => (
            <ModelCard key={model.name} {...model} delay={(i % 3) * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModelCard({
  year,
  name,
  note,
  rotate,
  delay,
}: {
  year: string;
  name: string;
  note: string;
  rotate: number;
  delay: number;
}) {
  const ref = useRevealOnScroll<HTMLDivElement>(delay);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border border-avorio/10 bg-nero-soft/80 p-8 backdrop-blur-sm"
      style={{ clipPath: "inset(0 0 100% 0)" }}
    >
      <div
        className="bp-static pointer-events-none absolute -right-6 -top-2 w-32 opacity-30"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <BlueprintCar className="w-full" />
      </div>

      <div className="relative z-10">
        <span className="font-body text-xs uppercase tracking-[0.3em] text-rosso">
          {year}
        </span>
        <h3 className="mt-3 font-display text-2xl tracking-wide text-avorio">
          {name}
        </h3>
        <p className="mt-3 max-w-[85%] font-body text-sm text-avorio/60">
          {note}
        </p>
      </div>
    </div>
  );
}
