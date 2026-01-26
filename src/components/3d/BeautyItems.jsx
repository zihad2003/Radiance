import React from 'react';
import { Cylinder, Sphere, Torus, Box, Extrude } from '@react-three/drei';
import { LayerMaterial, Depth, Fresnel, Noise } from 'lamina';
import * as THREE from 'three';

export const Lipstick = (props) => {
    return (
        <group {...props}>
            {/* Base */}
            <Cylinder args={[0.15, 0.15, 0.8, 32]} position={[0, -0.4, 0]}>
                <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} envMapIntensity={1.5} />
            </Cylinder>
            {/* Gold Ring */}
            <Cylinder args={[0.16, 0.16, 0.1, 32]} position={[0, 0.05, 0]}>
                <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} envMapIntensity={2} />
            </Cylinder>
            {/* Inner Tube */}
            <Cylinder args={[0.13, 0.13, 0.3, 32]} position={[0, 0.25, 0]}>
                <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
            </Cylinder>
            {/* The Stick */}
            <group position={[0, 0.45, 0]} rotation={[0.5, 0, 0]}>
                <Cylinder args={[0.11, 0.11, 0.4, 32]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#D61C4E" roughness={0.2} metalness={0.1} />
                </Cylinder>
                <Sphere args={[0.11, 32, 16]} position={[0, 0.2, 0]} scale={[1, 0.4, 1]}>
                    <meshStandardMaterial color="#D61C4E" roughness={0.2} metalness={0.1} />
                </Sphere>
            </group>
        </group>
    );
};

export const Brush = (props) => {
    return (
        <group {...props}>
            {/* Handle */}
            <Cylinder args={[0.08, 0.06, 1.2, 32]} position={[0, -0.5, 0]}>
                <meshStandardMaterial color="#fce4ec" roughness={0.1} />
            </Cylinder>
            {/* Ferrule (Metal part) */}
            <Cylinder args={[0.09, 0.08, 0.4, 32]} position={[0, 0.3, 0]}>
                <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
            </Cylinder>
            {/* Bristles (Blob) */}
            <Sphere args={[0.15, 32, 32]} position={[0, 0.6, 0]} scale={[1, 1.5, 0.6]}>
                <meshStandardMaterial color="#5D4037" roughness={0.9} />
            </Sphere>
        </group>
    );
};

export const Pearl = (props) => {
    return (
        <Sphere args={[0.4, 64, 64]} {...props}>
            <LayerMaterial
                lighting="physical"
                transmission={0.5}
                roughness={0.1}
                color="#fff0f5"
            >
                <Depth colorA="#ffc0cb" colorB="#ffffff" alpha={0.7} mode="normal" near={0} far={2} origin={[1, 1, 1]} />
                <Fresnel color="#ff69b4" bias={0.1} intensity={2} mode="soft-light" />
                <Noise mapping="local" type="cell" scale={0.5} mode="overlay" alpha={0.2} />
            </LayerMaterial>
        </Sphere>
    );
};

export const Compact = (props) => {
    return (
        <group {...props} rotation={[Math.PI / 4, 0, 0]}>
            {/* Bottom Pan */}
            <Cylinder args={[0.5, 0.5, 0.1, 64]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#111" metalness={0.6} roughness={0.3} />
            </Cylinder>
            {/* Powder */}
            <Cylinder args={[0.45, 0.45, 0.05, 64]} position={[0, 0.05, 0]}>
                <meshStandardMaterial color="#E0C097" roughness={0.9} />
            </Cylinder>
            {/* Lid (Open) */}
            <group position={[0, 0.05, -0.5]} rotation={[-1.8, 0, 0]}>
                <Cylinder args={[0.5, 0.5, 0.1, 64]} position={[0, 0.25, 0.25]}>
                    <meshStandardMaterial color="#111" metalness={0.6} roughness={0.3} />
                </Cylinder>
                {/* Mirror */}
                <Cylinder args={[0.45, 0.45, 0.02, 64]} position={[0, 0.22, 0.25]} rotation={[0, 0, 0]}>
                    <meshStandardMaterial color="#add8e6" metalness={1} roughness={0} />
                </Cylinder>
            </group>
        </group>
    );
};

export const Perfume = (props) => {
    return (
        <group {...props}>
            {/* Glass Bottle */}
            <Box args={[0.5, 0.7, 0.2]} position={[0, 0, 0]}>
                <meshPhysicalMaterial
                    transmission={1}
                    roughness={0}
                    thickness={0.5}
                    color="#ffefff"
                    envMapIntensity={2}
                />
            </Box>
            {/* Liquid inside */}
            <Box args={[0.45, 0.5, 0.15]} position={[0, -0.08, 0]}>
                <meshStandardMaterial color="#ffbdc9" transparent opacity={0.8} />
            </Box>
            {/* Cap */}
            <Cylinder args={[0.1, 0.1, 0.2, 32]} position={[0, 0.45, 0]}>
                <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
            </Cylinder>
        </group>
    );
};

export const Mascara = (props) => {
    return (
        <group {...props}>
            {/* Tube */}
            <Cylinder args={[0.08, 0.08, 1.2, 32]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#111" metalness={0.7} roughness={0.2} />
            </Cylinder>
            {/* Gold Band */}
            <Torus args={[0.08, 0.02, 16, 32]} position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
            </Torus>
        </group>
    );
};

export const NailPolish = (props) => {
    return (
        <group {...props}>
            {/* Bottle */}
            <Cylinder args={[0.25, 0.3, 0.5, 32]} position={[0, 0, 0]}>
                <meshPhysicalMaterial
                    transmission={1}
                    roughness={0.1}
                    thickness={0.3}
                    color="#ffffff"
                />
            </Cylinder>
            {/* Paint */}
            <Cylinder args={[0.22, 0.27, 0.4, 32]} position={[0, -0.02, 0]}>
                <meshStandardMaterial color="#aa2222" />
            </Cylinder>
            {/* Cap */}
            <Cylinder args={[0.1, 0.15, 0.4, 32]} position={[0, 0.45, 0]}>
                <meshStandardMaterial color="#111" metalness={0.5} roughness={0.4} />
            </Cylinder>
        </group>
    );
};

export const Palette = (props) => {
    return (
        <group {...props}>
            {/* Base */}
            <Box args={[1.2, 0.1, 0.8]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#222" metalness={0.5} roughness={0.2} />
            </Box>
            {/* Pans */}
            {[-0.3, 0, 0.3].map((x, i) => (
                <Cylinder key={i} args={[0.15, 0.15, 0.02, 32]} position={[x, 0.06, 0.15]} rotation={[0, 0, 0]}>
                    <meshStandardMaterial color={['#D61C4E', '#E0C097', '#5D4037'][i]} roughness={0.8} />
                </Cylinder>
            ))}
            {[-0.3, 0, 0.3].map((x, i) => (
                <Cylinder key={i + 3} args={[0.15, 0.15, 0.02, 32]} position={[x, 0.06, -0.15]} rotation={[0, 0, 0]}>
                    <meshStandardMaterial color={['#D4AF37', '#990000', '#222'][i]} roughness={0.6} metalness={i === 0 ? 0.8 : 0} />
                </Cylinder>
            ))}
        </group>
    )
}
