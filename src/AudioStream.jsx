import React, { useState } from "react";

const AudioStream = () => {
  const [audioURL, setAudioURL] = useState(null);

  const fetchAudio = async () => {
    try {
        const inputString = `https://www.youtube.com/watch?v=k7zcKK4kK0c`;
      const response = await fetch(`http://192.168.0.103/music/download`,{
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: inputString, // Sending the string as the body
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch audio stream");
      }

      const blob = await response.blob(); // Get binary data as a Blob
      const url = URL.createObjectURL(blob); // Create object URL for the Blob
      setAudioURL(url); // Save URL to state
    } catch (error) {
      console.error("Error fetching audio stream:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchAudio}>Fetch Audio</button>
      {audioURL && (
        <audio controls>
          <source src={audioURL} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default AudioStream;
