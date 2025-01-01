import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import apiURL from '../config/config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    useEffect(() => {
        if(cookies.access_token){
            navigate("/");
        }
    });
  
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(apiURL + "/auth/login", {
                email,
                password
            });
            if(response.data.token){
                setCookies("access_token", response.data.token, { path: "/" });
                navigate("/");
            }
            else{
                alert(response.data.message);
            }
        } catch(err) {
            console.log(err);
        }
    };
  
    return (
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="button" onClick={handleLogin}>Login</button>
        </form>
        <Link to="/register"><p>Create an Account</p></Link>
      </div>
    );
  };

export default Login;