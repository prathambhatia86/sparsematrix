import {Route,Link} from "wouter";
export default function MerchantLogin()
{
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
            <button type="submit" className="btn btn-primary btn-block">
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