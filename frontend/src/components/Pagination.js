import React from 'react';

const Pagination = ({ onNext, onPrevious, currentPage, canGoAhead }) => {
    return (
        <div style={{ width: '100%' }}>
            <ul className="pagination text-center d-flex justify-content-center align-content-center mt-3 mb-0" style={{ width: '100%' }}>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={onPrevious} disabled={currentPage === 1}>
                        Previous
                    </button>
                </li>
                <li className="page-item">
                    <span className="page-link">{`Page ${currentPage}`}</span>
                </li>
                <li className={`page-item ${!canGoAhead ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={onNext} disabled={!canGoAhead}>
                        Next
                    </button>
                </li>
            </ul>
        </div >
    );
};

export default Pagination;