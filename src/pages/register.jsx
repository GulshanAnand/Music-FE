import React, { useState, useEffect } from 'react';
import apiURL from '../config/config';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const Register = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const role = "USER";

    const navigate = useNavigate();
    const [cookies] = useCookies(["access_token"]);

    useEffect(() => {
        if(cookies.access_token){
            navigate("/");
        }
    });
  
    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(apiURL + "/auth/register", {
                firstname,
                lastname,
                email,
                password,
                role
            });
            if(response.data.token){
                alert("Registered Successfully");
                navigate("/login");
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
        <h2>Register</h2>
        <form>
          <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="button" onClick={handleRegister}>Register</button>
        </form>
        <Link to="/login"><p>Already have an account</p></Link>
      </div>
    );
  };

export default Register;