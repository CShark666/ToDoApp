import { useState } from "react";

export function CreateTask() {
  const [textInput, setTextInput] = useState("");
  const handleInput = (e) => {
    setTextInput(e.target.value);
  };
  const saveTask = async () => {
    if (textInput === "") {
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Title: textInput,
        IsDone: false,
      }),
    };
    const response = await fetch("/api/todo-items", requestOptions);

    const data = await response.json();
    console.log(data);

    setTextInput("");
  };

  return (
    <div>
      <input type="text" value={textInput} onChange={handleInput} />
      <button onClick={saveTask}>Save task</button>
    </div>
  );
}
