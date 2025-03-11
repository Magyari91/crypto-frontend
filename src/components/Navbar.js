import React from "react";
import { Switch } from "@headlessui/react";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className={`p-4 shadow-lg ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          CryptoVision
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">{darkMode ? "Sötét mód" : "Világos mód"}</span>
          <Switch
            checked={darkMode}
            onChange={setDarkMode}
            className={`${darkMode ? "bg-blue-500" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300`}
          >
            <span className="sr-only">Mód váltás</span>
            <span className={`${darkMode ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300`} />
          </Switch>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
