export const downloadFile = (data, filename) => {
  const blob = new Blob([data], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

export const exportToCSV = (user, stats) => {
  const csv = `User,Level,XP,Stats\n${user.name},${user.level},${user.xp},${stats.map(s => `${s.name}:${s.value}`).join("|")}\n`;
  downloadFile(csv, `lvlup-export-${new Date().toISOString().slice(0, 10)}.csv`);
};

export const shareScore = (hunterName, level) => {
  const text = `🎮 I just reached Level ${level} in LvlUp! 🎮\nJoin me and start your gaming journey: https://lvlup.vercel.app`;
  if (navigator.share) {
    navigator.share({ title: "LvlUp", text });
  } else {
    navigator.clipboard.writeText(text);
    alert("Share text copied to clipboard!");
  }
};
