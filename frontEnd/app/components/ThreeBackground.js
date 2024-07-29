// components/ThreeBackground.js
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, particles, particleSystem, particleMaterial;

    const init = () => {
      // Scene setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      // Renderer setup
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      mountRef.current.appendChild(renderer.domElement);

      // Particles setup
      const particleCount = 5000; // Reduced particle count
      particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() * 2 - 1) * 10;
        positions[i * 3 + 1] = (Math.random() * 2 - 1) * 10;
        positions[i * 3 + 2] = (Math.random() * 2 - 1) * 10;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      particleMaterial = new THREE.PointsMaterial({
        color: 0x444444, // Subtle gray color
        size: 0.05, // Smaller particle size
        transparent: true,
      });

      particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);

      // Handle window resize
      window.addEventListener("resize", onWindowResize, false);

      // Start animation
      animate();
    };

    const onWindowResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    const animate = () => {
      particleSystem.rotation.y += 0.0005;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    init();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      mountRef?.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} style={{ position: "absolute", width: "100%", maxWidth: "395px", height: "360px",top:0, overflow: "hidden" }}>
    </div>
  );
};

export default ThreeBackground;
