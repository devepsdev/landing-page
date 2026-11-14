import Link from "next/link";
import { ArrowRight, Linkedin } from "lucide-react";

import { socialNetworks } from "@/data";

import Aparecer from "./aparecer";

const linkedin = socialNetworks.find((s) => s.name === "LinkedIn")?.src ?? "";

/** Franja final para que una empresa se ponga en contacto. */
const LlamadaContacto = () => (
  <section className="px-4 pt-10 pb-40 md:px-6">
    <Aparecer className="relative max-w-6xl p-8 mx-auto overflow-hidden border md:p-14 rounded-3xl border-white/10 bg-gradient-to-br from-darkBg via-darkBg to-lila/20">
      <div aria-hidden="true" className="absolute rounded-full -right-24 -bottom-24 w-80 h-80 bg-secondary/25 blur-[100px]" />
      <div className="relative max-w-2xl">
        <h2 className="text-3xl font-bold leading-tight md:text-5xl text-balance">
          ¿Buscáis a alguien que desarrolle <span className="text-secondary">y despliegue</span>?
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          Quiero incorporarme a un equipo de desarrollo. Si encajo en el vuestro, hablemos.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 font-semibold transition rounded-xl bg-secondary hover:bg-secondary/85 hover:-translate-y-0.5"
          >
            Escríbeme
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (se abre en una pestaña nueva)"
            className="inline-flex items-center gap-2 px-5 py-3 font-semibold transition border rounded-xl border-white/20 hover:border-white/50 hover:bg-white/5"
          >
            <Linkedin className="w-4 h-4" aria-hidden="true" />
            LinkedIn
          </Link>
        </div>
      </div>
    </Aparecer>
  </section>
);

export default LlamadaContacto;
