"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";

// Red de nodos (lila con algunos naranjas) unidos por líneas finas, que gira despacio
// y se inclina hacia el ratón. Se genera siempre igual (semilla fija).
const NODOS = 140;
const DISTANCIA_LINEA = 1.25;

function crearRed() {
  let semilla = 7;
  const azar = () => (semilla = (semilla * 16807) % 2147483647) / 2147483647;

  const puntos: [number, number, number][] = [];
  for (let i = 0; i < NODOS; i++) {
    const u = azar() * 2 - 1;
    const angulo = azar() * Math.PI * 2;
    const radio = 2.6 + azar() * 1.2;
    const k = Math.sqrt(1 - u * u);
    puntos.push([radio * k * Math.cos(angulo), radio * u, radio * k * Math.sin(angulo)]);
  }

  const posiciones = new Float32Array(puntos.flat());
  const colores = new Float32Array(NODOS * 3);
  puntos.forEach((_, i) => {
    const naranja = azar() < 0.15;
    colores.set(naranja ? [0.96, 0.45, 0.11] : [0.48, 0.38, 1], i * 3);
  });

  const lineas: number[] = [];
  for (let i = 0; i < NODOS; i++) {
    for (let j = i + 1; j < NODOS; j++) {
      const [a, b, c] = puntos[i];
      const [x, y, z] = puntos[j];
      if (Math.hypot(a - x, b - y, c - z) < DISTANCIA_LINEA) lineas.push(a, b, c, x, y, z);
    }
  }

  return { posiciones, colores, lineas: new Float32Array(lineas) };
}

function Red() {
  const grupo = useRef<Group>(null);
  const raton = useRef({ x: 0, y: 0 });
  const { posiciones, colores, lineas } = useMemo(crearRed, []);

  // El lienzo no recibe eventos (está detrás del contenido): el ratón se lee de la ventana
  useEffect(() => {
    const mover = (e: PointerEvent) => {
      raton.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      raton.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", mover, { passive: true });
    return () => window.removeEventListener("pointermove", mover);
  }, []);

  useFrame((_, delta) => {
    const g = grupo.current;
    if (!g) return;
    g.rotation.y += delta * 0.05;
    g.rotation.x += (raton.current.y * 0.3 - g.rotation.x) * 0.03;
    g.rotation.z += (-raton.current.x * 0.12 - g.rotation.z) * 0.03;
  });

  return (
    <group ref={grupo}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[posiciones, 3]} />
          <bufferAttribute attach="attributes-color" args={[colores, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.07} vertexColors transparent opacity={0.95} sizeAttenuation depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lineas, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#7b61ff" transparent opacity={0.22} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function Escena3D({ activa }: { activa: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.5], fov: 50 }}
      frameloop={activa ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <Red />
    </Canvas>
  );
}
