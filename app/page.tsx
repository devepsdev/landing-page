import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { dataPortfolio } from "@/data";

import Aparecer from "@/components/aparecer";
import Aportaciones from "@/components/aportaciones";
import Cabecera from "@/components/inicio/cabecera";
import LlamadaContacto from "@/components/llamada-contacto";
import PortfolioBox from "@/components/portfolio-box";
import Seccion from "@/components/seccion";
import Tecnologias from "@/components/tecnologias";
import Trayectoria from "@/components/trayectoria";

const enlace = "inline-flex items-center gap-2 mt-10 font-semibold text-secondary hover:underline underline-offset-4";

export default function Home() {
  return (
    <main>
      <Cabecera />

      <Seccion
        id="aportar"
        etiqueta="Qué puedo aportar"
        titulo={<>Del código <span className="text-secondary">a producción</span></>}
        intro="Cada punto lleva un ejemplo real con enlaces para comprobarlo."
      >
        <Aportaciones />
      </Seccion>

      <Seccion
        id="proyectos"
        etiqueta="Proyectos"
        titulo={<>Desplegados y <span className="text-secondary">en marcha</span></>}
        intro="Con su demo pública y su código en GitHub."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {dataPortfolio.map((p, i) => (
            <Aparecer key={p.id} retraso={(i % 2) * 120}>
              <PortfolioBox data={p} />
            </Aparecer>
          ))}
        </div>
      </Seccion>

      <Seccion
        id="trayectoria"
        etiqueta="Trayectoria"
        titulo={<>Formación técnica <span className="text-secondary">y proyecto propio</span></>}
      >
        <Trayectoria />
        <Link href="/about-me" className={enlace}>
          Ver la trayectoria completa
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </Seccion>

      <Seccion
        id="tecnologias"
        etiqueta="Tecnologías"
        titulo={<>Con lo que <span className="text-secondary">trabajo</span></>}
        intro="Las que uso en mis proyectos desplegados."
      >
        <Tecnologias />
      </Seccion>

      <LlamadaContacto />
    </main>
  );
}
