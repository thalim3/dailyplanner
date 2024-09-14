import Header from "./components/Header";
import SummarryTable from "./components/SummaryTable";
import './styles/global.css';
import '../lib/dayjs';
import { Login } from "./components/Login";
import { useState } from "react";


function App() {
  const [showHeader, setShowHeader] = useState(
    Boolean(localStorage.getItem("showHeader"))
  );

  return (    
  <div>
    {!showHeader && <Login setShowHeader={setShowHeader} />}
    {showHeader && <Header setShowHeader={setShowHeader} />}
    {/* {showHeader && <HabitsList />} */}
  </div>
  )
}
export default App
