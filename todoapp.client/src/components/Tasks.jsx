import { useEffect, useState } from "react";

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
    <>
      <div>
        {tasks.map((tasks) => (
          <div key={tasks.id}>
            ({tasks.id}) {tasks.title}: {`${tasks.isDone}`}
          </div>
        ))}
      </div>
    </>
  );
}
