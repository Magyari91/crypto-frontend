// ModernNavbar.js
import React from "react";
import { Switch } from "@headlessui/react";
import { FaSearch } from "react-icons/fa";

function ModernNavbar({ darkMode, setDarkMode, onSearch }) {
  return (
    <nav className={`p-4 shadow-md ${darkMode ? "bg-gray-900" : "bg-white"} transition`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          CryptoVision 🚀
        </h1>

        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Keresés coin szerint..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full p-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>

        {/* Dark mode switch */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{darkMode ? "Sötét mód" : "Világos mód"}</span>
          <Switch
            checked={darkMode}
            onChange={setDarkMode}
            className={`${darkMode ? "bg-blue-600" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Mód váltás</span>
            <span
              className={`${darkMode ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform bg-white rounded-full transition`}
            />
          </Switch>
        </div>
      </div>
    </nav>
  );
}

export default ModernNavbar;
