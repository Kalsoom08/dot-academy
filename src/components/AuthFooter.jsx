'use client';

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      setIsAtBottom(nearBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // check on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isAtBottom) return null;

  return (
    <footer className="w-full bg-[#404040] text-white text-xs py-4 px-6">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-sm">Eacademydot</p>
        <p className="text-sm">Eacdemydot@copywrite.com</p>
        <FaWhatsapp className="w-5 h-5 text-white hover:text-green-400 transition" />
      </div>
    </footer>
  );
}
