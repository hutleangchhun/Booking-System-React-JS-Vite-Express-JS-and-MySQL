import React from 'react';
import Icon from '../../assets/Icons/icons';

const Pagination = ({ totalUsers, usersPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="mt-6 flex justify-end items-center gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-1 rounded transition 
                    ${currentPage === 1 ? 'bg-gray-300  cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                <Icon name="pageLeft" className="w-5 h-5" />
            </button>

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-2 py-1 rounded font-medium transition
                        ${currentPage === page
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}>
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-1 rounded transition 
                    ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                <Icon name="pageRight" className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Pagination;
