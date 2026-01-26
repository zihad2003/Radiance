import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cylinder, Sphere, Torus, Box, Plane, useGLTF, Environment, Float, PresentationControls, ContactShadows } from '@react-three/drei';
import { Zap, ShoppingBag } from 'lucide-react';
import * as THREE from 'three';

// ========== 1. LIPSTICK ARCHITECTURES ==========

export const LipstickHero = ({
    color = "#DC143C",
    bulletShape = "slanted", // slanted, rounded, square, heart
    caseDesign = "metallic", // metallic, matte, jeweled, clear
    casePattern = null,
    finish = "matte", // matte, glossy, satin, metallic, shimmer
    isOpen = true,
    brand = "MAC"
}) => {
    const groupRef = useRef();
    const capRef = useRef();
    const [isOpened, setIsOpened] = useState(isOpen);

    useFrame((state) => {
        if (capRef.current) {
            capRef.current.position.y = THREE.MathUtils.lerp(
                capRef.current.position.y,
                isOpened ? 1.5 : 0.5,
                0.1
            );
            capRef.current.rotation.x = THREE.MathUtils.lerp(
                capRef.current.rotation.x,
                isOpened ? Math.PI / 4 : 0,
                0.1
            );
        }
    });

    const getBulletGeometry = () => {
        if (bulletShape === "rounded") return <Sphere args={[0.13, 64, 32]} position={[0, 0.25, 0]} scale={[1, 0.5, 1]} />;
        if (bulletShape === "square") return <Box args={[0.2, 0.5, 0.2]} position={[0, 0, 0]} />;
        if (bulletShape === "heart") return <Sphere args={[0.13, 32, 32]} position={[0, 0.25, 0]} scale={[1.2, 0.8, 1]} />;
        // Default slanted
        return (
            <group position={[0, 0, 0]}>
                <Cylinder args={[0.13, 0.13, 0.5, 64]} />
                <mesh position={[0, 0.25, 0]} rotation={[0.4, 0, 0]}>
                    <Cylinder args={[0.13, 0.13, 0.05, 64]} />
                </mesh>
            </group>
        );
    };

    const caseMaterial = (
        <meshStandardMaterial
            color={caseDesign === "metallic" ? "#D4AF37" : caseDesign === "matte" ? "#1a1a1a" : "#FFB6C1"}
            metalness={caseDesign === "metallic" ? 1 : 0.2}
            roughness={caseDesign === "matte" ? 0.9 : 0.1}
            envMapIntensity={2}
        />
    );

    return (
        <group ref={groupRef} onClick={() => setIsOpened(!isOpened)}>
            {/* Base Case */}
            <Cylinder args={[0.18, 0.18, 1.0, 64]} position={[0, -0.5, 0]} material={caseMaterial} />

            {/* Mechanism */}
            <Cylinder args={[0.15, 0.15, 0.4, 64]} position={[0, 0.2, 0]}>
                <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
            </Cylinder>

            {/* Bullet */}
            <group position={[0, 0.5, 0]}>
                <mesh>
                    {getBulletGeometry()}
                    <meshStandardMaterial
                        color={color}
                        roughness={finish === "matte" ? 0.9 : 0.1}
                        metalness={finish === "metallic" ? 0.8 : 0.1}
                    />
                </mesh>
            </group>

            {/* Cap */}
            <group ref={capRef} position={[0, 0.5, 0]}>
                <Cylinder args={[0.19, 0.19, 1.0, 64]} position={[0, 0, 0]} material={caseMaterial} />
                {caseDesign === "jeweled" && (
                    <Sphere args={[0.05, 16, 16]} position={[0, 0.5, 0]}>
                        <meshStandardMaterial color="#FFD700" emmisive="#FFD700" />
                    </Sphere>
                )}
            </group>
        </group>
    );
};

// ========== 2. EYESHADOW PALETTE ARCHITECTURES ==========

export const EyeshadowPaletteHero = ({
    shadeCount = 12, // 4, 9, 12, 24
    layout = "grid",
    shades = [], // Array of {color, finish}
    isOpen = true
}) => {
    const lidRef = useRef();

    useFrame(() => {
        if (lidRef.current) {
            lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, isOpen ? -Math.PI * 0.7 : 0, 0.1);
        }
    });

    const getGridSize = () => {
        if (shadeCount <= 4) return { cols: 2, rows: 2 };
        if (shadeCount <= 9) return { cols: 3, rows: 3 };
        if (shadeCount <= 12) return { cols: 4, rows: 3 };
        return { cols: 6, rows: 4 };
    };

    const { cols, rows } = getGridSize();
    const spacingX = 0.4;
    const spacingZ = 0.4;
    const totalW = cols * spacingX;
    const totalH = rows * spacingZ;

    return (
        <group rotation={[Math.PI / 12, 0, 0]}>
            {/* Bottom Case */}
            <Box args={[totalW + 0.4, 0.15, totalH + 0.4]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
            </Box>

            {/* Shade Pans */}
            {Array.from({ length: shadeCount }).map((_, i) => {
                const r = Math.floor(i / cols);
                const c = i % cols;
                const x = -totalW / 2 + c * spacingX + spacingX / 2;
                const z = -totalH / 2 + r * spacingZ + spacingZ / 2;
                const shade = shades[i] || { color: "#ddd", finish: "matte" };

                return (
                    <group key={i} position={[x, 0.08, z]}>
                        <Cylinder args={[0.15, 0.15, 0.05, 32]}>
                            <meshStandardMaterial
                                color={shade.color}
                                roughness={shade.finish === "matte" ? 0.9 : 0.2}
                                metalness={shade.finish === "metallic" ? 0.8 : 0.1}
                            />
                        </Cylinder>
                    </group>
                );
            })}

            {/* Top Lid */}
            <group ref={lidRef} position={[0, 0.08, -(totalH / 2 + 0.2)]}>
                <Box args={[totalW + 0.4, 0.1, totalH + 0.4]} position={[0, 0, -(totalH / 2 + 0.2)]}>
                    <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
                </Box>
                {/* Mirror */}
                <Box args={[totalW + 0.2, 0.01, totalH + 0.2]} position={[0, -0.04, -(totalH / 2 + 0.2)]}>
                    <meshStandardMaterial color="#E8F4F8" metalness={1} roughness={0} envMapIntensity={3} />
                </Box>
            </group>
        </group>
    );
};

// ========== 3. BOTTLE ARCHITECTURES (Foundation/Serum) ==========

export const BottleHero = ({
    liquidColor = "#F2Dcb3",
    bottleType = "pump", // pump, dropper, stick
    coverage = "full",
    finish = "natural"
}) => {
    return (
        <group>
            {/* Glass Bottle */}
            <Cylinder args={[0.4, 0.45, 1.2, 64]}>
                <meshPhysicalMaterial
                    transmission={0.95}
                    roughness={0.05}
                    thickness={0.5}
                    color="#fff"
                    envMapIntensity={2}
                />
            </Cylinder>

            {/* Liquid Inside */}
            <Cylinder args={[0.35, 0.4, 1.0, 64]} position={[0, -0.05, 0]}>
                <meshStandardMaterial
                    color={liquidColor}
                    roughness={finish === "matte" ? 0.9 : 0.1}
                    transparent
                    opacity={0.9}
                />
            </Cylinder>

            {/* Pump Mechanism */}
            {bottleType === "pump" && (
                <group position={[0, 0.6, 0]}>
                    <Cylinder args={[0.1, 0.1, 0.3, 32]} position={[0, 0.15, 0]}>
                        <meshStandardMaterial color="#222" metalness={0.8} />
                    </Cylinder>
                    <Box args={[0.2, 0.1, 0.4]} position={[0, 0.3, 0.1]}>
                        <meshStandardMaterial color="#222" metalness={0.8} />
                    </Box>
                </group>
            )}
        </group>
    );
};

// ========== 4. EYELINER ARCHITECTURES ==========

export const EyelinerHero = ({
    type = "pencil", // pencil, liquid, gel
    tipPrecision = "ultra-fine",
    color = "#000"
}) => {
    return (
        <group rotation={[Math.PI / 2, 0, 0]}>
            {type === "pencil" && (
                <group>
                    <Cylinder args={[0.05, 0.05, 1.5, 32]}>
                        <meshStandardMaterial color="#111" roughness={0.5} />
                    </Cylinder>
                    <Cylinder args={[0.0, 0.05, 0.2, 32]} position={[0, 0.85, 0]}>
                        <meshStandardMaterial color={color} roughness={0.9} />
                    </Cylinder>
                </group>
            )}
            {type === "liquid" && (
                <group>
                    <Cylinder args={[0.1, 0.1, 1.0, 32]}>
                        <meshStandardMaterial color="#0a0a0a" metalness={0.8} />
                    </Cylinder>
                    <Cylinder args={[0.01, 0.05, 0.4, 32]} position={[0, 0.7, 0]}>
                        <meshStandardMaterial color={color} roughness={1} />
                    </Cylinder>
                </group>
            )}
        </group>
    );
};

// ========== 5. MASCARA ARCHITECTURES ==========

export const MascaraHero = ({
    wandType = "curved", // curved, straight, hourglass
    color = "#000"
}) => {
    return (
        <group>
            {/* Tube */}
            <Cylinder args={[0.15, 0.15, 1.5, 64]} position={[0, -0.5, 0]}>
                <meshStandardMaterial color="#111" metalness={0.9} envMapIntensity={2} />
            </Cylinder>

            {/* Wand Stem */}
            <Cylinder args={[0.02, 0.02, 1.0, 32]} position={[0.4, 0.5, 0]} rotation={[0, 0, -0.2]}>
                <meshStandardMaterial color="#444" metalness={1} />
            </Cylinder>

            {/* Brush Head */}
            <group position={[0.55, 0.9, 0]} rotation={[0, 0, -0.2]}>
                {wandType === "straight" && (
                    <Cylinder args={[0.08, 0.08, 0.4, 32]}>
                        <meshStandardMaterial color={color} roughness={1} />
                    </Cylinder>
                )}
                {/* Simulate bristles with many small boxes/cylinders */}
                {Array.from({ length: 50 }).map((_, i) => (
                    <mesh key={i} position={[Math.sin(i) * 0.1, (i / 50) * 0.4 - 0.2, Math.cos(i) * 0.1]}>
                        <Box args={[0.005, 0.005, 0.1]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                ))}
            </group>
        </group>
    );
};

// ========== PRODUCT VIEW STAGE ==========

export const BeautyProductStage = ({ children, title, subtitle, price }) => {
    return (
        <div className="w-full h-[500px] relative bg-gradient-to-br from-neutral-900 to-black rounded-3xl overflow-hidden shadow-2xl">
            <Canvas shadows camera={{ position: [0, 1.5, 4], fov: 35 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <Environment preset="city" />
                <PresentationControls
                    global
                    config={{ mass: 2, tension: 500 }}
                    snap={{ mass: 4, tension: 1500 }}
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                >
                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        {children}
                    </Float>
                </PresentationControls>
                <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
            </Canvas>

            {/* Overlays */}
            <div className="absolute top-8 left-8 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 max-w-xs transition-all hover:bg-white/10 pointer-events-none">
                <h2 className="text-2xl font-serif text-white mb-2">{title}</h2>
                <p className="text-white/60 text-sm mb-4">{subtitle}</p>
                <div className="flex items-center justify-between">
                    <span className="text-primary font-bold text-xl">{price} BDT</span>
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">In Stock</span>
                    </div>
                </div>
            </div>

            <div className="absolute right-8 bottom-8 flex flex-col gap-4">
                <button className="p-4 bg-primary text-white rounded-full shadow-glow hover:scale-110 active:scale-95 transition-all">
                    <Zap size={24} />
                </button>
                <button className="p-4 bg-white/10 text-white rounded-full backdrop-blur-md hover:bg-white/20 transition-all">
                    <ShoppingBag size={24} />
                </button>
            </div>

            <div className="absolute bottom-8 left-8 text-white/20 text-[10px] uppercase font-bold tracking-[0.4em]">
                Interactive 3D Prototype • Built for Radiance
            </div>
        </div>
    );
};
