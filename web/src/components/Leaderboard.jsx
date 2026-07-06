import { useState } from "react";
import { Trophy, Medal, Flame } from "lucide-react";

export default function Leaderboard({ players = [] }) {
  const topPlayers = players.sort((a, b) => b.level - a.level || b.xp - a.xp).slice(0, 100);

  return (
    <div className="panel glow-border" style={{ borderRadius: 12, padding: "16px", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <Trophy size={18} color="#e8c34a" />
        <div style={{ fontSize: 14, color: "#8aa2b8", letterSpacing: 2 }}>GLOBAL LEADERBOARD</div>
      </div>

      {topPlayers.length === 0 ? (
        <div style={{ textAlign: "center", padding: 20, color: "#4a5566", fontSize: 12 }}>No players yet</div>
      ) : (
        <div>
          {topPlayers.map((player, idx) => {
            const medalColor = idx === 0 ? "#e8c34a" : idx === 1 ? "#a0a0a0" : idx === 2 ? "#cd7f32" : "#5ec9ff";
            return (
              <div key={player.id || idx} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(94,201,255,0.1)", gap: 12 }}>
                <div style={{ width: 32, textAlign: "center" }}>
                  {idx < 3 ? (
                    <Medal size={16} color={medalColor} />
                  ) : (
                    <div style={{ fontSize: 12, color: "#8aa2b8", fontWeight: 700 }}>#{idx + 1}</div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#dfe8f0", fontSize: 13, fontWeight: 500 }}>{player.name}</div>
                  <div style={{ fontSize: 11, color: "#4a5566", marginTop: 2 }}>Lv. {player.level} • {player.xp} XP</div>
                </div>
                {player.streak > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#e8a34a" }}>
                    <Flame size={12} /> {player.streak}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}