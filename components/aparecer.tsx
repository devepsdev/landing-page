"use client";

import { ReactNode, useEffect, useRef } from "react";

interface AparecerProps {
  children: ReactNode;
  className?: string;
  /** Retraso en ms, para escalonar elementos de una misma fila */
  retraso?: number;
  as?: "div" | "section" | "li" | "article";
}

// Elementos que esperan a verse. Además del IntersectionObserver, un único oyente de scroll
// los revisa: así aparecen aunque el observador llegue tarde (saltos con #ancla, pestañas en
// segundo plano) y el contenido nunca se queda invisible.
const pendientes = new Map<HTMLElement, () => void>();

function revisar() {
  const alto = window.innerHeight;
  pendientes.forEach((mostrar, el) => {
    const r = el.getBoundingClientRect();
    if (r.top < alto * 0.95 && r.bottom > 0) mostrar();
  });
}

let escuchando = false;
function escuchar() {
  if (escuchando) return;
  escuchando = true;
  window.addEventListener("scroll", revisar, { passive: true });
  window.addEventListener("resize", revisar, { passive: true });
}

/**
 * Hace aparecer el contenido al entrar en pantalla. El HTML exportado lo trae visible:
 * solo se oculta (clase "aparecer-pendiente") si está por debajo de la pantalla y no hay
 * «reducir movimiento», y se muestra con una transición CSS al verse.
 */
const Aparecer = ({ children, className = "", retraso = 0, as: Tag = "div" }: AparecerProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return; // ya se ve: no tocar

    el.classList.add("aparecer-pendiente");

    const mostrar = () => {
      if (!pendientes.has(el)) return;
      pendientes.delete(el);
      io.disconnect();
      el.style.transitionDelay = `${retraso}ms`;
      el.classList.add("aparecer-visible");
      el.classList.remove("aparecer-pendiente");
    };

    const io = new IntersectionObserver(([e]) => e.isIntersecting && mostrar(), {
      rootMargin: "0px 0px -5% 0px",
    });
    pendientes.set(el, mostrar);
    io.observe(el);
    escuchar();

    return () => {
      pendientes.delete(el);
      io.disconnect();
    };
  }, [retraso]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
};

export default Aparecer;
