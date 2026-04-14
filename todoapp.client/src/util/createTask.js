export const testPost = async () => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Title: "Test task 4",
      IsDone: false,
    }),
  };
  const response = await fetch("/api/todo-items", requestOptions);

  const data = await response.json();
  console.log(data);
};
