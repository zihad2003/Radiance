import { Environment, Float, Sparkles, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import { Lipstick, Brush, Pearl, Compact } from './BeautyItems';

const BeautyScene = () => {
    return (
        <>
            {/* Atmosphere */}
            <color attach="background" args={['#FFF9F5']} />
            <fog attach="fog" args={['#FFF9F5', 8, 25]} />

            {/* Lighting */}
            <Environment preset="city" />
            <ambientLight intensity={0.8} />
            <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} castShadow color="#ffdde1" />
            <pointLight position={[-10, -5, -10]} intensity={1} color="#B76E79" />

            {/* Floating Objects */}
            <group position={[0, 0, 0]}>
                <Float speed={2} rotationIntensity={0.8} floatIntensity={1} floatingRange={[-0.5, 0.5]}>
                    <Lipstick position={[-2.2, 0.5, 0]} rotation={[0.4, 0.5, -0.2]} scale={1.8} />
                    <Brush position={[2.8, -0.5, -1]} rotation={[-0.2, -0.4, 0.6]} scale={1.8} />
                    <Compact position={[0, -1.8, 0.5]} rotation={[0.2, -0.3, 0]} scale={1.5} />
                </Float>

                {/* Floating Pearls Background */}
                <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5} floatingRange={[-1, 1]}>
                    <Pearl position={[-1.5, 2.5, -2]} scale={0.7} />
                    <Pearl position={[3.5, 1.5, -3]} scale={1.0} />
                    <Pearl position={[-3.5, -1.5, 0]} scale={0.9} />
                    <Pearl position={[1.5, -2.5, -2]} scale={0.5} />
                    <Pearl position={[0, 3, -4]} scale={1.2} />
                </Float>
            </group>

            {/* Ground Shadows */}
            <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.3} far={10} color="#63383f" />

            {/* Particles */}
            <Sparkles count={80} scale={12} size={6} speed={0.4} opacity={0.6} color="#D4AF37" noise={0.5} />

            {/* Post Processing */}
            <EffectComposer disableNormalPass>
                <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={3} height={480} />
                <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} height={300} intensity={0.8} radius={0.6} />
                <Vignette eskil={false} offset={0.1} darkness={0.3} />
            </EffectComposer>
        </>
    );
};

export default BeautyScene;
