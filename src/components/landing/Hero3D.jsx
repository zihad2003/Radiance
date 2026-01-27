import { useRef, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    Environment,
    Float,
    MeshTransmissionMaterial,
    Sparkles,
    PerspectiveCamera,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

// --- MATERIALS ---
const GoldMaterial = () => (
    <meshStandardMaterial
        color="#F5E6C8"
        roughness={0.15}
        metalness={1}
        envMapIntensity={2}
    />
);

const GlassMaterial = ({ color = "white", transmission = 1, thickness = 0.5, roughness = 0 }) => (
    <MeshTransmissionMaterial
        backside
        samples={16}
        thickness={thickness}
        chromaticAberration={0.2}
        anisotropy={0.5}
        distortion={0.2}
        distortionScale={0.2}
        temporalDistortion={0.1}
        color={color}
        transmission={transmission}
        roughness={roughness}
        clearcoat={1}
    />
);

/**
 * Premium Beauty Product Component
 */
const BeautyProduct = ({ position, type, onClick, isSelected }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;

            const targetScale = hovered || isSelected ? 1.1 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
        }
    });

    const renderProduct = () => {
        switch (type) {
            case 'perfume':
                return (
                    <group>
                        <mesh position={[0, 0, 0]} castShadow receiveShadow>
                            <boxGeometry args={[0.8, 1.2, 0.4]} />
                            <GlassMaterial color="#ffbdc6" thickness={1.2} />
                        </mesh>
                        <mesh position={[0, -0.1, 0]}>
                            <boxGeometry args={[0.7, 0.9, 0.3]} />
                            <meshStandardMaterial color="#Eeb4b4" roughness={0.2} transparent opacity={0.8} />
                        </mesh>
                        <mesh position={[0, 0.7, 0]}>
                            <cylinderGeometry args={[0.15, 0.15, 0.2, 32]} />
                            <GoldMaterial />
                        </mesh>
                        <mesh position={[0, 0.95, 0]}>
                            <sphereGeometry args={[0.25, 32, 32]} />
                            <GlassMaterial color="#ffffff" transmission={0.9} thickness={0.5} />
                        </mesh>
                    </group>
                );
            case 'lipstick':
                return (
                    <group>
                        <mesh position={[0, -0.2, 0]} castShadow>
                            <boxGeometry args={[0.3, 0.6, 0.3]} />
                            <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.5} />
                        </mesh>
                        <mesh position={[0, 0.15, 0]}>
                            <boxGeometry args={[0.31, 0.1, 0.31]} />
                            <GoldMaterial />
                        </mesh>
                        <mesh position={[0, 0.5, 0]} rotation={[0.2, 0, 0]}>
                            <cylinderGeometry args={[0.1, 0.1, 0.6, 32]} />
                            <meshStandardMaterial color="#D61C4E" roughness={0.3} metalness={0.2} />
                        </mesh>
                        <mesh position={[0, 0.8, -0.02]} rotation={[Math.PI / 4, 0, 0]}>
                            <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
                            <meshStandardMaterial color="#D61C4E" roughness={0.3} metalness={0.2} />
                        </mesh>
                    </group>
                );
            case 'serum':
                return (
                    <group>
                        <mesh position={[0, 0, 0]} castShadow>
                            <cylinderGeometry args={[0.35, 0.35, 1, 32]} />
                            <GlassMaterial color="#a7f3d0" thickness={0.2} />
                        </mesh>
                        <mesh position={[0, 0, 0]}>
                            <cylinderGeometry args={[0.32, 0.32, 0.9, 32]} />
                            <meshStandardMaterial color="#D1FAE5" roughness={0.4} />
                        </mesh>
                        <mesh position={[0, 0.6, 0]}>
                            <cylinderGeometry args={[0.1, 0.1, 0.2, 32]} />
                            <GoldMaterial />
                        </mesh>
                        <mesh position={[0, 0.8, 0]}>
                            <capsuleGeometry args={[0.12, 0.3, 4, 8]} />
                            <meshStandardMaterial color="#1f2937" roughness={0.6} />
                        </mesh>
                    </group>
                );
            default:
                return null;
        }
    };

    return (
        <Float
            speed={2}
            rotationIntensity={hovered ? 0.5 : 0.2}
            floatIntensity={hovered ? 0.5 : 0.2}
            floatingRange={[-0.1, 0.1]}
        >
            <group
                ref={meshRef}
                position={position}
                onClick={(e) => { e.stopPropagation(); onClick && onClick(type); }}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
                onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
            >
                {renderProduct()}
            </group>
        </Float>
    );
};

const Scene3D = ({ onProductClick }) => {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 1, 6]} fov={45} />

            {/* --- LIGHTING --- */}
            <spotLight
                position={[5, 5, 5]}
                angle={0.5}
                penumbra={1}
                intensity={2}
                castShadow
                shadow-bias={-0.0001}
                color="#fff5e6"
            />
            <pointLight position={[-5, 2, -2]} intensity={1.5} color="#ffaebc" />
            <pointLight position={[0, 5, -5]} intensity={2} color="#a0c4ff" />

            <Environment preset="city" blur={0.8} background />

            {/* --- OBJECTS --- */}
            <group position={[0, -1.5, 0]}>
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} scale={10}>
                    <planeGeometry />
                    <MeshTransmissionMaterial
                        backside={false}
                        thickness={2}
                        roughness={0.1}
                        transmission={0.9}
                        color="#2a2a2a"
                        distortion={0}
                    />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                    <ringGeometry args={[1.8, 1.85, 64]} />
                    <meshStandardMaterial color="#F5E6C8" metalness={1} roughness={0.1} emissive="#F5E6C8" emissiveIntensity={0.5} />
                </mesh>
            </group>

            <group position={[0, -0.5, 0]}>
                <BeautyProduct type="perfume" position={[0, 0, 0]} onClick={onProductClick} />
                <BeautyProduct type="lipstick" position={[-1.5, -0.2, 0.5]} onClick={onProductClick} />
                <BeautyProduct type="serum" position={[1.5, -0.2, 0.5]} onClick={onProductClick} />
            </group>

            <Sparkles
                count={80}
                scale={8}
                size={2}
                speed={0.2}
                opacity={0.5}
                color="#F5E6C8"
            />

            {/* Post Processing - Refined for clarity */}
            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={1.2} mipmapBlur intensity={0.5} radius={0.4} />
                <Vignette eskil={false} offset={0.1} darkness={0.4} />
            </EffectComposer>

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2.2}
                autoRotate
                autoRotateSpeed={0.5}
            />
        </>
    );
};

const Hero3D = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-screen bg-[#050505] overflow-hidden">
            <Canvas shadows dpr={[1, 1.5]}>
                <Scene3D />
            </Canvas>

            {/* Luxury Overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-center"
                >
                    <p className="text-[#F5E6C8] text-sm md:text-base font-sans tracking-[0.4em] uppercase mb-4 opacity-80">
                        Est. 2024 • Dhaka
                    </p>
                    <h1 className="text-6xl md:text-9xl font-serif text-white mb-6 tracking-tight leading-none drop-shadow-2xl">
                        RADIANCE
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl font-light tracking-wide max-w-lg mx-auto mb-10">
                        Where artificial intelligence meets <span className="text-[#F5E6C8] italic">timeless elegance</span>.
                    </p>

                    <div className="flex gap-6 justify-center pointer-events-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/shop')}
                            className="bg-[#F5E6C8] text-black px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white transition-colors"
                        >
                            Explore Collection
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/virtual-try-on')}
                            className="px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase text-white border border-white/20 hover:bg-white/10 backdrop-blur-md transition-colors flex items-center gap-2"
                        >
                            <Play size={12} fill="currentColor" /> Try AI Studio
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>
    );
};

export default Hero3D;
