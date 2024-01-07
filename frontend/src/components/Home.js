import React, { useState } from 'react'
import axios from 'axios';
import RingLoader from "react-spinners/RingLoader";
import Pincode from './Pincode';
import { Link, Route } from "wouter";
import MerchantLogin from './MerchantLogin';
export default function Home() {
	const [showEntriesDialog, setShowEntriesDialog] = useState(false);
	const [pinCode, updatePinCode] = useState(0);
	const [merchantName, updateMerchantName] = useState("0");
	const addRandomEntries = async () => {
		setShowEntriesDialog(true);
		let result = await axios.post("http://localhost:8000/addRandomEntries");
		console.log(result);
		if (result)
			setShowEntriesDialog(false);
	}
	const checkEntries = async () => {
		let result = await axios.post("http://localhost:8000/checkEntries", {
			pinCode: pinCode,
			merchantName: merchantName,
		});
		console.log(result);
	};
	const changePinCode = (event) => {
		updatePinCode(event.target.value);
	};
	const changeMerchantName = (event) => {
		updateMerchantName(event.target.value);
	};
	return (
		<>
			<div className="container mt-5">
				{showEntriesDialog && (
					<RingLoader
						color={"#000066"}
						loading={showEntriesDialog}
						size={150}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>)}


				<h2>sparse matrix</h2>
				<div className="form-group">
					<label htmlFor="pincode">Pincode:</label>
					<input type="text" className="form-control" id="pincode" value={pinCode} onChange={changePinCode} placeholder="Enter Pincode" />
				</div>

				<div className="form-group">
					<label htmlFor="merchantName">Merchant Name:</label>
					<input type="text" className="form-control" id="merchantName" value={merchantName} onChange={changeMerchantName} placeholder="Enter Merchant Name" />
				</div>

				<button type="submit" className="btn btn-primary" onClick={checkEntries}>Check</button>
				<button type="submit" className="btn btn-secondary" onClick={addRandomEntries}>Add Random Entries</button>
			</div>
			<Pincode />
			<Link href='/MerchantLogin'><button  className="btn btn-secondary" >Jump to merchant page!</button></Link>
			
		</>

	)
}