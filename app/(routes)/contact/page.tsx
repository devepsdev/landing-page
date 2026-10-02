"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send } from "lucide-react";

import CircleImage from "@/components/circle-image";
import AvatarPortfolio from "@/components/avatar-portfolio";
import TransitionPage from "@/components/transition-page";
import ContainerPage from "@/components/container-page";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    apellidos: "",
    email: "",
    tel: "",
    why: "",
    language: "",
    textarea: "",
  });
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "ok" | "error" | "rapido" | "token" | "wait" | "captcha"
  >("idle");

  // Token anti-spam firmado por el servidor: se pide cuando el formulario se hace visible
  const formRef = useRef<HTMLFormElement>(null);
  const tokenRef = useRef<{ t: number; n: string; s: string } | null>(null);
  const pidiendoRef = useRef(false);
  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY || "";

  const pedirToken = () => {
    if (tokenRef.current || pidiendoRef.current) return;
    pidiendoRef.current = true;
    fetch("/contacto.php?token=1", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && d.t) tokenRef.current = d;
      })
      .catch(() => {})
      .finally(() => {
        pidiendoRef.current = false;
      });
  };

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((x) => x.isIntersecting)) {
          pedirToken();
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(form);
    return () => io.disconnect();
  }, []);

  // Cloudflare Turnstile (opcional): solo si se compila con NEXT_PUBLIC_TURNSTILE_SITEKEY
  useEffect(() => {
    if (!turnstileKey) return;
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
    return () => {
      s.remove();
    };
  }, [turnstileKey]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tk = tokenRef.current;
    if (!tk) {
      setStatus("wait");
      pedirToken();
      return;
    }
    const captcha = formRef.current?.querySelector<HTMLInputElement>(
      '[name="cf-turnstile-response"]'
    )?.value;
    if (turnstileKey && !captcha) {
      setStatus("captcha");
      return;
    }
    setStatus("sending");
    try {
      const body = new URLSearchParams({
        ...formData,
        website,
        tk_t: String(tk.t),
        tk_n: tk.n,
        tk_s: tk.s,
      });
      if (captcha) body.set("cf-turnstile-response", captcha);
      const res = await fetch("/contacto.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });
      // El token es de un solo uso: se pedirá otro para el siguiente envío
      tokenRef.current = null;
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.error === "rapido") {
          setStatus("rapido");
          setTimeout(pedirToken, 0);
        } else if (data.error === "token") {
          setStatus("token");
          pedirToken();
        } else if (data.error === "captcha") {
          setStatus("captcha");
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
        return;
      }
      setStatus("ok");
      pedirToken();
      // Reset form
      setFormData({
        name: "",
        apellidos: "",
        email: "",
        tel: "",
        why: "",
        language: "",
        textarea: "",
      });
    } catch {
      setStatus("error");
      pedirToken();
    }
  };

  return (
    <ContainerPage>
      <TransitionPage />
      <AvatarPortfolio />
      <CircleImage />
      <div className="flex flex-col justify-center h-full">
        <h1 className="text-2xl leading-tight text-center md:text-4xl md:mb-5">
          Ponte en{" "}
          <span className="font-bold text-secondary">contacto conmigo</span>
        </h1>

        <div className="relative z-10 grid max-w-6xl gap-8 mx-auto mt-8 md:grid-cols-2">
          {/* Información de contacto */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-6 text-secondary">
                Información de contacto
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/20 rounded-lg">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-300">devepsdev@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/20 rounded-lg">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Teléfono</h3>
                    <p className="text-gray-300">+34 607 75 05 03</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/20 rounded-lg">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Ubicación</h3>
                    <p className="text-gray-300">
                      Barcelona, Catalunya (España)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">¿Trabajamos juntos?</h3>
              <p className="text-gray-300 leading-relaxed">
                Estoy disponible para proyectos de desarrollo Full Stack. Si
                tienes una idea en mente o necesitas ayuda con tu próximo
                proyecto, no dudes en contactarme. ¡Hagamos realidad tu visión!
              </p>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-6 text-secondary">
              Envíame un mensaje
            </h2>

            <form ref={formRef} onFocus={pedirToken} onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot anti-spam: oculto para personas, los bots lo rellenan */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label
                    htmlFor="apellidos"
                    className="block text-sm font-medium mb-2"
                  >
                    Apellidos
                  </label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                    placeholder="Tus apellidos"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                    placeholder="tu.email@ejemplo.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="tel"
                    className="block text-sm font-medium mb-2"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="tel"
                    name="tel"
                    value={formData.tel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                    placeholder="+34 600 000 000"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="why"
                  className="block text-sm font-medium mb-2"
                >
                  Motivo de contacto
                </label>
                <select
                  id="why"
                  name="why"
                  value={formData.why}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors text-white"
                >
                  <option value="" disabled style={{ backgroundColor: "#353048" }}>Selecciona un motivo</option>
                  <option value="proyecto" style={{ backgroundColor: "#353048" }}>Nuevo proyecto</option>
                  <option value="freelance" style={{ backgroundColor: "#353048" }}>Trabajo freelance</option>
                  <option value="consulta" style={{ backgroundColor: "#353048" }}>Consulta técnica</option>
                  <option value="otro" style={{ backgroundColor: "#353048" }}>Otro</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium mb-2"
                >
                  Tecnología / Lenguaje
                </label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                  placeholder="React, Next.js, Spring Boot..."
                />
              </div>

              <div>
                <label
                  htmlFor="textarea"
                  className="block text-sm font-medium mb-2"
                >
                  Mensaje
                </label>
                <textarea
                  id="textarea"
                  name="textarea"
                  value={formData.textarea}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors resize-none"
                  placeholder="Cuéntame sobre tu proyecto o consulta..."
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  required
                  className="mt-1 accent-secondary cursor-pointer"
                />
                <label htmlFor="privacy" className="text-gray-300 cursor-pointer" style={{ fontSize: "13px" }}>
                  He leído y acepto la{" "}
                  <Link href="/privacidad" className="text-secondary hover:underline">
                    política de privacidad
                  </Link>
                </label>
              </div>

              {turnstileKey && (
                <div
                  className="cf-turnstile"
                  data-sitekey={turnstileKey}
                  data-theme="dark"
                />
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                <span>
                  {status === "sending" ? "Enviando..." : "Enviar mensaje"}
                </span>
              </button>

              {status === "ok" && (
                <p role="status" className="text-sm text-center text-green-400">
                  ¡Mensaje enviado! Te responderé lo antes posible.
                </p>
              )}
              {(status === "rapido" || status === "wait") && (
                <p role="alert" className="text-sm text-center text-yellow-300">
                  {status === "rapido"
                    ? "Has enviado el formulario muy rápido. Espera unos segundos y vuelve a pulsar «Enviar»."
                    : "Un momento… estamos preparando el envío. Vuelve a pulsar «Enviar» en unos segundos."}
                </p>
              )}
              {status === "token" && (
                <p role="alert" className="text-sm text-center text-yellow-300">
                  La sesión del formulario ha caducado. Vuelve a pulsar «Enviar».
                </p>
              )}
              {status === "captcha" && (
                <p role="alert" className="text-sm text-center text-yellow-300">
                  No hemos podido verificar que eres una persona. Inténtalo de nuevo.
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="text-sm text-center text-red-400">
                  No se ha podido enviar el mensaje. Inténtalo de nuevo o
                  escríbeme a devepsdev@gmail.com.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </ContainerPage>
  );
};

export default ContactPage;
