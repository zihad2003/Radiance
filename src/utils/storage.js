// IndexedDB wrapper for Radiance Beauty Salon
// Stores saved makeup looks and bookings locally
// Also handles LocalStorage with fallback for privacy-conscious browsers

const DB_NAME = 'RadianceDB';
const DB_VERSION = 1;
const STORE_NAME = 'looks';

// --- LocalStorage Wrapper (Privacy Protection) ---

/**
 * Saves a value to localStorage with fallback to in-memory storage if blocked.
 * @param {string} key 
 * @param {any} value 
 * @returns {boolean} True if saved to localStorage, False if fallback used
 */
export const saveToStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.warn(`localStorage blocked for key "${key}", using in-memory storage`);
        // Fallback to in-memory storage
        window.tempStorage = window.tempStorage || {};
        window.tempStorage[key] = value;
        return false;
    }
};

/**
 * Retrieves a value from localStorage with fallback checking.
 * @param {string} key 
 * @returns {any | null}
 */
export const getFromStorage = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.warn(`localStorage blocked for key "${key}", using in-memory storage`);
        return window.tempStorage?.[key] || null;
    }
};

/**
 * Removes a key from storage
 * @param {string} key 
 */
export const removeFromStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        if (window.tempStorage) delete window.tempStorage[key];
    }
}


// --- IndexedDB Logic ---

const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                store.createIndex('timestamp', 'timestamp', { unique: false });
            }
            if (!db.objectStoreNames.contains('bookings')) {
                const bookingStore = db.createObjectStore('bookings', { keyPath: 'id' });
                bookingStore.createIndex('date', 'date', { unique: false });
                bookingStore.createIndex('status', 'status', { unique: false });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

export const saveLook = async (lookData) => {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);

        const look = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            ...lookData
        };

        await store.add(look);
        return look.id;
    } catch (error) {
        console.error("Failed to save look:", error);
        throw error;
    }
};

export const getAllLooks = async () => {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const index = store.index('timestamp'); // Sort by date

        return new Promise((resolve, reject) => {
            const request = index.getAll(); // get all items
            request.onsuccess = () => {
                // Return reversed (newest first)
                resolve(request.result.reverse());
            };
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error("Failed to fetch looks:", error);
        return [];
    }
};

export const deleteLook = async (id) => {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        await store.delete(id);
    } catch (error) {
        console.error("Failed to delete look:", error);
    }
};

export const saveBooking = async (bookingData) => {
    try {
        const db = await openDB();
        const tx = db.transaction('bookings', 'readwrite');
        const store = tx.objectStore('bookings');

        const booking = {
            id: bookingData.paymentID || crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            status: 'pending',
            ...bookingData
        };

        await store.put(booking);
        return booking.id;
    } catch (error) {
        console.error("Failed to save booking:", error);
        throw error;
    }
};

export const getBookings = async () => {
    try {
        const db = await openDB();
        const tx = db.transaction('bookings', 'readonly');
        const store = tx.objectStore('bookings');

        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result.reverse());
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.warn("Bookings store might not exist yet.", error);
        return [];
    }
};

export const updateBookingStatus = async (id, status) => {
    try {
        const db = await openDB();
        const tx = db.transaction('bookings', 'readwrite');
        const store = tx.objectStore('bookings');

        const booking = await new Promise((resolve, reject) => {
            const req = store.get(id);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });

        if (booking) {
            booking.status = status;
            await store.put(booking);
        }
    } catch (error) {
        console.error("Failed to update status", error);
    }
};
