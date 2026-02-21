# DevEps - Portfolio Personal

Un portfolio moderno y elegante desarrollado con Next.js 14, diseñado para mostrar proyectos y servicios de desarrollo web de manera impactante.

## 🚀 Características

- **Diseño Moderno**: Interfaz elegante con animaciones fluidas y efectos visuales atractivos
- **Totalmente Responsivo**: Optimizado para dispositivos móviles, tablets y escritorio
- **Animaciones Avanzadas**: Transiciones suaves con Framer Motion y efectos de partículas interactivas
- **Escritura Dinámica**: Efecto de máquina de escribir con diferentes mensajes
- **Navegación Intuitiva**: Barra de navegación flotante con indicador de página activa
- **Componentes Modulares**: Arquitectura limpia y reutilizable

## 🛠️ Tecnologías Utilizadas

- **Frontend Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Partículas**: TSParticles
- **Fuentes**: Google Fonts (Urbanist)
- **Carrusel**: Swiper.js
- **Efectos de Texto**: React Type Animation
- **Contadores**: React CountUp

## 📂 Estructura del Proyecto

```Estructura
├── app/
│   ├── globals.css          # Estilos globales y configuración de Tailwind
│   ├── layout.tsx           # Layout principal de la aplicación
│   └── page.tsx             # Página de inicio
├── components/
│   ├── avatar/              # Componentes de avatares para diferentes secciones
│   ├── cover-particles.tsx  # Sistema de partículas interactivas
│   ├── header.tsx           # Encabezado con logo y redes sociales
│   ├── navbar.tsx           # Navegación flotante
│   ├── introduction.tsx     # Sección de introducción principal
│   ├── slider-services.tsx  # Carrusel de servicios
│   ├── portfolio-box.tsx    # Tarjetas de proyectos
│   ├── time-line.tsx        # Línea de tiempo para experiencia
│   └── transition-*         # Componentes de transiciones
└── utils/
    └── motion-transitions.tsx # Configuraciones de animaciones
```

## 🎨 Características de Diseño

### Colores Principales

- **Primario**: `#1f1934` (Fondo oscuro)
- **Secundario**: `#f5741c` (Naranja vibrante)
- **Fondo**: `#393a47` (Gris medio)

### Animaciones

- Transiciones de página con deslizamiento
- Efectos de fade-in desde diferentes direcciones
- Partículas interactivas que responden al mouse
- Animaciones de escritura dinámica
- Contadores animados

## 🚀 Instalación y Uso

### **Clona el repositorio**

```bash
git clone https://github.com/devepsdev/landing-page.git
cd landing-page
```

### **Instala las dependencias**

```bash
npm install
# o
yarn install
```

### **Inicia el servidor de desarrollo**

```bash
npm run dev
# o
yarn dev
```

### **Abre tu navegador**

Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📦 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run start    # Inicia el servidor de producción
npm run lint     # Ejecuta el linter
```

## 🎯 Secciones del Portfolio

- **Inicio**: Introducción con animación de partículas y texto dinámico
- **Sobre Mí**: Información personal y línea de tiempo profesional
- **Servicios**: Carrusel de servicios ofrecidos con contadores estadísticos
- **Proyectos**: Galería de trabajos realizados con enlaces a GitHub y demos
- **Contacto**: Formulario y información de contacto

## 🔧 Personalización

### Modificar Contenido

- Edita los archivos en `/data` para cambiar la información personal
- Reemplaza las imágenes en `/public` con tus propias fotos
- Actualiza los enlaces de redes sociales en el header

### Cambiar Estilos

- Modifica `globals.css` para ajustar los colores principales
- Personaliza las animaciones en `utils/motion-transitions.tsx`
- Ajusta el diseño responsivo en cada componente

## 📱 Responsive Design

El portfolio está optimizado para:

- **Móviles**: < 768px
- **Tablets**: 768px - 1024px
- **Escritorio**: > 1024px

## 🌟 Características Destacadas

- **Performance**: Optimizado con Next.js 14 y lazy loading
- **SEO**: Metadatos configurados y estructura semántica
- **Accesibilidad**: Navegación por teclado y lectores de pantalla
- **Animaciones Fluidas**: 60 FPS en todas las transiciones
- **Código Limpio**: TypeScript y componentes reutilizables

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

**DevEps** - Desarrollador Full Stack

- Portfolio: [deveps.ddns.net](https://deveps.ddns.net)
- Email: devepsdev@gmail.com
- LinkedIn: [www.linkedin.com/in/enrique-perez-sanchez](https://www.linkedin.com/in/enrique-perez-sanchez/)
- GitHub: [github.com/devepsdev](https://github.com/devepsdev)

---

⭐ Si te gusta este proyecto, ¡no olvides darle una estrella en GitHub!
