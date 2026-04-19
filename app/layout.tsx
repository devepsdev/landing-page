import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Navbar from "@/components/navbar";
import Header from "@/components/header";
import Footer from "@/components/footer";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevEps Landing Page",
  description: "Landing page made by DevEps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <Navbar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
