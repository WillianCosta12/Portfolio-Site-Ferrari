"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/** Revela um elemento por clip-path quando ele entra em viewport. Usado nos grids de cards. */
export function useRevealOnScroll<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current) return;

    if (reduced) {
      gsap.set(ref.current, { clipPath: "inset(0 0 0% 0)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.1,
        ease: "expo.out",
        delay,
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    }, ref);

    return () => ctx.revert();
  }, [reduced, delay]);

  return ref;
}
