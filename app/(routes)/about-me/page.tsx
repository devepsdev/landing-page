import Image from "next/image";

import Aparecer from "@/components/aparecer";
import CounterServices from "@/components/counter-services";
import LlamadaContacto from "@/components/llamada-contacto";
import Seccion from "@/components/seccion";
import Tecnologias from "@/components/tecnologias";
import TransitionPage from "@/components/transition-page";
import Trayectoria from "@/components/trayectoria";

const AboutMePage = () => {
    return (
        <main>
            <TransitionPage />

            <section className="px-4 pt-32 pb-10 md:px-6 md:pt-40">
                <div className="grid items-center max-w-6xl gap-10 mx-auto md:grid-cols-[0.8fr_1.2fr]">
                    <Aparecer className="relative mx-auto w-[240px] md:w-full md:max-w-[360px]">
                        <div aria-hidden="true" className="absolute rounded-full inset-[10%] bg-secondary/30 blur-[60px]" />
                        <Image
                            src="/yo/enrique-busto.webp"
                            alt="Enrique Pérez"
                            width={932}
                            height={913}
                            priority
                            sizes="(min-width: 768px) 360px, 240px"
                            className="relative w-full h-auto"
                            style={{
                                maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                                WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                            }}
                        />
                    </Aparecer>
                    <div>
                        <p className="mb-3 text-sm font-semibold tracking-[0.2em] uppercase text-secondary">Sobre mí</p>
                        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl text-balance">
                            Un cambio de carrera <span className="text-secondary">con oficio</span>
                        </h1>
                        <p className="mt-6 text-lg leading-relaxed text-gray-300">
                            Trabajé 24 años como repartidor y en 2020 empecé a formarme en informática. Desde
                            entonces he terminado tres ciclos superiores (ASIR, DAM y DAW), he hecho las prácticas
                            como desarrollador full stack y he creado PedidAI, que desarrollo y mantengo en producción.
                        </p>
                        <p className="mt-4 text-lg leading-relaxed text-gray-300">
                            De aquellos años me traigo la constancia y la costumbre de que las cosas lleguen a
                            tiempo; hoy las aplico a llevar cada proyecto del código a producción.
                        </p>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto mt-14">
                    <CounterServices />
                </div>
            </section>

            <Seccion
                etiqueta="Trayectoria"
                titulo={<>Experiencia <span className="text-secondary">y formación</span></>}
            >
                <Trayectoria detalle />
            </Seccion>

            <Seccion
                etiqueta="Tecnologías"
                titulo={<>Con lo que <span className="text-secondary">trabajo</span></>}
            >
                <Tecnologias />
            </Seccion>

            <LlamadaContacto />
        </main>
    );
}

export default AboutMePage;
