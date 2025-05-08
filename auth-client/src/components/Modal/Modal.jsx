import React from 'react';

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-6 text-gray-500 text-xl hover:text-gray-700"
                >
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
}
