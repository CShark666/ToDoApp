import { useEffect, useState } from "react";
import "../styles/Tasks.css";

export function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/todo-items");
      const tasks = await response.json();
      setTasks(tasks);
    };

    fetchTasks();
  }, [tasks]);
  return (
    <div className="tasks-container">
      {tasks.map((tasks) => (
        <div key={tasks.id} className="task-container">
          <div className="task-text-box">
            <p>
              ({tasks.id}) {tasks.title}: {`${tasks.isDone}`}
            </p>
          </div>
          <div className="task-btn-box">
            <button>edit</button>
            <button>delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
