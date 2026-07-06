import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Plus, Trash2, Check, Zap, ChevronRight, ChevronLeft, X, Flame, TrendingUp, Calendar, Download, Share2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { RANKS, XP_PER_LEVEL, XP_PER_TASK, DEFAULT_TASK_TEMPLATES, DEFAULT_STATS } from "./constants";
import { rankFor, uid, todayStr, addDaysStr, daysAgoStr, dayDiff, formatDateLabel } from "./utils/helpers";

export default function SystemTracker() {
  const [hunterName, setHunterName] = useState("Player");
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [taskTemplates, setTaskTemplates] = useState(DEFAULT_TASK_TEMPLATES);
  const [completions, setCompletions] = useState({});
  const [statPoints, setStatPoints] = useState(0);
  const [log, setLog] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [levelUpFlash, setLevelUpFlash] = useState(false);
  const [streak, setStreak] = useState(0);
  const [lastActiveDate, setLastActiveDate] = useState(null);
  const [bestStreak, setBestStreak] = useState(0);
  const [viewDate, setViewDate] = useState(todayStr());
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddStat, setShowAddStat] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskStat, setNewTaskStat] = useState("");
  const [newStatName, setNewStatName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const canvasRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  // Persistence
  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("state");
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          setHunterName(parsed.hunterName ?? "Player");
          setLevel(parsed.level ?? 1);
          setXp(parsed.xp ?? 0);
          setStats(parsed.stats ?? DEFAULT_STATS);
          setTaskTemplates(parsed.taskTemplates ?? DEFAULT_TASK_TEMPLATES);
          setCompletions(parsed.completions ?? {});
          setStatPoints(parsed.statPoints ?? 0);
          setLog(parsed.log ?? []);
          setBestStreak(parsed.bestStreak ?? 0);
          setStreak(parsed.streak ?? 0);
          setLastActiveDate(parsed.lastActiveDate ?? null);
        }
      } catch (e) {
        console.log("No saved state");
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const save = useCallback(
    async (patch) => {
      const state = { hunterName, level, xp, stats, taskTemplates, completions, statPoints, log, streak, bestStreak, lastActiveDate, ...patch };
      try {
        await window.storage.set("state", JSON.stringify(state));
      } catch (e) {
        console.error("save failed", e);
      }
    },
    [hunterName, level, xp, stats, taskTemplates, completions, statPoints, log, streak, bestStreak, lastActiveDate]
  );

  useEffect(() => {
    if (loaded) save({});
  }, [hunterName, level, xp, stats, taskTemplates, completions, statPoints, log, streak, bestStreak, lastActiveDate, loaded, save]);

  const addLog = (msg) => {
    setLog((l) => [{ id: uid(), msg, t: Date.now() }, ...l].slice(0, 40));
  };

  const bumpStreak = (dateStr) => {
    const today = todayStr();
    if (dateStr !== today) return;
    if (lastActiveDate === today) return;
    let newStreak;
    if (!lastActiveDate) newStreak = 1;
    else {
      const diff = dayDiff(lastActiveDate, today);
      newStreak = diff === 1 ? streak + 1 : 1;
    }
    setStreak(newStreak);
    setLastActiveDate(today);
    if (newStreak > bestStreak) setBestStreak(newStreak);
    if (newStreak > 1) addLog(`🔥 ${newStreak}-day streak!`);
  };

  const gainXp = (amount) => {
    setXp((prevXp) => {
      let newXp = prevXp + amount;
      setLevel((prevLevel) => {
        let lvl = prevLevel;
        let gained = 0;
        while (newXp >= XP_PER_LEVEL) {
          newXp -= XP_PER_LEVEL;
          lvl += 1;
          gained += 1;
        }
        if (gained > 0) {
          setStatPoints((p) => p + gained * 3);
          setLevelUpFlash(true);
          setTimeout(() => setLevelUpFlash(false), 1400);
          addLog(`Leveled up to Lv.${lvl}!`);
        }
        return lvl;
      });
      return newXp;
    });
  };

  const loseXp = (amount) => {
    setXp((prevXp) => Math.max(0, prevXp - amount));
  };

  const toggleTask = (dateStr, task) => {
    const isDone = !!completions[dateStr]?.[task.id];
    setCompletions((c) => {
      const dayMap = { ...(c[dateStr] || {}) };
      if (isDone) delete dayMap[task.id];
      else dayMap[task.id] = true;
      return { ...c, [dateStr]: dayMap };
    });

    if (!isDone) {
      gainXp(XP_PER_TASK);
      if (task.stat) {
        setStats((ss) => ss.map((s) => (s.id === task.stat ? { ...s, value: s.value + 1 } : s)));
      }
      bumpStreak(dateStr);
      addLog(`[${dateStr}] "${task.title}" cleared (+${XP_PER_TASK} XP)`);
    } else {
      loseXp(XP_PER_TASK);
      if (task.stat) {
        setStats((ss) => ss.map((s) => (s.id === task.stat && s.value > 0 ? { ...s, value: s.value - 1 } : s)));
      }
      addLog(`[${dateStr}] "${task.title}" unchecked (-${XP_PER_TASK} XP)`);
    }
  };

  const addTaskTemplate = () => {
    if (!newTaskTitle.trim()) return;
    setTaskTemplates((ts) => [...ts, { id: uid(), title: newTaskTitle.trim(), stat: newTaskStat || null }]);
    setNewTaskTitle("");
    setNewTaskStat("");
    setShowAddTask(false);
  };

  const removeTaskTemplate = (id) => {
    setTaskTemplates((ts) => ts.filter((t) => t.id !== id));
  };

  const addStat = () => {
    if (!newStatName.trim()) return;
    setStats((ss) => [...ss, { id: uid(), name: newStatName.trim().toUpperCase(), value: 10 }]);
    setNewStatName("");
    setShowAddStat(false);
  };

  const allocatePoint = (id) => {
    if (statPoints <= 0) return;
    setStats((ss) => ss.map((s) => (s.id === id ? { ...s, value: s.value + 1 } : s)));
    setStatPoints((p) => p - 1);
  };

  const removeStat = (id) => setStats((ss) => ss.filter((s) => s.id !== id));

  const rank = rankFor(level);
  const pct = Math.min(100, Math.round((xp / XP_PER_LEVEL) * 100));
  const isToday = viewDate === todayStr();
  const dayCompletions = completions[viewDate] || {};
  const dayDoneCount = taskTemplates.filter((t) => dayCompletions[t.id]).length;

  const dailyXpFor = (dateStr) => {
    const map = completions[dateStr] || {};
    return Object.keys(map).filter((k) => map[k]).length * XP_PER_TASK;
  };

  const chartData = useMemo(() => {
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const date = daysAgoStr(i);
      days.push({ date: date.slice(5), xp: dailyXpFor(date) });
    }
    return days;
  }, [completions]);

  const weeklyXp = useMemo(() => chartData.slice(-7).reduce((sum, d) => sum + d.xp, 0), [chartData]);

  const downloadDayCard = () => {
    setDownloading(true);
    try {
      const W = 1080, H = 1350;
      const canvas = canvasRef.current;
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");

      const bg = ctx.createRadialGradient(W / 2, 0, 100, W / 2, H * 0.6, H);
      bg.addColorStop(0, "#0d1a2b");
      bg.addColorStop(0.5, "#060a12");
      bg.addColorStop(1, "#030509");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const link = document.createElement("a");
      link.download = `lvlup-${viewDate}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error("card export failed", e);
    } finally {
      setDownloading(false);
    }
  };

  if (!loaded) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#5ec9ff" }}>Loading...</div>;

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(1200px 800px at 50% -10%, #0d1a2b 0%, #060a12 45%, #030509 100%)",
      color: "#dfe8f0",
      fontFamily: "'Rajdhani', sans-serif",
      padding: "24px 16px 64px",
      boxSizing: "border-box",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@500;700;900&display=swap');
        * { box-sizing: border-box; }
        .panel { background: linear-gradient(180deg, rgba(15,26,42,0.85), rgba(8,14,24,0.9)); backdrop-filter: blur(6px); }
        .glow-border { border: 1px solid rgba(94, 201, 255, 0.25); box-shadow: 0 0 24px rgba(30,80,140,0.15); }
      `}</style>

      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="panel glow-border" style={{ borderRadius: 12, padding: "20px 24px", marginBottom: 16 }}>
          <h1 style={{ fontSize: 26, margin: 0, cursor: "pointer" }} onClick={() => setEditingName(true)}>{hunterName}</h1>
          <div style={{ fontSize: 32, fontWeight: 900 }}>Lv. {level}</div>
          <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
            <span>XP</span>
            <span>{xp} / {XP_PER_LEVEL}</span>
          </div>
          <div style={{ height: 10, background: "rgba(94,201,255,0.08)", borderRadius: 6, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #1e5a8c, #5ec9ff)", transition: "width 0.5s ease" }} />
          </div>
        </div>
      </div>
    </div>
  );
}