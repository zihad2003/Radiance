# Radiance Salon - AI Beauty Platform 💄💇‍♀️

An advanced, AI-powered progressive web app for the Radiance Beauty Salon, serving the Dhaka market with world-class tech.

## 🌟 Key Features

### 1. AI Virtual Makeup Studio
- **Multi-Brand Support**: International Giants (MAC, Maybelline) & Local Favorites (Lakmé, Affaire).
- **Part-Specific Try-On**: Precisely apply lipstick, eyeshadow, blush, or foundation.
- **Smart Rendering**: Matte, Glossy, and Sheer finish simulations using WebGL.
- **Real-Time Tracking**: 468-point face mesh tracking for perfect alignment.

### 2. AI Hairstyle Consultant
- **Face Shape Analysis**: Detects if your face is Oval, Round, Square, etc.
- **Gender Detection**: Adapts recommendations for Men and Women.
- **Style Matcher**: Recommends cuts based on geometry (e.g., "Long layers for Round face").
- **Virtual Preview**: Overlay trending hairstyles on your selfie.

### 3. Immersive 3D Experience
- **Interactive Hero**: Detailed 3D lipsticks and compacts floating in a "Beautyverse".
- **Girly Aesthetic**: Soft Rose Gold & Champagne palette with glassmorphism UI.
- **Performance**: Optimized GLSL shaders and React Three Fiber scene.

### 4. Smart Booking & Engagement
- **WhatsApp Integration**: Conversational AI bot handling bookings.
- **Gamification**: "Spin the Wheel" for discounts.
- **Localization**: Tailored content for Bangladesh (Gulshan/Dhaka context).

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4
- **3D Graphics**: Three.js, React Three Fiber, Framer Motion
- **AI/ML**: MediaPipe Face Mesh, TensorFlow.js
- **State Management**: React State / standard hooks

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```
*Note: Using `--legacy-peer-deps` may be required due to TensorFlow versioning.*

### 2. Environment Configuration
The application requires several environment variables to function correctly (e.g., Convex database URL, Analytics IDs).

1. Copy the example environment file:
   ```bash
   cp env.example .env.local
   ```
2. Open `.env.local` and fill in the required values:
   - `VITE_CONVEX_URL`: Your Convex deployment URL.
   - `VITE_GA_MEASUREMENT_ID`: Google Analytics 4 ID (Optional).
   - `VITE_CLARITY_PROJECT_ID`: Microsoft Clarity ID (Optional).

*The app will perform a validation check on startup and alert you if required variables are missing.*

### 3. Run Development Server
```bash
npm run dev
```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📱 Browser Support
- Chrome (Desktop/Android) - *Recommended*
- Safari (iOS 14+)
- Firefox
- Edge

---
*Built with ❤️ by Antigravity AI*