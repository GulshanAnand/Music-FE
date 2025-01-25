import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import MusicItem from '../components/MusicItem';
import Player from '../components/Player';
import apiURL from '../config/config';
import './Home.css';

const Home = () => {

  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const [trackUrl, setTrackUrl] = useState('');
  const [trackName, setTrackName] = useState('');

  const [topStreamedTracks, setTopStreamedTracks] = useState([]);
  const [topStarredTracks, setTopStarredTracks] = useState([]);

  useEffect(() => {
    if (!cookies.access_token) {
      navigate("/login");
    }

    const loadTopTracks = async () => {
      try {
        const request = `${apiURL}/music/top-tracks`;
        const response = await fetch(request, {
          method: "GET",
          headers: {
            "Accept": "*/*",
            'Authorization': `Bearer ${cookies.access_token}`
          }
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }
        const data = await response.json();
        setTopStreamedTracks(data[0]);
        setTopStarredTracks(data[1]);
      } catch (err) {
        console.log(err);
      }
    }
    loadTopTracks();

  }, [cookies.access_token, navigate]);



  return (
    <div className="container">
      <h1>Youtube Audio</h1>
      <h5>Where the magic begins</h5>
      <div className="music-section">
        <h5>Top Streamed Music</h5>
        <div className="music-item-row">
          {
            topStreamedTracks.map((item, key) => (
              <MusicItem key={key} item={item} setTrackName={setTrackName} setTrackUrl={setTrackUrl} />
            ))}
        </div>
      </div>

      <div className="music-section">
      <h5>Top Starred Music</h5>
        <div className="music-item-row">
          {
            topStarredTracks.map((item, key) => (
              <MusicItem key={key} item={item} setTrackName={setTrackName} setTrackUrl={setTrackUrl} />
            ))}
        </div>
      </div>
      <Player trackUrl={trackUrl} trackName={trackName} />
    </div>
  );
};

export default Home;
