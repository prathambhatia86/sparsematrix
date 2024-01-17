import React from 'react';
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const Pagination = ({ onNext, onPrevious, currentPage, canGoAhead }) => {
    return (
        <div style={{ width: '100%' }}>
            <ul className="pagination text-center d-flex justify-content-center align-content-center mt-3 mb-0" style={{ width: '100%' }}>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={onPrevious} disabled={currentPage === 1}>
                        <IoArrowBack style={{ marginTop: '-3px', marginRight: '-3px' }} /> Previous
                    </button>
                </li>
                <li className="page-item">
                    <span className="page-link">{`Page ${currentPage}`}</span>
                </li>
                <li className={`page-item ${!canGoAhead ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={onNext} disabled={!canGoAhead}>
                        Next <IoArrowForward style={{ marginTop: '-3px', marginLeft: '-3px' }} />
                    </button>
                </li>
            </ul>
        </div >
    );
};

export default Pagination;