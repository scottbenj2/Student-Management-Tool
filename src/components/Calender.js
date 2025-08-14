import React from "react";
import "../styles/Calendar.css";

export default function Calendar({ students }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = [];
  for (let h = 8; h < 18; h++) {
    for (let m = 0; m < 30; m += 30) {
      const ampmHour = h > 12 ? h - 12 : h;
      const suffix = h >= 12 ? "pm" : "am";
      const minuteStr = m === 0 ? "" : `:${String(m).padStart(2, "0")}`;
      times.push(`${ampmHour}${minuteStr}${suffix}`);
    }
  }

  return (
    <table className="calendar">
      <thead>
        <tr>
          <th>Time</th>
          {days.map((d) => <th key={d}>{d}</th>)}
        </tr>
      </thead>
      <tbody>
        {times.map((t) => (
          <tr key={t}>
            <td>{t}</td>
            {days.map((d) => {
              const meetup = students.find(
                (s) => s.day === d && s.time.toLowerCase() === t.toLowerCase()
              );
              return (
                <td key={d + t} className={meetup ? "meetup" : "available"}>
                  {meetup ? meetup.name : ""}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
