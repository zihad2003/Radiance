import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    Environment,
    Float,
    MeshTransmissionMaterial,
    Text3D,
    Center,
    useTexture,
    Sparkles,
    Stars,
    PerspectiveCamera
} from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Sparkles as SparklesIcon, ArrowRight } from 'lucide-react';

/**
 * Holographic Beauty Product Component
 */
const BeautyProduct = ({ position, type, onClick, isSelected }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            // Orbit animation
            const time = state.clock.getElapsedTime();
            meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;

            // Rotate
            meshRef.current.rotation.y += 0.01;

            // Hover effect
            if (hovered) {
                meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
            } else {
                meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
            }
        }
    });

    const getProductGeometry = () => {
        switch (type) {
            case 'lipstick':
                return (
                    <group>
                        <mesh>
                            <cylinderGeometry args={[0.15, 0.15, 1, 32]} />
                            <meshStandardMaterial
                                color="#ff69b4"
                                metalness={0.9}
                                roughness={0.1}
                                emissive="#ff1493"
                                emissiveIntensity={0.5}
                            />
                        </mesh>
                        <mesh position={[0, 0.6, 0]}>
                            <cylinderGeometry args={[0.1, 0.1, 0.4, 32]} />
                            <meshStandardMaterial color="#dc143c" metalness={0.8} roughness={0.2} />
                        </mesh>
                    </group>
                );
            case 'compact':
                return (
                    <mesh>
                        <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
                        <MeshTransmissionMaterial
                            backside
                            samples={16}
                            thickness={0.5}
                            chromaticAberration={0.5}
                            anisotropy={1}
                            distortion={0.3}
                            distortionScale={0.2}
                            temporalDistortion={0.1}
                            color="#ffd700"
                        />
                    </mesh>
                );
            case 'perfume':
                return (
                    <group>
                        <mesh>
                            <cylinderGeometry args={[0.2, 0.25, 0.8, 6]} />
                            <MeshTransmissionMaterial
                                backside
                                samples={16}
                                thickness={0.3}
                                chromaticAberration={0.3}
                                anisotropy={0.5}
                                color="#e6e6fa"
                                transmission={1}
                                roughness={0}
                            />
                        </mesh>
                        <mesh position={[0, 0.5, 0]}>
                            <cylinderGeometry args={[0.15, 0.15, 0.3, 32]} />
                            <meshStandardMaterial color="#ffd700" metalness={1} roughness={0.1} />
                        </mesh>
                    </group>
                );
            case 'brush':
                return (
                    <group>
                        <mesh rotation={[0, 0, Math.PI / 4]}>
                            <cylinderGeometry args={[0.05, 0.05, 1.2, 16]} />
                            <meshStandardMaterial color="#8b4513" metalness={0.3} roughness={0.7} />
                        </mesh>
                        <mesh position={[0.6, 0.6, 0]} rotation={[0, 0, Math.PI / 4]}>
                            <coneGeometry args={[0.15, 0.4, 32]} />
                            <meshStandardMaterial color="#dda0dd" metalness={0.2} roughness={0.8} />
                        </mesh>
                    </group>
                );
            case 'palette':
                return (
                    <mesh rotation={[Math.PI / 6, 0, 0]}>
                        <boxGeometry args={[0.8, 0.1, 0.6]} />
                        <meshStandardMaterial
                            color="#4a4a4a"
                            metalness={0.8}
                            roughness={0.2}
                            emissive="#ff69b4"
                            emissiveIntensity={0.3}
                        />
                    </mesh>
                );
            case 'nailpolish':
                return (
                    <group>
                        <mesh>
                            <cylinderGeometry args={[0.15, 0.2, 0.6, 32]} />
                            <meshStandardMaterial
                                color="#ff1493"
                                metalness={0.9}
                                roughness={0.05}
                                clearcoat={1}
                                clearcoatRoughness={0}
                            />
                        </mesh>
                        <mesh position={[0, 0.4, 0]}>
                            <cylinderGeometry args={[0.08, 0.08, 0.3, 32]} />
                            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
                        </mesh>
                    </group>
                );
            default:
                return <boxGeometry args={[0.5, 0.5, 0.5]} />;
        }
    };

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group
                ref={meshRef}
                position={position}
                onClick={onClick}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                {getProductGeometry()}

                {/* Glow effect */}
                <pointLight
                    color="#ff69b4"
                    intensity={hovered ? 2 : 1}
                    distance={2}
                />

                {/* Orbit ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.6, 0.02, 16, 100]} />
                    <meshBasicMaterial
                        color="#ff69b4"
                        transparent
                        opacity={hovered ? 0.5 : 0.2}
                    />
                </mesh>
            </group>
        </Float>
    );
};

/**
 * Holographic Platform
 */
const HolographicPlatform = () => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    return (
        <group ref={meshRef} position={[0, -2, 0]}>
            {/* Glass platform */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[4, 64]} />
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    thickness={0.2}
                    chromaticAberration={0.5}
                    anisotropy={1}
                    distortion={0.1}
                    color="#ff69b4"
                    transmission={0.9}
                />
            </mesh>

            {/* Grid floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[8, 8, 20, 20]} />
                <meshBasicMaterial
                    color="#ff1493"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Neon lights from below */}
            <pointLight position={[0, -1, 0]} color="#ff69b4" intensity={3} distance={5} />
            <pointLight position={[2, -1, 2]} color="#9370db" intensity={2} distance={4} />
            <pointLight position={[-2, -1, -2]} color="#ff1493" intensity={2} distance={4} />
        </group>
    );
};

/**
 * 3D Text Logo
 */
const Logo3D = () => {
    return (
        <Center position={[0, 2, -3]}>
            <Text3D
                font="/fonts/helvetiker_bold.typeface.json"
                size={0.8}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                RADIANCE
                <meshStandardMaterial
                    color="#ffd700"
                    metalness={1}
                    roughness={0.1}
                    emissive="#ff69b4"
                    emissiveIntensity={0.5}
                />
            </Text3D>
        </Center>
    );
};

/**
 * Animated Background Elements
 */
const BackgroundElements = () => {
    return (
        <>
            {/* Stars */}
            <Stars
                radius={50}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />

            {/* Sparkles */}
            <Sparkles
                count={100}
                scale={10}
                size={2}
                speed={0.4}
                color="#ff69b4"
            />

            {/* Floating geometric shapes */}
            <Float speed={1} rotationIntensity={1} floatIntensity={0.5}>
                <mesh position={[-4, 1, -5]}>
                    <octahedronGeometry args={[0.5]} />
                    <meshBasicMaterial color="#ff69b4" wireframe />
                </mesh>
            </Float>

            <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
                <mesh position={[4, -1, -6]}>
                    <tetrahedronGeometry args={[0.6]} />
                    <meshBasicMaterial color="#9370db" wireframe />
                </mesh>
            </Float>

            <Float speed={0.8} rotationIntensity={1} floatIntensity={0.5}>
                <mesh position={[0, 3, -7]}>
                    <boxGeometry args={[0.4, 0.4, 0.4]} />
                    <meshBasicMaterial color="#ff1493" wireframe />
                </mesh>
            </Float>
        </>
    );
};

/**
 * Main 3D Scene
 */
const Scene3D = ({ onProductClick, selectedProduct }) => {
    const products = useMemo(() => [
        { type: 'lipstick', position: [2, 0, 0] },
        { type: 'compact', position: [1, 0, 2] },
        { type: 'perfume', position: [-1, 0, 2] },
        { type: 'brush', position: [-2, 0, 0] },
        { type: 'palette', position: [-1, 0, -2] },
        { type: 'nailpolish', position: [1, 0, -2] },
    ], []);

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" />
            <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#ff69b4" />

            {/* Products */}
            {products.map((product, index) => (
                <BeautyProduct
                    key={index}
                    position={product.position}
                    type={product.type}
                    onClick={() => onProductClick(product.type)}
                    isSelected={selectedProduct === product.type}
                />
            ))}

            {/* Platform */}
            <HolographicPlatform />

            {/* 3D Logo */}
            <Logo3D />

            {/* Background */}
            <BackgroundElements />

            {/* Environment */}
            <Environment preset="night" />

            {/* Controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
            />

            {/* Post-processing effects */}
            <EffectComposer>
                <Bloom
                    intensity={1.5}
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.9}
                />
                <DepthOfField
                    focusDistance={0.01}
                    focalLength={0.2}
                    bokehScale={3}
                />
                <Vignette eskil={false} offset={0.1} darkness={0.5} />
            </EffectComposer>
        </>
    );
};

/**
 * Futuristic 3D Hero Banner Component
 */
const Hero3D = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (productType) => {
        setSelectedProduct(productType);
        console.log('Product clicked:', productType);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-black">
            {/* 3D Canvas */}
            <Canvas
                className="absolute inset-0"
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <Scene3D
                    onProductClick={handleProductClick}
                    selectedProduct={selectedProduct}
                />
            </Canvas>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-center px-4"
                >
                    <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 mb-4 font-serif">
                        RADIANCE
                    </h1>
                    <p className="text-xl md:text-3xl text-white/90 mb-8 font-light tracking-wide">
                        AI-Powered Beauty Revolution
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white font-semibold overflow-hidden transition-all hover:bg-white/20"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <SparklesIcon size={20} />
                                Experience AI Makeup
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl text-white font-semibold overflow-hidden transition-all hover:shadow-2xl hover:shadow-pink-500/50"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Book Your Transformation
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.button>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-white/60 text-sm flex flex-col items-center gap-2"
                    >
                        <span>Scroll to Explore</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>

            {/* Product Info Popup */}
            {selectedProduct && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md pointer-events-auto"
                >
                    <button
                        onClick={() => setSelectedProduct(null)}
                        className="absolute top-4 right-4 text-white/60 hover:text-white"
                    >
                        ✕
                    </button>
                    <h3 className="text-2xl font-bold text-white mb-2 capitalize">
                        {selectedProduct}
                    </h3>
                    <p className="text-white/80 mb-4">
                        Discover our premium {selectedProduct} collection with AI-powered recommendations.
                    </p>
                    <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow">
                        Explore Collection
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default Hero3D;
