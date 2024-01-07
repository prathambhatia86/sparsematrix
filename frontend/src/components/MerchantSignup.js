import {Route,Link} from "wouter";
export default function MerchantSignup()
{
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
                  required
                />
              </div>
              <button type="submit" className="btn btn-success btn-block">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}