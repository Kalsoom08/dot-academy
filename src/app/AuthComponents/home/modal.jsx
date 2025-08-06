'use client';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl font-bold"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
