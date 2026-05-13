import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AuroraSphere() {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      mesh.current.rotation.x = clock.getElapsedTime() * 0.2;
      mesh.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={mesh} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#4338ca"
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.5}
          roughness={0.2}
          emissive="#818cf8"
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
}

function Particles({ count = 200 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    const { clock } = state;
    ref.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#818cf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function CinematicBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020205] overflow-hidden">
      {/* Aurora Gradients from Theme */}
      <div className="aurora w-[600px] h-[600px] bg-[radial-gradient(circle,#3b82f6,#000)] -top-[200px] -left-[100px]" />
      <div className="aurora w-[600px] h-[600px] bg-[radial-gradient(circle,#8b5cf6,#000)] -bottom-[200px] -right-[100px]" />

      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#818cf8" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4338ca" />
        <AuroraSphere />
        <Particles />
      </Canvas>
    </div>
  );
}
