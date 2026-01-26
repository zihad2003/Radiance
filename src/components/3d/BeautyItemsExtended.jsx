import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Sphere, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';

// ========== MAKEUP BRUSHES (3 types) ==========

export const BrushPowder = (props) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z += 0.002;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
        }
    });

    return (
        <group ref={groupRef} {...props}>
            {/* Handle - Rose Gold Gradient */}
            <Cylinder args={[0.09, 0.07, 1.4, 24]} position={[0, -0.6, 0]}>
                <meshStandardMaterial
                    color="#E0B0B0"
                    roughness={0.15}
                    metalness={0.6}
                />
            </Cylinder>

            {/* Ferrule (Metal part) - Rose Gold */}
            <Cylinder args={[0.11, 0.09, 0.5, 24]} position={[0, 0.35, 0]}>
                <meshStandardMaterial
                    color="#B76E79"
                    metalness={1}
                    roughness={0.1}
                    envMapIntensity={2.5}
                />
            </Cylinder>

            {/* Engraving on Ferrule */}
            <Torus args={[0.1, 0.005, 16, 24]} position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#8B4513" metalness={0.8} roughness={0.2} />
            </Torus>

            {/* Fluffy Bristles */}
            <Sphere args={[0.2, 24, 24]} position={[0, 0.75, 0]} scale={[1, 1.8, 0.8]}>
                <meshStandardMaterial
                    color="#5D4037"
                    roughness={0.95}
                    normalScale={[2, 2]}
                />
            </Sphere>

            {/* Individual Bristle Tips (Simulated) */}
            {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const radius = 0.15;
                return (
                    <Cylinder
                        key={i}
                        args={[0.003, 0.001, 0.15, 6]}
                        position={[
                            Math.cos(angle) * radius,
                            0.85,
                            Math.sin(angle) * radius
                        ]}
                        rotation={[Math.cos(angle) * 0.3, 0, Math.sin(angle) * 0.3]}
                    >
                        <meshStandardMaterial color="#4A3428" roughness={0.9} />
                    </Cylinder>
                );
            })}
        </group>
    );
};

export const BrushEyeshadow = (props) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z += 0.002;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8 + 1) * 0.06;
        }
    });

    return (
        <group ref={groupRef} {...props}>
            {/* Handle - Acrylic with Gradient */}
            <Cylinder args={[0.06, 0.05, 1.2, 24]} position={[0, -0.5, 0]}>
                <meshStandardMaterial
                    color="#FFB6C1"
                    roughness={0.2}
                    metalness={0.3}
                    transparent
                    opacity={0.9}
                />
            </Cylinder>

            {/* Ferrule - Silver */}
            <Cylinder args={[0.08, 0.06, 0.35, 24]} position={[0, 0.3, 0]}>
                <meshStandardMaterial
                    color="#C0C0C0"
                    metalness={1}
                    roughness={0.15}
                />
            </Cylinder>

            {/* Precision Bristles */}
            <Cylinder args={[0.06, 0.02, 0.3, 24]} position={[0, 0.55, 0]}>
                <meshStandardMaterial
                    color="#3E2723"
                    roughness={0.9}
                />
            </Cylinder>
        </group>
    );
};

export const BrushKabuki = (props) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z += 0.002;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8 + 2) * 0.06;
        }
    });

    return (
        <group ref={groupRef} {...props}>
            {/* Short Handle - Wooden */}
            <Cylinder args={[0.12, 0.1, 0.6, 24]} position={[0, -0.2, 0]}>
                <meshStandardMaterial
                    color="#8B4513"
                    roughness={0.6}
                    metalness={0.1}
                />
            </Cylinder>

            {/* Ferrule - Gold */}
            <Cylinder args={[0.14, 0.12, 0.3, 24]} position={[0, 0.25, 0]}>
                <meshStandardMaterial
                    color="#D4AF37"
                    metalness={1}
                    roughness={0.1}
                />
            </Cylinder>

            {/* Dense Bristles */}
            <Sphere args={[0.25, 24, 24]} position={[0, 0.55, 0]} scale={[1, 1.2, 1]}>
                <meshStandardMaterial
                    color="#2C1810"
                    roughness={0.95}
                />
            </Sphere>
        </group>
    );
};

// ========== NAIL POLISH (2 types) ==========

export const NailPolishClassic = (props) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.004;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
        }
    });

    return (
        <group ref={groupRef} {...props}>
            {/* Glass Bottle */}
            <Cylinder args={[0.28, 0.32, 0.6, 32]} position={[0, 0, 0]}>
                <meshPhysicalMaterial
                    transmission={0.95}
                    roughness={0.05}
                    thickness={0.25}
                    ior={1.5}
                    color="#ffffff"
                    envMapIntensity={2.5}
                />
            </Cylinder>

            {/* Red Polish Inside */}
            <Cylinder args={[0.25, 0.29, 0.5, 32]} position={[0, -0.03, 0]}>
                <meshStandardMaterial
                    color="#DC143C"
                    roughness={0.1}
                    metalness={0.3}
                    emissive="#8B0000"
                    emissiveIntensity={0.1}
                />
            </Cylinder>

            {/* Black Cap with Brush */}
            <Cylinder args={[0.12, 0.16, 0.5, 24]} position={[0, 0.55, 0]}>
                <meshStandardMaterial
                    color="#0a0a0a"
                    metalness={0.6}
                    roughness={0.3}
                />
            </Cylinder>

            {/* Brush Stem */}
            <Cylinder args={[0.02, 0.02, 0.4, 8]} position={[0, 0.2, 0]}>
                <meshStandardMaterial color="#1a1a1a" />
            </Cylinder>
        </group>
    );
};

export const NailPolishGel = (props) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.004;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6 + 1) * 0.08;
        }
    });

    return (
        <group ref={groupRef} {...props}>
            {/* Glass Bottle */}
            <Cylinder args={[0.28, 0.32, 0.6, 32]} position={[0, 0, 0]}>
                <meshPhysicalMaterial
                    transmission={0.95}
                    roughness={0.05}
                    thickness={0.25}
                    ior={1.5}
                    color="#ffffff"
                    envMapIntensity={2.5}
                />
            </Cylinder>

            {/* Pink Shimmer Polish */}
            <Cylinder args={[0.25, 0.29, 0.5, 32]} position={[0, -0.03, 0]}>
                <meshStandardMaterial
                    color="#FFB6C1"
                    roughness={0.05}
                    metalness={0.6}
                    emissive="#FF69B4"
                    emissiveIntensity={0.15}
                />
            </Cylinder>

            {/* Silver Cap */}
            <Cylinder args={[0.12, 0.16, 0.5, 24]} position={[0, 0.55, 0]}>
                <meshStandardMaterial
                    color="#C0C0C0"
                    metalness={1}
                    roughness={0.1}
                />
            </Cylinder>
        </group>
    );
};

// ========== EYESHADOW PALETTE ==========

export const EyeshadowPalette = (props) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.002;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    const shadeColors = [
        '#FFF5EE', '#FFE4E1', '#FFB6C1', '#FF69B4',
        '#C71585', '#8B008B', '#4B0082', '#2F4F4F',
        '#D4AF37', '#CD7F32', '#8B4513', '#2C1810'
    ];

    return (
        <group ref={groupRef} {...props} rotation={[Math.PI / 8, 0, 0]}>
            {/* Base Case */}
            <Box args={[1.6, 0.15, 1.0]} position={[0, 0, 0]}>
                <meshStandardMaterial
                    color="#1a1a1a"
                    metalness={0.8}
                    roughness={0.2}
                />
            </Box>

            {/* 12 Eyeshadow Pans (3x4 grid) */}
            {shadeColors.map((color, i) => {
                const row = Math.floor(i / 4);
                const col = i % 4;
                const x = -0.6 + col * 0.4;
                const z = -0.3 + row * 0.3;

                return (
                    <group key={i} position={[x, 0.08, z]}>
                        {/* Pan */}
                        <Cylinder args={[0.15, 0.15, 0.03, 24]}>
                            <meshStandardMaterial
                                color={color}
                                roughness={i < 4 ? 0.9 : i < 8 ? 0.3 : 0.1}
                                metalness={i < 4 ? 0 : i < 8 ? 0.5 : 0.8}
                            />
                        </Cylinder>
                    </group>
                );
            })}

            {/* Top Lid with Mirror */}
            <group position={[0, 0.08, -0.5]} rotation={[-2.5, 0, 0]}>
                <Box args={[1.6, 0.15, 1.0]} position={[0, 0.5, 0.5]}>
                    <meshStandardMaterial
                        color="#1a1a1a"
                        metalness={0.8}
                        roughness={0.2}
                    />
                </Box>

                {/* Mirror */}
                <Box args={[1.5, 0.02, 0.9]} position={[0, 0.42, 0.5]}>
                    <meshStandardMaterial
                        color="#E8F4F8"
                        metalness={1}
                        roughness={0.0}
                        envMapIntensity={4}
                    />
                </Box>
            </group>
        </group>
    );
};

// ========== MASCARA ==========

export const Mascara = (props) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
        }
    });

    return (
        <group ref={groupRef} {...props}>
            {/* Tube - Sleek Black */}
            <Cylinder args={[0.1, 0.1, 1.4, 32]} position={[0, 0, 0]}>
                <meshStandardMaterial
                    color="#0a0a0a"
                    metalness={0.9}
                    roughness={0.1}
                    envMapIntensity={2.5}
                />
            </Cylinder>

            {/* Gold Accent Bands */}
            <Torus args={[0.1, 0.015, 16, 32]} position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.05} />
            </Torus>
            <Torus args={[0.1, 0.015, 16, 32]} position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.05} />
            </Torus>

            {/* Brand Typography (Simulated with embossed ring) */}
            <Torus args={[0.105, 0.008, 16, 32]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
            </Torus>

            {/* Cap */}
            <Cylinder args={[0.08, 0.12, 0.4, 32]} position={[0, 0.9, 0]}>
                <meshStandardMaterial
                    color="#1a1a1a"
                    metalness={0.8}
                    roughness={0.15}
                />
            </Cylinder>
        </group>
    );
};

// ========== SKINCARE JAR ==========

export const SkincareJar = (props) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.003;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.09;
        }
    });

    return (
        <group ref={groupRef} {...props}>
            {/* Glass Jar */}
            <Cylinder args={[0.45, 0.45, 0.6, 32]} position={[0, 0, 0]}>
                <meshPhysicalMaterial
                    transmission={0.85}
                    roughness={0.1}
                    thickness={0.2}
                    ior={1.5}
                    color="#FFF8F0"
                    envMapIntensity={2}
                />
            </Cylinder>

            {/* Cream Inside */}
            <Cylinder args={[0.42, 0.42, 0.4, 32]} position={[0, -0.08, 0]}>
                <meshStandardMaterial
                    color="#FFFACD"
                    roughness={0.7}
                    metalness={0.1}
                />
            </Cylinder>

            {/* Rose Gold Lid */}
            <Cylinder args={[0.48, 0.48, 0.15, 32]} position={[0, 0.375, 0]}>
                <meshStandardMaterial
                    color="#B76E79"
                    metalness={1}
                    roughness={0.08}
                    envMapIntensity={3}
                />
            </Cylinder>

            {/* Decorative Top */}
            <Torus args={[0.4, 0.02, 16, 32]} position={[0, 0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.05} />
            </Torus>

            {/* Logo Emblem */}
            <Cylinder args={[0.1, 0.1, 0.02, 16]} position={[0, 0.46, 0]}>
                <meshStandardMaterial
                    color="#FFD700"
                    metalness={1}
                    roughness={0.1}
                    emissive="#FFA500"
                    emissiveIntensity={0.2}
                />
            </Cylinder>
        </group>
    );
};

// ========== DECORATIVE PEARL ==========

export const Pearl = (props) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.01;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.15;
        }
    });

    return (
        <Sphere ref={groupRef} args={[0.5, 32, 32]} {...props}>
            <meshStandardMaterial
                color="#FFF0F5"
                metalness={0.2}
                roughness={0.1}
                envMapIntensity={2.5}
                emissive="#FFE4E1"
                emissiveIntensity={0.1}
            />
        </Sphere>
    );
};
