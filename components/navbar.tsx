"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

import { itemsNavbar } from "@/data";

import { MotionTransition } from "./transition-component";

const Navbar = () => {
    // Con trailingSlash la ruta llega como "/server/"; los enlaces son "/server"
    const router = usePathname().replace(/(.)\/$/, "$1")

    return (
        <MotionTransition position="bottom-up" className="fixed z-40 flex justify-center w-full bottom-6 md:bottom-8 pointer-events-none">
            <nav aria-label="Navegación principal" className="pointer-events-auto">
                <ul className="flex items-center gap-1 p-1.5 border rounded-full border-white/10 bg-fondo/70 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
                    {itemsNavbar.map((item) => {
                        const activo = router === item.link
                        return (
                            <li key={item.id} className="relative group">
                                <Link
                                    href={item.link}
                                    aria-label={item.title}
                                    aria-current={activo ? "page" : undefined}
                                    className={`flex items-center justify-center w-11 h-11 rounded-full transition-colors duration-200 ${activo ? "bg-secondary" : "hover:bg-white/10"}`}>
                                    {item.icon}
                                </Link>
                                {/* Rótulo al pasar el ratón o con el foco del teclado */}
                                <span
                                    aria-hidden="true"
                                    className="absolute px-2 py-1 mb-2 text-xs font-medium -translate-x-1/2 rounded-md opacity-0 pointer-events-none whitespace-nowrap bottom-full left-1/2 bg-white text-fondo transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
                                    {item.title}
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </MotionTransition>
    );
}

export default Navbar;
