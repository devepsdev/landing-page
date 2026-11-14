"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

import { dataCounter } from "@/data";
import Fondo3D from "./fondo-3d";

// Cifras de la cabecera: las mismas que en Sobre mí
const cifras = dataCounter.filter((c) => c.text !== "Años en informática");

const Cabecera = () => {
  const ref = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();

  // Paralaje con el ratón: cada capa se mueve a distinta velocidad (suavizado con muelle)
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 60, damping: 18 });
  const sy = useSpring(ry, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (quieto) return;
    const mover = (e: PointerEvent) => {
      rx.set(e.clientX / window.innerWidth - 0.5);
      ry.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", mover, { passive: true });
    return () => window.removeEventListener("pointermove", mover);
  }, [quieto, rx, ry]);

  // Paralaje con el scroll: la foto baja más despacio que el texto
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fotoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textoY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  // El texto se desvanece según sale él mismo por arriba, no según avanza toda la cabecera:
  // en móvil la cabecera mide casi dos pantallas y se difuminaba mientras aún se leía.
  const refTexto = useRef<HTMLDivElement>(null);
  const { scrollYProgress: salidaTexto } = useScroll({ target: refTexto, offset: ["start start", "end start"] });
  const desvanecer = useTransform(salidaTexto, [0.55, 1], [1, 0]);

  const fotoX = useTransform(sx, (v) => v * 18);
  const fotoYRaton = useTransform(sy, (v) => v * 10);
  const fotoYTotal = useTransform([fotoY, fotoYRaton], ([a, b]: number[]) => a + b);
  const brilloX = useTransform(sx, (v) => v * -40);
  const brilloY = useTransform(sy, (v) => v * -30);
  const aroX = useTransform(sx, (v) => v * 30);
  const aroY = useTransform(sy, (v) => v * 24);

  const m = (estilo: object) => (quieto ? undefined : estilo);

  return (
    <section
      ref={ref}
      aria-labelledby="titulo-inicio"
      className="relative flex items-center min-h-[100svh] px-4 pt-28 pb-28 overflow-hidden md:px-6"
    >
      <Fondo3D />

      <div className="relative grid items-center w-full max-w-6xl gap-10 mx-auto md:grid-cols-[1.1fr_0.9fr]">
        {/* Texto */}
        <motion.div ref={refTexto} style={m({ y: textoY, opacity: desvanecer })} className="order-2 text-center md:order-1 md:text-left">
          <p className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm border rounded-full border-white/10 bg-white/5 text-gray-200">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-emerald-400 motion-safe:animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            Abierto a nuevas oportunidades
          </p>

          <h1 id="titulo-inicio" className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            Enrique Pérez
          </h1>
          <p className="mt-4 text-2xl font-semibold md:text-3xl text-balance">
            Desarrollador <span className="text-secondary">Full Stack</span> y{" "}
            <span className="text-secondary">DevOps</span>
          </p>
          <p className="max-w-xl mx-auto mt-6 text-lg leading-relaxed text-gray-300 md:mx-0 text-balance">
            Creo aplicaciones completas —backend, frontend y despliegue— y las mantengo funcionando en
            producción, con IA aplicada donde aporta y bajo control.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8 md:justify-start">
            <Link
              href="#proyectos"
              className="inline-flex items-center gap-2 px-5 py-3 font-semibold transition rounded-xl bg-secondary hover:bg-secondary/85 hover:-translate-y-0.5"
            >
              Ver proyectos
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 font-semibold transition border rounded-xl border-white/20 hover:border-white/50 hover:bg-white/5"
            >
              Contactar
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <dl className="flex justify-center gap-8 mt-10 md:justify-start">
            {cifras.map((c) => (
              <div key={c.id} className="flex flex-col-reverse">
                <dt className="text-xs tracking-wide text-gray-400 uppercase">{c.text}</dt>
                <dd className="text-3xl font-bold text-secondary tabular-nums">+{c.endCounter}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Foto con capas de paralaje */}
        <div className="relative order-1 mx-auto w-[260px] sm:w-[320px] md:order-2 md:w-full md:max-w-[440px]">
          <motion.div
            aria-hidden="true"
            style={m({ x: brilloX, y: brilloY })}
            className="absolute rounded-full inset-[12%] bg-secondary/40 blur-[70px]"
          />
          <motion.div
            aria-hidden="true"
            style={m({ x: aroX, y: aroY })}
            className="absolute border rounded-full inset-[6%] border-lila/40"
          />
          <motion.div
            aria-hidden="true"
            style={m({ x: aroX, y: aroY })}
            className="absolute rounded-full inset-[18%] border border-dashed border-white/10"
          />
          <motion.div style={m({ x: fotoX, y: fotoYTotal })} className="relative">
            <Image
              src="/yo/enrique-busto.webp"
              alt="Enrique Pérez"
              width={932}
              height={913}
              priority
              sizes="(min-width: 768px) 440px, 320px"
              className="w-full h-auto select-none"
              style={{
                maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
              }}
            />
          </motion.div>
        </div>
      </div>

      <Link
        href="#aportar"
        aria-label="Bajar a la siguiente sección"
        className="absolute hidden -translate-x-1/2 bottom-28 left-1/2 md:flex flex-col items-center gap-1 text-xs text-gray-400 hover:text-white"
      >
        <span className="flex justify-center w-6 border rounded-full h-9 border-white/30">
          <span className="w-1 h-2 mt-2 rounded-full bg-white/70 motion-safe:animate-bounce" />
        </span>
      </Link>
    </section>
  );
};

export default Cabecera;
