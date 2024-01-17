import { MdDeleteForever } from "react-icons/md";

export default function PincodeItem({ element, deleteTempPincode }) {
    return (
        <li class="list-group-item border-info-subtle" style={{ backgroundColor: '#f6fbff' }} >
            <span style={{ width: '95%' }}>{element}</span>
            <button class="btn btn-danger btn-sm float-right" onClick={() => deleteTempPincode(element)} title="Click to delete this pincode">Delete <MdDeleteForever style={{ marginTop: '-3px', marginLeft: '-3px' }} /></button>
        </li>
    )
}