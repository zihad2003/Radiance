import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Sphere, Torus, Box } from '@react-three/drei';
import { LayerMaterial, Depth, Fresnel, Noise } from 'lamina';
import * as THREE from 'three';

// ========== LIPSTICK VARIATIONS (4 types) ==========

export const LipstickClassicGold = (props) => {
    const { color = "#DC143C", ...rest } = props;
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group ref={groupRef} {...rest}>
            {/* Base - Metallic Gold */}
            <Cylinder args={[0.18, 0.18, 1.0, 32]} position={[0, -0.5, 0]}>
                <meshStandardMaterial
                    color="#D4AF37"
                    metalness={0.95}
                    roughness={0.08}
                    envMapIntensity={2.8}
                />
            </Cylinder>

            {/* Embossed Logo Ring */}
            <Torus args={[0.19, 0.02, 16, 32]} position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#B8860B" metalness={1} roughness={0.05} />
            </Torus>

            {/* Decorative Band */}
            <Cylinder args={[0.185, 0.185, 0.08, 32]} position={[0, 0.05, 0]}>
                <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.05} envMapIntensity={3} />
            </Cylinder>

            {/* Inner Mechanism */}
            <Cylinder args={[0.15, 0.15, 0.35, 32]} position={[0, 0.3, 0]}>
                <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
            </Cylinder>

            {/* Lipstick Bullet - Red with ridges */}
            <group position={[0, 0.55, 0]}>
                <Cylinder args={[0.13, 0.13, 0.5, 32]} position={[0, 0, 0]}>
                    <meshStandardMaterial
                        color={color}
                        roughness={0.15}
                        metalness={0.05}
                        emissive={color}
                        emissiveIntensity={0.1}
                    />
                </Cylinder>
                {/* Ridges */}
                {[0, 0.1, 0.2].map((y, i) => (
                    <Torus key={i} args={[0.13, 0.005, 8, 32]} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <meshStandardMaterial color={color} roughness={0.2} metalness={0.2} />
                    </Torus>
                ))}
                {/* Rounded Tip */}
                <Sphere args={[0.13, 32, 16]} position={[0, 0.25, 0]} scale={[1, 0.5, 1]}>
                    <meshStandardMaterial color={color} roughness={0.1} metalness={0.05} />
                </Sphere>
            </group>
        </group>
    );
};

export const Lipstick = LipstickClassicGold;

export const LipstickRoseGold = (props) => {
    const { color = "#FFB6C1", ...rest } = props;
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + 1) * 0.1;
        }
    });

    return (
        <group ref={groupRef} {...rest}>
            <Cylinder args={[0.18, 0.18, 1.0, 32]} position={[0, -0.5, 0]}>
                <meshStandardMaterial
                    color="#B76E79"
                    metalness={0.95}
                    roughness={0.1}
                    envMapIntensity={2.5}
                />
            </Cylinder>
            <Cylinder args={[0.185, 0.185, 0.08, 32]} position={[0, 0.05, 0]}>
                <meshStandardMaterial color="#E0B0B0" metalness={1} roughness={0.05} />
            </Cylinder>
            <Cylinder args={[0.15, 0.15, 0.35, 32]} position={[0, 0.3, 0]}>
                <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
            </Cylinder>
            <group position={[0, 0.55, 0]}>
                <Cylinder args={[0.13, 0.13, 0.5, 32]}>
                    <meshStandardMaterial
                        color={color}
                        roughness={0.8}
                        metalness={0.0}
                    />
                </Cylinder>
                <Sphere args={[0.13, 32, 16]} position={[0, 0.25, 0]} scale={[1, 0.5, 1]}>
                    <meshStandardMaterial color={color} roughness={0.8} />
                </Sphere>
            </group>
        </group>
    );
};

export const LipstickBlackDesigner = (props) => {
    const { color = "#D2B48C", ...rest } = props;
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + 2) * 0.1;
        }
    });

    return (
        <group ref={groupRef} {...rest}>
            <Cylinder args={[0.18, 0.18, 1.0, 32]} position={[0, -0.5, 0]}>
                <meshStandardMaterial
                    color="#0a0a0a"
                    metalness={0.9}
                    roughness={0.15}
                    envMapIntensity={2.2}
                />
            </Cylinder>
            <Cylinder args={[0.185, 0.185, 0.08, 32]} position={[0, 0.05, 0]}>
                <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.05} />
            </Cylinder>
            <Cylinder args={[0.15, 0.15, 0.35, 32]} position={[0, 0.3, 0]}>
                <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
            </Cylinder>
            <group position={[0, 0.55, 0]}>
                <Cylinder args={[0.13, 0.13, 0.5, 32]}>
                    <meshStandardMaterial
                        color={color}
                        roughness={0.05}
                        metalness={0.1}
                        emissive={color}
                        emissiveIntensity={0.05}
                    />
                </Cylinder>
                <Sphere args={[0.13, 32, 16]} position={[0, 0.25, 0]} scale={[1, 0.5, 1]}>
                    <meshStandardMaterial color={color} roughness={0.05} metalness={0.1} />
                </Sphere>
            </group>
        </group>
    );
};

export const LipstickJeweled = (props) => {
    const { color = "#8B008B", ...rest } = props;
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + 3) * 0.1;
        }
    });

    return (
        <group ref={groupRef} {...rest}>
            <Cylinder args={[0.18, 0.18, 1.0, 32]} position={[0, -0.5, 0]}>
                <meshStandardMaterial
                    color="#4B0082"
                    metalness={0.95}
                    roughness={0.1}
                    envMapIntensity={2.5}
                />
            </Cylinder>
            {/* Decorative Gems */}
            {[0, 120, 240].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                return (
                    <Sphere
                        key={i}
                        args={[0.04, 16, 16]}
                        position={[Math.cos(rad) * 0.19, -0.3, Math.sin(rad) * 0.19]}
                    >
                        <meshStandardMaterial
                            color="#FF1493"
                            metalness={0.2}
                            roughness={0.0}
                            emissive="#FF1493"
                            emissiveIntensity={0.5}
                        />
                    </Sphere>
                );
            })}
            <Cylinder args={[0.15, 0.15, 0.35, 32]} position={[0, 0.3, 0]}>
                <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
            </Cylinder>
            <group position={[0, 0.55, 0]}>
                <Cylinder args={[0.13, 0.13, 0.5, 32]}>
                    <meshStandardMaterial
                        color={color}
                        roughness={0.3}
                        metalness={0.4}
                        emissive={color}
                        emissiveIntensity={0.2}
                    />
                </Cylinder>
                <Sphere args={[0.13, 32, 16]} position={[0, 0.25, 0]} scale={[1, 0.5, 1]}>
                    <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
                </Sphere>
            </group>
        </group>
    );
};

// ========== COMPACT VARIATIONS (3 types) ==========

export const CompactVintageRound = (props) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.003;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
        }
    });

    return (
        <group ref={groupRef} {...props} rotation={[Math.PI / 6, 0, 0]}>
            {/* Bottom Case */}
            <Cylinder args={[0.6, 0.6, 0.12, 32]} position={[0, 0, 0]}>
                <meshStandardMaterial
                    color="#8B4513"
                    metalness={0.7}
                    roughness={0.25}
                    envMapIntensity={2}
                />
            </Cylinder>

            {/* Decorative Engraving */}
            <Torus args={[0.5, 0.01, 16, 32]} position={[0, 0.07, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
            </Torus>

            {/* Powder */}
            <Cylinder args={[0.55, 0.55, 0.06, 32]} position={[0, 0.09, 0]}>
                <meshStandardMaterial
                    color="#E0C097"
                    roughness={0.95}
                    normalScale={[0.5, 0.5]}
                />
            </Cylinder>

            {/* Top Lid (Open) */}
            <group position={[0, 0.06, -0.6]} rotation={[-2.2, 0, 0]}>
                <Cylinder args={[0.6, 0.6, 0.12, 32]} position={[0, 0.3, 0.3]}>
                    <meshStandardMaterial
                        color="#8B4513"
                        metalness={0.7}
                        roughness={0.25}
                    />
                </Cylinder>

                {/* Mirror with Real Reflection */}
                <Cylinder args={[0.55, 0.55, 0.02, 32]} position={[0, 0.24, 0.3]}>
                    <meshStandardMaterial
                        color="#E8F4F8"
                        metalness={1}
                        roughness={0.0}
                        envMapIntensity={3}
                    />
                </Cylinder>
            </group>
        </group>
    );
};

export const Compact = CompactVintageRound;
export { EyeshadowPalette as Palette } from './BeautyItemsExtended';

export const CompactModernSquare = (props) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.003;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6 + 1) * 0.08;
        }
    });

    return (
        <group ref={groupRef} {...props} rotation={[Math.PI / 6, 0, 0]}>
            {/* Bottom Case */}
            <Box args={[1.0, 0.12, 0.8]} position={[0, 0, 0]}>
                <meshStandardMaterial
                    color="#1a1a1a"
                    metalness={0.9}
                    roughness={0.15}
                    envMapIntensity={2.5}
                />
            </Box>

            {/* LED Lights */}
            {[-0.35, -0.15, 0.05, 0.25].map((x, i) => (
                <Sphere key={i} args={[0.02, 16, 16]} position={[x, 0.07, 0.42]}>
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#ffffff"
                        emissiveIntensity={0.8}
                    />
                </Sphere>
            ))}

            {/* Powder Sections */}
            {[-0.25, 0.25].map((x, i) => (
                <Box key={i} args={[0.4, 0.06, 0.35]} position={[x, 0.09, 0]}>
                    <meshStandardMaterial
                        color={i === 0 ? "#FFE4E1" : "#F5DEB3"}
                        roughness={0.9}
                    />
                </Box>
            ))}

            {/* Top Lid */}
            <group position={[0, 0.06, -0.4]} rotation={[-2.0, 0, 0]}>
                <Box args={[1.0, 0.12, 0.8]} position={[0, 0.3, 0.4]}>
                    <meshStandardMaterial
                        color="#1a1a1a"
                        metalness={0.9}
                        roughness={0.15}
                    />
                </Box>

                {/* Mirror */}
                <Box args={[0.9, 0.02, 0.7]} position={[0, 0.24, 0.4]}>
                    <meshStandardMaterial
                        color="#E8F4F8"
                        metalness={1}
                        roughness={0.0}
                        envMapIntensity={3.5}
                    />
                </Box>
            </group>
        </group>
    );
};

export const CompactCushion = (props) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.003;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6 + 2) * 0.08;
        }
    });

    return (
        <group ref={groupRef} {...props} rotation={[Math.PI / 6, 0, 0]}>
            <Cylinder args={[0.65, 0.65, 0.15, 32]} position={[0, 0, 0]}>
                <meshStandardMaterial
                    color="#FFB6C1"
                    metalness={0.6}
                    roughness={0.3}
                />
            </Cylinder>

            {/* Cushion Sponge */}
            <Cylinder args={[0.6, 0.6, 0.08, 32]} position={[0, 0.11, 0]}>
                <meshStandardMaterial
                    color="#FFEFD5"
                    roughness={0.95}
                />
            </Cylinder>

            {/* Puff */}
            <Sphere args={[0.25, 24, 24]} position={[0.3, 0.2, 0.3]} scale={[1, 0.4, 1]}>
                <meshStandardMaterial
                    color="#FFF0F5"
                    roughness={0.9}
                />
            </Sphere>

            {/* Top Lid */}
            <group position={[0, 0.08, -0.65]} rotation={[-2.3, 0, 0]}>
                <Cylinder args={[0.65, 0.65, 0.15, 32]} position={[0, 0.35, 0.35]}>
                    <meshStandardMaterial
                        color="#FFB6C1"
                        metalness={0.6}
                        roughness={0.3}
                    />
                </Cylinder>
            </group>
        </group>
    );
};

// ========== PERFUME BOTTLES (2 types) ==========

export const PerfumeCrystalCut = (props) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.004;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
        }
    });

    return (
        <group ref={groupRef} {...props}>
            {/* Glass Bottle with Crystal Cuts */}
            <Box args={[0.6, 0.9, 0.25]} position={[0, 0, 0]}>
                <meshPhysicalMaterial
                    transmission={0.98}
                    roughness={0.0}
                    thickness={0.4}
                    ior={1.5}
                    color="#ffffff"
                    envMapIntensity={3}
                    clearcoat={1}
                    clearcoatRoughness={0}
                />
            </Box>

            {/* Liquid Inside */}
            <Box args={[0.55, 0.65, 0.2]} position={[0, -0.1, 0]}>
                <meshStandardMaterial
                    color="#FFD700"
                    transparent
                    opacity={0.85}
                    emissive="#FFA500"
                    emissiveIntensity={0.1}
                />
            </Box>

            {/* Gold Cap */}
            <Cylinder args={[0.15, 0.15, 0.25, 32]} position={[0, 0.575, 0]}>
                <meshStandardMaterial
                    color="#D4AF37"
                    metalness={1}
                    roughness={0.05}
                    envMapIntensity={3}
                />
            </Cylinder>

            {/* Atomizer Detail */}
            <Cylinder args={[0.03, 0.03, 0.1, 32]} position={[0, 0.45, 0]}>
                <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
            </Cylinder>
        </group>
    );
};

export const PerfumeMinimalist = (props) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.004;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7 + 1) * 0.1;
        }
    });

    return (
        <group ref={groupRef} {...props}>
            {/* Frosted Glass Bottle */}
            <Cylinder args={[0.3, 0.3, 1.0, 32]} position={[0, 0, 0]}>
                <meshPhysicalMaterial
                    transmission={0.7}
                    roughness={0.4}
                    thickness={0.3}
                    ior={1.45}
                    color="#F0F8FF"
                    envMapIntensity={2}
                />
            </Cylinder>

            {/* Liquid */}
            <Cylinder args={[0.27, 0.27, 0.75, 32]} position={[0, -0.1, 0]}>
                <meshStandardMaterial
                    color="#FFB6C1"
                    transparent
                    opacity={0.8}
                />
            </Cylinder>

            {/* Minimalist Cap */}
            <Cylinder args={[0.18, 0.18, 0.2, 32]} position={[0, 0.6, 0]}>
                <meshStandardMaterial
                    color="#E8E8E8"
                    metalness={0.8}
                    roughness={0.2}
                />
            </Cylinder>
        </group>
    );
};

// Continue in next file due to length...
