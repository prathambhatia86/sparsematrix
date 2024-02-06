import { React, useState } from "react";
import axios from "axios";
import { GiConfirmed } from "react-icons/gi";

export default function MerchantSignup({ changeLogin }) {
	const api="";
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [city, setCity] = useState('');
	const [isVerified, setVerified] = useState(false);

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
	const addSignup = async () => {
		if (name.length == 0 || username.length == 0 || city.length == 0 || password.length == 0) {
			alert('Some field(s) are still empty!');
			return;
		}
		const data = {
			"name": name,
			"username": username,
			"password": password,
			"city": city
		}
		let result = await axios.post(`${api}/addMerchant`, data);
		if (result.data.success) {
			changeLogin()
		}
	}

	const handleVerification = async () => {
		const data = {
			"username": username
		}
		let result = await axios.post(`${api}/verifyUnique`, data);
		console.log(result.data);
		if (result.data.unique) {
			setVerified(true);
		}
	}
	return (

		<div className="container mt-5">
			<div className="card mx-auto" style={{ maxWidth: '400px' }}>
				<div className="card-header bg-success text-white">Sign Up</div>
				<div className="card-body bg-light">
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
							<div className=" input-group">
								<input
									type="text"
									className="form-control"
									id="username"
									placeholder="Enter a unique username"
									value={username}
									onChange={handleUsernameChange}
									required
								/>
								<button type="button" style={{ opacity: '70%' }} className={!isVerified ? "btn btn-secondary rounded-0 " : "btn btn-success rounded-0"} disabled={isVerified} onClick={handleVerification}>{!isVerified && 'Verify'} {isVerified && 'Verified '}{isVerified && < GiConfirmed style={{ marginLeft: '-3px', marginTop: '-3px' }} />}</button>
							</div>
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
						<button type="button" onClick={addSignup} disabled={!isVerified} className="btn btn-success btn-block" style={{ color: 'white' }}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}