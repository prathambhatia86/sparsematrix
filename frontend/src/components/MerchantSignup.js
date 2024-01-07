import {Route,Link} from "wouter";
import {React,useState} from "react";
import axios from "axios";
export default function MerchantSignup()
{
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
      const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const addSignup=async()=>{
    const data={
        "name":name,
        "username":username,
        "password":password,
        "city":city
    }
    let result = await axios.post("http://localhost:8000/addMerchant", data);
    console.log(result);
  }
    return(

        <div className="container mt-5">
        <div className="card mx-auto" style={{ maxWidth: '400px' }}>
          <div className="card-header bg-success text-white">Sign Up</div>
          <div className="card-body">
            <form >
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                onChange={handleNameChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter a unique username"
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
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="Enter your city"
                  value={city}
                  onChange={handleCityChange}
                  required
                />
              </div>
              <button type="button" onClick={addSignup} className="btn btn-success btn-block">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}