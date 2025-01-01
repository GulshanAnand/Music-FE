import React from 'react'
import PlayAudio from './PlayAudio';
import "./Player.css";

const Player = ({ trackName, trackUrl }) => {
  return (
    <div className="player-container">
      {trackUrl !== "" ? (
        <> 
          <PlayAudio trackUrl={trackUrl} trackName={trackName} />
        </>
      ) : (
        <div className="player-fallback">Nothing to play</div>
      )}
    </div>
  );
};

export default Player;
