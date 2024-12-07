import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SubmitButton from './SubmitButton';
import PlayAudio from './PlayAudio';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [track, setTrack] = useState('');
  const handleSearch = async () => {
    try {
      const request = `http://192.168.0.103:8080/music/search/${query}`;
      console.log(request);
      const response = await fetch(request, {
        method: "GET",
        headers: {
          "Content-Type": "text/plain",
          "Accept": "*/*",
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      setResults(data);
      console.log(results);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Search Bar with API Call</h1>

      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <SearchBar query={query} setQuery={setQuery} />
        <SubmitButton onSearch={handleSearch} />
      </div>
      {results.length > 0 ? (
        <ul>
          {results.map((item, index) => (
            <li key={index}>{item.title}<br/>{item.videoUrl}<br/>
            <button onClick={()=>setTrack(item.videoUrl)}>PLAY</button>
            </li>
             // Assume each result has a "name" property
          ))}
        </ul>
      ) : (
        <p>No results found for "{query}"</p>
      )}
      {track!==''?(<PlayAudio trackName={track}/>):(<div>Nothing to play</div>)}

    </div>
  );
};

export default Search;
