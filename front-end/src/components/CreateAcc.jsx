
import { useState } from "react";
import Button from "./Button";
import Login from "./Login";

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

  const handleClickLog = () => {
    setCurrentView("login");
  };

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;
  const passwordNotValid2 = submitted && enteredPassword !== confirmPassword;

  const haundleSingup = async () => {
    if (
      !enteredEmail.includes("@") ||
      enteredPassword.length < 8 ||
      enteredPassword !== confirmPassword
    ) {
      alert("Please fix the errors before submitting");
      return;
    }

    try {
      const response = await fetch("http://localhost:1231/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
      });

      const data = await response.json();
      console.log("Signup response:", data);
      setCurrentView("login");
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup.");
    }
  };

  if (currentView === "login") {
    return <Login />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Create Account
        </h2>

        <div className="flex flex-col gap-4">
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
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(value) => handleInputChange("confirmPassword", value)}
            isInvalid={passwordNotValid2}
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            className="text-sm text-gray-500 hover:text-blue-600 transition"
            onClick={handleClickLog}
          >
            Already have an account?
          </button>

          <button
            onClick={haundleSingup}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition"
          >
            Sign Up
          </button>
        </div>

      </div>
    </div>
  );
}

function InputField({ label, type, value, onChange, isInvalid }) {
  return (
    <div>
      <label
        className={`block mb-1 text-sm ${
          isInvalid ? "text-red-500" : "text-gray-600"
        }`}
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-3 rounded-lg border transition
        ${
          isInvalid
            ? "border-red-400 bg-red-50"
            : "border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
        }`}
      />
    </div>
  );
}

