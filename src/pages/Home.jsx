import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MusicItem from '../components/MusicItem';
import Player from '../components/Player';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [trackUrl, setTrackUrl] = useState('');
  const [trackName, setTrackName] = useState('');

  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  useEffect(() => {
      if(cookies.access_token){
        navigate("/");
      }
      else{
        navigate("/login");
      }
  }, [cookies.access_token, navigate]);

  
  
  return (
    <div>
      <h1>Youtube Audio</h1>
      <h5>Where the magic begins</h5>
      <SearchBar query={query} setQuery={setQuery} setResults={setResults} />
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
