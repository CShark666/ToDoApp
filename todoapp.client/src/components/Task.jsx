export function Task({ task }) {
  const deleteTask = async () => {
    await fetch(`/api/todo-items/${task.id}`, {
      method: "DELETE",
    });
  };

  return (
    <div key={task.id} className="task-container">
      <div className="task-text">
        #{task.id} | {task.title} | {task.isDone ? "Done" : "Pending"}
      </div>

      <div className="task-buttons">
        <button>Edit</button>
        <button onClick={deleteTask}>Delete</button>
      </div>
    </div>
  );
}
