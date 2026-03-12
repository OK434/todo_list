import Input from "./Input";
import { useRef } from "react";
import Modal from "./Modal";

export default function NowProject({ onAdd, onCancel }) {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const date = useRef();

  const handleSave = async () => {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDate = date.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    try {
      const response = await fetch("http://localhost:1231/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: enteredTitle,
          description: enteredDescription,
          date: enteredDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      onAdd({
        title: enteredTitle,
        description: enteredDescription,
        date: enteredDate,
      });

      title.current.value = "";
      description.current.value = "";
      date.current.value = "";

    } catch (error) {
      console.error("Server error", error);
    }
  };

  return (
    <>
      <Modal ref={modal}>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Invalid Input
        </h2>
        <p className="text-gray-500">
          Please make sure you fill all fields correctly.
        </p>
      </Modal>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Create New Task
          </h2>

          <div className="space-y-5">
            <Input type="text" ref={title} label="Title" />
            <Input ref={description} label="Description" textarea />
            <Input type="date" ref={date} label="Due Date" />
          </div>

          <div className="flex justify-end gap-3 mt-8">

            <button
              onClick={onCancel}
              className="px-5 py-2 text-gray-600 hover:text-gray-900 transition"
            >
              Cancel
            </button>

            <button
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
              onClick={handleSave}
            >
              Save Task
            </button>

          </div>

        </div>

      </div>
    </>
  );
}