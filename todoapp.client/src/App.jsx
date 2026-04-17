import { Routes, Route } from "react-router";
import { HelloPage } from "./pages/HelloPage";
import { ToDoAppPage } from "./pages/ToDoAppPage";
import { PomodoroPage } from "./pages/PomodoroPage";

function App() {
  return (
    <Routes>
      <Route index element={<HelloPage />} />
      <Route path="todo" element={<ToDoAppPage />} />
      <Route path="pomo-quests" element={<PomodoroPage />} />;
    </Routes>
  );
}

export default App;
