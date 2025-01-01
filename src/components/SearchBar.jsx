import React from 'react';

const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Enter search text..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{
        padding: '10px',
        fontSize: '16px',
        marginRight: '10px',
        width: '70%',
      }}
    />
  );
};

export default SearchBar;
