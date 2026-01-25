# 📋 Radiance Salon: Advanced AI Beauty Platform - Implementation Plan

## 1. Project Structure Analysis

### Current Architecture
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (Vanilla CSS variables used for theming)
- **3D Engine**: React Three Fiber (R3F)
- **State**: Local React State (useState) - *Need to upgrade to Zustand for complex global state*
- **AI/ML**: Basic implementation of Face Landmarks Detection

### Directory Map & New Structure
```
src/
├── assets/
│   ├── models/           # [NEW] GLTF/GLB models for 3D props (lipstick, brush, petals)
│   ├── textures/         # [NEW] Textures for 3D materials
│   └── brands/           # [NEW] Logos for makeup brands
├── components/
│   ├── 3d/               # [NEW] Dedicated 3D scene components
│   │   ├── BeautyScene.jsx
│   │   ├── FloatingProducts.jsx
│   │   ├── RadianceLogo.jsx
│   │   └── Effects/      # Shimmer, Bloom, Particles
│   ├── makeup/           # [NEW] Virtual Try-On Module
│   │   ├── BrandSelector.jsx
│   │   ├── ProductCatalog.jsx
│   │   ├── FaceCanvas.jsx
│   │   └── Controls/
│   ├── hairstyle/        # [NEW] Hairstyle AI Module
│   │   ├── GenderDetector.jsx
│   │   ├── FaceShapeAnalyzer.jsx
│   │   └── StyleOverlay.jsx
│   └── ui/               # [NEW] Reusable "Girly" UI components
│       ├── GlassCard.jsx
│       ├── PinkButton.jsx
│       └── RangeSlider.jsx
├── data/                 # [NEW] Static databases
│   ├── makeupBrands.js   # 700+ products database
│   └── hairstyles.js     # Hairstyle variations mapping
├── hooks/                # [NEW] Custom logic hooks
│   ├── useFaceMesh.js
│   ├── useGenderDetect.js
│   └── useMakeupRender.js
└── stores/               # [NEW] Global state
    └── useAppStore.js    # Zustand store for user selection
```

---

## 2. Feature Development Roadmap

### 💄 Phase 1: AI Virtual Makeup Core (High Priority)
1.  **Database Creation**: Build structured JSON for International (MAC, Maybelline) & Local (Affaire, Lakme) brands.
2.  **Face Engine Upgrade**: Optimize `FaceCanvas` to separate landmarks for Lips, Eyes (Lid/Crease), and Cheeks.
3.  **Rendering Engine**:
    -   Implement `canvas` drawing logic for matte/glossy lips.
    -   Implement "soft blend" logic for blush/eyeshadow using gradient masks.
4.  **UI Overhaul**: Build the "Makeup Studio" interface with split-screen compare.

### 💇 Phase 2: AI Hairstyle Finder
1.  **Detection Models**: Integrate `blazeface` for fast detection and a lightweight classification model for Gender (or heuristic based on landmarks).
2.  **Face Shape Logic**: Algorithm to calculate Width/Height ratios from landmarks to classify (Oval, Round, Square, etc.).
3.  **Recommendation Engine**: Mapping logic (`FaceShape + Gender -> RecommendedStyles`).
4.  **Visualizer**: 2D Image Overlay system (as full 3D hair fitting is computationally heavy on web, we will use smart 2D warping or static overlay on detected head position).

### ✨ Phase 3: 3D Girly Animations (Aesthetic Overhaul)
1.  **Asset Generation**: Create procedural `Three.js` geometries for Lipstick/Brushes (since external assets might not be immediately available, procedural is safer/faster).
2.  **Scene Composition**: Replace `Hero` orb with floating beauty items in specific orbits.
3.  **Logo**: Implement `TextGeometry` with "Great Vibes" or similar cursive font shader (Rose Gold material).
4.  **Atmosphere**: Add "God Rays" shader and pink/lavender fog.

### 📦 Phase 4: Integration & Optimization
1.  **Performance**: Implement `OffscreenCanvas` for ML processing if possible, or WebWorker.
2.  **Asset Loading**: Lazy load 3D models and AI models.
3.  **State Management**: Connect all distinct components via Zustand.

---

## 3. Technology Stack Additions

| Category | Package | Purpose |
|----------|---------|---------|
| **AI / ML** | `@mediapipe/face_mesh` | Precise 468-point face tracking |
| | `@tensorflow/tfjs` | Core ML engine for browser |
| | `@tensorflow-models/blazeface` | Fast face application |
| | `face-api.js` | Gender/Age detection fallback |
| **3D Graphics** | `three-stdlib` | Advanced Geometries (TextGeometry) |
| | `@react-three/postprocessing` | Bloom, Depth of Field effects |
| | `lamina` | Layer based noisy materials (for petals/fabric) |
| **State** | `zustand` | Lightweight global state management |
| **UI Utils** | `react-compare-slider` | Before/After visual comparison |
| | `react-colorful` | Custom color picker for "Custom Shade" mode |

---

## 4. File Modification Plan

### 🆕 Files to Create
-   `src/data/makeupBrands.js`: Huge JSON object with nested Brand -> Category -> Product.
-   `src/components/makeup/MakeupStudio.jsx`: The main layout container for the Try-On feature.
-   `src/utils/faceLandmarks.js`: Math helpers to extract specific polygons (Lips, LeftEye, RightEye, Cheeks) from the 468 points.
-   `src/components/3d/BeautyItems.jsx`: Procedural generation of Lipstick, Compact, Brush using Three.js Primitives.

### 📝 Files to Modify
-   `src/components/Hero.jsx`: **Major Rewrite**. Remove `LiquidOrb`. Import `BeautyScene`. Update text and layout to align with "Girly" aesthetic.
-   `src/components/VirtualTryOn.jsx`: **Refactor**. Move logic to `hooks/useMakeupRender.js`. This file becomes just the view layer.
-   `src/components/HairstyleAI.jsx`: **Upgrade**. Replace mock `setTimeout` analysis with real TensorFlow execution.
-   `src/index.css`: Update root variables for new palette (`--color-rose`, `--color-champagne`, `--color-plum`).

### 🗑️ Files to Remove
-   *None essentially*, but content within `Hero.jsx` and `VirtualTryOn.jsx` will be replaced entirely.

---

## 5. Testing Strategy

### Browser Testing Agent Scenarios
1.  **Camera Permission**: Verify handling of "Allow/Deny" permissions gracefully.
2.  **Model Loading**: Ensure loading spinners appear while TF.js models initialize (1-3 seconds).
3.  **Brand Switch**: Verify clicking "Lakme" loads the correct red shade palette.
4.  **Performance**: Monitor FPS stats. If `< 24fps` on low-end, auto-disable High-Res Mesh.
5.  **Resize**: Ensure Face Canvas overlay aligns perfectly on window resize.

### Validation Benchmarks
-   **Lighting**: Makeup must look realistic in "Daylight" mode (multiply blend mode).
-   **Detection**: Gender detection must be consistent (~80% confidence).
-   **Responsiveness**: 3D Scene must not block scrolling on mobile.

---
**Status**: Plan Generated. Waiting for USER APPROVAL to proceed with **Step 2: Database Setup** and **Step 3: AI Model Integration** code implementation.
