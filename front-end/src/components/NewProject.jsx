import Input from "./Input";
import { useRef } from "react";
import Modal from "./Modal";
export default function NowProject({ onAdd, onCancel }) {
  const modal = useRef();
  const title = useRef();
  const descr = useRef();
  const dueDate = useRef();
  function handleSave() {
    const enrtedTitle = title.current.value;
    const enrtedDescr = descr.current.value;
    const enrtedDueDate = dueDate.current.value;
    if (
      enrtedTitle.trim() === "" ||
      enrtedDescr.trim() === "" ||
      enrtedDueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }
    onAdd({
      title: enrtedTitle,
      descr: enrtedDescr,
      dueDate: enrtedDueDate,
    });
  }

  return (
    <>
      <Modal ref={modal}>
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops ... Looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          {" "}
          Please make sure you provide a valid value for evrry input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:text-stone-950"
              onClick={handleSave}
            >
              save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title" />
          <Input ref={descr} label="Descrip" textarea />
          <Input type="date" ref={dueDate} label="Due Date" />
        </div>
      </div>
    </>
  );
}
