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
