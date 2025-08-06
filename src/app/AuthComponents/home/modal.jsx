'use client';
import { RxCross2 } from "react-icons/rx";


export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-[1px]">
      <div className="bg-white rounded-lg shadow-xl max-w-xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 "
        >
          <RxCross2 size={20} className="bg-black rounded-full p-1 text-white"/>
        </button>
        {children}
      </div>
    </div>
  );
}
