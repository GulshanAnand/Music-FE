import { useCookies } from "react-cookie";
import React, { useState, useEffect } from 'react';
import MusicItem from '../components/MusicItem';
import Player from '../components/Player';
import apiURL from '../config/config';
import { HttpStatusCode } from 'axios';

const Playlist = () => {

  const [cookies] = useCookies(["access_token"]);
  const [results, setResults] = useState([]);
  const [trackUrl, setTrackUrl] = useState('');
  const [trackName, setTrackName] = useState('');

  const RemoveFromPlaylist = async (videoUrl) => {
    try {
      const response = await fetch(`${apiURL}/music/playlist`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          'Authorization': `Bearer ${cookies.access_token}`
        },
        body: JSON.stringify({
          "videoUrl": videoUrl
        }),
      });

      if (response.status === HttpStatusCode.Ok) {
        console.log("Removed from playlist");
        setResults((results) => results.filter((video) => video.videoUrl !== videoUrl));
        // console.log(results); // setResults is async function, so log may print old value
      }
      else {
        console.error("Unable to remove from Playlist");
      }
    } catch (error) {
      console.error("Error removing from playlist", error);
    }
  }

  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const request = `${apiURL}/music/playlist`;
        console.log(request);
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
        console.log(data);
        setResults(data);
      } catch (err) {
        console.log(err);
      }
    }
    loadPlaylist();
  }, [cookies.access_token]);

  return (
    <div>
      <h1>My Playlist</h1>
      <h5>Where the magic begins</h5>

      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>

      </div>
      {results.length > 0 ? (
        <div>
          {
            results.map((item) => (
              <MusicItem item={item} setTrackName={setTrackName} setTrackUrl={setTrackUrl} RemoveFromPlaylist={RemoveFromPlaylist} />
            ))}
        </div>
      ) : (
        <p>Playlist Empty</p>
      )}
      <Player trackUrl={trackUrl} trackName={trackName} />

    </div>
  );
}

export default Playlist;