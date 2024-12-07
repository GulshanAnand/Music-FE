import React, { useState, useEffect } from "react";
import './Player.css';

const PlayAudio = ({trackName, trackUrl}) => { 
  const [audioSrc, setAudioSrc] = useState("");
  const [isLoaded, setIsLoaded] = useState(false); 

  const fetchAudio = async () => {
    try {
      const response = await fetch("http://192.168.0.103:8080/music/download", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          "Accept": "*/*",
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

  useEffect(() => { 
    if (trackUrl) {
      fetchAudio();
      setIsLoaded(false);
    }
  }, [trackUrl]); 

  return (
    <div>  
      <div className="player-title">
      {isLoaded ? (<> {trackName}</>):(<>Loading</>)}
      </div>
      
      <audio  controls src={audioSrc} onLoadedData={() => setIsLoaded(true)} />
    </div>
  );
};

export default PlayAudio;
