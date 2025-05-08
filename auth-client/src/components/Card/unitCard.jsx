import React from 'react';

const UnitCard = ({ unit }) => {
    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition">
            <img
                src={unit.image_url || 'https://via.placeholder.com/400x250?text=No+Image'}
                alt={unit.unit_name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-1 text-sm text-gray-700">
                <h2 className="text-md text-gray-600 font-bold">{unit.unit_name}</h2>
                <p className="text-sm font-semibold">{unit.description}</p>
                <p className="capitalize text-sm font-semibold">Type: {unit.unit_type}</p>
                <p className={unit.availability ? 'text-green-600 font-semibold text-sm' : 'text-red-500 text-sm'}>
                    Status: {unit.availability ? 'Available' : 'Unavailable'}
                </p>
                <div className='flex justify-between items-center text-sm'>
                    <div>
                        <p className='font-semibold'>${Number(unit.price_per_night).toFixed(2)} / night</p>
                    </div>
                    <div>
                        <button className='border-b-2 font-semibold border-gray-500 hover:border-gray-700 duration-300 ease-in-out'>Book now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnitCard;
