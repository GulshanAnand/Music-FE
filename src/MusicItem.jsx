import React from 'react';
import './MusicItem.css';

const MusicItem = ({ item, setTrackUrl, setTrackName }) => {
    const decodeHtmlEntities = (str) => {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(str, "text/html").body.textContent;
        return decodedString;
    };
    item.title = decodeHtmlEntities(item.title);
    return (
        <div className="music-item-container">
            <div className="title-box">
                {item.title}
            </div>
            <div className="button-box">
                <button 
                    className="play-button" 
                    onClick={() => { setTrackUrl(item.videoUrl); setTrackName(item.title); }}
                >
                    PLAY
                </button>
            </div>
        </div>
    );
}

export default MusicItem;
