import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="w-full max-w-6xl mb-8">
      <input
        type="text"
        placeholder="Keresés..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
};

export default SearchBar;