import Link from "next/link";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-30 flex justify-center pb-1 pointer-events-none">
      <div className="flex items-center gap-2 pointer-events-auto" style={{ fontSize: "11px" }}>
        <Link href="/privacidad" className="text-gray-500 hover:text-secondary transition-colors">
          Política de privacidad
        </Link>
        <span className="text-gray-600">|</span>
        <Link href="/aviso-legal" className="text-gray-500 hover:text-secondary transition-colors">
          Aviso legal
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
