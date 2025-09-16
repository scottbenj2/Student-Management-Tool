import React, { useState, useEffect } from "react";
import "../styles/Calendar.css";

export default function Calendar({ students }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Generate times: 8am to 5pm in 30-min increments
  const times = [];
  for (let h = 8; h < 18; h++) {
    for (let m = 0; m < 30; m += 30) {
      const ampmHour = h > 12 ? h - 12 : h;
      const suffix = h >= 12 ? "pm" : "am";
      const minuteStr = m === 0 ? "" : `:${String(m).padStart(2, "0")}`;
      times.push(`${ampmHour}${minuteStr}${suffix}`);
    }
  }

  // State for tracking clicked cells (available/busy)
  const [cellStatus, setCellStatus] = useState({});

  useEffect(() => {
    const initialStatus = {};
    times.forEach((t) =>
      days.forEach((d) => {
        const meetup = students.find(
          (s) => s.day === d && s.time.toLowerCase().trim() === t.toLowerCase().trim()
        );
        initialStatus[`${d}-${t}`] = meetup ? "meetup" : "available";
      })
    );
    console.log("Initial cellStatus:", initialStatus);
    setCellStatus(initialStatus);
  }, [students]);

  const toggleCell = (day, time) => {
    const key = `${day}-${time}`;
    setCellStatus((prev) => {
      if (prev[key] === "available") return { ...prev, [key]: "busy" };
      if (prev[key] === "busy") return { ...prev, [key]: "available" };
      return prev; // meetup cells are not clickable
    });
  };

  // Debug log every render
  console.log("Rendering Calendar, students:", students);
  console.log("Current cellStatus:", cellStatus);

  return (
    <table className="calendar">
      <thead>
        <tr>
          <th>Time</th>
          {days.map((d) => (
            <th key={d}>{d}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {times.map((t) => (
          <tr key={t}>
            <td>{t}</td>
            {days.map((d) => {
              const key = `${d}-${t}`;
              const meetup = students.find(
                (s) => s.day === d && s.time.toLowerCase().trim() === t.toLowerCase().trim()
              );

              // If this is a meetup, always show as meetup and name
              const status = meetup ? "meetup" : cellStatus[key] || "available";

              return (
                <td
                    key={key}
                    className={meetup ? "meetup" : cellStatus[key] || "available"}
                    onClick={() => {
                      if (!meetup) toggleCell(d, t);
                    }}
                  >
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
