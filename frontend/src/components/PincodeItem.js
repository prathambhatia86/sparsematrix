import { MdDeleteForever } from "react-icons/md";

export default function PincodeItem({ element, deleteTempPincode }) {
    return (
        <li class="list-group-item" >
            <span style={{ width: '95%' }}>{element}</span>
            <button class="btn btn-danger btn-sm float-right" onClick={() => deleteTempPincode(element)}>Delete <MdDeleteForever /></button>
        </li>
    )
}