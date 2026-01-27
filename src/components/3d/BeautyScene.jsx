import React, { Suspense, useRef, lazy, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {
    OrbitControls,
    Environment,
    PerspectiveCamera,
    Sparkles,
    Lightformer,
    MeshReflectorMaterial
} from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useInView } from 'framer-motion';

// Lazy load the heavy 3D product composition
const ProductComposition = lazy(() => import('./ProductComposition'));

// Particle System - Floating Glitter
const FloatingParticles = () => {
    return (
        <>
            <Sparkles
                count={30}
                scale={15}
                size={3}
                speed={0.3}
                opacity={0.6}
                color="#FFD700"
            />
            <Sparkles
                count={20}
                scale={12}
                size={2.5}
                speed={0.4}
                opacity={0.5}
                color="#FFB6C1"
            />
            <Sparkles
                count={15}
                scale={10}
                size={2}
                speed={0.5}
                opacity={0.4}
                color="#DDA0DD"
            />
        </>
    );
};

// Reflective Floor
const ReflectiveFloor = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={256} // Reduced 512->256
                mixBlur={1}
                mixStrength={40}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#0a0a0a"
                metalness={0.5}
                mirror={0.3}
            />
        </mesh>
    );
};

// Advanced Lighting Setup
const StudioLighting = () => {
    return (
        <>
            {/* Key Light - Soft white from top-right */}
            <directionalLight
                position={[5, 8, 5]}
                intensity={1.5}
                castShadow
                shadow-mapSize-width={512} // Reduced 1024->512 for mobile performance
                shadow-mapSize-height={512}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-bias={-0.0001}
            />

            {/* Fill Light - Pink ambient from left */}
            <pointLight position={[-5, 3, 3]} intensity={0.8} color="#FFB6C1" />

            {/* Rim Light - Purple backlight for depth */}
            <pointLight position={[0, 4, -5]} intensity={1.2} color="#DDA0DD" />

            {/* Accent Lights */}
            <pointLight position={[3, 2, -3]} intensity={0.5} color="#D4AF37" />
            <pointLight position={[-3, 2, 3]} intensity={0.5} color="#FF69B4" />

            {/* Ambient Light */}
            <ambientLight intensity={0.3} />

            {/* Hemisphere Light for natural feel */}
            <hemisphereLight
                skyColor="#FFE4E1"
                groundColor="#2F4F4F"
                intensity={0.4}
            />
        </>
    );
};

// Main Scene Component
const BeautyScene = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const inView = useInView(containerRef, { once: true, margin: "200px" });

    const handleMouseMove = (event) => {
        setMousePosition({
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1
        });
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="w-full h-screen relative">
            <Canvas
                shadows
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                    outputEncoding: THREE.sRGBEncoding,
                    shadowMapType: THREE.PCFSoftShadowMap
                }}
            >
                <Suspense fallback={null}>
                    {/* Camera */}
                    <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={50} />

                    {/* 8K HDR Environment Map */}
                    <Environment
                        preset="studio"
                        background={false}
                        blur={0.5}
                    >
                        {/* Custom Environment Lighting */}
                        <Lightformer
                            intensity={2}
                            rotation-x={Math.PI / 2}
                            position={[0, 5, -9]}
                            scale={[10, 10, 1]}
                            color="#FFE4E1"
                        />
                        <Lightformer
                            intensity={1.5}
                            rotation-x={-Math.PI / 2}
                            position={[0, -5, -9]}
                            scale={[10, 10, 1]}
                            color="#DDA0DD"
                        />
                    </Environment>

                    {/* Lighting */}
                    <StudioLighting />

                    {/* Products - Lazy Loaded only when in view */}
                    {inView && (
                        <Suspense fallback={null}>
                            <ProductComposition mousePosition={mousePosition} />
                        </Suspense>
                    )}

                    {/* Particles */}
                    <FloatingParticles />

                    {/* Reflective Floor */}
                    <ReflectiveFloor />

                    {/* Post-Processing Effects */}
                    <EffectComposer disableNormalPass>
                        <Bloom
                            intensity={0.5}
                            luminanceThreshold={0.9}
                            luminanceSmoothing={0.9}
                            height={200} // Reduced 300 -> 200
                        />
                        <DepthOfField
                            focusDistance={0.01}
                            focalLength={0.2}
                            bokehScale={3.5}
                            height={240} // Reduced 480 -> 240
                        />
                        <ChromaticAberration
                            offset={[0.0002, 0.0002]}
                        />
                    </EffectComposer>

                    {/* Controls */}
                    <OrbitControls
                        enablePan={false}
                        enableZoom={true}
                        minDistance={8}
                        maxDistance={20}
                        maxPolarAngle={Math.PI / 2}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                </Suspense>
            </Canvas>

            {/* Loading Overlay */}
            <div className="absolute top-4 right-4 text-white/60 text-sm font-mono">
                8K Quality • AI Powered
            </div>
        </div>
    );
};

export default BeautyScene;
