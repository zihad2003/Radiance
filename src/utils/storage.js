// IndexedDB wrapper for Radiance Beauty Salon
// Stores saved makeup looks locally

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
