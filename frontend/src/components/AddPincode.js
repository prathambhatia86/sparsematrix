import { useState, useEffect, useRef, React } from "react"
import axios from "axios";
import Pagination from "./Pagination";
import PincodeItem from "./DataItem";
import { MdSave } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
export default function AddPincode() {
    //Variables for pagination
    const [allowNext, changeAllowNext] = useState(false);

    let [currentPincodes, alterCurrentPincodes] = useState([]);
    let [pinCode, changePinCode] = useState();
    let addedPins = useRef(new Set());
    let delPins = useRef(new Set());
    useEffect(() => {
        let getPincodes = async () => {
            let data = {
                "merchantName": "hehe@gmail.com"
            }
            let existingPincodes = await axios.post("http://localhost:8000/getPincodesForMerchant", data);
            existingPincodes = await JSON.parse(existingPincodes.data);
            alterCurrentPincodes(existingPincodes);

        }
        getPincodes();
    }, []);
    const addTempPincode = () => {
        if (addedPins.current.has(pinCode)) return;
        addedPins.current.add(pinCode);
        delPins.current.delete(pinCode);
        alterCurrentPincodes((prev) => {
            let newPinArray = [...prev, pinCode];
            return newPinArray;
        })
    };
    const deleteTempPincode = (val) => {
        addedPins.current.delete(pinCode);
        delPins.current.add(pinCode);
        alterCurrentPincodes((prev) => {
            let newPinArray = prev.filter((item) => {
                console.log(item)
                return item !== val;
            });
            if (newPinArray.length <= 3 * (paginationWasteState - 1)) changeWasteState(prev => prev - 1);
            return newPinArray;
        })
    };
    console.log(currentPincodes)
    const changePincode = (e) => {
        changePinCode(e.target.value);
    }
    const savePincodes = async () => {
        const ok = window.confirm('Are you sure you want to save these changes?');
        if (!ok) return;
        const addedPinsArray = Array.from(addedPins.current);
        const delPinsArray = Array.from(delPins.current);
        if (delPinsArray.length === 0 && addedPinsArray.length === 0) return;
        let data = {
            "pins": currentPincodes,
            "username": "hehe@gmail.com",
            "addedPins": addedPinsArray,
            "delPins": delPinsArray
        }

        await axios.post("http://localhost:8000/updateMerchantDetails", data);
        if (currentPincodes.length > 3 * paginationWasteState) changeAllowNext(true);
        else changeAllowNext(false);

    }

    //Pagination Logic
    const [paginationWasteState, changeWasteState] = useState(1);
    useEffect(() => {
        if (currentPincodes.length > 3 * paginationWasteState) changeAllowNext(true);
        else changeAllowNext(false);
    }, [currentPincodes, paginationWasteState])
    const onNext = async () => {
        changeWasteState((prev) => prev + 1);
        if (currentPincodes.length > 3 * paginationWasteState) changeAllowNext(true);
        else changeAllowNext(false);
    }

    const onPrevious = async () => {
        changeWasteState((prev) => prev - 1);
        if (currentPincodes.length > 3 * paginationWasteState) changeAllowNext(true);
        else changeAllowNext(false);
    }


    return (
        <>
            <div class="container mt-5 ">
                <div class="card shadow bg-light">
                    <div class="card-body">
                        <h2 class="text-center mb-4">Manage Pincodes</h2>

                        <div class="input-group mb-3">
                            <input type="text" class="form-control" id="taskInput" placeholder="Add a new pincode" value={pinCode}
                                onChange={changePincode} />
                            <div class="input-group-append">
                                <button class="btn btn-primary btn-outline-secondary" style={{ color: 'white' }} id="addTaskBtn" onClick={addTempPincode} title="Click to add this pincode">Add <IoAddCircleOutline style={{ marginTop: '-3px', marginLeft: '-3px' }} /></button>
                            </div>
                        </div>
                        <ul class="list-group">
                            {
                                currentPincodes.slice((paginationWasteState - 1) * 3, paginationWasteState * 3).map((element) => {
                                    return <PincodeItem key={element} element={element} deleteTempPincode={deleteTempPincode} />
                                })
                            }
                        </ul>
                        <Pagination onNext={onNext} canGoAhead={allowNext} currentPage={paginationWasteState} onPrevious={onPrevious} />

                        <button class="btn btn-success mt-3 float-right " onClick={savePincodes} title="Click to save the changes, unsaved changes are lost on refresh">Save <MdSave style={{ marginTop: '-3px', marginLeft: '-3px' }} /></button>
                    </div>
                </div>
            </div>
        </>
    )
}