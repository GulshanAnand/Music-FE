import React from 'react';
import { useCookies } from "react-cookie";
import apiURL from '../config/config';

const SearchBar = ({ query, setQuery, setResults }) => {

  const [cookies] = useCookies(["access_token"]);

  const onSearch = async () => {

    try {
      const request = `${apiURL}/music/search/${query}`;
      console.log(request);
      const response = await fetch(request, {
        method: "GET",
        headers: {
          "Content-Type": "text/plain",
          "Accept": "*/*",
          'Authorization': `Bearer ${cookies.access_token}`
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query on input change
        onKeyDown={handleKeyDown} // Listen for the Enter key
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
// style={{
//   padding: '10px',
//   fontSize: '16px',
//   marginRight: '10px',
//   width: '70%',
// }}