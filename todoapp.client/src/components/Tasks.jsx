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
      {tasks.map((task) => (
        <div key={task.id} className="task-container">
          <div className="task-text">
            #{task.id} | {task.title} | {task.isDone ? "Done" : "Pending"}
          </div>

          <div className="task-buttons">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
