import React, { useState } from "react";
import MusicItem from '../components/MusicItem';
import Player from '../components/Player';
import { useLocation } from 'react-router-dom';

const SearchResult = () => {

    const [trackUrl, setTrackUrl] = useState('');
    const [trackName, setTrackName] = useState('');

    const location = useLocation();
    const { results, query } = location.state || {};

    return (
        <div>
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
            <Player trackUrl={trackUrl} trackName={trackName} />
        </div>
    );
};

export default SearchResult;
