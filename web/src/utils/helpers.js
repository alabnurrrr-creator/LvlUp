import { RANKS } from '../constants';

export const rankFor = (level) => RANKS.find((r) => level <= r.max);

export const uid = () => Math.random().toString(36).slice(2, 10);

export const todayStr = () => new Date().toISOString().slice(0, 10);

export const addDaysStr = (dateStr, n) => {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

export const daysAgoStr = (n) => addDaysStr(todayStr(), -n);

export const dayDiff = (a, b) => {
  return Math.round(
    (new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 86400000
  );
};

export const formatDateLabel = (dateStr) => {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const downloadFile = (data, filename) => {
  const blob = new Blob([data], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};