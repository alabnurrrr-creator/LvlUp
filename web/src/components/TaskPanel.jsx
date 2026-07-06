import React, { useState } from "react";
import { Plus, Trash2, Check, X } from "lucide-react";

export default function TaskPanel({ tasks, completions, viewDate, onToggleTask, onAddTask, onRemoveTask, showAddTask, onShowAddTask, newTaskTitle, setNewTaskTitle, newTaskStat, setNewTaskStat, stats }) {
  const dayCompletions = completions[viewDate] || {};
  const dayDoneCount = tasks.filter((t) => dayCompletions[t.id]).length;

  return (
    <div className="panel glow-border" style={{ borderRadius: 12, padding: "16px", marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 14, color: "#8aa2b8", letterSpacing: 2 }}>QUESTS</div>
        <button className="btn-primary" onClick={() => onShowAddTask(!showAddTask)} style={{ padding: "6px 12px", fontSize: 12 }}>
          <Plus size={14} style={{ marginRight: 4 }} /> Add
        </button>
      </div>

      {showAddTask && (
        <div style={{ marginBottom: 12, padding: 12, background: "rgba(94,201,255,0.06)", borderRadius: 8 }}>
          <input placeholder="Task title" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />
          <select value={newTaskStat} onChange={(e) => setNewTaskStat(e.target.value)} style={{ width: "100%", marginBottom: 8 }}>
            <option value="">No stat boost</option>
            {stats.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-primary" onClick={onAddTask} style={{ flex: 1, fontSize: 12 }}><Check size={14} /> Add</button>
            <button className="btn-primary" onClick={() => onShowAddTask(false)} style={{ flex: 1, fontSize: 12, background: "rgba(217,74,74,0.3)", border: "1px solid rgba(217,74,74,0.5)" }}><X size={14} /> Cancel</button>
          </div>
        </div>
      )}

      {tasks.length === 0 ? (
        <div style={{ textAlign: "center", padding: 20, color: "#4a5566", fontSize: 12 }}>No tasks yet. Add one to get started!</div>
      ) : (
        tasks.map((task) => {
          const done = !!dayCompletions[task.id];
          return (
            <div key={task.id} className="quest-row" style={{ display: "flex", alignItems: "center", padding: 12, borderBottom: "1px solid rgba(94,201,255,0.1)", borderRadius: 8, cursor: "pointer", transition: "all 0.2s" }} onClick={() => onToggleTask(viewDate, task)}>
              <div style={{ width: 24, height: 24, border: `2px solid ${done ? "#7ee8a0" : "#5ec9ff"}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 12, background: done ? "rgba(126,232,160,0.1)" : "transparent" }}>
                {done && <Check size={16} color="#7ee8a0" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: done ? "#7ee8a0" : "#dfe8f0", textDecoration: done ? "line-through" : "none" }}>{task.title}</div>
                {task.stat && <div style={{ fontSize: 11, color: "#4a5566", marginTop: 2 }}>+1 {stats.find(s => s.id === task.stat)?.name}</div>}
              </div>
              <button onClick={(e) => { e.stopPropagation(); onRemoveTask(task.id); }} style={{ background: "none", border: "none", color: "#d94a4a", cursor: "pointer", padding: 0 }}>
                <Trash2 size={14} />
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}