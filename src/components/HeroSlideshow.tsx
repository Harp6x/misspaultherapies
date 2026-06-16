"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { ArrowRight, ChevronDown, Phone, Shield, Video, Globe } from "lucide-react";

const SLIDE_DURATION = 8000;

interface HeroSlide {
  imageUrl: string;
  alt: string;
}

interface Props {
  slides: HeroSlide[];
}

const trustBadges = [
  { icon: Shield, label: "RCI Licensed" },
  { icon: Video, label: "100% Online" },
  { icon: Globe, label: "India & Abroad" },
];

export function HeroSlideshow({ slides }: Props) {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(Math.min(1, slides.length - 1));
  const [transitioning, setTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    if (slides.length < 2) return;
    setTransitioning(true);
    setNext((current + 1) % slides.length);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setTransitioning(false);
    }, 1500);
  }, [current, slides.length]);

  useEffect(() => {
    if (slides.length < 2) return;
    intervalRef.current = setInterval(advance, SLIDE_DURATION);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [advance, slides.length]);

  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden">
      {/* Background images — CSS crossfade */}
      <div className="absolute inset-0">
        {slides.length > 0 && (
          <>
            <Image
              src={slides[current].imageUrl}
              alt={slides[current].alt}
              fill
              priority
              className={`object-cover transition-opacity duration-[1.5s] ease-in-out ${transitioning ? "opacity-0" : "opacity-100"}`}
              sizes="100vw"
              quality={80}
            />
            {slides.length > 1 && (
              <Image
                src={slides[next].imageUrl}
                alt={slides[next].alt}
                fill
                className={`object-cover transition-opacity duration-[1.5s] ease-in-out ${transitioning ? "opacity-100" : "opacity-0"}`}
                sizes="100vw"
                quality={80}
              />
            )}
          </>
        )}
        {/* Warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brown/50 via-brown/40 to-brown/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 py-16 sm:px-8 sm:py-20 md:px-12">
        <div className="mx-auto max-w-7xl flex flex-col items-center lg:items-start">
          {/* Frosted glass text panel */}
          <div className="w-full max-w-2xl rounded-2xl bg-brown/40 backdrop-blur-md border border-cream/30 p-6 sm:p-10 shadow-lg">
            <p className="text-xs font-sans uppercase tracking-[0.4em] text-cream/70 mb-4">
              Ms Paul Therapies
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Compassionate Therapy for{" "}
              <em className="not-italic text-sage-light">Meaningful Change</em>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-cream/80 leading-relaxed max-w-xl">
              Professional online psychotherapy for individuals, couples, adolescents and families — across India and for NRIs abroad.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors"
              >
                <Phone className="h-4 w-4" />
                Book a Session
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-cream/40 bg-cream/10 px-6 py-3 text-sm font-semibold text-cream hover:bg-cream/20 transition-colors"
              >
                Learn About My Approach
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap gap-4">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-sm text-cream/70">
                  <badge.icon className="h-4 w-4 text-sage-light" />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide progress dots — bottom right */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 right-8 z-20 hidden gap-1.5 sm:flex">
          {slides.map((_s, idx) => (
            <div
              key={idx}
              className={`h-0.5 rounded-full transition-all duration-500 ${
                idx === current ? "w-8 bg-white" : "w-3 bg-white/30"
              }`}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1">
        <span className="text-[9px] uppercase tracking-[0.3em] text-cream/40">Scroll</span>
        <ChevronDown className="h-3.5 w-3.5 text-cream/40 animate-pulse" />
      </div>
    </section>
  );
}
