import { Zap, X } from "lucide-react";

export default function StatsPanel({ stats, statPoints, onAllocatePoint, onRemoveStat, showAddStat, onShowAddStat, newStatName, setNewStatName, onAddStat }) {
  return (
    <div className="panel glow-border" style={{ borderRadius: 12, padding: "16px", marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 14, color: "#8aa2b8", letterSpacing: 2 }}>STATS</div>
        <button className="btn-primary" onClick={() => onShowAddStat(!showAddStat)} style={{ padding: "6px 12px", fontSize: 12 }}>
          <Zap size={14} style={{ marginRight: 4 }} /> Add
        </button>
      </div>

      {showAddStat && (
        <div style={{ marginBottom: 12, padding: 12, background: "rgba(94,201,255,0.06)", borderRadius: 8 }}>
          <input placeholder="Stat name (e.g., POW, INT)" value={newStatName} onChange={(e) => setNewStatName(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-primary" onClick={onAddStat} style={{ flex: 1, fontSize: 12 }}>Add</button>
            <button className="btn-primary" onClick={() => onShowAddStat(false)} style={{ flex: 1, fontSize: 12, background: "rgba(217,74,74,0.3)", border: "1px solid rgba(217,74,74,0.5)" }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {stats.map((s) => (
          <div key={s.id} style={{ padding: 12, background: "rgba(94,201,255,0.06)", borderRadius: 8, border: "1px solid rgba(94,201,255,0.15)", position: "relative" }}>
            <div style={{ fontSize: 11, color: "#8aa2b8", marginBottom: 6 }}>{s.name}</div>
            <div className="orbitron" style={{ fontSize: 28, fontWeight: 900, color: "#5ec9ff", marginBottom: 8 }}>{s.value}</div>
            <button className="btn-primary" onClick={() => onAllocatePoint(s.id)} style={{ width: "100%", fontSize: 11, padding: "6px 8px", opacity: statPoints > 0 ? 1 : 0.5, cursor: statPoints > 0 ? "pointer" : "default" }} disabled={statPoints <= 0}>
              <Zap size={12} style={{ marginRight: 4 }} /> +1
            </button>
            <button onClick={() => onRemoveStat(s.id)} style={{ position: "absolute", top: 8, right: 8, background: "none", border: "none", color: "#d94a4a", cursor: "pointer", padding: 0 }}>
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}