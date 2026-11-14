"use client";

import { useEffect, useRef } from "react";

import { dataCounter } from "@/data";

/**
 * Cifra que cuenta desde 0 al verse. El HTML trae ya la cifra final: el 0 solo se pone
 * dentro del primer fotograma de la animación, así nunca se queda en 0 si no llega a correr.
 */
function Cifra({ valor }: { valor: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let marco = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const inicio = performance.now();
      const duracion = 1400;
      const paso = (t: number) => {
        const p = Math.min(1, (t - inicio) / duracion);
        el.textContent = String(Math.round(valor * (1 - Math.pow(1 - p, 3))));
        if (p < 1) marco = requestAnimationFrame(paso);
      };
      marco = requestAnimationFrame(paso);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(marco);
    };
  }, [valor]);

  return <span ref={ref}>{valor}</span>;
}

const CounterServices = () => (
  <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
    {dataCounter.map(({ id, endCounter, text }) => (
      <div key={id} className="flex flex-col-reverse p-5 border rounded-2xl border-white/10 bg-darkBg/60">
        <dt className="mt-1 text-xs tracking-wide text-gray-400 uppercase">{text}</dt>
        <dd className="text-3xl font-extrabold md:text-4xl text-secondary tabular-nums">
          +<Cifra valor={endCounter} />
        </dd>
      </div>
    ))}
  </dl>
);

export default CounterServices;
