import TransitionPage from "@/components/transition-page";
import Link from "next/link";

const AvisoLegalPage = () => {
  return (
    <>
      <TransitionPage />
      <div className="min-h-screen bg-[#393a47] pt-32 pb-28 px-4">
        <div className="max-w-[800px] mx-auto" style={{ fontSize: "16px", lineHeight: "1.7" }}>
          <h1 className="text-3xl font-bold mb-8 text-secondary">Aviso Legal</h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-secondary">1. Datos identificativos</h2>
            <ul className="text-gray-200 space-y-1">
              <li><span className="font-medium">Titular:</span> Enrique Pérez Sánchez</li>
              <li><span className="font-medium">NIF:</span> 43444166H</li>
              <li><span className="font-medium">Domicilio:</span> Rambla Rafael Casanova nº 5, 1º 3ª, 08213 Polinyà (Barcelona)</li>
              <li><span className="font-medium">Email:</span>{" "}
                <a href="mailto:devepsdev@gmail.com" className="text-secondary hover:underline">
                  devepsdev@gmail.com
                </a>
              </li>
              <li><span className="font-medium">Actividad:</span> Desarrollo web y servicios informáticos</li>
              <li><span className="font-medium">Web:</span>{" "}
                <a
                  href="https://deveps.ddns.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:underline"
                >
                  https://deveps.ddns.net
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-secondary">2. Propiedad intelectual</h2>
            <p className="text-gray-200 mb-2">
              Los contenidos de esta web (textos, imágenes, código y diseño) son propiedad de Enrique
              Pérez Sánchez salvo que se indique expresamente lo contrario.
            </p>
            <p className="text-gray-200">
              Los proyectos mostrados en el portfolio son de demostración y propiedad del autor. Queda
              prohibida su reproducción total o parcial sin autorización expresa.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-secondary">3. Limitación de responsabilidad</h2>
            <p className="text-gray-200 mb-2">
              El titular no se hace responsable de posibles errores u omisiones en el contenido de
              este sitio web.
            </p>
            <p className="text-gray-200 mb-2">
              El titular no garantiza la disponibilidad permanente del sitio web ni se responsabiliza
              de los daños que pudieran derivarse de su interrupción.
            </p>
            <p className="text-gray-200">
              Los enlaces a sitios web externos son meramente informativos y no implican relación
              alguna con sus titulares ni responsabilidad sobre su contenido.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-secondary">4. Legislación aplicable</h2>
            <p className="text-gray-200 mb-2">
              La relación entre el titular y el usuario de este sitio web se rige por la legislación
              española vigente.
            </p>
            <p className="text-gray-200">
              Para cualquier controversia derivada del uso de este sitio web, las partes se someten
              expresamente a los juzgados y tribunales de Barcelona, con renuncia a cualquier otro
              fuero que pudiera corresponderles.
            </p>
          </section>

          <div className="mt-10 pt-6 border-t border-white/10">
            <Link href="/" className="text-secondary hover:underline text-sm">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvisoLegalPage;
