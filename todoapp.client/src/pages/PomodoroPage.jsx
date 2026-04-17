import { useEffect, useState } from "react";

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
        timeInterval: timeInterval * 60,
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
      <Timer />
      <TimerNegative setupSeconds={15}/>
    </>
  );
}

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div>
      <h1>{seconds}</h1>

      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Stop</button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
}

function TimerNegative({ setupSeconds }) {
  const [seconds, setSeconds] = useState(Number(setupSeconds));
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div>
      <h1>{seconds}</h1>

      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Stop</button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
}
