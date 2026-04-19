import { useEffect, useState } from "react";
import "../styles/PomoQuest.css";

export function PomoQuest() {
  const [pomoQuest, setPomoQuest] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const getPomoQuest = async () => {
      const response = await fetch("/api/pomo-quests/1");
      const data = await response.json();
      setPomoQuest(data);
      setSeconds(data.timeIntervalsRemaining);
    };
    getPomoQuest();
  }, []);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 0) {
            setIsRunning(false);

            // Використовуємо функціональне оновлення щоб отримати актуальний стан
            setPomoQuest((currentQuest) => {
              const updated = {
                ...currentQuest,
                totalTimeRemaining:
                  currentQuest.totalTimeRemaining -
                  currentQuest.timeIntervalsRemaining,
                amountTimeIntervalsRemaining:
                  currentQuest.amountTimeIntervalsRemaining - 1,
              };

              // updateTime тепер отримує актуальні дані
              fetch(`/api/pomo-quests/${updated.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  title: updated.title,
                  status: updated.status,
                  totalTimeRemaining: updated.totalTimeRemaining,
                  amountTimeIntervalsRemaining:
                    updated.amountTimeIntervalsRemaining,
                }),
              });

              return updated;
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // const updateTime = async () => {
  //     const requestBody = {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         totalTimeRemaining: pomoQuest.totalTimeRemaining,
  //         amountTimeIntervals: pomoQuest.amountTimeIntervals,
  //       }),
  //     };
  //     await fetch(`/api/pomo-quests/${pomoQuest.id}`, requestBody);
  //   };

  return (
    <>
      <div className="pomo-quest-container">
        <div className="pomo-quest-info">
          <div>
            <h2>Pomo-quest</h2>
            <p>
              Id: {pomoQuest.id} Title: {pomoQuest.title} Status:{" "}
              {pomoQuest.status}
            </p>
          </div>
          <div className="time-box">
            <h2>Total time</h2>
            <p>Total time: {pomoQuest.totalTimeInSeconds}</p>
            <p>Time of interval: {pomoQuest.timeIntervalInSeconds}</p>
            <p>Amount of intervals: {pomoQuest.amountTimeIntervals}</p>
          </div>
          <div className="time-box">
            <h2>Left time:</h2>
            <p>Total time: {pomoQuest.totalTimeRemaining}</p>
            <p>Time of interval: {pomoQuest.timeIntervalsRemaining}</p>
            <p>Amount of intervals: {pomoQuest.amountTimeIntervalsRemaining}</p>
          </div>
        </div>
        <div className="timers-box">
          <div>
            <h2>{seconds}</h2>
          </div>
          <button
            className="timer-button"
            onClick={() => {
              isRunning ? setIsRunning(false) : setIsRunning(true);
            }}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
        </div>
      </div>
    </>
  );
}
