import TransitionPage from "@/components/transition-page";
import Link from "next/link";

const PrivacidadPage = () => {
  return (
    <>
      <TransitionPage />
      <div className="min-h-screen bg-[#393a47] pt-32 pb-28 px-4">
        <div className="max-w-[800px] mx-auto" style={{ fontSize: "16px", lineHeight: "1.7" }}>
          <h1 className="text-3xl font-bold mb-8 text-secondary">Política de Privacidad</h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-secondary">1. Responsable del tratamiento</h2>
            <ul className="text-gray-200 space-y-1">
              <li><span className="font-medium">Identidad:</span> Enrique Pérez Sánchez</li>
              <li><span className="font-medium">NIF:</span> 43444166H</li>
              <li><span className="font-medium">Dirección:</span> Rambla Rafael Casanova nº 5, 1º 3ª, 08213 Polinyà (Barcelona)</li>
              <li><span className="font-medium">Email:</span>{" "}
                <a href="mailto:devepsdev@gmail.com" className="text-secondary hover:underline">
                  devepsdev@gmail.com
                </a>
              </li>
              <li><span className="font-medium">Teléfono:</span> +34 607 75 05 03</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-secondary">2. Finalidad del tratamiento</h2>
            <p className="text-gray-200 mb-2">
              Los datos recogidos a través del formulario de contacto se utilizan exclusivamente para responder
              a las consultas del usuario.
            </p>
            <p className="text-gray-200">
              No se realizan decisiones automatizadas ni elaboración de perfiles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-secondary">3. Legitimación</h2>
            <p className="text-gray-200">
              La base legal para el tratamiento de sus datos es el consentimiento del interesado al enviar
              el formulario de contacto.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-secondary">4. Destinatarios</h2>
            <p className="text-gray-200 mb-2">
              Los datos no se ceden a terceros salvo obligación legal.
            </p>
            <p className="text-gray-200">
              Los datos del formulario se envían a través de Telegram Bot API únicamente para notificación
              al responsable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-secondary">5. Derechos del interesado</h2>
            <p className="text-gray-200 mb-2">
              Puede ejercer los siguientes derechos: acceso, rectificación, supresión, limitación del
              tratamiento, portabilidad y oposición.
            </p>
            <p className="text-gray-200 mb-2">
              Para ejercer estos derechos, envíe un email a{" "}
              <a href="mailto:devepsdev@gmail.com" className="text-secondary hover:underline">
                devepsdev@gmail.com
              </a>{" "}
              indicando <strong>&quot;Protección de datos&quot;</strong> en el asunto.
            </p>
            <p className="text-gray-200">
              Tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos
              (AEPD) en{" "}
              <a
                href="https://www.aepd.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline"
              >
                www.aepd.es
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-secondary">6. Conservación de datos</h2>
            <p className="text-gray-200">
              Los datos se conservan durante el tiempo necesario para atender la consulta y durante
              los plazos legales aplicables.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-secondary">7. Cookies</h2>
            <p className="text-gray-200 mb-2">
              Esta web no utiliza cookies propias de rastreo.
            </p>
            <p className="text-gray-200">
              Si en el futuro se implementan servicios de terceros que utilicen cookies, se informará
              previamente al usuario y se solicitará su consentimiento.
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

export default PrivacidadPage;
