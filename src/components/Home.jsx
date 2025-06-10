import Button from "./Button";
import Login from "./Login";
import CreateAcc from "./CreateAcc";
import { useState } from "react";
export default function Home() {
const [currentView, setCurrentView] = useState(null);

  function handleClickLog() {
    setCurrentView("login");
  }

  function handleClickCre() {
    setCurrentView("create");
  }

  if (currentView === "login") {
    return <Login />;
  }

  if (currentView === "create") {
    return <CreateAcc />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col space-y-4 border-2 border-gray-500 p-6 w-80 bg-stone-900 rounded-lg shadow-md">
        <Button onClick={handleClickCre}>Create account</Button>
        <Button onClick={handleClickLog}>Log in</Button>
      </div>
    </div>
  );
}
