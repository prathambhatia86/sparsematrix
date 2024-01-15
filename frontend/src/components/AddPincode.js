import { useState, useEffect, React } from "react"
import axios from "axios";
import Pincode from "./Pincode";
export default function AddPincode() {
    let [currentPincodes, alterCurrentPincodes] = useState([]);
    let [pinCode, changePinCode] = useState();
    let [details, changeDetails] = useState({});
    useEffect(() => {

        let getPincodes = async () => {
            let data = {
                "merchantName": "hehe@gmail.com"
            }
            let existingPincodes = await axios.post("http://localhost:8000/getPincodesForMerchant", data);
            existingPincodes = await JSON.parse(existingPincodes.data.data);
            alterCurrentPincodes(existingPincodes.pins);
            changeDetails(existingPincodes);

        }
        getPincodes();
    }, []);
    const addTempPincode = () => {
        alterCurrentPincodes((prev) => {
            let newPinArray = [...prev, pinCode];
            return newPinArray;
        })
    };
    const deleteTempPincode = (val) => {

        alterCurrentPincodes((prev) => {
            let newPinArray = prev.filter((item) => {
                return item !== val.items;
            });
            return newPinArray;
        })
    };
    const changePincode = (e) => {
        changePinCode(e.target.value);
    }
    const savePincodes = async () => {
        let data = details
        data.pins = currentPincodes
        data.username = "hehe@gmail.com"
        await axios.post("http://localhost:8000/updateMerchantDetails", data);
    }
    return (
        <>
            <div class="container mt-5">
                <div class="card shadow">
                    <div class="card-body">
                        <h2 class="text-center mb-4">Edit pincode</h2>

                        <div class="input-group mb-3">
                            <input type="text" class="form-control" id="taskInput" placeholder="Add a new pincode" value={pinCode}
                                onChange={changePincode} />
                            <div class="input-group-append">
                                <button class="btn btn-primary" id="addTaskBtn" onClick={addTempPincode}>Add</button>
                            </div>
                        </div>

                        <ul class="list-group" id="taskList">
                            {
                                currentPincodes.map((items) =>
                                (
                                    <li class="list-group-item">
                                        {items}
                                        <button class="btn btn-danger btn-sm float-right" onClick={() => deleteTempPincode({ items })}>Delete</button>
                                    </li>
                                )
                                )
                            }
                        </ul>

                        <button class="btn btn-success mt-3 float-right" onClick={savePincodes} >Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}