import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

const FloatingLogo = () => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    return (
        <Float floatIntensity={2} rotationIntensity={1}>
            <mesh ref={meshRef}>
                <torusKnotGeometry args={[2.5, 0.8, 120, 20]} />
                <meshPhysicalMaterial
                    color="#B76E79"
                    emissive="#FF6B9D"
                    emissiveIntensity={0.2}
                    roughness={0}
                    metalness={1}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    reflectivity={1}
                    iridescence={1}
                />
            </mesh>
        </Float>
    );
};

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-pearl">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                    <Environment preset="sunset" />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={1} />

                    <FloatingLogo />

                    <Sparkles
                        count={100}
                        scale={12}
                        size={4}
                        speed={0.4}
                        opacity={0.5}
                        color="#FF6B9D"
                    />
                </Canvas>
            </div>

            {/* Overlay Content */}
            <motion.div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none"
                style={{ y }}
            >
                <div className="pointer-events-auto p-12 glass rounded-2xl max-w-4xl mx-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-6xl md:text-8xl font-serif font-bold mb-4 text-charcoal bg-clip-text text-transparent bg-gradient-to-r from-charcoal to-primary"
                    >
                        Transform. Radiate. Shine.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-xl md:text-2xl text-charcoal/80 mb-8 font-light tracking-wide"
                    >
                        Experience the future of beauty in a sanctuary designed for you.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="px-10 py-5 bg-gradient-to-r from-primary to-accent text-white rounded-full text-lg font-semibold tracking-wider shadow-lg hover:shadow-primary/50 interactive"
                    >
                        Explore Services
                    </motion.button>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-6 h-10 border-2 border-charcoal/30 rounded-full flex justify-center p-1"
                >
                    <div className="w-1 h-2 bg-charcoal/50 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
