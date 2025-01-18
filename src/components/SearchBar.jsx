import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import apiURL from '../config/config';
import './SearchBar.css';

const SearchBar = () => {

  const [cookies] = useCookies(["access_token"]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

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
      navigate('/search', { state: { results: results, query: query } });
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div>
      <input
        className="search-bar"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;