import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import "./Player.css";
import apiURL from '../config/config';

const Player = ({ trackName, trackUrl }) => {

  const [audioSrc, setAudioSrc] = useState("");
  const [isLoaded, setIsLoaded] = useState(false); 
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await fetch(`${apiURL}/music/download`, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
            "Accept": "*/*",
            'Authorization': `Bearer ${cookies.access_token}`
          },
          body: trackUrl,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        } 
        const blob = await response.blob();
        console.log(blob); 
        const url = window.URL.createObjectURL(blob); 
        setAudioSrc(url); 
      } catch (error) {
        console.error("Error fetching the audio:", error);
      }
    };
    if (trackUrl) {
      fetchAudio();
      setIsLoaded(false);
    }
  }, [trackUrl, cookies.access_token]);

  return (
    <div className="player-container">
      {trackUrl !== "" ? (
        <>
          <div>
            <div className="player-title">
              {isLoaded ? (<> {trackName}</>) : (<>Loading</>)}
            </div>

            <audio controls src={audioSrc} onLoadedData={() => setIsLoaded(true)} />
          </div>
        </>
      ) : (
        <div className="player-fallback">Nothing to play</div>
      )}
    </div>
  );
};

export default Player;
