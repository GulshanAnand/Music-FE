import React, { useState, useEffect } from "react";

const PlayAudio = ({trackName}) => {
  // const trackName = "https://www.youtube.com/watch?v=3CvdX1VVNbY";
  const [audioSrc, setAudioSrc] = useState("");

  const fetchAudio = async () => {
    try {
      const response = await fetch("http://192.168.0.103:8080/music/download", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          "Accept": "*/*",
        },
        body: trackName,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Get the blob data from the response
      const blob = await response.blob();
      console.log(blob);

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Set the audio source to the blob URL
      setAudioSrc(url);
      // console(url);
    } catch (error) {
      console.error("Error fetching the audio:", error);
    }
  };

  useEffect(() => {
    // Call fetchAudio only once when trackName changes
    if (trackName) {
      fetchAudio();
    }
  }, [trackName]);

  // fetchAudio();

  return (
    <div>
      {/* <button onClick={fetchAudio}>Play Audio</button> */}
      <audio controls src={audioSrc} />
    </div>
  );
};

export default PlayAudio;
