import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/Icons/icons';
import { fetchAllUnits, deleteUnit } from '../../Service/unitApi';
import { getUserRole } from '../../auth';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading/Loading';
import Pagination from '../../components/Pagination/Pagination';
import ErrorMessage from '../../components/Error/ErrorMessage';
import Modal from '../../components/Modal/Modal';
import UnitForm from '../../components/Form/unitForm';

const UnitList = () => {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const unitsPerPage = 10;

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [unitToUpdate, setUnitToUpdate] = useState(null);


    const navigate = useNavigate();

    const fetchUnits = async () => {
        try {
            const data = await fetchAllUnits();
            setUnits(data);
        } catch (error) {
            console.error('Error fetching units:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setRole(getUserRole());
        fetchUnits();
    }, []);


    // === OPEN MODALS ===
    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };
    const handleUpdateUnitClick = (unitId) => {
        const selectedUnit = units.find(u => u.id === unitId);
        setUnitToUpdate(selectedUnit);
        setIsUpdateModalOpen(true);
    };
    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsUpdateModalOpen(false);
        setUnitToUpdate(null);
    };

    const handleDelete = async (unitId, unitName) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `Do you really want to delete "${unitName}"?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
            });

            if (result.isConfirmed) {
                await deleteUnit(unitId);
                setUnits(units.filter(unit => unit.id !== unitId));
                Swal.fire('Deleted!', `${unitName} has been deleted.`, 'success');
                fetchAllUnits();
            }
        } catch (error) {
            console.error('Error deleting unit:', error);
            setError('Error deleting unit');
            Swal.fire('Error', 'Failed to delete unit.', 'error');
        }
    };

    const indexOfLast = currentPage * unitsPerPage;
    const indexOfFirst = indexOfLast - unitsPerPage;
    const currentUnits = units.slice(indexOfFirst, indexOfLast);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="p-2">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-base font-bold text-gray-700">List of Units</h1>
                {role === 'admin' && (
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="rounded-full bg-blue-500 hover:bg-blue-700 text-white p-3 duration-300"
                    >
                        <Icon name="add" className="text-white text-lg" />
                    </button>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-md shadow-sm">
                    <thead className="bg-blue-400 bg-opacity-30 text-blue-600 text-sm">
                        <tr>
                            <th className="text-left p-3 border-b">Unit Name</th>
                            <th className="text-left p-3 border-b">Type</th>
                            <th className="text-center p-3 border-b">Capacity</th>
                            <th className="text-center p-3 border-b">Price</th>
                            <th className='text-center p-3 border-b'>Status</th>
                            {role === 'admin' && (
                                <th className="p-3 text-center">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="font-medium text-gray-700 text-sm">
                        {currentUnits.map((unit) => (
                            <tr key={unit.id} className="hover:bg-blue-50">
                                <td className="p-3">{unit.unit_name}</td>
                                <td className="p-3">{unit.unit_type}</td>
                                <td className="p-3 text-center">{unit.capacity}</td>
                                <td className="p-3 text-center">
                                    ${Number(unit.price_per_night).toFixed(2)}
                                </td>
                                <td className="p-3">
                                    <div className='flex justify-center items-center'>
                                        {unit.availability ? (
                                            <span className='text-xl'>
                                                <Icon name="checkMark" className="text-green-500" />
                                            </span>
                                        ) : (
                                            <span className='text-xl'>
                                                <Icon name="crossMark" className="text-red-500" />
                                            </span>
                                        )}
                                    </div>
                                </td>
                                {role === 'admin' && (
                                    <td className="p-3 text-center space-x-2">
                                        <button
                                            onClick={() => handleUpdateUnitClick(unit.id)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <Icon name="update" className="text-lg" />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(unit.id, unit.unit_name)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Icon name="delete" className="text-xl" />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                totalUsers={units.length}
                usersPerPage={unitsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
            {/* Create Modal */}
            <Modal isOpen={isCreateModalOpen} onClose={closeModals}>
                <UnitForm mode="create" onSuccess={() => { closeModals(); fetchUnits(); }} />
            </Modal>

            {/* Update Modal */}
            <Modal isOpen={isUpdateModalOpen} onClose={closeModals}>
                <UnitForm mode="update" unit={unitToUpdate} onSuccess={() => { closeModals(); fetchUnits(); }} />
            </Modal>

        </div>
    );
};

export default UnitList;
