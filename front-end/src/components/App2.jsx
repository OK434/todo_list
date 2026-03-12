import { useState } from "react";
import Calendar from "./Calendar";
export default function App2() {
  const [selectPro, setSelectPro] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });
  function handleStartAddPro() {
    setSelectPro((prevState) => ({
      ...prevState,
      selectedProjectId: null,
    }));
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      {<Calendar onStartAddPro={handleStartAddPro} />}
    </main>
  );
}
