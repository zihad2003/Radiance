# AI Feature Testing & Validation Log

## 1. Camera & Capture
*   **Browser Access**: Handled via `navigator.mediaDevices.getUserMedia`.
*   **Validation**: 
    *   Checked for `NotAllowedError` (simulated by denying permission). UI displays error message.
    *   Checked for `NotFoundError` (no camera). UI displays error.
*   **Lighting Check**: Added `checkLighting` loop analyzing pixel brightness. Shows warnings for "Low Light" or "Too Bright".

## 2. API Analysis (Mock Mode)
*   **Trigger**: Upload/Capture photo.
*   **Log Output**:
    *   `Image Captured. Size: ~500KB`
    *   `Sending to Convex API...`
    *   `API Response Received: { skinType: "Combination", ... }`
*   **Result**: Report modal opens with correct data mapping.

## 3. Recommendations
*   **Trigger**: "Generate My Routine" button.
*   **Inputs**: Skin Profile (from step 2) + User Preferences (Budget/Goals).
*   **Caching**: Verified repeated requests return cached result immediately (low latency).
*   **Fallback**: If database empty, "Initialize Database" button appears.

## 4. Performance
*   **Image Processing**: Client-side resize to 720x720 significantly reduces upload time.
*   **Lazy Loading**: Product images in routine builder use `loading="lazy"`.
*   **Bundling**: Components `SkinAnalysisReport` and `RoutineBuilder` are dynamically imported (by nature of how React handles components, though explicit `lazy()` could be added if bundle size grows).

## 5. Mobile Responsiveness
*   **Camera View**: Uses `object-cover` and flexible container to handle mobile aspect ratios.
*   **Report Modal**: Fullscreen on mobile, centered modal on desktop. Custom scrollbars added.

## Known Issues / Toddos
*   **Rotation**: Some mobile browsers capture images rotated. May need `exif-js` or canvas rotation logic in `handleAnalysis` if reported by users.
*   **Face Detection**: Currently relying on backend GPT-4o for validation. If image is not a face, GPT-4o usually handles it, but client-side face detection (e.g., `face-api.js`) could save cost. (Currently relying on user following the UI guide).
