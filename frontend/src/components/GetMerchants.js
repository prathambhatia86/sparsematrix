import React, { useEffect, useState } from 'react'
import { IoCloudDownloadSharp } from "react-icons/io5";
import axios from "axios";
import Pagination from "./Pagination";
import MerchantItem from "./DataItem";

export default function GetMerchants() {
    const [pincode, setPincode] = useState('');
    const [currentMerchants, setcurrentMerchants] = useState([]);
    const [paginationWasteState, changeWasteState] = useState(1);
    const [allowNext, changeAllowNext] = useState(false);


    const Get = async () => {
        if (pincode.length == 0) return;
        const data = {
            pinCode: pincode
        };
        let result = await axios.post("http://localhost:8000/getMerchantsByPincode", data);
        result = result.data;
        if (result.merchants.length == 0) {
            window.alert('No merchant found for this pincode!');
        }
        setcurrentMerchants(result.merchants);
    }

    //Pagination logic
    useEffect(() => {
        if (currentMerchants.length > 10 * paginationWasteState) changeAllowNext(true);
        else changeAllowNext(false);
    }, [currentMerchants, paginationWasteState])
    const onNext = async () => {
        changeWasteState((prev) => prev + 1);
        if (currentMerchants.length > 10 * paginationWasteState) changeAllowNext(true);
        else changeAllowNext(false);
    }

    const onPrevious = async () => {
        changeWasteState((prev) => prev - 1);
        if (currentMerchants.length > 10 * paginationWasteState) changeAllowNext(true);
        else changeAllowNext(false);
    }

    return (
        <div className='align-content-center justify-content-center w-50'>
            < div className="card text-center" >
                <div className="card-header">
                    <span style={{ fontWeight: 'bold' }}>Get All Merchants at a particular Pincode</span>
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
                        <button type="button" onClick={Get} className="btn btn-primary w-25 btn-outline-info" style={{ color: 'white', opacity: '80%' }}>
                            Get <IoCloudDownloadSharp style={{ marginTop: '-3px', marginLeft: '3px' }} />
                        </button>
                    </form>
                </div>
                <div className="card-footer text-muted">
                    {currentMerchants.length > 0 &&
                        <><ul class="list-group">
                            {
                                currentMerchants.slice((paginationWasteState - 1) * 10, paginationWasteState * 10).map((element) => {
                                    return <MerchantItem key={element} element={element} />
                                })
                            }
                        </ul>
                            <Pagination onNext={onNext} canGoAhead={allowNext} currentPage={paginationWasteState} onPrevious={onPrevious} />
                        </>
                    }
                </div>
            </div >
        </div >
    )
}
