import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SubmitButton from '../components/SubmitButton';
import MusicItem from '../components/MusicItem';
import Player from '../components/Player';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import apiURL from '../config/config';

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
  });

  const handleSearch = async () => {

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
