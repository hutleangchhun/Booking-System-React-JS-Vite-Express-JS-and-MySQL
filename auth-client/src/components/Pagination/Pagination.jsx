import React from 'react';
import Icon from '../../assets/Icons/icons';

const Pagination = ({ totalUsers, usersPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="mt-6 flex justify-center items-center gap-2 text-sm">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-1 rounded-full transition border-2  
                    ${currentPage === 1 ? 'bg-gray-100 border-blue-500 hover:bg-blue-200  cursor-not-allowed' : 'bg-blue-200 border-blue-500 hover:bg-blue-500'}`}>
                <Icon name="pageLeft" className="text-md text-blue-700" />
            </button>

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-2 py-1 border-b-2 font-medium transition
                        ${currentPage === page
                            ? 'bg-transparent text-blue-700 border-blue-700'
                            : 'text-blue-700 hover:border-blue-700'}`}>
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-1 rounded-full transition border-2
                    ${currentPage === totalPages ? 'bg-gray-100 border-blue-500 hover:bg-blue-200  cursor-not-allowed' : 'bg-blue-200 border-blue-500 hover:bg-blue-500'}`}>
                <Icon name="pageRight" className="text-md text-blue-700" />
            </button>
        </div>
    );
};

export default Pagination;
