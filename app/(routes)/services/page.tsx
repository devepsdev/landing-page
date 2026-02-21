import AvatarServices from "@/components/avatar-services";
import CircleImage from "@/components/circle-image";
import SliderServices from "@/components/slider-services";
import TransitionPage from "@/components/transition-page";
import Link from "next/link";

const ServicesPage = () => {
  return (
    <>
      <TransitionPage />
      <CircleImage />
      <AvatarServices />
      <div className="grid items-center justify-center h-screen max-w-5xl gap-6 mx-auto md:grid-cols-2">
        <div className="max-w-[450px]">
          <h1 className="text-2xl leading-tight text-center md:text-left md:text-4xl md:mb-5">
            Mis <span className="font-bold text-secondary"> servicios.</span>
          </h1>
          <p className="mb-3 text-xl text-gray-300">
            Desarrollo soluciones tecnológicas end-to-end utilizando las mejores
            prácticas de la industria. Mi experiencia abarca el desarrollo
            frontend con React, Angular y Next.js, backends robustos con Spring
            Boot, Node.js y Express, arquitecturas de bases de datos optimizadas,
            y estrategias de despliegue modernas con DevOps. Cada servicio está
            diseñado para integrarse perfectamente con los demás, creando un
            ecosistema digital coherente y eficiente que escala con tu negocio y
            se adapta a las necesidades cambiantes del mercado.
          </p>
          <button className="px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/65">
            <Link href="/contact">Contacta conmigo</Link>
          </button>
        </div>

        {/* SLIDER */}
        <div>
          <SliderServices />
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
