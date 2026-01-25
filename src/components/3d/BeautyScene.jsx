import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text3D, Center, Sparkles, GradientTexture, AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import * as THREE from 'three';

const FloatingLipstick = (props) => {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1} {...props}>
            <group>
                {/* Case */}
                <mesh position={[0, -0.5, 0]}>
                    <boxGeometry args={[0.5, 1.5, 0.5]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Gold Rim */}
                <mesh position={[0, 0.3, 0]}>
                    <cylinderGeometry args={[0.26, 0.26, 0.1, 32]} />
                    <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
                </mesh>
                {/* Stick */}
                <mesh position={[0, 0.8, 0]}>
                    <cylinderGeometry args={[0.2, 0.25, 0.8, 32]} />
                    <meshStandardMaterial color="#D60036" roughness={0.3} />
                </mesh>
                {/* Tip */}
                <mesh position={[0, 1.25, 0]} rotation={[Math.PI / 4, 0, 0]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.2, 32]} />
                    <meshStandardMaterial color="#D60036" roughness={0.3} />
                </mesh>
            </group>
        </Float>
    );
};

const FloatingCompact = (props) => {
    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8} {...props}>
            <group rotation={[Math.PI / 3, 0, 0]}>
                {/* Base */}
                <mesh>
                    <cylinderGeometry args={[0.8, 0.8, 0.1, 64]} />
                    <meshStandardMaterial color="#FFC0CB" metalness={0.3} roughness={0.2} />
                </mesh>
                {/* Powder */}
                <mesh position={[0, 0.06, 0]}>
                    <cylinderGeometry args={[0.7, 0.7, 0.05, 64]} />
                    <meshStandardMaterial color="#F4E4D7" roughness={1} />
                </mesh>
                {/* Mirror Lid (Open) */}
                <group position={[0, 0, -0.8]} rotation={[-Math.PI / 1.5, 0, 0]}>
                    <mesh position={[0, 0.4, 0]}>
                        <cylinderGeometry args={[0.8, 0.8, 0.1, 64]} />
                        <meshStandardMaterial color="#FFC0CB" metalness={0.3} roughness={0.2} />
                    </mesh>
                    <mesh position={[0, 0.4, 0.06]}>
                        <cylinderGeometry args={[0.7, 0.7, 0.02, 64]} />
                        <meshStandardMaterial color="white" metalness={1} roughness={0} />
                    </mesh>
                </group>
            </group>
        </Float>
    );
};

const BeautyScene = () => {
    // Standard font URL (hosted by three/drei or similar CDN usually required for Text3D)
    // We will use a standard google font JSON if available or fallback to a loader.
    // DREI Text3D requires a typeface.json. I will assume using one from a public CDN if needed or local.
    // For safety, I'll use a simpler Text abstraction or just Shapes if font fails.
    // Actually, I can use @react-three/drei's Text which uses woff/ttf.

    return (
        <group>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFC0CB" />

            {/* Floating Products */}
            <FloatingLipstick position={[-3, 0, -2]} rotation={[0, 0.5, 0]} />
            <FloatingLipstick position={[3.5, 2, -4]} rotation={[0.5, 1, 0]} />

            <FloatingCompact position={[2.5, -1.5, 0]} />
            <FloatingCompact position={[-2.5, 2.5, -3]} />

            {/* Central Logo Area - Since 3D Text needs a font file, using a billboard graphic or specialized mesh is safer 
                without external assets. I'll stick to a stylized Torus or abstract shape that represents "Radiance" 
                with the text DOM overlay handling the actual reading. 
            */}

            {/* Soft Particles */}
            <Sparkles
                count={150}
                scale={10}
                size={4}
                speed={0.4}
                opacity={0.6}
                color="#FFD700"
            />
            <Sparkles
                count={100}
                scale={12}
                size={2}
                speed={0.2}
                opacity={0.4}
                color="#FFC0CB"
            />

            {/* Background Gradient Plane */}
            <mesh position={[0, 0, -10]} scale={[30, 20, 1]}>
                <planeGeometry />
                <meshBasicMaterial>
                    <GradientTexture
                        stops={[0, 0.5, 1]} // As many stops as you want
                        colors={['#F9F9F9', '#FFEFF4', '#E6E6FA']} // White -> Soft Pink -> Lavender
                        size={1024} // Width of the texture (res)
                    />
                </meshBasicMaterial>
            </mesh>
        </group>
    );
};

export default BeautyScene;
