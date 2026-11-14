import { dataTecnologias } from "@/data";

import Aparecer from "./aparecer";

/** Tecnologías agrupadas, como etiquetas. */
const Tecnologias = () => (
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {dataTecnologias.map((g, i) => (
      <Aparecer key={g.grupo} retraso={(i % 3) * 100}>
        <div className="h-full p-6 border rounded-2xl border-white/10 bg-darkBg/60">
          <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-400 uppercase">{g.grupo}</h3>
          <ul className="flex flex-wrap gap-2">
            {g.items.map((t) => (
              <li
                key={t}
                className="px-3 py-1 text-sm text-gray-200 transition-colors border rounded-full border-white/10 bg-white/5 hover:border-secondary/60 hover:text-white"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Aparecer>
    ))}
  </div>
);

export default Tecnologias;
