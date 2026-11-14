import { dataPortfolio } from "@/data";

import Aparecer from "@/components/aparecer";
import LlamadaContacto from "@/components/llamada-contacto";
import PortfolioBox from "@/components/portfolio-box";
import TransitionPage from "@/components/transition-page";

const PortfolioPage = () => {
    return (
        <main>
            <TransitionPage />
            <section className="px-4 pt-32 pb-16 md:px-6 md:pt-40">
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-2xl mb-12">
                        <p className="mb-3 text-sm font-semibold tracking-[0.2em] uppercase text-secondary">Portfolio</p>
                        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl text-balance">
                            Proyectos desplegados <span className="text-secondary">y en marcha</span>
                        </h1>
                        <p className="mt-6 text-lg leading-relaxed text-gray-300">
                            Todos tienen su demo pública y su código en GitHub.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {dataPortfolio.map((data, i) => (
                            <Aparecer key={data.id} retraso={(i % 2) * 120}>
                                <PortfolioBox data={data} />
                            </Aparecer>
                        ))}
                    </div>
                </div>
            </section>
            <LlamadaContacto />
        </main>
    );
}

export default PortfolioPage;
