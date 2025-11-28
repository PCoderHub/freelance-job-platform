import React from "react";
import { IoMdClose } from "react-icons/io";

function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="ml-auto block mb-4 text-red-600 font-bold"
        >
          <IoMdClose />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
