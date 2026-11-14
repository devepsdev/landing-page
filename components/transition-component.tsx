// Entrada suave del menú y la cabecera. Solo CSS (globals.css): se ven aunque el script tarde.
export type MotionTransitionProps = {
    children: React.ReactNode;
    className?: string;
    position: 'right' | 'bottom' | 'bottom-up'
};

const clases = {
    bottom: "entrada-desde-arriba",
    "bottom-up": "entrada-desde-abajo",
    right: "entrada-desde-derecha",
};

export function MotionTransition({ children, className = "", position }: MotionTransitionProps) {
    return <div className={`${clases[position]} ${className}`}>{children}</div>
}
