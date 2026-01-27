import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
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

export default ProductComposition;
