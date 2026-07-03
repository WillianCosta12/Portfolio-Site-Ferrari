"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type KineticTextProps = {
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  children: string;
  /** "load" toca assim que monta (hero); "scroll" espera o elemento entrar em viewport. */
  trigger?: "load" | "scroll";
  delay?: number;
};

export default function KineticText({
  as = "h2",
  className = "",
  children,
  trigger = "scroll",
  delay = 0,
}: KineticTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) return;

    const split = new SplitType(ref.current, { types: "lines,words" });
    gsap.set(split.words, { yPercent: 120, opacity: 0 });

    const playIn = () =>
      gsap.to(split.words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.025,
        delay,
      });

    let scrollTrigger: ScrollTrigger | undefined;
    if (trigger === "scroll") {
      scrollTrigger = ScrollTrigger.create({
        trigger: ref.current,
        start: "top 85%",
        onEnter: playIn,
      });
    } else {
      playIn();
    }

    return () => {
      scrollTrigger?.kill();
      split.revert();
    };
  }, [reduced, trigger, delay]);

  return React.createElement(as, { ref, className }, children);
}
