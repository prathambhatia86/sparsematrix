import React, { useState } from 'react'
import axios from "axios";
import { TbUserQuestion } from "react-icons/tb";

export default function CheckMerchant() {
    const [pincode, setPincode] = useState('');
    const [merchantName, setMerchantName] = useState('');
    const [isVerified, setVerified] = useState(0);
    const api="";
    const Verify = async () => {
        if (merchantName.length == 0 || pincode.length == 0) return;
        const data = {
            merchantName: merchantName,
            pinCode: pincode
        };
        let result = await axios.post(`${api}/checkEntries`, data);
        result = result.data;
        if (result.status == false) {
            setVerified(2);
        } else setVerified(1);
        setTimeout(() => setVerified(0), 3000);
    }
    return (
        <div className='align-content-center justify-content-center w-50'>
            < div className="card text-center" >
                <div className="card-header">
                    <span style={{ fontWeight: 'bold' }}>Check Merchant - Pincode Pair</span>
                </div>
                <div className="card-body bg-light">
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Pincode</label>
                            <input
                                type="number"
                                className="form-control"
                                id="username"
                                placeholder="Enter the pincode"
                                value={pincode}
                                onChange={(event) => setPincode(event.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">MerchantName</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter the merchant username"
                                value={merchantName}
                                onChange={(event) => setMerchantName(event.target.value)}
                                required
                            />
                        </div>
                        <button type="button" onClick={Verify} className="btn btn-success w-25 btn-outline-info" style={{ color: 'white', opacity: '80%' }}>
                            Verify <TbUserQuestion style={{ marginTop: '-3px', marginLeft: '3px' }} />
                        </button>

                    </form>
                </div>
                <div className="card-footer text-muted">
                    <div className="form-group">
                        {isVerified === 2 && <span className=' text-danger'>Merchant {merchantName} does not deliver to pincode: {pincode}!</span>}
                        {isVerified === 1 && <span className=' text-success'>Merchant {merchantName} delivers to pincode: {pincode}!</span>}
                    </div>
                </div>
            </div >
        </div >
    )
}
