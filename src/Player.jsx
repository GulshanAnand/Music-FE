import React from 'react'
import PlayAudio from './PlayAudio';

const Player = ({trackName,trackUrl}) => {
  return (
    <>
    {trackUrl !== '' ? (<PlayAudio trackUrl={trackUrl} trackName={trackName} />) : (<div>Nothing to play</div>)}
    </>
  )
}

export default Player