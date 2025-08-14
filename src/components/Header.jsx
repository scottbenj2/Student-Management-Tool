import React from "react";

export default function Header() {
  return (
    <header>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#2563eb" />
      </svg>
      <div>
        <h1>CSL Student Tracker</h1>
        <div className="tiny">
          Add students, track study stage and weekly meetup availability — data
          is saved locally.
        </div>
      </div>
    </header>
  );
}
