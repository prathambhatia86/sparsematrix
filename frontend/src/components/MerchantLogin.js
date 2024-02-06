import { React, useState } from "react";
import { Link } from "wouter";
import { useLocation } from "wouter";
import { FaQuestion } from "react-icons/fa6";
import axios from "axios";

export default function MerchantLogin() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [location, setLocation] = useLocation();
	const api="";
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
		let result = await axios.post(`${api}/doLogin`, data);
		console.log(result);
		if (result.data.track == "correct") {
			console.log(result.data.token);
			sessionStorage.setItem("token", result.data.token);
			setLocation('/MerchantHome');
		}
	}
	return (

		<div className="container mt-5">
			<div className="card mx-auto" style={{ maxWidth: '400px' }}>
				<div className="card-header bg-primary text-white">Login</div>
				<div className="card-body bg-light">
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
						<button type="button" onClick={doLogin} className="btn btn-primary btn-block btn-outline-info" style={{ color: 'white' }}>
							Login
						</button>
					</form>
					<hr />
					<p className="text-center">
						<Link href="/ForgotPassword">
							<button className="btn btn-warning btn-outline-info border-0" style={{ color: 'white', opacity: '75%' }}>
								Forgot Password <FaQuestion style={{ marginTop: '-3px', marginLeft: '-3px' }} />
							</button>
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}