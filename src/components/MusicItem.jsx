import React from 'react';
import './MusicItem.css';
// import  AddToPlaylist  from './AddToPlaylist';
import { useCookies } from 'react-cookie';
import apiURL from '../config/config';
import { HttpStatusCode } from 'axios';
import { useLocation } from 'react-router-dom';

const MusicItem = ({ item, setTrackUrl, setTrackName, RemoveFromPlaylist }) => {
    const decodeHtmlEntities = (str) => {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(str, "text/html").body.textContent;
        return decodedString;
    };
    item.title = decodeHtmlEntities(item.title);
    const [cookies] = useCookies(["access_token"]);
    const location = useLocation();
    const isPlaylistPath = location.pathname.endsWith('/playlist');

    const getVideoId = (videoUrl) => {
        const videoId = videoUrl.substr("https://www.youtube.com/watch?v=".length);
        return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    };

    const AddToPlaylist = async (title, videoUrl) => {
        console.log("ye raha title: " + title);
        try {
            const response = await fetch(`${apiURL}/music/playlist`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                'Authorization': `Bearer ${cookies.access_token}`
              },
              body: JSON.stringify({
                    "title":title, 
                    "videoUrl":videoUrl
                }),
            });
      
            if (response.status === HttpStatusCode.Created) {
                console.log("Saved to playlist");
            }  
            else if (response.status === HttpStatusCode.Ok) {
                console.log("Already saved to playlist");
            }
            else {
                console.error("Unable to save to Playlist");
            }
          } catch (error) {
            console.error("Error saving to playlist", error);
          }
    }

    return (
        <div className="music-item-container">
            <div className="thumbnail">
                <img src={getVideoId(item.videoUrl)} alt=''/>
            </div>
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
                <button 
                    className="play-button" 
                    onClick={() => {console.log(item);(isPlaylistPath?RemoveFromPlaylist(item.videoUrl):AddToPlaylist(item.title, item.videoUrl))}}
                >
                <>{!isPlaylistPath?<>ADD TO PLAYLIST</>:<>Remove from PLAYLIST</>}</>           
                </button>
            </div>
        </div>
    );
}

export default MusicItem;
