import React, { useState, useEffect } from 'react';
import { createUnit, updateUnit } from '../../Service/unitApi';
import Swal from 'sweetalert2';

const UnitForm = ({ mode = 'create', unit = null, onSuccess }) => {
    const [formData, setFormData] = useState({
        unit_name: '',
        unit_type: '',
        price_per_night: '',
        capacity: '',
        availability: true,
        image_url: '',
        description: ''
    });

    useEffect(() => {
        if (unit) {
            setFormData({
                unit_name: unit.unit_name || '',
                unit_type: unit.unit_type || '',
                price_per_night: unit.price_per_night || '',
                capacity: unit.capacity || '',
                availability: unit.availability ?? true,
                image_url: unit.image_url || '',
                description: unit.description || ''
            });
        }
    }, [unit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: fieldValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (mode === 'create') {
                await createUnit(formData);
                Swal.fire('Success', 'Unit created successfully!', 'success');
            } else if (mode === 'update') {
                await updateUnit(unit.id, formData);
                Swal.fire('Success', 'Unit updated successfully!', 'success');
            }
            onSuccess();
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Operation failed.', 'error');
        }
    };

    return (
        <>
            <h1 className='text-base font-bold mb-5 pb-2 capitalize text-gray-700 border-b-2 border-gray-300'>
                {mode === 'create' ? 'Add New Unit' : 'Update Unit'}
            </h1>
            <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto text-sm grid gap-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Unit Name</label>
                    <input
                        name="unit_name"
                        type="text"
                        value={formData.unit_name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Unit Type</label>
                    <select
                        name="unit_type"
                        value={formData.unit_type}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="" disabled>Select a unit type</option>
                        <option value="1-bedroom">1-bedroom</option>
                        <option value="2-bedroom">2-bedroom</option>
                        <option value="3-bedroom">3-bedroom</option>
                        <option value="penthouse">Penthouse</option>
                    </select>
                </div>


                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Price Per Night</label>
                    <input
                        name="price_per_night"
                        type="number"
                        value={formData.price_per_night}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Capacity</label>
                    <input
                        name="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        name="availability"
                        type="checkbox"
                        checked={formData.availability}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label className="text-gray-700 font-semibold">Available</label>
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Image URL</label>
                    <input
                        name="image_url"
                        type="text"
                        value={formData.image_url}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className='flex justify-end'>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 font-semibold rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        {mode === 'create' ? 'Create Unit' : 'Update Unit'}
                    </button>
                </div>
            </form>
        </>
    );
};

export default UnitForm;
