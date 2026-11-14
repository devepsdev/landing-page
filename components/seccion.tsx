import { ReactNode } from "react";

import Aparecer from "./aparecer";

interface SeccionProps {
  id?: string;
  etiqueta: string;
  titulo: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Bloque de la portada y de las páginas: etiqueta pequeña, título y contenido. */
const Seccion = ({ id, etiqueta, titulo, intro, children, className = "" }: SeccionProps) => (
  <section id={id} className={`px-4 py-20 md:px-6 md:py-28 scroll-mt-8 ${className}`}>
    <div className="max-w-6xl mx-auto">
      <Aparecer className="max-w-2xl mb-12">
        <p className="mb-3 text-sm font-semibold tracking-[0.2em] uppercase text-secondary">{etiqueta}</p>
        <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl text-balance">{titulo}</h2>
        {intro && <p className="mt-4 text-lg leading-relaxed text-gray-300">{intro}</p>}
      </Aparecer>
      {children}
    </div>
  </section>
);

export default Seccion;
