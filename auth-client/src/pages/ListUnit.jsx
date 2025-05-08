import React, { useEffect, useState } from 'react';
import { fetchAllUnits } from '../Service/unitApi';
import UnitCard from '../components/Card/unitCard';

const UnitGrid = () => {
    const [units, setUnits] = useState([]);

    useEffect(() => {
        const loadUnits = async () => {
            const data = await fetchAllUnits();
            setUnits(data);
        };
        loadUnits();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4 text-gray-700">Available Units</h1>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {units.map(unit => (
                    <UnitCard key={unit.id} unit={unit} />
                ))}
            </div>
        </div>
    );
};

export default UnitGrid;
