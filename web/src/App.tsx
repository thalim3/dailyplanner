import { useState } from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import { Login } from "./components/Login/Login";
import { HabitList } from "./components/HabitList/HabitList";

function App() {
  const [showHeader, setShowHeader] = useState(
    Boolean(localStorage.getItem("showHeader"))
  );

  return (
    <div>
      {!showHeader && <Login setShowHeader={setShowHeader} />}
      {showHeader && <Header setShowHeader={setShowHeader} />}
      {showHeader && <HabitList />}
    </div>
  );
}

export default App;
