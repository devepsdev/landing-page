// Fondo común a todas las páginas: luces lila y naranja muy suaves y una rejilla tenue. Solo CSS.
const FondoAmbiente = () => (
  <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-lila/20 blur-[120px]" />
    <div className="absolute top-1/3 -right-48 h-[480px] w-[480px] rounded-full bg-secondary/10 blur-[140px]" />
    <div className="absolute -bottom-56 left-1/4 h-[460px] w-[460px] rounded-full bg-lila/10 blur-[120px]" />
    <div
      className="absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)",
      }}
    />
  </div>
);

export default FondoAmbiente;
