"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

import CircleImage from "@/components/circle-image";
import AvatarPortfolio from "@/components/avatar-portfolio";
import TransitionPage from "@/components/transition-page";
import ContainerPage from "@/components/container-page";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    textarea: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("contacto.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        name: formData.name,
        email: formData.email,
        textarea: formData.textarea,
      }),
    });
    console.log("Formulario enviado:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      textarea: "",
    });
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                  placeholder="Tu nombre completo"
                />
              </div>

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
                  htmlFor="message"
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
                  rows={2}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors resize-none"
                  placeholder="Cuéntame sobre tu proyecto o consulta..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors font-medium"
              >
                <Send className="w-5 h-5" />
                <span>Enviar mensaje</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </ContainerPage>
  );
};

export default ContactPage;
