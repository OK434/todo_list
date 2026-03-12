import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect, useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function Calendar() {

  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [addTaskOpen, setAddTaskOpen] = useState(false);

  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const date = useRef();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

   fetch(`https://todo-list-1-r6mx.onrender.com/api/tasks?userId=${user._id}`)
      .then(res => res.json())
      .then(data => setTasks(data.tasks))
      .catch(err => console.error(err));

  }, [user]);

  function handleAddTask() {

    if (!selectedDate) {
      const today = new Date().toISOString().split("T")[0];
      setSelectedDate(today);
    }

    setAddTaskOpen(true);
  }

  const handleSaveTask = async () => {

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

      const response = await fetch("https://todo-list-1-r6mx.onrender.com/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user._id,
          title: enteredTitle,
          description: enteredDescription,
          date: enteredDate,
          completed: false
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setTasks(prev => [...prev, data.task]);

      title.current.value = "";
      description.current.value = "";
      date.current.value = "";

      setAddTaskOpen(false);

    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id) => {

    try {

      const response = await fetch(`https://todo-list-1-r6mx.onrender.com/api/tasks/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setTasks(prev => prev.filter(task => task._id !== id));

    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async (id) => {

    try {

      const response = await fetch(`https://todo-list-1-r6mx.onrender.com/api/tasks/${id}`, {
        method: "PATCH"
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setTasks(prev =>
        prev.map(task =>
          task._id === id
            ? { ...task, completed: !task.completed }
            : task
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  const tasksForDay = tasks.filter(
    task =>
      task.date.split("T")[0] === selectedDate
  );

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Calendar
        </h1>

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="auto"

          dateClick={(info) => {
            setSelectedDate(info.dateStr);
            setOpen(true);
          }}

          events={tasks.map(task => ({
            title: task.completed ? "✓ " + task.title : task.title,
            date: task.date.split("T")[0],
            backgroundColor: task.completed ? "#9ca3af" : "#2563eb",
            borderColor: task.completed ? "#9ca3af" : "#2563eb",
            textColor: "#ffffff"
          }))}
        />

        <div className="flex justify-end mt-6">

          <button
            onClick={() => {
              handleAddTask();
              setOpen(false);
            }}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
          >
            + Add Task
          </button>

        </div>

      </div>

      {open && (

        <div className="fixed inset-0 z-50 flex items-center justify-center">

          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="relative bg-white w-[28rem] p-6 rounded-2xl shadow-xl">

            <h2 className="text-xl font-semibold text-center mb-5 text-gray-800">
              {selectedDate}
            </h2>

            {tasksForDay.length === 0 ? (

              <p className="text-center text-gray-500">
                No tasks for this date.
              </p>

            ) : (

              <ul className="space-y-3 mb-6">

                {tasksForDay.map(task => (

                  <li
                    key={task._id}
                    className={`flex items-center justify-between px-4 py-2 rounded-lg border shadow-sm ${
                      task.completed
                        ? "bg-gray-200 border-gray-300"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >

                    <span
                      className={
                        task.completed
                          ? "line-through text-gray-500"
                          : "text-gray-800"
                      }
                    >
                      {task.title}
                    </span>

                    <div className="flex gap-3">

                      <button
                        onClick={() => toggleComplete(task._id)}
                        className="text-green-600 hover:text-green-800 text-xl"
                      >
                        ✓
                      </button>

                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-red-500 hover:text-red-700 text-xl"
                      >
                        🗑
                      </button>

                    </div>

                  </li>

                ))}

              </ul>

            )}

            <div className="flex justify-center gap-3">

              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleAddTask();
                  setOpen(false);
                }}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Task
              </button>

            </div>

          </div>

        </div>

      )}

      {addTaskOpen && (

        <>
          <Modal ref={modal}>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Invalid Input
            </h2>
            <p className="text-gray-500">
              Please fill all fields.
            </p>
          </Modal>

          <div className="fixed top-24 right-10 z-50">

            <div className="bg-white w-[26rem] p-7 rounded-2xl shadow-2xl border">

              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Create New Task
              </h2>

              <div className="space-y-5">

                <Input
                  type="text"
                  ref={title}
                  label="Title"
                />

                <Input
                  ref={description}
                  label="Description"
                  textarea
                />

                <Input
                  type="date"
                  ref={date}
                  label="Due Date"
                  defaultValue={selectedDate}
                />

              </div>

              <div className="flex justify-end gap-3 mt-8">

                <button
                  onClick={() => setAddTaskOpen(false)}
                  className="px-5 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>

                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={handleSaveTask}
                >
                  Save Task
                </button>

              </div>

            </div>

          </div>
        </>
      )}

    </div>
  );
}