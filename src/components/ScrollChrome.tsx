"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Chrome mínimo e persistente: monograma + linha de progresso. Não é navegação — é assinatura. */
export default function ScrollChrome() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.set(barRef.current, { scaleX: self.progress });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 pointer-events-none">
      <span className="font-display text-sm tracking-[0.3em] text-avorio">
        FERRARI
      </span>
      <span className="font-body text-[10px] uppercase tracking-[0.25em] text-avorio/70 hidden sm:inline">
        Redesign Conceptual — Non Ufficiale
      </span>
      <div
        ref={barRef}
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-avorio"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
