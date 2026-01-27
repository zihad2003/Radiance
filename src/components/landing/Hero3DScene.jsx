import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    Environment,
    Float,
    MeshReflectorMaterial,
    Sparkles,
    PerspectiveCamera,
    useGLTF,
    Center,
    Text3D
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Sparkles as SparklesIcon, ArrowRight, ChevronDown } from 'lucide-react';

/**
 * Lipstick 3D Model
 */
const LipstickModel = ({ position }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={meshRef} position={position}>
                {/* Lipstick case */}
                <mesh>
                    <cylinderGeometry args={[0.15, 0.15, 1.2, 32]} />
                    <meshStandardMaterial
                        color="#ff69b4"
                        metalness={0.9}
                        roughness={0.1}
                        emissive="#ff1493"
                        emissiveIntensity={0.5}
                    />
                </mesh>
                {/* Lipstick tip */}
                <mesh position={[0, 0.7, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.5, 32]} />
                    <meshStandardMaterial
                        color="#dc143c"
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>
                {/* Glow */}
                <pointLight color="#ff69b4" intensity={2} distance={3} />
            </group>
        </Float>
    );
};

/**
 * Compact Mirror 3D Model
 */
const CompactMirror = ({ position }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + 1) * 0.2;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={meshRef} position={position}>
                {/* Mirror base */}
                <mesh rotation={[Math.PI / 4, 0, 0]}>
                    <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
                    <meshStandardMaterial
                        color="#ffd700"
                        metalness={1}
                        roughness={0.1}
                        envMapIntensity={1}
                    />
                </mesh>
                {/* Mirror surface */}
                <mesh position={[0, 0.06, 0]} rotation={[Math.PI / 4, 0, 0]}>
                    <circleGeometry args={[0.45, 32]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        metalness={1}
                        roughness={0}
                        envMapIntensity={2}
                    />
                </mesh>
                <pointLight color="#ffd700" intensity={1.5} distance={2} />
            </group>
        </Float>
    );
};

/**
 * Perfume Bottle 3D Model
 */
const PerfumeBottle = ({ position }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + 2) * 0.2;
        }
    });

    return (
        <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={meshRef} position={position}>
                {/* Bottle body */}
                <mesh>
                    <cylinderGeometry args={[0.25, 0.3, 1, 6]} />
                    <meshPhysicalMaterial
                        color="#e6e6fa"
                        transmission={1}
                        thickness={0.5}
                        roughness={0}
                        metalness={0}
                        clearcoat={1}
                        clearcoatRoughness={0}
                        ior={1.5}
                    />
                </mesh>
                {/* Liquid inside */}
                <mesh scale={[0.9, 0.6, 0.9]}>
                    <cylinderGeometry args={[0.25, 0.3, 1, 6]} />
                    <meshStandardMaterial
                        color="#ff69b4"
                        transparent
                        opacity={0.6}
                    />
                </mesh>
                {/* Cap */}
                <mesh position={[0, 0.6, 0]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.4, 32]} />
                    <meshStandardMaterial
                        color="#ffd700"
                        metalness={1}
                        roughness={0.1}
                    />
                </mesh>
                <pointLight color="#e6e6fa" intensity={1} distance={2} />
            </group>
        </Float>
    );
};

/**
 * Makeup Brush 3D Model
 */
const MakeupBrush = ({ position }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime()) * 0.2;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + 3) * 0.2;
        }
    });

    return (
        <Float speed={2.2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={meshRef} position={position}>
                {/* Handle */}
                <mesh rotation={[0, 0, Math.PI / 4]}>
                    <cylinderGeometry args={[0.05, 0.05, 1.5, 16]} />
                    <meshStandardMaterial
                        color="#8b4513"
                        metalness={0.3}
                        roughness={0.7}
                    />
                </mesh>
                {/* Bristles */}
                <mesh position={[0.8, 0.8, 0]} rotation={[0, 0, Math.PI / 4]}>
                    <coneGeometry args={[0.2, 0.5, 32]} />
                    <meshStandardMaterial
                        color="#dda0dd"
                        metalness={0.2}
                        roughness={0.8}
                    />
                </mesh>
                <pointLight color="#dda0dd" intensity={1} distance={2} />
            </group>
        </Float>
    );
};

/**
 * Eyeshadow Palette 3D Model
 */
const EyeshadowPalette = ({ position }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.6;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + 4) * 0.2;
        }
    });

    return (
        <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={meshRef} position={position}>
                {/* Palette base */}
                <mesh rotation={[Math.PI / 6, 0, 0]}>
                    <boxGeometry args={[1, 0.1, 0.7]} />
                    <meshStandardMaterial
                        color="#2a2a2a"
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>
                {/* Color pans */}
                {[0, 1, 2, 3].map((i) => (
                    <mesh
                        key={i}
                        position={[-0.3 + i * 0.2, 0.06, 0]}
                        rotation={[Math.PI / 6, 0, 0]}
                    >
                        <boxGeometry args={[0.15, 0.02, 0.15]} />
                        <meshStandardMaterial
                            color={['#ff69b4', '#9370db', '#ffd700', '#ff1493'][i]}
                            metalness={0.9}
                            roughness={0.1}
                            emissive={['#ff69b4', '#9370db', '#ffd700', '#ff1493'][i]}
                            emissiveIntensity={0.5}
                        />
                    </mesh>
                ))}
                <pointLight color="#ff69b4" intensity={1.5} distance={2} />
            </group>
        </Float>
    );
};

/**
 * Holographic Grid Floor
 */
const HolographicFloor = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[20, 20, 100, 100]} />
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
                mirror={0.5}
            />
        </mesh>
    );
};

/**
 * Floating Geometric Shapes
 */
const FloatingShapes = () => {
    return (
        <>
            <Float speed={1} rotationIntensity={1} floatIntensity={0.5}>
                <mesh position={[-5, 2, -8]}>
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshBasicMaterial color="#ff69b4" wireframe />
                </mesh>
            </Float>

            <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
                <mesh position={[5, 1, -10]}>
                    <octahedronGeometry args={[0.6]} />
                    <meshBasicMaterial color="#9370db" wireframe />
                </mesh>
            </Float>

            <Float speed={0.8} rotationIntensity={1} floatIntensity={0.5}>
                <mesh position={[0, 4, -12]}>
                    <tetrahedronGeometry args={[0.7]} />
                    <meshBasicMaterial color="#ff1493" wireframe />
                </mesh>
            </Float>

            <Float speed={1.2} rotationIntensity={1} floatIntensity={0.5}>
                <mesh position={[-3, -0.5, -6]}>
                    <torusGeometry args={[0.4, 0.1, 16, 100]} />
                    <meshBasicMaterial color="#ffd700" wireframe />
                </mesh>
            </Float>
        </>
    );
};

/**
 * 3D Scene Component
 */
const Scene3D = () => {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />

            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 3, 0]} intensity={1} color="#FF1493" />
            <pointLight position={[5, 5, 5]} intensity={0.5} color="#9B59B6" />
            <pointLight position={[-5, 2, -5]} intensity={0.5} color="#FF69B4" />

            {/* Spotlight for drama */}
            <spotLight
                position={[0, 10, 0]}
                angle={0.3}
                penumbra={1}
                intensity={2}
                color="#ffffff"
                castShadow
            />

            {/* Environment */}
            <Environment preset="night" />

            {/* Holographic Floor */}
            <HolographicFloor />

            {/* Beauty Products */}
            <Suspense fallback={null}>
                <LipstickModel position={[2, 1, 0]} />
                <CompactMirror position={[-2, 1.5, 1]} />
                <PerfumeBottle position={[0, 2, -2]} />
                <MakeupBrush position={[3, 0.5, -1]} />
                <EyeshadowPalette position={[-3, 1, -1]} />
            </Suspense>

            {/* Floating Shapes */}
            <FloatingShapes />

            {/* Particle Effects */}
            <Sparkles
                count={200}
                scale={15}
                size={2}
                speed={0.4}
                color="#FFD700"
                opacity={0.6}
            />

            {/* Additional sparkles */}
            <Sparkles
                count={100}
                scale={10}
                size={1}
                speed={0.2}
                color="#FF69B4"
                opacity={0.4}
            />

            {/* Controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
                autoRotate
                autoRotateSpeed={0.5}
            />

            {/* Post-processing Effects */}
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.9}
                    intensity={1.5}
                />
                <ChromaticAberration
                    offset={[0.002, 0.002]}
                />
                <DepthOfField
                    focusDistance={0.01}
                    focalLength={0.2}
                    bokehScale={3}
                />
            </EffectComposer>
        </>
    );
};

/**
 * Main Hero 3D Scene Component
 */
export default function Hero3DScene() {
    return (
        <div className="h-screen w-full relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-black">
            {/* 3D Canvas */}
            <Canvas
                shadows
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <Scene3D />
            </Canvas>

            {/* Text Overlays */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-center px-4"
                >
                    {/* Main Title */}
                    <h1 className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-pink-600 mb-6 font-serif animate-gradient bg-[length:200%_auto]">
                        RADIANCE
                    </h1>

                    {/* Tagline */}
                    <p className="text-xl md:text-3xl text-white/90 mb-12 font-light tracking-wide">
                        AI-Powered Beauty Revolution
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center pointer-events-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white hover:bg-white/20 transition-all shadow-lg hover:shadow-pink-500/50"
                        >
                            <span className="flex items-center gap-2">
                                <SparklesIcon size={20} />
                                Experience AI Makeup
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white hover:shadow-2xl hover:shadow-pink-500/50 transition-all font-semibold"
                        >
                            <span className="flex items-center gap-2">
                                Book Transformation
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-white/60"
                >
                    <span className="text-sm">Scroll to Explore</span>
                    <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 16, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-3 bg-white/70 rounded-full"
                        />
                    </div>
                    <ChevronDown size={24} />
                </motion.div>
            </motion.div>

            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />
        </div>
    );
}
