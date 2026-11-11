import Image from "next/image";
import Link from "next/link";
import { Check, ExternalLink, Github, Server } from "lucide-react";

interface PortfolioBoxProps {
  data: {
    id: number;
    name: string;
    status: string;
    summary: string;
    highlights: string[];
    stack: string[];
    deploy: string;
    image: string;
    urlGithub: string;
    urlDemo: string;
  };
}

const PortfolioBox = ({ data }: PortfolioBoxProps) => {
  const { name, status, summary, highlights, stack, deploy, image, urlDemo, urlGithub } = data;
  const enProduccion = status === "En producción";

  return (
    <article className="flex flex-col h-full overflow-hidden transition-colors duration-300 border group rounded-2xl border-white/10 bg-darkBg/95 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-secondary/50">
      {/* Proporción fija (16:9, la de las capturas): todas las imágenes empiezan y acaban a la misma altura */}
      <Link
        href={urlDemo}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="relative block overflow-hidden aspect-video bg-slate-950"
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-col flex-1 gap-4 p-5 md:p-6">
        <header className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">{name}</h2>
          <span
            className={`px-2.5 py-0.5 text-xs font-medium rounded-full ring-1 ring-inset whitespace-nowrap ${
              enProduccion
                ? "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30"
                : "bg-secondary/10 text-orange-300 ring-secondary/30"
            }`}
          >
            {status}
          </span>
        </header>

        <p className="leading-relaxed text-gray-200">{summary}</p>

        <ul className="space-y-2 text-sm text-gray-300">
          {highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <Check className="w-4 h-4 mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologías">
          {stack.map((t) => (
            <li key={t} className="px-2 py-0.5 text-xs rounded-md bg-white/[0.07] text-gray-200">
              {t}
            </li>
          ))}
        </ul>

        <p className="flex items-start gap-2 text-xs text-gray-400">
          <Server className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>
            <span className="text-gray-300">Desplegado en:</span> {deploy}
          </span>
        </p>

        <div className="flex gap-3 pt-2 mt-auto">
          <Link
            href={urlDemo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver la demo de ${name} (se abre en una pestaña nueva)`}
            className="inline-flex items-center justify-center flex-1 gap-2 px-4 py-2.5 text-sm font-medium transition-colors rounded-lg bg-secondary hover:bg-secondary/85"
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            Ver demo
          </Link>
          <Link
            href={urlGithub}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Código de ${name} en GitHub (se abre en una pestaña nueva)`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors rounded-lg bg-white/10 hover:bg-white/20"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            Código
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PortfolioBox;
