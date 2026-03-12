import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef } from "react";
import Button from "./Button";

const Modal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-black/40 p-0 border-none rounded-xl shadow-lg"
    >
      <div className="w-[24rem] max-w-full bg-white p-6 rounded-xl text-center">

        <div className="text-gray-700 text-base">
          {children}
        </div>

        <form method="dialog" className="mt-6 flex justify-center">
          <Button>OK</Button>
        </form>

      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;

