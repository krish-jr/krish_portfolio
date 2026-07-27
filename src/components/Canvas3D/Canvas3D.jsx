import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import styles from './Canvas3D.module.css';

// Mathematical random sphere points generator
function generateSpherePoints(numPoints, radius) {
  const points = new Float32Array(numPoints * 3);
  for (let i = 0; i < numPoints; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = radius * Math.cbrt(Math.random()); // Even distribution inside sphere
    
    points[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    points[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    points[i * 3 + 2] = r * Math.cos(phi);
  }
  return points;
}

function FloatingObjects() {
  const mesh1 = useRef();
  const mesh2 = useRef();
  const mesh3 = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (mesh1.current) {
      mesh1.current.rotation.x = time * 0.08;
      mesh1.current.rotation.y = time * 0.12;
      mesh1.current.position.y = Math.sin(time * 0.4) * 0.2;
    }
    
    if (mesh2.current) {
      mesh2.current.rotation.x = -time * 0.06;
      mesh2.current.rotation.z = time * 0.1;
      mesh2.current.position.y = Math.cos(time * 0.3) * 0.3 - 1.5;
    }

    if (mesh3.current) {
      mesh3.current.rotation.y = -time * 0.12;
      mesh3.current.rotation.z = -time * 0.04;
      mesh3.current.position.y = Math.sin(time * 0.5) * 0.15 + 1.5;
    }
  });

  return (
    <group>
      {/* Central luxury wireframe Icosahedron */}
      <mesh ref={mesh1} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshPhysicalMaterial 
          color="#00F5FF"
          emissive="#7B61FF"
          emissiveIntensity={0.25}
          roughness={0.1}
          metalness={0.95}
          wireframe
        />
      </mesh>
      
      {/* Floating Torus on the left */}
      <mesh ref={mesh2} position={[-3.2, -1.5, -2]}>
        <torusGeometry args={[0.7, 0.18, 16, 80]} />
        <meshPhysicalMaterial 
          color="#7B61FF"
          roughness={0.15}
          metalness={0.9}
          clearcoat={1.0}
          wireframe
        />
      </mesh>

      {/* Floating Octahedron on the right */}
      <mesh ref={mesh3} position={[3.2, 1.5, -2]}>
        <octahedronGeometry args={[0.65, 0]} />
        <meshPhysicalMaterial 
          color="#4ADE80"
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>
    </group>
  );
}

function StarBackground() {
  const ref = useRef();
  const [points] = useState(() => generateSpherePoints(3500, 6.5));

  useFrame((state, delta) => {
    if (ref.current) {
      // Slow constant drift rotation
      ref.current.rotation.x -= delta * 0.02;
      ref.current.rotation.y -= delta * 0.015;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.018}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

function InteractiveGroup() {
  const group = useRef();

  useFrame((state) => {
    const { x, y } = state.pointer;
    if (group.current) {
      // Smooth interpolation/damping for mouse parallax
      group.current.rotation.y += ((x * Math.PI) / 8 - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (-(y * Math.PI) / 8 - group.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <FloatingObjects />
      <StarBackground />
    </group>
  );
}

export default function Canvas3D() {
  return (
    <div className={styles.canvasContainer}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#7B61FF" />
        <pointLight position={[10, -10, 5]} intensity={0.8} color="#00F5FF" />
        
        <Suspense fallback={null}>
          <InteractiveGroup />
        </Suspense>
      </Canvas>
    </div>
  );
}
