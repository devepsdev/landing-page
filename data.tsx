import {
  BookText,
  CodeSquare,
  HomeIcon,
  UserRound,
  Linkedin,
  X,
  Pencil,
  Computer,
  Rocket,
  Speech,
  Instagram,
  Twitch,
  Server,
  Database,
  Shield,
  Smartphone,
} from "lucide-react";

export const socialNetworks = [
  {
    id: 1,
    logo: <Linkedin size={30} strokeWidth={1} />,
    src: "https://www.linkedin.com/in/enrique-perez-sanchez",
  },
  {
    id: 2,
    logo: <X size={30} strokeWidth={1} />,
    src: "https://x.com/devepsdev",
  },
  {
    id: 3,
    logo: <Instagram size={30} strokeWidth={1} />,
    src: "https://www.instagram.com/devepsdev/",
  },
  {
    id: 4,
    logo: <Twitch size={30} strokeWidth={1} />,
    src: "https://www.twitch.tv/deveps",
  },
];

export const itemsNavbar = [
  {
    id: 1,
    title: "Home",
    icon: <HomeIcon size={25} color="#fff" strokeWidth={1} />,
    link: "/",
  },
  {
    id: 2,
    title: "User",
    icon: <UserRound size={25} color="#fff" strokeWidth={1} />,
    link: "/about-me",
  },
  {
    id: 3,
    title: "Book",
    icon: <BookText size={25} color="#fff" strokeWidth={1} />,
    link: "/services",
  },
  {
    id: 4,
    title: "Target",
    icon: <CodeSquare size={25} color="#fff" strokeWidth={1} />,
    link: "/portfolio",
  },
  {
    id: 5,
    title: "Home",
    icon: <Speech size={25} color="#fff" strokeWidth={1} />,
    link: "/testimonials",
  },
];

export const dataAboutPage = [
  {
    id: 1,
    title: "Full Stack Developer",
    subtitle: "Grup Essentia",
    description:
      "En Grup Essentia desarrollé y mantuve aplicaciones web utilizando tecnologías modernas del stack completo. Implementé funcionalidades frontend con Angular, diseñé interfaces de usuario responsivas y optimicé la experiencia del usuario. Gestioné bases de datos con MySQL, creé APIs con Spring Boot y colaboré en la migración de sistemas legacy a arquitecturas más escalables.",
    date: "junio 2025",
  },
  {
    id: 2,
    title: "CFGS Desarrollo de Aplicaciones Web (DAW)",
    subtitle: "IOC - Institut Obert de Catalunya",
    description:
      "Formación completa en desarrollo web full-stack. Implementé aplicaciones con Spring Boot, Node, React, Angular, Java EE (JSP, Servlets), JavaScript, HTML5/CSS3 y PHP, trabajando con arquitecturas REST, sistemas de autenticación JWT y despliegue en servidores Linux. Proyecto destacado: Abasta (gestión B2B de proveedores).",
    date: "enero 2026",
  },
  {
    id: 3,
    title: "CFGS Desarrollo de Aplicaciones Multiplataforma (DAM)",
    subtitle: "IOC - Institut Obert de Catalunya",
    description:
      "Desarrollo de aplicaciones móviles nativas para Android con Java y Kotlin (Jetpack Compose), y aplicaciones de escritorio con JavaFX y .NET. Programación concurrente y desarrollo de videojuegos con LibGDX. Implementé arquitecturas MVVM, integración con APIs REST y gestión de bases de datos PostreSQL y MySQL.",
    date: "enero 2025",
  },
  {
    id: 4,
    title: "CFGS Administración de Sistemas Informáticos en Red (ASIR)",
    subtitle: "IOC - Institut Obert de Catalunya",
    description:
      "Administración de sistemas Linux y Windows Server, configuración de servicios de red (Apache, Nginx, DNS, DHCP, SFTP, FTPS), virtualización y contenedores con Docker y Docker Compose, scripts de automatización en Bash, bases de datos con PL/pgSQL, diseño de redes (OSPF, EIGRP, VLANs, NAT) y gestión de seguridad informática (certificados digitales, cifrado, PKI).",
    date: "junio 2023",
  },
];

export const dataCounter = [
  {
    id: 0,
    endCounter: 3,
    text: "Títulos técnicos",
    lineRight: true,
    lineRightMobile: true,
  },
  {
    id: 1,
    endCounter: 8,
    text: "Proyectos portfolio",
    lineRight: true,
    lineRightMobile: false,
  },
  {
    id: 2,
    endCounter: 25,
    text: "Años experiencia profesional",
    lineRight: true,
    lineRightMobile: true,
  },
  {
    id: 3,
    endCounter: 6,
    text: "Tecnologías dominadas",
    lineRight: false,
    lineRightMobile: false,
  },
];

export const serviceData = [
  {
    icon: <Pencil />,
    title: "Diseño web",
    description:
      "Diseño creativo y profesional de interfaces web intuitivas y atractivas, centradas en la experiencia del usuario",
  },
  {
    icon: <Smartphone />,
    title: "Desarrollo Móvil",
    description:
      "Aplicaciones nativas y híbridas para iOS y Android con Kotlin y Flutter",
  },
  {
    icon: <Database />,
    title: "Base de Datos",
    description:
      "Diseño y optimización de bases de datos relacionales y NoSQL para máximo rendimiento",
  },
  {
    icon: <Computer />,
    title: "Desarrollo APPs",
    description:
      "Diseño y desarrollo de aplicaciones multiplataforma a medida, adaptados a tus necesidades",
  },
  {
    icon: <Server />,
    title: "Backend",
    description:
      "Construcción de APIs seguras, integración de bases de datos y lógica de negocio optimizada para el rendimiento",
  },
  {
    icon: <Shield />,
    title: "DevOps & Deploy",
    description:
      "Configuración de CI/CD, despliegue en cloud y monitoreo de aplicaciones en producción",
  },
];

export const dataPortfolio = [
  {
    id: 1,
    title: "Abasta - Spring Boot - React - SCSS - JWT - Bootstrap - TypeScript",
    image: "/image-1.png",
    urlGithub: "https://github.com/abastaplatform/abasta",
    urlDemo: "https://deveps.ddns.net/abasta/",
  },
  {
    id: 2,
    title: "Facialy - Django - React - Docker - GitHub Actions",
    image: "/image-2.png",
    urlGithub: "https://github.com/devepsdev/facialy",
    urlDemo: "https://deveps.ddns.net/facialy/",
  },
  {
    id: 3,
    title: "Gafasfy - Spring Boot - React - Tailwind CSS - MySQL - MapStruct",
    image: "/image-3.jpg",
    urlGithub: "https://github.com/devepsdev/gafasfy",
    urlDemo: "https://deveps.ddns.net/gafasviajeras/",
  },
  {
    id: 4,
    title: "Landing Page - Next.js - Lucide - Framer Motion - Particles.js",
    image: "/image-4.jpg",
    urlGithub: "https://github.com/devepsdev/landing-page",
    urlDemo: "https://deveps.ddns.net",
  },
  {
    id: 5,
    title: "Moviesfy - Angular - Node.js - Express - MongoDB",
    image: "/image-5.png",
    urlGithub: "https://github.com/devepsdev/moviesfy",
    urlDemo: "https://deveps.ddns.net/movies/",
  },
  {
    id: 6,
    title: "Reserva - Next.js - Tailwind CSS - Prisma - PostgreSQL - JWT",
    image: "/image-6.png",
    urlGithub: "https://github.com/devepsdev/reserva",
    urlDemo: "https://reserva-deveps.vercel.app/",
  },
  {
    id: 7,
    title: "Portafolio - PDO - PHP - MySQL - HTML5 - CSS3 - JavaScript",
    image: "/image-7.jpg",
    urlGithub: "https://github.com/devepsdev/portfolio",
    urlDemo: "https://deveps.ddns.net/portafolio/",
  },
  {
    id: 8,
    title: "Taskify -Django - Next.js - Tailwind CSS - SQLite3 - Python",
    image: "/image-8.jpg",
    urlGithub: "https://github.com/devepsdev/taskify",
    urlDemo: "https://deveps.ddns.net/tasks/",
  },
];

export const dataTestimonials = [
  {
    id: 1,
    name: "George Snow",
    description:
      "¡Increíble plataforma! Los testimonios aquí son genuinos y me han ayudado a tomar decisiones informadas. ¡Altamente recomendado!",
    imageUrl: "/profile1.png",
  },
  {
    id: 2,
    name: "María García",
    description:
      "Me encanta la variedad de testimonios disponibles en esta página. Es inspirador ver cómo otras personas han superado desafíos similares a los míos. ¡Gracias por esta invaluable fuente de motivación!",
    imageUrl: "/profile2.png",
  },
  {
    id: 3,
    name: "Juan Pérez",
    description:
      "Excelente recurso para obtener opiniones auténticas sobre diferentes productos y servicios. Me ha ayudado mucho en mis compras en línea. ¡Bravo por este sitio!",
    imageUrl: "/profile3.png",
  },
  {
    id: 4,
    name: "Laura Snow",
    description:
      "¡Qué descubrimiento tan fantástico! Los testimonios aquí son honestos y detallados. Me siento más seguro al tomar decisiones después de leer las experiencias compartidas por otros usuarios.",
    imageUrl: "/profile4.png",
  },
  {
    id: 5,
    name: "Carla Sánchez",
    description:
      "Una joya en la web. Los testimonios son fáciles de encontrar y están bien organizados. ¡Definitivamente mi destino número uno cuando necesito referencias confiables!",
    imageUrl: "/profile5.png",
  },
  {
    id: 6,
    name: "Antonio Martínez",
    description:
      "¡Fantástico recurso para aquellos que buscan validación antes de tomar decisiones importantes! Los testimonios aquí son veraces y realmente útiles. ¡Gracias por simplificar mi proceso de toma de decisiones!",
    imageUrl: "/profile6.png",
  },
];
