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
