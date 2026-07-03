"use client";

import Image from "next/image";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const DRIVERS = [
  {
    name: "Tazio Nuvolari",
    years: "Anos 1930",
    legacy:
      '"Il Mantovano Volante" — coragem lendária nos primeiros anos da Scuderia.',
  },
  {
    name: "Alberto Ascari",
    years: "1952–1953",
    legacy: "Dois títulos mundiais seguidos — o primeiro grande campeão da marca.",
  },
  {
    name: "Niki Lauda",
    years: "1975, 1977",
    legacy: "Voltou às pistas semanas após um acidente quase fatal. Venceu.",
  },
  {
    name: "Gilles Villeneuve",
    years: "1977–1982",
    legacy: "Nunca foi campeão — mas nenhum tifoso esqueceu como ele corria.",
  },
  {
    name: "Michael Schumacher",
    years: "2000–2004",
    legacy: "Cinco títulos consecutivos. A era da precisão absoluta.",
  },
  {
    name: "Charles Leclerc",
    years: "2019–hoje",
    legacy: "O piloto de Mônaco carrega hoje o peso e o orgulho de Maranello.",
  },
];

/** Cena — sem pin. Grid de lendas que revela por clip-path, sobre textura de bandeira. */
export default function LegendsScene() {
  return (
    <section className="relative bg-nero px-6 py-32">
      <Image
        src="/images/checkered-flag.jpg"
        alt=""
        fill
        sizes="100vw"
        className="photo-duotone object-cover opacity-20"
      />
      <div className="photo-duotone-overlay absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <span className="font-body text-xs uppercase tracking-[0.4em] text-avorio/50">
          Leggende
        </span>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,6vw,4rem)] leading-[0.95] text-avorio">
          Nomes que o vermelho não deixa esquecer.
        </h2>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {DRIVERS.map((driver, i) => (
            <DriverCard key={driver.name} {...driver} delay={(i % 3) * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DriverCard({
  name,
  years,
  legacy,
  delay,
}: {
  name: string;
  years: string;
  legacy: string;
  delay: number;
}) {
  const ref = useRevealOnScroll<HTMLDivElement>(delay);

  return (
    <div
      ref={ref}
      className="border border-avorio/10 bg-nero-soft/80 p-8 backdrop-blur-sm"
      style={{ clipPath: "inset(0 0 100% 0)" }}
    >
      <span className="font-body text-xs uppercase tracking-[0.3em] text-rosso">
        {years}
      </span>
      <h3 className="mt-3 font-display text-2xl tracking-wide text-avorio">
        {name}
      </h3>
      <p className="mt-3 font-body text-sm text-avorio/60">{legacy}</p>
    </div>
  );
}
