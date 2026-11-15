import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/navbar";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FondoAmbiente from "@/components/fondo-ambiente";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enrique Pérez · Desarrollador Full Stack y DevOps",
  description:
    "Desarrollador Full Stack y DevOps: aplicaciones completas con Spring Boot, Django, Angular, React y Next.js, desplegadas y en producción. Proyectos, trayectoria y contacto.",
  metadataBase: new URL("https://portfolio.deveps.dev"),
  // Vista previa al compartir el enlace (LinkedIn, WhatsApp…): captura del hero, 1200×630
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Enrique Pérez · Portfolio",
    title: "Enrique Pérez · Desarrollador Full Stack y DevOps",
    description:
      "Aplicaciones completas —backend, frontend y despliegue— funcionando en producción. Proyectos con demo y código, trayectoria y contacto.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Portada del portfolio de Enrique Pérez" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={urbanist.className}>
        <FondoAmbiente />
        <Navbar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
