import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    Environment,
    PerspectiveCamera,
    Float,
    Sparkles,
    Lightformer,
    MeshReflectorMaterial
} from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

// Import all beauty products
import {
    LipstickClassicGold,
    LipstickRoseGold,
    LipstickBlackDesigner,
    LipstickJeweled,
    CompactVintageRound,
    CompactModernSquare,
    CompactCushion,
    PerfumeCrystalCut,
    PerfumeMinimalist
} from './BeautyItems';

import {
    BrushPowder,
    BrushEyeshadow,
    BrushKabuki,
    NailPolishClassic,
    NailPolishGel,
    EyeshadowPalette,
    Mascara,
    SkincareJar,
    Pearl
} from './BeautyItemsExtended';

// Particle System - Floating Glitter
const FloatingParticles = () => {
    return (
        <>
            <Sparkles
                count={100}
                scale={15}
                size={3}
                speed={0.3}
                opacity={0.6}
                color="#FFD700"
            />
            <Sparkles
                count={80}
                scale={12}
                size={2.5}
                speed={0.4}
                opacity={0.5}
                color="#FFB6C1"
            />
            <Sparkles
                count={60}
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
                resolution={1024}
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
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
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

// Product Composition - Elegant 3D Layout
const ProductComposition = ({ mousePosition }) => {
    const groupRef = useRef();

    useFrame((state) => {
        const scrollY = window.scrollY;
        if (groupRef.current) {
            // Scroll-linked rotation
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                (mousePosition ? mousePosition.x * 0.1 : 0) + scrollY * 0.001,
                0.05
            );
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                (mousePosition ? -mousePosition.y * 0.05 : 0) + scrollY * 0.0005,
                0.05
            );

            // Subtle floating scale effect based on scroll
            const scale = 1 + Math.sin(scrollY * 0.002) * 0.05;
            groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, scale, 0.05));
        }
    });

    return (
        <group ref={groupRef}>
            {/* CENTER - Hero Product (Main Lipstick) */}
            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
                <LipstickClassicGold position={[0, 0, 0]} scale={1.5} />
            </Float>

            {/* ORBIT 1 - Primary Products (3 units radius) */}
            <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
                <CompactVintageRound position={[3, 0.5, 0]} rotation={[0, Math.PI / 4, 0]} />
            </Float>

            <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.45}>
                <PerfumeCrystalCut position={[-2.5, -0.3, 2]} scale={0.9} />
            </Float>

            <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.5}>
                <EyeshadowPalette position={[0, -0.8, 3.5]} scale={0.8} />
            </Float>

            {/* ORBIT 2 - Secondary Products (5 units radius) */}
            <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.35}>
                <LipstickRoseGold position={[4.5, 1, -2]} scale={1.2} />
            </Float>

            <Float speed={1.0} rotationIntensity={0.15} floatIntensity={0.3}>
                <BrushPowder position={[-4, 0.5, -1.5]} rotation={[0, Math.PI / 3, Math.PI / 6]} scale={1.1} />
            </Float>

            <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
                <NailPolishClassic position={[2, -1, -4.5]} scale={0.9} />
            </Float>

            <Float speed={1.15} rotationIntensity={0.2} floatIntensity={0.38}>
                <Mascara position={[-3.5, -0.5, 3.5]} scale={0.85} />
            </Float>

            {/* ORBIT 3 - Background Products (7 units radius) */}
            <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.3}>
                <SkincareJar position={[6, 0, 3]} scale={0.8} />
            </Float>

            <Float speed={0.95} rotationIntensity={0.18} floatIntensity={0.32}>
                <LipstickBlackDesigner position={[-5.5, 0.8, -4]} scale={1.0} />
            </Float>

            <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.35}>
                <CompactModernSquare position={[5.5, -0.5, -3.5]} scale={0.75} />
            </Float>

            <Float speed={0.85} rotationIntensity={0.12} floatIntensity={0.28}>
                <BrushEyeshadow position={[-6, -0.3, 2]} rotation={[0, -Math.PI / 4, Math.PI / 8]} scale={0.9} />
            </Float>

            {/* ACCENT PRODUCTS - Additional variety */}
            <Float speed={1.05} rotationIntensity={0.22} floatIntensity={0.36}>
                <LipstickJeweled position={[3.5, 1.5, 4]} scale={1.0} />
            </Float>

            <Float speed={0.95} rotationIntensity={0.18} floatIntensity={0.33}>
                <PerfumeMinimalist position={[-4.5, 1, 4.5]} scale={0.85} />
            </Float>

            <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.37}>
                <CompactCushion position={[6.5, -1, -1]} scale={0.7} />
            </Float>

            <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.3}>
                <BrushKabuki position={[-5, 1.2, -2.5]} rotation={[0, Math.PI / 2, Math.PI / 6]} scale={0.95} />
            </Float>

            <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.35}>
                <NailPolishGel position={[4, -1.5, 2.5]} scale={0.85} />
            </Float>

            {/* DECORATIVE PEARLS */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
                <Pearl position={[-7, 2, 0]} scale={0.4} />
            </Float>

            <Float speed={1.8} rotationIntensity={0.45} floatIntensity={0.75}>
                <Pearl position={[7, -1, 1]} scale={0.35} />
            </Float>

            <Float speed={2.2} rotationIntensity={0.55} floatIntensity={0.85}>
                <Pearl position={[0, 3, -6]} scale={0.3} />
            </Float>
        </group>
    );
};

// Main Scene Component
const BeautyScene = () => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        setMousePosition({
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1
        });
    };

    React.useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="w-full h-screen relative">
            <Canvas
                shadows
                dpr={[1, 2]}
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

                    {/* Products */}
                    <ProductComposition mousePosition={mousePosition} />

                    {/* Particles */}
                    <FloatingParticles />

                    {/* Reflective Floor */}
                    <ReflectiveFloor />

                    {/* Post-Processing Effects */}
                    <EffectComposer>
                        <Bloom
                            intensity={0.5}
                            luminanceThreshold={0.9}
                            luminanceSmoothing={0.9}
                            height={300}
                        />
                        <DepthOfField
                            focusDistance={0.01}
                            focalLength={0.2}
                            bokehScale={3}
                            height={480}
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
                8K Quality • {Object.keys(ProductComposition).length}+ Products
            </div>
        </div>
    );
};

export default BeautyScene;
