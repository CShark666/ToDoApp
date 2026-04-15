import { useState } from "react";

export function Task({ task }) {
  const [isEdited, setEdited] = useState(false);
  const [textInput, setTextInput] = useState(task.title);

  const deleteTask = async () => {
    await fetch(`/api/todo-items/${task.id}`, {
      method: "DELETE",
    });
  };
  const editTask = async () => {
    if (isEdited) {
      await fetch(`/api/todo-items/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Title: textInput,
        }),
      });
      setEdited(false);
    } else {
      setEdited(true);
    }
  };
  const handleInput = (e) => {
    setTextInput(e.target.value);
  };

  return (
    <div key={task.id} className="task-container">
      <div className="task-text">
        #{task.id} |{" "}
        {isEdited ? (
          <input type="text" onChange={handleInput} value={textInput} />
        ) : (
          `${task.title}`
        )}
        | {task.isDone ? "Done" : "Pending"}
      </div>

      <div className="task-buttons">
        <button onClick={editTask}>Edit</button>
        <button onClick={deleteTask}>Delete</button>
      </div>
    </div>
  );
}
