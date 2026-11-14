import Aportaciones from "@/components/aportaciones";
import LlamadaContacto from "@/components/llamada-contacto";
import TransitionPage from "@/components/transition-page";

const ServicesPage = () => {
  return (
    <main>
      <TransitionPage />
      <section className="px-4 pt-32 pb-16 md:px-6 md:pt-40">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="mb-3 text-sm font-semibold tracking-[0.2em] uppercase text-secondary">Qué puedo aportar</p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl text-balance">
              Del código <span className="text-secondary">a producción</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              Desarrollo la aplicación entera y me ocupo de que funcione después: servidor, despliegue,
              seguridad y vigilancia. Cada punto lleva un ejemplo real con enlaces para comprobarlo.
            </p>
          </div>
          <Aportaciones />
        </div>
      </section>
      <LlamadaContacto />
    </main>
  );
};

export default ServicesPage;
