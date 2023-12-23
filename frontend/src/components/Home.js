import React from 'react'
export default function home()
{
    
    return(
        
         <div className="container mt-5">
      <h2>sparse matrix</h2>
  
      <form>
        <div className="form-group">
          <label for="pincode">Pincode:</label>
          <input type="text" className="form-control" id="pincode" placeholder="Enter Pincode" />
        </div>
  
        <div class="form-group">
          <label for="merchantName">Merchant Name:</label>
          <input type="text" className="form-control" id="merchantName" placeholder="Enter Merchant Name" />
        </div>
  
        <button type="button" className="btn btn-primary" >Check</button>
        <button type="button" className="btn btn-secondary">Add Random Entries</button>
      </form>
    </div>
        
    )
}