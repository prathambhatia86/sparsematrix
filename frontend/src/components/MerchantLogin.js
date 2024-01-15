import { React, useState } from "react";
import { Route, Link } from "wouter";
import { useLocation } from "wouter";
import axios from "axios";
export default function MerchantLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useLocation();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const doLogin = async () => {
    const data = {
      "username": username,
      "password": password
    }
    let result = await axios.post("http://localhost:8000/doLogin", data);
    if (result.data == "success") {
      setLocation('/MerchantHome');
    }
  }
  return (

    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-header bg-primary text-white">Login</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="button" onClick={doLogin} className="btn btn-primary btn-block">
              Login
            </button>
          </form>
          <hr />
          <p className="text-center">
            Don't have an account?{' '}
            <Link href="/MerchantSignup">
              <button className="btn btn-warning">
                Create Merchant Account
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}