import { Briefcase, GraduationCap } from "lucide-react";

import { dataAboutPage } from "@/data";

import Aparecer from "./aparecer";

const columnas = [
  { tipo: "experiencia" as const, titulo: "Experiencia", Icono: Briefcase },
  { tipo: "formacion" as const, titulo: "Formación", Icono: GraduationCap },
];

/** Trayectoria en dos columnas. Con `detalle` muestra también la descripción de cada etapa. */
const Trayectoria = ({ detalle = false }: { detalle?: boolean }) => (
  <div className="grid gap-12 md:grid-cols-2 md:gap-10">
    {columnas.map(({ tipo, titulo, Icono }) => (
      <div key={tipo}>
        <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-200">
          <Icono className="w-5 h-5 text-secondary" aria-hidden="true" />
          {titulo}
        </h3>
        <ol className="relative ml-2 border-l border-white/15">
          {dataAboutPage
            .filter((d) => d.tipo === tipo)
            .map((d, i) => (
              <Aparecer as="li" key={d.id} retraso={i * 100} className="relative pb-8 pl-7 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-secondary ring-4 ring-fondo"
                />
                <p className="text-xs font-semibold tracking-wide uppercase text-secondary">
                  {d.dateStart} — {d.dateEnd}
                </p>
                <h4 className="mt-1 text-lg font-bold leading-snug">{d.title}</h4>
                {d.subtitle && <p className="text-gray-400">{d.subtitle}</p>}
                {detalle && d.description && (
                  <p className="mt-3 text-sm leading-relaxed text-gray-300">{d.description}</p>
                )}
              </Aparecer>
            ))}
        </ol>
      </div>
    ))}
  </div>
);

export default Trayectoria;
