import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

const SearchBar = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const debouncedSearch = debounce(async () => {
      if (searchTerm) {
        try {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/search?query=${searchTerm}`
          );
          setSearchResults(response.data.coins);
          setShowResults(true);
        } catch (error) {
          console.error('Hiba a keresés során:', error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (coin) => {
    onSelect(coin.id);
    setSearchTerm('');
    setShowResults(false);
  };

  return (
    <div className="w-full max-w-6xl mb-8 relative">
      <input
        type="text"
        placeholder="Keresés..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
      />
      {showResults && searchResults.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-48 overflow-y-auto">
          {searchResults.map((coin) => (
            <li
              key={coin.id}
              onClick={() => handleSelect(coin)}
              className="p-2 hover:bg-gray-100 cursor-pointer text-black"
            >
              {coin.name} ({coin.symbol})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;