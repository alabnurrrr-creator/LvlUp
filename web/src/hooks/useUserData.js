import { useState, useEffect } from "react";

export const useUserData = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const res = await window.storage.get("user");
        if (res && res.value) {
          setUser(JSON.parse(res.value));
        }
      } catch (e) {
        console.error("Failed to load user data", e);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  return { user, loading };
};
