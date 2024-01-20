import { useState } from "react";
import { MdCopyAll, MdDeleteForever } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
export default function DataItem({ element, deleteTempPincode }) {
    const [copying, setcopying] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(element);
        setcopying(true);
        setTimeout(() => {
            setcopying(false);
        }, 250);
    }
    return (
        <li class="list-group-item border-info-subtle" style={{ backgroundColor: '#f6fbff' }} >
            <span style={{ width: '95%' }}>{element}</span>
            {deleteTempPincode != undefined && <button className="btn btn-danger btn-sm float-right" onClick={() => deleteTempPincode(element)} title="Click to delete this pincode">Delete <MdDeleteForever style={{ marginTop: '-3px', marginLeft: '-3px' }} /></button>}
            {!copying && <button className="btn btn-light btn-sm float-right mr-1" onClick={copy} title="Click to copy"><MdCopyAll style={{ marginTop: '-3px', marginLeft: '-3px' }} /></button>}
            {copying && <button className="btn btn-success rounded-5 btn-sm float-right mr-1" onClick={copy} title="Click to copy"><MdOutlineDone style={{ marginTop: '-3px', marginLeft: '-3px' }} /></button>}
        </li>
    )
}