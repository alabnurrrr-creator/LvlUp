import { useState, useEffect } from "react";

export const useLeaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        // TODO: Replace with Firebase Firestore call
        setPlayers([]);
      } catch (e) {
        console.error("Failed to load leaderboard", e);
      } finally {
        setLoading(false);
      }
    };
    loadLeaderboard();
  }, []);

  return { players, loading };
};
