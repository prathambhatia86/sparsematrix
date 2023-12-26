import React,{useState} from 'react'
import axios from 'axios';
import RingLoader from "react-spinners/RingLoader";
export default function Home()
{
  const [showEntriesDialog, setShowEntriesDialog] = useState(false);
    const addRandomEntries=async ()=>{
      setShowEntriesDialog(true);
      console.log("yoo");
      let result=await axios.post("http://localhost:8000/addRandomEntries");
      console.log(result);
      if(result)
      setShowEntriesDialog(false);
    }
    return(
      <div className="container mt-5">
         {showEntriesDialog &&(
            <RingLoader
            color={"#000066"}
            loading={showEntriesDialog}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />)}
       
      
      <h2>sparse matrix</h2>
        <div className="form-group">
          <label for="pincode">Pincode:</label>
          <input type="text" className="form-control" id="pincode" placeholder="Enter Pincode" />
        </div>
  
        <div class="form-group">
          <label for="merchantName">Merchant Name:</label>
          <input type="text" className="form-control" id="merchantName" placeholder="Enter Merchant Name" />
        </div>
  
        <button type="submit" className="btn btn-primary"  >Check</button>
        <button type="submit" className="btn btn-secondary" onClick={addRandomEntries}>Add Random Entries</button>
    </div>
        
    )
}