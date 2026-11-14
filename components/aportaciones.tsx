import { ExternalLink } from "lucide-react";

import { dataAportar } from "@/data";

import Aparecer from "./aparecer";

/** Tarjetas de «Qué puedo aportar», cada una con un ejemplo real. */
const Aportaciones = () => (
  <ul className="grid gap-5 md:grid-cols-2">
    {dataAportar.map((a, i) => (
      <Aparecer as="li" key={a.title} retraso={(i % 2) * 120}>
        <div className="relative h-full p-6 overflow-hidden transition-colors border group rounded-2xl border-white/10 bg-darkBg/80 hover:border-secondary/40 md:p-8">
          <div
            aria-hidden="true"
            className="absolute w-40 h-40 transition-opacity rounded-full opacity-0 -top-16 -right-16 bg-secondary/20 blur-3xl group-hover:opacity-100"
          />
          <div className="flex items-center justify-center mb-5 w-12 h-12 rounded-xl bg-secondary/15 text-secondary [&>svg]:w-6 [&>svg]:h-6">
            {a.icon}
          </div>
          <h3 className="text-xl font-bold">{a.title}</h3>
          <p className="mt-2 leading-relaxed text-gray-300">{a.description}</p>
          <p className="pt-4 mt-4 text-sm leading-relaxed text-gray-400 border-t border-white/10">
            <span className="font-semibold text-gray-200">Ejemplo: </span>
            {a.ejemplo}
          </p>
          <ul className="flex flex-wrap gap-2 mt-4">
            {a.enlaces.map((e) => (
              <li key={e.url + e.texto}>
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-9 px-3 py-1.5 text-sm font-medium transition-colors border rounded-lg border-secondary/40 text-secondary hover:bg-secondary/10 hover:border-secondary"
                >
                  {e.texto}
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="sr-only"> (se abre en otra pestaña)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Aparecer>
    ))}
  </ul>
);

export default Aportaciones;
