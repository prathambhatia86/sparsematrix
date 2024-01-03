import React, { useRef, useState } from 'react'
import axios from 'axios';
import RingLoader from "react-spinners/RingLoader";
import Pagination from './Pagination';

export default function Pincode() {
    const [showMerchants, changeShowMerchants] = useState(false);
    const [pinCode, updatePinCode] = useState(0);
    const [merchantData, changeData] = useState([]);
    const [currentData, setCurrent] = useState({});
    const [allowNext, changeAllowNext] = useState(true);
    const index = useRef(0);
    const changePinCode = (event) => {
        updatePinCode(event.target.value);
    };
    const startRetrieving = async () => {
        //Reset for new pincode
        changeData([]);
        changeShowMerchants(true);
        index.current = 1;
        let result = await axios.post("http://localhost:8000/getMerchantsByPincode", {
            pincode: pinCode,
            cursor: 0,
        });
        result = result.data;
        changeData([...merchantData, result])
        setCurrent(result);
        if (result.cursor == 0) changeAllowNext(false);
        else changeAllowNext(true)
    }
    const onNext = async () => {
        let res = {};
        index.current = index.current + 1;
        if (merchantData.length >= index.current) {
            setCurrent(merchantData[index.current - 1]);
            res = merchantData[index.current - 1];
        } else {
            let result = await axios.post("http://localhost:8000/getMerchantsByPincode", {
                pincode: pinCode,
                cursor: currentData.cursor,
            });
            result = result.data;
            changeData([...merchantData, result])
            setCurrent(result);
            res = result;
        }
        if (res.cursor == 0) changeAllowNext(false);
        else changeAllowNext(true);
    }

    const onPrevious = async () => {
        let res = {};
        index.current = Math.max(index.current - 1, 1);
        setCurrent(merchantData[index.current - 1]);
        res = merchantData[index.current - 1];
        if (res.cursor == 0) changeAllowNext(false);
        else changeAllowNext(true);
    }
    console.log(currentData)
    return (
        <div className="container mt-5">
            {showMerchants && (
                <>
                    <RingLoader
                        color={"#000066"}
                        loading={showMerchants}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    <Pagination onNext={onNext} canGoAhead={allowNext} currentPage={index.current} onPrevious={onPrevious} />
                </>)}


            <h2>Retrieve Merchants</h2>
            <div className="form-group">
                <label htmlFor="pincode">Pincode:</label>
                <input type="text" className="form-control" id="pincode" value={pinCode} onChange={changePinCode} placeholder="Enter Pincode" />
            </div>
            <button type="submit" className="btn btn-primary" onClick={startRetrieving}>Submit</button>
        </div>

    )
}