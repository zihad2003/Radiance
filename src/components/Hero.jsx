import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const LiquidOrb = () => {
    return (
        <Float floatIntensity={2} rotationIntensity={2} speed={1.5}>
            <Sphere args={[1, 100, 200]} scale={2.4}>
                <MeshDistortMaterial
                    color="#B76E79"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.1}
                    metalness={0.9}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </Sphere>
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
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.6} />
                    <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#FF6B9D" />

                    <LiquidOrb />

                    <Sparkles
                        count={150}
                        scale={15}
                        size={5}
                        speed={0.5}
                        opacity={0.6}
                        color="#D4AF37" // Gold sparkles
                    />
                </Canvas>
            </div>

            {/* Overlay Content */}
            <motion.div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none"
                style={{ y }}
            >
                <div className="pointer-events-auto p-12 glass rounded-2xl max-w-5xl mx-4 shadow-2xl border-white/40">
                    <motion.h1
                        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-6xl md:text-8xl font-serif font-bold mb-6 text-charcoal leading-tight"
                    >
                        Redefining Beauty <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                            in Dhaka.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-xl md:text-2xl text-charcoal/80 mb-10 font-light tracking-wide max-w-2xl mx-auto"
                    >
                        Experience world-class styling, AI-powered consultations, and premium care.
                        Sanctuary for the modern woman.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="px-12 py-5 bg-charcoal text-white rounded-full text-lg font-semibold tracking-widest shadow-xl hover:bg-primary transition-colors duration-300 interactive"
                    >
                        BOOK APPOINTMENT
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
