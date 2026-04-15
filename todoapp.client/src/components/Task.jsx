import { useState } from "react";

export function Task({ task }) {
  const [isEdited, setEdited] = useState(false);
  const [textInput, setTextInput] = useState(task.title);
  const [taskStatus, setTaskStatus] = useState(task.isDone);

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
          IsDone: taskStatus,
        }),
      });
      setEdited(false);
    } else {
      setEdited(true);
    }
  };
  const updateStatus = (event) => {
    setTaskStatus(Boolean(event.target.value));
  };
  const handleInput = (e) => {
    setTextInput(e.target.value);
  };

  return (
    <div key={task.id} className="task-container">
      <p>#{task.id}</p>
      <div className="task-text-box">
        {isEdited ? (
          <input type="text" onChange={handleInput} value={textInput} />
        ) : (
          <p className="task-title">{task.title}</p>
        )}
      </div>
      <div className="task-status-box">
        <p>{task.isDone ? "Done" : "Pending"}</p>
        {isEdited ? (
          <select onChange={updateStatus}>
            <option value={false}>Pending</option>
            <option value={true}>Done</option>
          </select>
        ) : (
          <></>
        )}
      </div>
      <div className="task-buttons-box">
        <button onClick={editTask}>Edit</button>
        <button onClick={deleteTask}>Delete</button>
      </div>
    </div>
  );
}
