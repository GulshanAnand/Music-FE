import React from 'react'

const MusicItem = ({ item, setTrackUrl, setTrackName }) => {
    const decodeHtmlEntities = (str) => {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(str, "text/html").body.textContent;
        return decodedString;
    };
    item.title = decodeHtmlEntities(item.title);
    return (
        <div>
            {(item.title)}<br />{item.videoUrl}<br />
            <button onClick={() => { setTrackUrl(item.videoUrl); setTrackName(item.title) }}>PLAY</button>
        </div>
    )
}

export default MusicItem