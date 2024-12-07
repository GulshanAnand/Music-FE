import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SubmitButton from './SubmitButton';
import MusicItem from './MusicItem';
import Player from './Player';

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [trackUrl, setTrackUrl] = useState('');
  const [trackName, setTrackName] = useState('');
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
      setResults(data);
    } catch (err) {
      console.log(err);
    }
  };
 
  return (
    <div>
      <h1>Youtube Audio</h1>
      <h5>Where the magic begins</h5>

      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <SearchBar query={query} setQuery={setQuery} />
        <SubmitButton onSearch={handleSearch} />
      </div>
      {results.length > 0 ? (
        <div>
          {
            results.map((item, key) => (
              <MusicItem key={key} item={item} setTrackName={setTrackName} setTrackUrl={setTrackUrl} />
            ))}
        </div>
      ) : (
        <p>No results found for "{query}"</p>
      )}
      <Player trackUrl={trackUrl} trackName={trackName}/>

    </div>
  );
};

export default Home;
