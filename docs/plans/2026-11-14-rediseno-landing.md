# Rediseño de la landing (portfolio.deveps.dev) — plan

> Se ejecuta en esta conversación, tarea a tarea, explicando lo que no sea obvio. Los pasos usan casillas (`- [ ]`).

**Objetivo:** que la landing sirva para que una empresa contrate a Enrique: más actual, con su foto en lugar de los
muñecos, paralaje, animaciones al hacer scroll y un único elemento 3D, sin perder velocidad.

**Arquitectura:** se mantiene Next.js 15 con exportación estática y las rutas actuales (`/`, `/about-me/`,
`/services/`, `/portfolio/`, `/contact/`, `/server/`, legales). La portada pasa a ser una página larga con
secciones (resumen de todo); las demás páginas quedan como detalle. Animaciones con framer-motion (ya instalado);
3D con three.js + React Three Fiber, cargado aparte y solo en la portada.

**Tecnologías:** Next.js 15, React 18, Tailwind 3, framer-motion 11, `three` + `@react-three/fiber@8`
(la 8 es la compatible con React 18). Se quita tsparticles.

**Spec:** decisiones tomadas con Enrique el 2026-11-14 (en la conversación):
- Público: empresas que le contraten. Foto propia (traje, sin fondo: `public/yo/`), sin muñecos.
- Colores: se mantienen lila, blanco y naranja (`#f5741c`), con fondo más neutro, lila solo en luces y
  degradados suaves, naranja solo para botones, enlaces y cifras.
- Datos: trayectoria y contadores ya corregidos en `data.tsx` (commit `37de94e`). No inventar datos.

## Restricciones globales

- Textos en castellano, sin inventar empresas, fechas ni cifras. `lang="es"`.
- Respetar `prefers-reduced-motion`: sin paralaje, sin 3D y sin animaciones de entrada si está activado.
- Móvil: sin scroll horizontal a 375 px; el 3D no se carga en móvil (se ve un fondo estático).
- Peso: el 3D se carga después de pintar la portada (import dinámico, `ssr: false`); la foto es la imagen
  principal (`priority`). La portada no debe pasar de ~400 KB de JS comprimido.
- El contenido debe estar en el HTML exportado (las animaciones solo cambian cómo aparece, no si aparece).
- No tocar `contacto.php` ni las rutas `/api/*` que usa la página Servidor.

## Puntos a vigilar (no los cubre ninguna prueba automática)

1. Usuario con «reducir movimiento»: todo visible y quieto (se comprueba emulándolo en el navegador).
2. Navegador sin WebGL o con poca potencia: la portada debe verse igual de bien sin el 3D.
3. Animaciones de entrada que dejan contenido invisible si no llega a dispararse (pestaña en segundo plano,
   capturas): el contenido no puede depender de `requestAnimationFrame` para verse.
4. Foco del teclado visible en menú, botones y tarjetas sobre el fondo oscuro.
5. Contraste del texto gris sobre el fondo nuevo (mínimo 4,5:1).

---

### Tarea 1: Base visual y limpieza

**Archivos:**
- Modificar: `tailwind.config.ts` (colores: `darkBg` más neutro, `lila` para luces, se mantiene `secondary`)
- Modificar: `app/layout.tsx` (`lang="es"`, título «Enrique Pérez · Desarrollador Full Stack», descripción)
- Crear: `hooks/use-movimiento.ts` → `useMovimientoReducido(): boolean` (envuelve `useReducedMotion` de framer-motion)
- Borrar: `components/avatar*.tsx`, `components/circle-image.tsx`, `components/cover-particles.tsx`,
  `public/avatar-1.png`, `public/avatar-works.png`, `public/services.png`, `public/circles.png`, `public/home-4.png`
- Modificar: las páginas que los usan (`about-me`, `contact`, `portfolio`, `services`, `app/page.tsx`)
- `package.json`: quitar `tsparticles` y `@tsparticles/react`

- [x] Hacer los cambios
- [x] Verificar: `npx tsc --noEmit` y `npm run lint` sin errores; `grep -r "avatar-\|circles.png\|tsparticles" app components` vacío
- [x] Commit «Rediseño: base visual, sin muñecos ni partículas»

### Tarea 2: Portada — cabecera con foto, paralaje y 3D

**Archivos:**
- Crear: `components/inicio/cabecera.tsx` (foto `enrique-busto.webp`, nombre, puesto, frase, botones «Ver proyectos» y «Contactar»)
- Crear: `components/inicio/escena-3d.tsx` (red de nodos y líneas en lila y naranja que gira despacio y sigue al ratón)
- Modificar: `app/page.tsx`

- Paralaje: la foto, el brillo naranja de detrás y el fondo se mueven a distinta velocidad con el ratón y al hacer scroll (`useScroll`, `useTransform`).
- El 3D: `dynamic(() => import(...), { ssr: false })`, solo si hay WebGL, no es móvil y no hay «reducir movimiento».
- [x] Hacer los cambios
- [x] Verificar en el navegador a 1440 px y 375 px; emular «reducir movimiento»; medir el JS de la portada en el build
- [x] Commit «Rediseño: portada con foto, paralaje y escena 3D»

### Tarea 3: Portada — secciones al hacer scroll

**Archivos:**
- Crear: `components/inicio/seccion.tsx` → `<Seccion titulo resaltado>` con entrada animada
- Crear: `components/inicio/proyectos-destacados.tsx` (reutiliza `PortfolioBox`), `trayectoria-resumen.tsx`,
  `tecnologias.tsx` (usa `dataTecnologias`), `llamada-contacto.tsx`
- Modificar: `app/page.tsx`

- [x] Hacer los cambios
- [x] Verificar que todo el texto está en `out/index.html` y que se ve con «reducir movimiento»
- [x] Commit «Rediseño: secciones de la portada»

### Tarea 4: Sobre mí

**Archivos:**
- Modificar: `components/time-line.tsx` (dos columnas: Experiencia y Formación, según `tipo`; `subtitle` y `description` opcionales)
- Modificar: `components/counter-services.tsx` (el contador empieza al verse y muestra la cifra final si no hay animación)
- Modificar: `app/(routes)/about-me/page.tsx` (añadir la sección de tecnologías)

- [x] Hacer los cambios
- [x] Verificar en el navegador: cifras 3 / 4 / 24 / 34 y sin «SIT»
- [x] Commit «Rediseño: Sobre mí»

### Tarea 5: Servicios, Portfolio, Contacto y Servidor con el estilo nuevo

**Archivos:** `app/(routes)/services/page.tsx`, `components/slider-services.tsx`, `app/(routes)/portfolio/page.tsx`,
`app/(routes)/contact/page.tsx`, `app/(routes)/server/page.tsx`, `components/navbar.tsx`, `components/header.tsx`,
`components/transition-page.tsx` (transición más corta y discreta)

- Servicios: depende de la decisión pendiente (ver abajo).
- [x] Hacer los cambios
- [x] Verificar cada página a 1440 y 375 px y con el teclado (foco visible)
- [x] Commit «Rediseño: resto de páginas»

### Tarea 6: Comprobación final

- [x] `npx tsc --noEmit`, `npm run lint`, `npm run build` sin errores
- [x] Recorrer todas las páginas en local (escritorio, móvil, «reducir movimiento»), sin errores en la consola
- [x] Enseñar capturas a Enrique y pedir permiso para desplegar con `./deploy.sh` y para juntar con `main`

## Pendiente de Enrique

- Empresa (opcional) y una frase de qué haces en el trabajo actual y en el reparto.
- Confirmar que las prácticas FCT en Grup Essentia (ene–jun 2025) son reales y su texto es correcto.
- Servicios: «iOS y Flutter» no aparece en ningún proyecto. Propuesta: cambiar la página Servicios por
  «Qué puedo aportar» (perfil para empresas) o quitarla y dejar Tecnologías.
