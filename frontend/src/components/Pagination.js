import React from 'react';

const Pagination = ({ onNext, onPrevious, currentPage, canGoAhead }) => {
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
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
        </nav>
    );
};

export default Pagination;