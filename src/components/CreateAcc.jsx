import { useState } from "react";
import Button from "./Button";
import Login from "./Login";
import App2 from "./App2";

export default function CreateAcc() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentView, setCurrentView] = useState(null);

  const handleInputChange = (identifier, value) => {
    if (identifier === "email") setEnteredEmail(value);
    else if (identifier === "password") setEnteredPassword(value);
    else if (identifier === "confirmPassword") setConfirmPassword(value);
  };

  const handleLogin = () => {
    setSubmitted(true);
  };

  const handleClickLog = () => {
    setCurrentView("login");
  };

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;
  const passwordNotValid2 = submitted && enteredPassword !== confirmPassword;

  if (currentView === "login") {
    return <Login />;
  }

  if (submitted && !emailNotValid && !passwordNotValid && !passwordNotValid2) {
    return <App2 />;
  }

  return (
    <div id="auth-inputs" className="max-w-md mx-auto">
      <div className="flex flex-col gap-2 mb-6">
        <InputField
          label="Email"
          type="email"
          value={enteredEmail}
          onChange={(value) => handleInputChange("email", value)}
          isInvalid={emailNotValid}
        />
        <InputField
          label="Password"
          type="password"
          value={enteredPassword}
          onChange={(value) => handleInputChange("password", value)}
          isInvalid={passwordNotValid}
        />
        <InputField
          label="Check Password"
          type="password"
          value={confirmPassword}
          onChange={(value) => handleInputChange("confirmPassword", value)}
          isInvalid={passwordNotValid2}
        />
      </div>
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="text-sm text-blue-600 hover:underline"
          onClick={handleClickLog}
        >
          Have account
        </button>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}

function InputField({ label, type, value, onChange, isInvalid }) {
  return (
    <div>
      <label
        className={`block mb-2 text-xs font-bold tracking-wide uppercase ${
          isInvalid ? "text-red-400" : "text-gray-500"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-3 rounded border ${
          isInvalid
            ? "bg-red-100 text-red-500 border-red-500"
            : "bg-gray-300 text-gray-700 border-transparent"
        } shadow-sm`}
      />
    </div>
  );
}
