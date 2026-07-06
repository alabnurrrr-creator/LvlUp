export const RANKS = [
  { max: 4, label: "E-RANK", color: "#7a8b99" },
  { max: 9, label: "D-RANK", color: "#5ec9c9" },
  { max: 14, label: "C-RANK", color: "#4a90d9" },
  { max: 19, label: "B-RANK", color: "#a56bd9" },
  { max: 29, label: "A-RANK", color: "#d94a4a" },
  { max: Infinity, label: "S-RANK", color: "#e8c34a" },
];

export const XP_PER_LEVEL = 1000;
export const XP_PER_TASK = 1;

export const DEFAULT_TASK_TEMPLATES = [
  { id: Math.random().toString(36).slice(2, 10), title: "Workout", stat: null },
  { id: Math.random().toString(36).slice(2, 10), title: "Read 30 minutes", stat: null },
  { id: Math.random().toString(36).slice(2, 10), title: "No junk food", stat: null },
];

export const DEFAULT_STATS = [
  { id: Math.random().toString(36).slice(2, 10), name: "STR", value: 10 },
  { id: Math.random().toString(36).slice(2, 10), name: "VIT", value: 10 },
  { id: Math.random().toString(36).slice(2, 10), name: "AGI", value: 10 },
];