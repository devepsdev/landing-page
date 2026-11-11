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
    name: "LinkedIn",
    logo: <Linkedin size={30} strokeWidth={1} />,
    src: "https://www.linkedin.com/in/enrique-perez-sanchez",
  },
  {
    id: 2,
    name: "GitHub",
    logo: <Github size={30} strokeWidth={1} />,
    src: "https://github.com/devepsdev",
  },
];

export const itemsNavbar = [
  {
    id: 1,
    title: "Inicio",
    icon: <HomeIcon size={25} color="#fff" strokeWidth={1} />,
    link: "/",
  },
  {
    id: 2,
    title: "Sobre mí",
    icon: <UserRound size={25} color="#fff" strokeWidth={1} />,
    link: "/about-me",
  },
  {
    id: 3,
    title: "Servicios",
    icon: <BookText size={25} color="#fff" strokeWidth={1} />,
    link: "/services",
  },
  {
    id: 4,
    title: "Portfolio",
    icon: <CodeSquare size={25} color="#fff" strokeWidth={1} />,
    link: "/portfolio",
  },
  {
    id: 5,
    title: "Servidor",
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

// Datos sacados de los README de cada repositorio y de Proyectos/CLAUDE.md (noviembre de 2026).
export const dataPortfolio = [
  {
    id: 1,
    name: "PedidAI",
    status: "En producción",
    summary:
      "Compras para bares y restaurantes: compara lo que te cobra cada proveedor y te avisa cuando sube un precio.",
    highlights: [
      "Lee albaranes y facturas desde una foto o un PDF (Tesseract + Mistral AI).",
      "Compara el mismo producto entre proveedores y guarda el historial de precios.",
      "Pedidos por chat: el asistente los prepara con el proveedor más barato.",
    ],
    stack: ["Java 25", "Spring Boot 3.5", "Angular 21", "Tailwind 4", "MySQL", "Mistral AI", "n8n", "Docker"],
    deploy: "VPS propio · nginx y systemd · asistente y n8n en Docker",
    image: "/proyectos/pedidai.jpg",
    urlGithub: "https://github.com/devepsdev/pedidai",
    urlDemo: "https://pedidai.es",
  },
  {
    id: 2,
    name: "Facialy",
    status: "Demo pública",
    summary:
      "Control de acceso con reconocimiento facial en tiempo real, desde el navegador y con la webcam.",
    highlights: [
      "Demo sin registro: la sesión vive en memoria y no se guarda nada.",
      "Kiosco que concede o deniega el acceso según horario y estado, con registro y exportación CSV.",
      "Reconocimiento solo con CPU, con los modelos YuNet y SFace de OpenCV.",
    ],
    stack: ["Django 6", "DRF", "React 19", "Vite 7", "Tailwind 4", "PostgreSQL 16", "OpenCV", "Docker"],
    deploy: "VPS propio · Docker · CI/CD con GitHub Actions",
    image: "/proyectos/facialy.jpg",
    urlGithub: "https://github.com/devepsdev/facialy",
    urlDemo: "https://facialy.deveps.dev",
  },
  {
    id: 3,
    name: "Reserva",
    status: "Demo pública",
    summary:
      "Reservas online para un restaurante de ejemplo, con panel de administración.",
    highlights: [
      "Busca mesas libres por fecha, hora y comensales, sin solapamientos.",
      "Reserva en 4 pasos: buscar, elegir mesa, datos y confirmación.",
      "Panel con estadísticas, filtros y estados de cada reserva.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Prisma 7", "PostgreSQL", "NextAuth"],
    deploy: "Vercel + Prisma Postgres",
    image: "/proyectos/reserva.jpg",
    urlGithub: "https://github.com/devepsdev/reserva",
    urlDemo: "https://reserva-deveps.vercel.app/",
  },
  {
    id: 4,
    name: "Triage",
    status: "Demo pública",
    summary:
      "Un agente de IA investiga averías reales de servidor en directo. Solo lee: el arreglo lo aprueba una persona.",
    highlights: [
      "Herramientas por MCP de solo lectura y entornos en contenedores desechables.",
      "Diagnósticos corregidos por código: 86 de 100 aciertos en la batería publicada.",
      "Ante la inyección de instrucciones en los logs: 0 de 20 veces engañado.",
    ],
    stack: ["Java 25", "Spring Boot 4", "Angular 21", "MCP", "Mistral AI", "MySQL", "Docker"],
    deploy: "VPS propio · 3 servicios systemd aislados · nginx",
    image: "/proyectos/triage.jpg",
    urlGithub: "https://github.com/devepsdev/triage",
    urlDemo: "https://triage.deveps.dev",
  },
];
