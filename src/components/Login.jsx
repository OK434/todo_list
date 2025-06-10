import { useState } from "react";
import CreateAcc from "./CreateAcc";
import Button from "./Button";
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

  function handleLogin() {
    setSubmitted(true);
  }

  function handleClickCre() {
    setCurrentView("create");
  }

  if (submitted) {
    return <App2 />;
  }

  if (currentView === "create") {
    return <CreateAcc />;
  }

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-600">
      <div id="auth-inputs" className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-2 mb-6">
          <div>
            <label
              className={`block mb-2 text-xs font-bold tracking-wide uppercase ${
                emailNotValid ? "text-red-400" : "text-gray-500"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              onChange={(event) => handleInputChange("email", event.target.value)}
              className={`w-full p-3 rounded border ${
                emailNotValid
                  ? "bg-red-100 text-red-500 border-red-500"
                  : "bg-gray-300 text-gray-700 border-transparent"
              } shadow-sm`}
            />
          </div>
          <div>
            <label
              className={`block mb-2 text-xs font-bold tracking-wide uppercase ${
                passwordNotValid ? "text-red-400" : "text-gray-500"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              onChange={(event) =>
                handleInputChange("password", event.target.value)
              }
              className={`w-full p-3 rounded border ${
                passwordNotValid
                  ? "bg-red-100 text-red-500 border-red-500"
                  : "bg-gray-300 text-gray-700 border-transparent"
              } shadow-sm`}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
            onClick={handleClickCre}
          >
            Create a new account
          </button>
          <Button onClick={handleLogin}>Sign In</Button>
        </div>
      </div>
    </div>
  );
}
