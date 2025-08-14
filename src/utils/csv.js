export function exportCSV(students) {
  const header = ["id", "name", "phone", "email", "status", "day", "time"];
  const esc = (v) => `"${String(v || "").replace(/"/g, '""')}"`;
  const lines = [header.join(",")].concat(
    students.map((r) => header.map((k) => esc(r[k])).join(","))
  );
  return lines.join("\n");
}

export function importCSV(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  const header = lines.shift().split(/,|\t/).map((h) => h.trim());
  return lines.map((line) => {
    const values = line.split(",");
    const obj = {};
    header.forEach((h, i) => (obj[h] = values[i] || ""));
    return obj;
  });
}
