"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const ERAS = [
  {
    year: "1947",
    title: "Maranello acende o motor",
    note: "Enzo Ferrari funda a Scuderia com um único objetivo: correr.",
  },
  {
    year: "1952–53",
    title: "Os primeiros títulos",
    note: "Alberto Ascari vence dois campeonatos seguidos — a lenda começa.",
  },
  {
    year: "1962",
    title: "Nasce um ícone",
    note: "A 250 GTO prova que forma e função podem ser a mesma coisa.",
  },
  {
    year: "1975",
    title: "Coragem contra o impossível",
    note: "Niki Lauda conquista o título — e redefine o que é bravura.",
  },
  {
    year: "1979–2000",
    title: "Vinte e um anos de espera",
    note: "Depois de Jody Scheckter, Maranello jejua até reencontrar o topo.",
  },
  {
    year: "2000–04",
    title: "O domínio silencioso",
    note: "Michael Schumacher vence cinco campeonatos seguidos com a Ferrari.",
  },
  {
    year: "2007",
    title: "A estreia perfeita",
    note: "Kimi Räikkönen é campeão em sua primeira temporada de vermelho.",
  },
  {
    year: "Oggi",
    title: "O próximo capítulo",
    note: "Charles Leclerc e Lewis Hamilton escrevem a história de hoje em Maranello.",
  },
];

/** Cena 3 — pinned. O scroll vertical empurra a herança como um filme horizontal. */
export default function HeritageScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || reduced) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () =>
            `+=${track.scrollWidth - window.innerWidth + window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <section className="relative bg-nero px-6 py-24">
        <Image
          src="/images/tuscany-hills.jpg"
          alt=""
          fill
          sizes="100vw"
          className="photo-duotone object-cover opacity-20"
        />
        <div className="photo-duotone-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-16">
          {ERAS.map((era) => (
            <EraCard key={era.year} {...era} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden bg-nero"
    >
      <Image
        src="/images/tuscany-hills.jpg"
        alt=""
        fill
        sizes="100vw"
        className="photo-duotone object-cover opacity-20"
      />
      <div className="photo-duotone-overlay absolute inset-0" />

      <div className="absolute left-0 right-0 top-1/2 z-10 h-px bg-avorio/15" />
      <div
        ref={trackRef}
        className="relative z-10 flex h-full items-center gap-[12vw] pr-[30vw] pl-[8vw] will-change-transform"
      >
        {ERAS.map((era) => (
          <EraCard key={era.year} {...era} />
        ))}
      </div>
    </section>
  );
}

function EraCard({
  year,
  title,
  note,
}: {
  year: string;
  title: string;
  note: string;
}) {
  return (
    <div className="flex w-[min(70vw,560px)] flex-shrink-0 flex-col gap-4">
      <span className="font-display text-[clamp(2.6rem,8vw,5.5rem)] leading-none text-rosso">
        {year}
      </span>
      <span className="font-display text-xl tracking-wide text-avorio sm:text-2xl">
        {title}
      </span>
      <p className="max-w-sm font-body text-sm text-avorio/60">{note}</p>
    </div>
  );
}
