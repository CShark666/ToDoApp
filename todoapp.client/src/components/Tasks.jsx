import { useEffect, useState } from "react";
import { Task } from "./Task";
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
        <Task task={task}/>
      ))}
    </div>
  );
}
