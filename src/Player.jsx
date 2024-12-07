import React, { useState } from 'react';

const Player = () => {
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchAudio = async (videoUrl) => {
    setIsLoading(true);

    try {
      // Call the backend to fetch the audio stream
      const response = await fetch(`/download/${encodeURIComponent(videoUrl)}`);
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch audio');
      }

      // Use the backend's response URL as the source for the audio player
    //   setAudioUrl(response.url);
    } catch (error) {
      console.error('Error fetching audio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Button to trigger audio fetching */}
      <button onClick={() => fetchAudio('https://www.youtube.com/watch?v=SSSvc0ybays')}>
        {isLoading ? 'Loading...' : 'Play Audio'}
      </button>

      {/* Audio player */}
      {/* {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )} */}
    </div>
  );
};

export default Player;
