import React from "react";

const ConfirmDelete = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">           

            <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300" />

            <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center border border-gray-300 backdrop-blur-md bg-opacity-95">
                <p className="text-lg font-semibold text-gray-800 mb-4">{message}</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;
