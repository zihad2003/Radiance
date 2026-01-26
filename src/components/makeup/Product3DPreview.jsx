import React from 'react';
import {
    LipstickHero,
    EyeshadowPaletteHero,
    BottleHero,
    EyelinerHero,
    MascaraHero,
    BeautyProductStage
} from '../3d/ProductArchitectures';

const Product3DPreview = ({ product }) => {
    if (!product) return null;

    const renderModel = () => {
        const arch = product.architecture || {};

        switch (product.category) {
            case 'lips':
                return (
                    <LipstickHero
                        color={product.hex}
                        bulletShape={arch.bulletShape || "slanted"}
                        caseDesign={arch.caseDesign || "metallic"}
                        finish={product.finish}
                        brand={product.brand}
                    />
                );
            case 'eyes':
                if (product.type === 'mascara') {
                    return <MascaraHero wandType={arch.wandType || "curved"} color={product.hex} />;
                }
                if (product.type === 'eyeliner') {
                    return <EyelinerHero type={arch.type || "pencil"} color={product.hex} />;
                }
                return (
                    <EyeshadowPaletteHero
                        shadeCount={arch.swatchCount || 4}
                        shades={[{ color: product.hex, finish: product.finish }]}
                    />
                );
            case 'face':
                return <BottleHero liquidColor={product.hex} finish={product.finish} />;
            case 'cheeks':
                return (
                    <EyeshadowPaletteHero
                        shadeCount={1}
                        shades={[{ color: product.hex, finish: product.finish }]}
                    />
                );
            default:
                return <BottleHero liquidColor={product.hex} />;
        }
    };

    return (
        <BeautyProductStage
            title={product.name}
            subtitle={`${product.brand} • ${product.finish.toUpperCase()}`}
            price={product.price}
        >
            {renderModel()}
        </BeautyProductStage>
    );
};

export default Product3DPreview;
