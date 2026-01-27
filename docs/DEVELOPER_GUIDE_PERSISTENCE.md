# 🔧 Developer Guide: Data Persistence Implementation

## Technical Architecture

### Overview
The Radiance data persistence system uses a **hybrid storage approach**:
- **localStorage**: For lightweight state (makeup config, settings)
- **IndexedDB**: For heavy data (images, metadata)

This ensures optimal performance while handling large image files efficiently.

---

## 1. localStorage Implementation

### Storage Keys
```javascript
const STORAGE_KEYS = {
  MAKEUP_STATE: 'radiance_makeup_state',
  BEAUTY_SETTINGS: 'radiance_beauty_settings'
};
```

### Auto-Save Hook (MakeupStudio.jsx)
```javascript
// Persist makeup state
useEffect(() => {
  if (Object.keys(makeupState).length > 0) {
    localStorage.setItem(
      'radiance_makeup_state', 
      JSON.stringify(makeupState)
    );
  }
}, [makeupState]);

// Persist beauty settings
useEffect(() => {
  localStorage.setItem(
    'radiance_beauty_settings', 
    JSON.stringify(beautySettings)
  );
}, [beautySettings]);
```

### Auto-Load Hook (MakeupStudio.jsx)
```javascript
useEffect(() => {
  const savedMakeupState = localStorage.getItem('radiance_makeup_state');
  const savedBeautySettings = localStorage.getItem('radiance_beauty_settings');
  
  if (savedMakeupState) {
    try {
      setMakeupState(JSON.parse(savedMakeupState));
    } catch (e) {
      console.error('Failed to load makeup state:', e);
    }
  }
  
  if (savedBeautySettings) {
    try {
      setBeautySettings(JSON.parse(savedBeautySettings));
    } catch (e) {
      console.error('Failed to load beauty settings:', e);
    }
  }
}, []);
```

### Data Structure
```javascript
// makeupState
{
  lips: {
    color: "#FF6B9D",
    opacity: 0.8,
    productId: "lipstick-123",
    finish: "matte"
  },
  eyes: {
    color: "#8B4513",
    opacity: 0.6,
    productId: "eyeshadow-456",
    finish: "shimmer"
  },
  blush: {
    color: "#FFB6C1",
    opacity: 0.5,
    productId: "blush-789"
  },
  face: {
    color: null,
    opacity: 0.0
  }
}

// beautySettings
{
  smoothing: 40,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  lighting: "natural",
  vignette: 0
}
```

---

## 2. IndexedDB Implementation

### Database Schema (storage.js)
```javascript
const DB_NAME = 'RadianceDB';
const DB_VERSION = 1;
const STORE_NAME = 'looks';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
```

### Save Look Function
```javascript
export const saveLook = async (lookData) => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  
  const look = {
    id: `look-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    ...lookData,
    timestamp: lookData.timestamp || Date.now()
  };
  
  return new Promise((resolve, reject) => {
    const request = store.add(look);
    request.onsuccess = () => resolve(look);
    request.onerror = () => reject(request.error);
  });
};
```

### Get All Looks Function
```javascript
export const getAllLooks = async () => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => {
      // Sort by timestamp (newest first)
      const looks = request.result.sort((a, b) => b.timestamp - a.timestamp);
      resolve(looks);
    };
    request.onerror = () => reject(request.error);
  });
};
```

### Delete Look Function
```javascript
export const deleteLook = async (id) => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  
  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
```

### Look Data Structure
```javascript
{
  id: "look-1706284800000-abc123xyz",
  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  makeupState: {
    lips: { color: "#FF6B9D", opacity: 0.8, ... },
    eyes: { color: "#8B4513", opacity: 0.6, ... },
    // ... other makeup
  },
  beautySettings: {
    smoothing: 40,
    brightness: 100,
    // ... other settings
  },
  timestamp: 1706284800000,
  name: "Look 1/26/2026 7:42:54 PM"
}
```

---

## 3. Canvas Capture Implementation

### FaceCanvas Component (forwardRef)
```javascript
const FaceCanvas = forwardRef(({ activeMakeup, landmarks, videoRef, beautySettings }, ref) => {
  const internalCanvasRef = useRef(null);
  
  // Expose canvas to parent via ref
  useImperativeHandle(ref, () => internalCanvasRef.current);
  
  // ... rendering logic
  
  return <canvas ref={internalCanvasRef} />;
});
```

### Save Look Handler (MakeupStudio.jsx)
```javascript
const handleSaveLook = async () => {
  if (!isCameraActive) return;
  setSaving(true);
  
  try {
    // Get canvas reference
    const canvas = faceCanvasRef.current;
    if (!canvas || !videoRef.current) {
      throw new Error('Canvas or video not available');
    }

    // Create output canvas
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = videoRef.current.videoWidth;
    outputCanvas.height = videoRef.current.videoHeight;
    const ctx = outputCanvas.getContext('2d');

    // Draw video frame
    ctx.drawImage(videoRef.current, 0, 0);
    
    // Draw makeup overlay
    ctx.drawImage(canvas, 0, 0);

    // Convert to base64 PNG
    const imageData = outputCanvas.toDataURL('image/png');
    
    // Create look data
    const lookData = {
      image: imageData,
      makeupState,
      beautySettings,
      timestamp: Date.now(),
      name: `Look ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    };

    // Save to IndexedDB
    await saveLook(lookData);
    
    // Reload gallery
    const looks = await getAllLooks();
    setSavedLooks(looks || []);
    
    alert('✨ Look saved successfully!');
  } catch (error) {
    console.error('Failed to save look:', error);
    alert('❌ Failed to save look: ' + error.message);
  } finally {
    setSaving(false);
  }
};
```

---

## 4. My Looks Gallery UI

### State Management
```javascript
const [savedLooks, setSavedLooks] = useState([]);
const [showMyLooks, setShowMyLooks] = useState(false);

// Load looks on mount
useEffect(() => {
  const loadSavedLooks = async () => {
    try {
      const looks = await getAllLooks();
      setSavedLooks(looks || []);
    } catch (error) {
      console.error('Failed to load saved looks:', error);
    }
  };
  loadSavedLooks();
}, []);
```

### Gallery Modal Component
```jsx
<AnimatePresence>
  {showMyLooks && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
      onClick={() => setShowMyLooks(false)}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent p-6 text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif italic mb-1">My Saved Looks</h2>
            <p className="text-xs text-white/70">{savedLooks.length} looks saved locally</p>
          </div>
          <button
            onClick={() => setShowMyLooks(false)}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Close My Looks"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {savedLooks.length === 0 ? (
            <EmptyState />
          ) : (
            <LooksGrid looks={savedLooks} />
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-green-500" />
              <span>All looks are stored locally on your device</span>
            </div>
            <button
              onClick={() => {
                if (confirm('Clear all saved looks? This cannot be undone.')) {
                  savedLooks.forEach(look => deleteLook(look.id));
                  setSavedLooks([]);
                }
              }}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Clear All
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

### Look Card Component
```jsx
<motion.div
  key={look.id}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="group relative bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-primary/30 transition-all shadow-lg hover:shadow-2xl"
>
  {/* Image */}
  <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
    <img
      src={look.image}
      alt={look.name || 'Saved Look'}
      className="w-full h-full object-cover"
    />
    
    {/* Hover Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
      <div className="flex gap-2">
        <button
          onClick={() => handleLoadLook(look)}
          className="flex-1 bg-primary text-white py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <Sparkles size={14} />
          Load
        </button>
        <button
          onClick={() => handleExportLook(look)}
          className="flex-1 bg-white text-charcoal py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
        >
          <Download size={14} />
          Export
        </button>
        <button
          onClick={() => {
            if (confirm('Delete this look?')) {
              handleDeleteLook(look.id);
            }
          }}
          className="bg-red-500 text-white py-2 px-3 rounded-lg text-xs font-bold hover:bg-red-600 transition-colors flex items-center justify-center"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  </div>

  {/* Info */}
  <div className="p-4">
    <h4 className="font-bold text-sm text-gray-800 mb-1 line-clamp-1">
      {look.name || 'Untitled Look'}
    </h4>
    <p className="text-xs text-gray-400">
      {new Date(look.timestamp).toLocaleDateString()} at {new Date(look.timestamp).toLocaleTimeString()}
    </p>
  </div>
</motion.div>
```

---

## 5. Action Handlers

### Load Look
```javascript
const handleLoadLook = (look) => {
  if (look.makeupState) {
    setMakeupState(look.makeupState);
  }
  if (look.beautySettings) {
    setBeautySettings(look.beautySettings);
  }
  setShowMyLooks(false);
  alert('✨ Look loaded! Apply to your face.');
};
```

### Export Look
```javascript
const handleExportLook = (look) => {
  const link = document.createElement('a');
  link.href = look.image;
  link.download = `radiance-${look.name || 'look'}-${Date.now()}.png`;
  link.click();
};
```

### Delete Look
```javascript
const handleDeleteLook = async (lookId) => {
  try {
    await deleteLook(lookId);
    const looks = await getAllLooks();
    setSavedLooks(looks || []);
  } catch (error) {
    console.error('Failed to delete look:', error);
    alert('Failed to delete look');
  }
};
```

---

## 6. Performance Optimizations

### Debounced Auto-Save (Optional)
```javascript
// Add debounce to reduce localStorage writes
import { debounce } from 'lodash';

const debouncedSave = useMemo(
  () => debounce((state) => {
    localStorage.setItem('radiance_makeup_state', JSON.stringify(state));
  }, 500),
  []
);

useEffect(() => {
  if (Object.keys(makeupState).length > 0) {
    debouncedSave(makeupState);
  }
}, [makeupState, debouncedSave]);
```

### Lazy Loading Images
```javascript
// Use Intersection Observer for lazy loading in gallery
const [visibleLooks, setVisibleLooks] = useState([]);

useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Load image
      }
    });
  });
  
  // Observe look cards
}, []);
```

### Image Compression (Optional)
```javascript
// Compress images before saving
const compressImage = (dataUrl, quality = 0.8) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = dataUrl;
  });
};
```

---

## 7. Error Handling

### Try-Catch Blocks
```javascript
// Always wrap IndexedDB operations in try-catch
try {
  await saveLook(lookData);
} catch (error) {
  console.error('Failed to save look:', error);
  
  // Check for quota exceeded error
  if (error.name === 'QuotaExceededError') {
    alert('Storage full! Please delete old looks.');
  } else {
    alert('Failed to save look: ' + error.message);
  }
}
```

### Storage Quota Check
```javascript
const checkStorageQuota = async () => {
  if (navigator.storage && navigator.storage.estimate) {
    const estimate = await navigator.storage.estimate();
    const percentUsed = (estimate.usage / estimate.quota) * 100;
    
    if (percentUsed > 90) {
      console.warn('Storage almost full:', percentUsed.toFixed(2) + '%');
    }
    
    return {
      used: estimate.usage,
      total: estimate.quota,
      percentUsed
    };
  }
};
```

---

## 8. Testing

### Unit Tests (Jest)
```javascript
import { saveLook, getAllLooks, deleteLook } from './storage';

describe('Storage Utils', () => {
  beforeEach(() => {
    // Clear IndexedDB before each test
    indexedDB.deleteDatabase('RadianceDB');
  });

  test('saveLook should save a look', async () => {
    const lookData = {
      image: 'data:image/png;base64,test',
      makeupState: {},
      beautySettings: {},
      timestamp: Date.now(),
      name: 'Test Look'
    };
    
    const saved = await saveLook(lookData);
    expect(saved.id).toBeDefined();
  });

  test('getAllLooks should return all looks', async () => {
    await saveLook({ /* ... */ });
    await saveLook({ /* ... */ });
    
    const looks = await getAllLooks();
    expect(looks.length).toBe(2);
  });

  test('deleteLook should remove a look', async () => {
    const saved = await saveLook({ /* ... */ });
    await deleteLook(saved.id);
    
    const looks = await getAllLooks();
    expect(looks.length).toBe(0);
  });
});
```

### Integration Tests
```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MakeupStudio from './MakeupStudio';

test('should save and load a look', async () => {
  render(<MakeupStudio />);
  
  // Apply makeup
  // ...
  
  // Save look
  const saveButton = screen.getByText('Save Look to Bag');
  fireEvent.click(saveButton);
  
  await waitFor(() => {
    expect(screen.getByText('✨ Look saved successfully!')).toBeInTheDocument();
  });
  
  // Open gallery
  const galleryButton = screen.getByLabelText('My Looks Gallery');
  fireEvent.click(galleryButton);
  
  // Verify look appears
  expect(screen.getByText(/Test Look/i)).toBeInTheDocument();
});
```

---

## 9. Browser Compatibility

### Feature Detection
```javascript
const checkBrowserSupport = () => {
  const support = {
    localStorage: typeof Storage !== 'undefined',
    indexedDB: 'indexedDB' in window,
    canvas: !!document.createElement('canvas').getContext
  };
  
  if (!support.indexedDB) {
    console.warn('IndexedDB not supported. Saved looks feature disabled.');
  }
  
  return support;
};
```

### Polyfills
```javascript
// Add IndexedDB polyfill for older browsers
import 'indexeddb-polyfill';
```

---

## 10. Security Considerations

### Data Sanitization
```javascript
// Sanitize user input before saving
const sanitizeLookName = (name) => {
  return name.replace(/[<>]/g, '').trim();
};
```

### XSS Prevention
```javascript
// Never use dangerouslySetInnerHTML with user data
// Always use text content or sanitized HTML
```

### CORS for Image Export
```javascript
// Ensure canvas is not tainted by cross-origin images
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
ctx.drawImage(video, 0, 0); // Same-origin only
```

---

## 📚 Additional Resources

- [IndexedDB API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [localStorage API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Canvas API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Storage Quota Management](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API)

---

**Happy Coding! 🚀**
