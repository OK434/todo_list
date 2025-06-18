import { useState } from "react";
export default function NewTask({ onAdd }) {
  const [enterTask, setEnterTask] = useState("");
  function handelChange(event) {
    setEnterTask(event.target.value);
  }
  function handleClick() {
    if (enterTask.trim() === "") return;
    onAdd(enterTask);
    setEnterTask("");
  }
  return (
    <div className="flex items-center gap-4 ">
      <input
        type="text "
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handelChange}
        value={enterTask}
      />
      <button
        className="text-stone-800 hover:text-stone-950 "
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}
