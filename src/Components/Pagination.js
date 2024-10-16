import React from 'react';
import "../CSS/pagination.css";

const Pagination = ({ postsPerPage, length, handlePagination, currentPage }) => {
    const paginationNumbers = [];

    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumbers.push(i);
    }

    return (
        <div id="pagnation-main" className='container'>
        <div className='pagination'>
            {paginationNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={currentPage === pageNumber ? 'active' : ''}
                    onClick={() => handlePagination(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}
        </div>
        </div>
    );
};

export default Pagination;
