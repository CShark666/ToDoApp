import { CreateTask } from "../components/CreateTask";
import { Tasks } from "../components/Tasks";

export function ToDoAppPage() {
  return (
    <>
      <CreateTask />
      <Tasks />
    </>
  );
}
