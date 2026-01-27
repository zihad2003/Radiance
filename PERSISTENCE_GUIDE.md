# 💾 Radiance Beauty Salon - Data Persistence Guide

## Overview

Radiance now features a **comprehensive data persistence system** that ensures users never lose their makeup configurations, saved looks, or preferences. All data is stored **locally on the user's device** for privacy and performance.

---

## 🎯 Features Implemented

### 1. **localStorage - Lightweight State Persistence**
- **Makeup State**: Automatically saves current makeup configuration (lipstick, eyeshadow, blush, etc.)
- **Beauty Settings**: Persists skin smoothing, brightness, contrast, saturation, and lighting preferences
- **Auto-Save**: Changes are saved in real-time as users adjust settings
- **Auto-Load**: Previous session state is restored when the app reopens

**Storage Keys:**
- `radiance_makeup_state` - Current makeup configuration
- `radiance_beauty_settings` - Beauty filter settings

### 2. **IndexedDB - Image Storage**
- **Saved Looks**: Stores high-resolution captured images with full makeup overlays
- **Metadata**: Each look includes:
  - Image data (base64 PNG)
  - Makeup configuration (for re-applying)
  - Beauty settings
  - Timestamp
  - Custom name
- **Efficient**: Handles large image files without performance impact
- **Persistent**: Data survives browser refreshes and closures

**Database Structure:**
```javascript
{
  id: "unique-id",
  image: "data:image/png;base64,...",
  makeupState: { lips: {...}, eyes: {...}, ... },
  beautySettings: { smoothing: 40, brightness: 100, ... },
  timestamp: 1706284800000,
  name: "Look 1/26/2026 7:42:54 PM"
}
```

### 3. **My Looks Gallery**
A beautiful modal interface for managing saved looks:

**Features:**
- **Grid Display**: Responsive 3-column grid (1 column on mobile)
- **Hover Actions**: Load, Export, Delete buttons appear on hover
- **Empty State**: Friendly message when no looks are saved
- **Privacy Badge**: Reminds users data is stored locally

**Actions:**
- **Load**: Restores the makeup configuration to your face
- **Export**: Downloads the image as PNG
- **Delete**: Removes the look from storage (with confirmation)
- **Clear All**: Bulk delete all saved looks (with confirmation)

### 4. **Export Functionality**
- **One-Click Download**: Export any saved look as a PNG image
- **Smart Naming**: Files are named `radiance-{look-name}-{timestamp}.png`
- **High Quality**: Full resolution images preserved

---

## 🔧 Technical Implementation

### Storage Utilities (`src/utils/storage.js`)

#### **saveLook(lookData)**
Saves a new look to IndexedDB.

```javascript
const lookData = {
  image: "data:image/png;base64,...",
  makeupState: { /* current makeup */ },
  beautySettings: { /* current filters */ },
  timestamp: Date.now(),
  name: "My Custom Look"
};

await saveLook(lookData);
```

#### **getAllLooks()**
Retrieves all saved looks, sorted by timestamp (newest first).

```javascript
const looks = await getAllLooks();
console.log(looks); // Array of look objects
```

#### **deleteLook(id)**
Deletes a specific look by ID.

```javascript
await deleteLook("look-id-123");
```

### Capture Logic (`src/components/makeup/MakeupStudio.jsx`)

The `handleSaveLook` function:
1. Creates a temporary canvas
2. Draws the video frame
3. Overlays the makeup canvas
4. Converts to base64 PNG
5. Saves to IndexedDB with metadata

```javascript
const handleSaveLook = async () => {
  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = videoRef.current.videoWidth;
  outputCanvas.height = videoRef.current.videoHeight;
  const ctx = outputCanvas.getContext('2d');

  // Draw video + makeup overlay
  ctx.drawImage(videoRef.current, 0, 0);
  ctx.drawImage(faceCanvasRef.current, 0, 0);

  const imageData = outputCanvas.toDataURL('image/png');
  
  await saveLook({
    image: imageData,
    makeupState,
    beautySettings,
    timestamp: Date.now(),
    name: `Look ${new Date().toLocaleDateString()}`
  });
};
```

---

## 📱 User Experience

### Automatic State Restoration
1. User applies makeup and adjusts settings
2. User closes the browser
3. User reopens Radiance
4. ✨ **All settings are automatically restored!**

### Saving a Look
1. Apply desired makeup
2. Click "Save Look to Bag" button
3. Look is captured and saved to IndexedDB
4. Success notification appears

### Viewing Saved Looks
1. Click the **Gallery icon** (📷) in the control bar
2. "My Looks" modal opens
3. Browse all saved looks in a beautiful grid

### Loading a Saved Look
1. Open "My Looks" gallery
2. Hover over a look
3. Click "Load" button
4. Makeup configuration is applied to your current session

### Exporting a Look
1. Open "My Looks" gallery
2. Hover over a look
3. Click "Export" button
4. Image downloads as PNG

---

## 🔒 Privacy & Security

### Local-Only Storage
- **No Server Upload**: All images and data stay on the user's device
- **No Cloud Sync**: Data never leaves the browser
- **No Tracking**: No analytics on saved looks

### Data Ownership
- Users have full control over their data
- "Clear All" button for bulk deletion
- Individual delete for each look

### Browser Compatibility
- **localStorage**: Supported in all modern browsers
- **IndexedDB**: Supported in Chrome, Firefox, Safari, Edge
- **Fallback**: Graceful degradation if IndexedDB is unavailable

---

## 🎨 UI Components

### My Looks Gallery Modal
- **Header**: Shows count of saved looks
- **Content Area**: Scrollable grid of look cards
- **Footer**: Privacy badge and "Clear All" button

### Look Card
- **Image**: Full aspect-ratio preview
- **Info**: Name and timestamp
- **Actions** (on hover):
  - Load (primary button)
  - Export (secondary button)
  - Delete (danger button)

---

## 🚀 Future Enhancements

### Potential Features
1. **Cloud Sync** (optional): Allow users to sync looks across devices
2. **Social Sharing**: Share looks directly to Instagram, TikTok
3. **Look Collections**: Organize looks into folders/categories
4. **AI Recommendations**: Suggest looks based on saved preferences
5. **Wishlist**: Save products to a wishlist for later purchase
6. **Virtual Wardrobe**: Match makeup looks with outfit photos

### User Accounts (Optional)
If implementing user authentication:
- Sync looks across devices
- Share looks with friends
- Public/private look galleries
- Like and comment on community looks

---

## 📊 Storage Limits

### localStorage
- **Limit**: ~5-10 MB per domain
- **Usage**: Minimal (JSON strings for state)
- **Sufficient for**: Thousands of state saves

### IndexedDB
- **Limit**: ~50 MB - 1 GB (browser-dependent)
- **Usage**: ~500 KB per high-res image
- **Sufficient for**: 100-2000 saved looks

### Monitoring Storage
Users can check storage usage in browser DevTools:
- Chrome: Application → Storage
- Firefox: Storage Inspector

---

## 🛠️ Developer Notes

### Testing Persistence
1. Apply makeup and settings
2. Refresh the page
3. Verify state is restored
4. Save a look
5. Refresh and check "My Looks" gallery

### Debugging
```javascript
// View localStorage
console.log(localStorage.getItem('radiance_makeup_state'));
console.log(localStorage.getItem('radiance_beauty_settings'));

// View IndexedDB (Chrome DevTools)
// Application → IndexedDB → RadianceDB → looks
```

### Clearing Data (for testing)
```javascript
// Clear localStorage
localStorage.removeItem('radiance_makeup_state');
localStorage.removeItem('radiance_beauty_settings');

// Clear IndexedDB
indexedDB.deleteDatabase('RadianceDB');
```

---

## ✅ Checklist: Data Persistence Complete

- [x] localStorage for makeup state
- [x] localStorage for beauty settings
- [x] IndexedDB for saved looks
- [x] Auto-save on state change
- [x] Auto-load on app mount
- [x] My Looks gallery UI
- [x] Load saved look functionality
- [x] Export/download images
- [x] Delete individual looks
- [x] Clear all looks
- [x] Privacy-first design
- [x] Responsive UI
- [x] Error handling
- [x] User feedback (alerts)

---

## 📞 Support

For issues or questions about data persistence:
1. Check browser console for errors
2. Verify browser supports IndexedDB
3. Check storage quota in DevTools
4. Clear browser cache and retry

---

**Built with ❤️ for Radiance Beauty Salon**
