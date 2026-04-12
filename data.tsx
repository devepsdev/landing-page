import {
  BookText,
  CodeSquare,
  HomeIcon,
  UserRound,
  Linkedin,
  Github,
  Pencil,
  Computer,
  Server,
  Database,
  Shield,
  Smartphone,
  Activity,
} from "lucide-react";

export const socialNetworks = [
  {
    id: 1,
    logo: <Linkedin size={30} strokeWidth={1} />,
    src: "https://www.linkedin.com/in/enrique-perez-sanchez",
  },
  {
    id: 2,
    logo: <Github size={30} strokeWidth={1} />,
    src: "https://github.com/devepsdev",
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
    title: "Server",
    icon: <Activity size={25} color="#fff" strokeWidth={1} />,
    link: "/server",
  },
];

export const dataAboutPage = [
  {
    id: 1,
    title: "Full Stack Developer — Colaboración técnica",
    subtitle: "SIT · Barcelona",
    description:
      "Desarrollo y mantenimiento de aplicaciones web para clientes del sector educativo. Implemento el frontend con Angular y el backend con Spring Boot, diseño APIs REST e integro con MySQL. Uso Git para control de versiones y doy soporte al despliegue con Docker y CI/CD en GitHub Actions.",
    dateStart: "jul 2024",
    dateEnd: "actualidad",
  },
  {
    id: 2,
    title: "Full Stack Developer — Prácticas FCT",
    subtitle: "Grup Essentia",
    description:
      "Desarrollé y mantuve aplicaciones web utilizando tecnologías modernas del stack completo. Implementé funcionalidades frontend con Angular, diseñé interfaces de usuario responsivas y optimicé la experiencia del usuario. Gestioné bases de datos con MySQL, creé APIs con Spring Boot y colaboré en la migración de sistemas legacy a arquitecturas más escalables.",
    dateStart: "ene 2025",
    dateEnd: "jun 2025",
  },
  {
    id: 3,
    title: "CFGS Desarrollo de Aplicaciones Web (DAW)",
    subtitle: "IOC - Institut Obert de Catalunya",
    description:
      "Formación completa en desarrollo web full-stack. Implementé aplicaciones con Spring Boot, Node, React, Angular, Java EE (JSP, Servlets), JavaScript, HTML5/CSS3 y PHP, trabajando con arquitecturas REST, sistemas de autenticación JWT y despliegue en servidores Linux. Proyecto destacado: Abasta (gestión B2B de proveedores).",
    dateStart: "sep 2024",
    dateEnd: "ene 2026",
  },
  {
    id: 4,
    title: "CFGS Desarrollo de Aplicaciones Multiplataforma (DAM)",
    subtitle: "IOC - Institut Obert de Catalunya",
    description:
      "Desarrollé aplicaciones móviles nativas para Android con Java y Kotlin (Jetpack Compose) y aplicaciones de escritorio con JavaFX y .NET. Trabajé con programación concurrente y desarrollo de videojuegos con LibGDX. Implementé arquitecturas MVVM, integración con APIs REST y gestión de bases de datos PostgreSQL y MySQL.",
    dateStart: "sep 2023",
    dateEnd: "ene 2025",
  },
  {
    id: 5,
    title: "CFGS Administración de Sistemas Informáticos en Red (ASIR)",
    subtitle: "IOC - Institut Obert de Catalunya",
    description:
      "Administré sistemas Linux y Windows Server y configuré servicios de red (Apache, Nginx, DNS, DHCP, SFTP, FTPS). Trabajé con virtualización y contenedores mediante Docker y Docker Compose, automaticé tareas con scripts Bash y gestioné bases de datos con PL/pgSQL. Diseñé redes con OSPF, EIGRP, VLANs y NAT, y apliqué seguridad informática con certificados digitales, cifrado y PKI.",
    dateStart: "sep 2020",
    dateEnd: "jun 2023",
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
    title: "Pedidoo - Spring Boot - Angular - IA - JWT - MCP - n8n - Docker",
    image: "/image-1.png",
    urlGithub: "https://github.com/devepsdev/pedidoo",
    urlDemo: "https://pedidoo.deveps.dev",
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
    title: "Notesfy - Spring Boot - Angular - Bootstrap - MySQL - JWT",
    image: "/image-7.png",
    urlGithub: "https://github.com/devepsdev/notesfy",
    urlDemo: "https://deveps.ddns.net/notes",
  },
  {
    id: 8,
    title: "Taskify - Django - Next.js - Tailwind CSS - SQLite3 - Python",
    image: "/image-8.jpg",
    urlGithub: "https://github.com/devepsdev/taskify",
    urlDemo: "https://deveps.ddns.net/tasks/",
  },
];

