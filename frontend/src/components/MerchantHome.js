import { React, useEffect, useState } from "react"
import AddPincode from "./AddPincode"
import { CgProfile } from "react-icons/cg";
import { TbHomeEdit } from "react-icons/tb";
import { jwtDecode } from "jwt-decode";
export default function MerchantHome() {
    const [isClickedEditPincode, toggleEditPincodes] = useState(false);
    const [isClickedProfile, toggleCheckProfile] = useState(false);
    const [userName,changeUsername]=useState("");
    const editPincodes = () => {
        toggleEditPincodes(prev => !(prev));
        toggleCheckProfile(false);
    }
    const editCheckProfile = () => {
        toggleCheckProfile(prev => !(prev));
        toggleEditPincodes(false);
    }
    useEffect(()=>{
        const token=sessionStorage.getItem("token");
        const decoded = jwtDecode(token);
        changeUsername(decoded.username);
    },[]);
    return (
        <div class="container mt-5">
            <h2 class="text-center mb-4">Welcome {userName}</h2>

            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card shadow">
                        <div class="card-body text-center">
                            <button class={isClickedProfile ? "btn btn-primary mr-2" : "btn btn-secondary mr-2 btn-outline-primary"} style={{ color: 'white' }} onClick={editCheckProfile}>Check Profile <CgProfile style={{ marginTop: '-3px', marginLeft: '-3px' }} /></button>
                            <button class={isClickedEditPincode ? "btn btn-warning ml-2" : "btn btn-secondary ml-2 btn-outline-warning"} style={{ color: 'white' }} onClick={editPincodes}>Edit Pincodes <TbHomeEdit style={{ marginTop: '-3px', marginLeft: '-3px' }} /></button>
                        </div>
                    </div>
                </div>
                {isClickedEditPincode && <AddPincode />}
            </div>
        </div>
    )
}