import React, { useEffect } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  useEffect(() => {
      if(cookies.access_token){
        navigate("/");
      }
      else{
        navigate("/login");
      }
  }, [cookies.access_token, navigate]);

  
  
  return (
    <div>
      <h1>Youtube Audio</h1>
      <h5>Where the magic begins</h5>
      

    </div>
  );
};

export default Home;
