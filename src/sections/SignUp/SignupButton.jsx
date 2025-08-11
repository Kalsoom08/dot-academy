export default function SignupButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2 border border-gray-100 rounded-full shadow-sm hover:bg-gray-50 transition"
    >
      <span className="text-lg">{icon}</span>
      <span className="flex-1 text-center text-sm font-medium">{label}</span>
    </button>
  );
}
