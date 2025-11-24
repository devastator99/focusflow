import { useState } from "react";
import { Menu } from "@headlessui/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-14">
        <h1 className="text-xl font-bold">FocusFlow</h1>
        <button
          className="md:hidden block"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
        <div className={`md:flex md:space-x-6 ${open ? "block" : "hidden"}`}>
          <a href="/" className="block px-2 py-1 hover:bg-blue-700 rounded">Dashboard</a>
          <a href="/about" className="block px-2 py-1 hover:bg-blue-700 rounded">About</a>
          <a href="/contact" className="block px-2 py-1 hover:bg-blue-700 rounded">Contact</a>
        </div>
      </div>
    </nav>
  );
}
