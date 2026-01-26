import { Environment, Float, Sparkles, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import { Lipstick, Brush, Pearl, Compact, Perfume, Mascara, NailPolish, Palette } from './BeautyItems';
import { useThree } from '@react-three/fiber';

const BeautyScene = () => {
    return (
        <>
            {/* Atmosphere */}
            <color attach="background" args={['#FFF9F5']} />
            <fog attach="fog" args={['#FFF9F5', 5, 20]} />

            {/* Lighting */}
            <Environment preset="city" />
            <ambientLight intensity={1} />
            <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} castShadow color="#ffdde1" />
            <pointLight position={[-10, -5, -10]} intensity={2} color="#B76E79" />

            {/* Floating Objects Cloud (12+ Items) */}
            <group position={[0, 0, 0]}>
                <Float speed={2} rotationIntensity={0.8} floatIntensity={1} floatingRange={[-0.5, 0.5]}>

                    {/* Hero Items */}
                    <Lipstick position={[-2.2, 0.5, 0]} rotation={[0.4, 0.5, -0.2]} scale={1.8} />
                    <Brush position={[2.8, -0.5, -1]} rotation={[-0.2, -0.4, 0.6]} scale={1.8} />
                    <Compact position={[0.2, -1.8, 0.5]} rotation={[0.2, -0.3, 0]} scale={1.5} />
                    <Perfume position={[1.5, 2.0, -1]} rotation={[0, 0.5, 0.1]} scale={1.5} />

                    {/* Supporting Products */}
                    <Mascara position={[-3.5, -1.5, -0.5]} rotation={[0.5, 0, 1]} scale={1.5} />
                    <NailPolish position={[3.2, 1.2, 0.5]} rotation={[0.2, 0, -0.2]} scale={1.3} />
                    <Palette position={[0, 1.5, -2]} rotation={[0.5, 0, 0]} scale={1.2} />

                    {/* Background Elements */}
                    <Lipstick position={[4, -2, -3]} rotation={[1, 1, 0]} scale={1.2} />
                    <Brush position={[-4, 2, -2]} rotation={[0, 0, 1]} scale={1.2} />
                    <NailPolish position={[-1.5, -2.5, -1.5]} rotation={[-0.2, 0, 0.5]} scale={1.0} />
                    <Mascara position={[2, -3, -2]} rotation={[1, 0.5, 0]} scale={1.2} />

                    {/* Pearls Scatter */}
                    <Pearl position={[-1.5, 2.5, -2]} scale={0.7} />
                    <Pearl position={[3.5, 1.5, -3]} scale={1.0} />
                    <Pearl position={[-3.5, -1.5, 0]} scale={0.9} />
                    <Pearl position={[1.5, -2.5, -2]} scale={0.5} />
                    <Pearl position={[0, 3, -4]} scale={1.2} />
                    <Pearl position={[-2, 0, -5]} scale={0.8} />
                    <Pearl position={[2, -1, -4]} scale={0.6} />

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
