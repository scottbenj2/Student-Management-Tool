const STORAGE_KEY = "csl_students_v1";

export function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY); //returning values of stor_key
    return raw ? JSON.parse(raw) : []; //if raw isn't empty parse, else return nothing
  } catch {
    return []; //error return nothing
  }
}

export function saveStudents(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students)); // Converts the students array/object into a JSON string and stores it under STORAGE_KEY.
}
