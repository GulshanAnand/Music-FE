import React from 'react';
import { useCookies } from 'react-cookie';
import apiURL from '../config/config';

const AddToPlaylist = async ({item}) => {

    const title = item.title;
    const videoUrl = item.videoUrl;
      const [cookies] = useCookies(["access_token"]);
    

    try {
        const response = await fetch(`${apiURL}/music/playlist`, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
            "Accept": "*/*",
            'Authorization': `Bearer ${cookies.access_token}`
          },
          body: {title, videoUrl},
        });
  
        if (!response.ok) {
            console.error("unable to save to playlist");
        }  
        else{
            console.log("Saved to playlist");
        }
      } catch (error) {
        console.error("Error saving to playlist", error);
      }
    
  return (
    <></>
  ) 
};

export default AddToPlaylist;