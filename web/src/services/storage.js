// Local storage service
export const storageService = {
  get: async (key) => {
    try {
      const value = localStorage.getItem(key);
      return { value };
    } catch (e) {
      console.error("Storage get failed", e);
      return { value: null };
    }
  },
  
  set: async (key, value) => {
    try {
      localStorage.setItem(key, value);
      return { success: true };
    } catch (e) {
      console.error("Storage set failed", e);
      return { success: false };
    }
  },
  
  remove: async (key) => {
    try {
      localStorage.removeItem(key);
      return { success: true };
    } catch (e) {
      console.error("Storage remove failed", e);
      return { success: false };
    }
  },
  
  clear: async () => {
    try {
      localStorage.clear();
      return { success: true };
    } catch (e) {
      console.error("Storage clear failed", e);
      return { success: false };
    }
  },
};

// Make available globally for the app
if (typeof window !== 'undefined') {
  window.storage = storageService;
}