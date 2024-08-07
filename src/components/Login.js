import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import "./login.css";

const Login = () => {
  const history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history('/home');
    }
  }, []);
 
  const [loginData, setLogindata] = useState({ email: "", passwd: "" });

  const loginSubmit = async (e) => {
    e.preventDefault();
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
    };
     
    let bodyContent = JSON.stringify({
      "email": loginData.email,
      "passwd": loginData.passwd
    });
     
    let response = await fetch("https://sudomovies-backend.onrender.com/api/auth/login", { 
      method: "POST",
      body: bodyContent,
      headers: headersList
    });
     
    let data = await response.json();
    
    if (data.success) {
      localStorage.setItem('token', data.token);
      history('/home');
    } else {
      document.getElementById("msg").innerHTML = data.message;
    }
  };

  const onChange = (e) => {
    setLogindata({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="animated bounceInDown">
        <div className="container2">
          <span className="animated tada" id="msg"></span>
          <form name="form1" className="box" method="post" onSubmit={loginSubmit}>
            <h4>Login</h4>
            <h5>Sign in to your account.</h5>
            <input
              type="text"
              name="email"
              placeholder="Email"
              required
              onChange={onChange}
              value={loginData.email}
            />
            <i className="typcn typcn-eye" id="eye"></i>
            <input
              type="password"
              name="passwd"
              placeholder="Password"
              id="pwd"
              required
              autoComplete="off"
              value={loginData.passwd}
              onChange={onChange}
            />
            <input type="submit" value="Login" className="btn1" />
          </form>
          <Link to="/signup" className="dnthave">
            Don’t have an account? Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
