import { useState } from "react";
import { PomoQuest } from "../components/PomoQuest";

export function PomodoroPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [totalTimeInSeconds, setTotalTime] = useState(0);
  const [timeInterval, setTimeInterval] = useState(0);

  const saveQuest = async () => {
    const requestBody = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        status: 0,
        totalTimeInSeconds: totalTimeInSeconds * 60 * 60,
        timeIntervalInSeconds: timeInterval * 60,
      }),
    };
    await fetch("/api/pomo-quests/", requestBody);
    setTitle("");
    setDescription("");
    setTotalTime(0);
    setTimeInterval(0);
  };

  return (
    <>
      <h1>pomo-quests</h1>
      <div>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          min="1"
          max="100"
          placeholder="total time"
          value={totalTimeInSeconds}
          onChange={(e) => setTotalTime(e.target.value)}
        />
        <input
          type="number"
          min="1"
          max="100"
          placeholder="time interval"
          value={timeInterval}
          onChange={(e) => setTimeInterval(e.target.value)}
        />
        <button onClick={saveQuest}>save quest</button>
      </div>
      <PomoQuest />
    </>
  );
}
