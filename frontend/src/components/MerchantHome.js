import {React,useState} from "react"
import AddPincode from "./AddPincode"

export default function MerchantHome()
{
    const [isClikedEditPincode,toggleEditPincodes]=useState(false);
    const editPincodes =()=>{
        toggleEditPincodes(prev=>!(prev));
    }
    return(
        <div class="container mt-5">
    <h2 class="text-center mb-4">User Profile</h2>

    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow">
                <div class="card-body text-center">
                    <button class="btn btn-primary mr-2">Check Profile</button>
                    <button class="btn btn-warning" onClick={editPincodes}>Edit Pincodes</button>
                </div>
            </div>
        </div>
        {isClikedEditPincode&&<AddPincode/>}
    </div>
</div>
    )
}