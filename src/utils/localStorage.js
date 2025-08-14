const STORAGE_KEY = "csl_students_v1";

export function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStudents(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}
