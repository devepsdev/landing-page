"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// three.js va en un archivo aparte que solo se descarga si se va a usar
const Escena3D = dynamic(() => import("./escena-3d"), { ssr: false });

function hayWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Fondo 3D de la portada. Solo se carga en escritorio, con WebGL y sin «reducir movimiento»,
 * cuando el navegador queda libre tras pintar la página. Se pausa cuando no se ve.
 */
const Fondo3D = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [mostrar, setMostrar] = useState(false);
  const [activa, setActiva] = useState(true);

  useEffect(() => {
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const escritorio = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    if (quieto || !escritorio || !hayWebGL()) return;

    // Esperar a que el navegador quede libre (Safari no tiene requestIdleCallback)
    const empezar = () => setMostrar(true);
    const conIdle = typeof window.requestIdleCallback === "function";
    const id = conIdle ? window.requestIdleCallback(empezar, { timeout: 2000 }) : setTimeout(empezar, 800);

    const io = new IntersectionObserver(([e]) => setActiva(e.isIntersecting));
    if (ref.current) io.observe(ref.current);

    return () => {
      if (conIdle) window.cancelIdleCallback(id as number);
      else clearTimeout(id);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-y-0 right-0 w-full pointer-events-none lg:w-[62%]"
      style={{
        maskImage: "radial-gradient(ellipse at 55% 45%, black 35%, transparent 72%)",
        WebkitMaskImage: "radial-gradient(ellipse at 55% 45%, black 35%, transparent 72%)",
      }}
    >
      {mostrar && (
        <div className="w-full h-full fundido-entrada">
          <Escena3D activa={activa} />
        </div>
      )}
    </div>
  );
};

export default Fondo3D;
