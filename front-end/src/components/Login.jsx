import { useState } from "react";
import CreateAcc from "./CreateAcc";

import App2 from "./App2";

export default function Login() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentView, setCurrentView] = useState(null);

  function handleInputChange(identifier, value) {
    if (identifier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleClickCre() {
    setCurrentView("create");
  }

  const handleLogin = async () => {
    try {
      const response = await fetch(`https://todo-list-1-r6mx.onrender.com/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log("User:", data);

      localStorage.setItem("user", JSON.stringify(data.user));

      setSubmitted(true);

    } catch (error) {
      console.error("Server error", error);
    }
  };

  if (submitted) {
    return <App2 />;
  }

  if (currentView === "create") {
    return <CreateAcc />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Login
        </h2>

        <div className="flex flex-col gap-4">

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

        </div>

        <div className="flex justify-between items-center mt-6">

          <button
            className="text-sm text-gray-500 hover:text-blue-600"
            onClick={handleClickCre}
          >
            Create account
          </button>

          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

