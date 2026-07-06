import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function Analytics({ chartData, weeklyXp }) {
  return (
    <div className="panel glow-border" style={{ borderRadius: 12, padding: "16px" }}>
      <div style={{ fontSize: 14, color: "#8aa2b8", letterSpacing: 2, marginBottom: 16 }}>14-DAY ANALYTICS</div>
      
      <div style={{ marginBottom: 20, padding: 12, background: "rgba(94,201,255,0.06)", borderRadius: 8 }}>
        <div style={{ fontSize: 11, color: "#8aa2b8" }}>7-Day XP Total</div>
        <div className="orbitron" style={{ fontSize: 28, fontWeight: 900, color: "#5ec9ff" }}>{weeklyXp}</div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(94,201,255,0.1)" />
          <XAxis dataKey="date" stroke="#8aa2b8" style={{ fontSize: 12 }} />
          <YAxis stroke="#8aa2b8" style={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ background: "rgba(15,26,42,0.95)", border: "1px solid rgba(94,201,255,0.3)", borderRadius: 8, color: "#dfe8f0" }} />
          <Line type="monotone" dataKey="xp" stroke="#5ec9ff" strokeWidth={2} dot={{ fill: "#5ec9ff", r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}