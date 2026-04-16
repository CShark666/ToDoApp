import { Routes, Route } from "react-router";
import { HelloPage } from "./pages/HelloPage";
import { ToDoAppPage } from "./pages/ToDoAppPage";

function App() {
  return (
    <Routes>
      <Route index element={<HelloPage />} />
      <Route path="todo" element={<ToDoAppPage />} />
    </Routes>
  );
}

export default App;