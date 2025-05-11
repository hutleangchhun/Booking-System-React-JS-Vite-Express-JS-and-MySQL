import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/Icons/icons';
import { fetchAllUsers, deleteUser } from '../../Service/userApi';
import { getUserRole } from '../../auth';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading/Loading';
import Pagination from '../../components/Pagination/Pagination';
import ErrorMessage from '../../components/Error/ErrorMessage';
import Modal from '../../components/Modal/Modal';
import UserForm from '../../components/Form/userForm';

const UserList = () => {
    // === HOOKS ===
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState(null);

    const navigate = useNavigate();

    // === FETCH USERS ===
    const fetchUsers = async () => {
        try {
            const userData = await fetchAllUsers();
            setUsers(userData);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setRole(getUserRole());  // Set the role from auth system (admin or user)
        fetchUsers();
    }, []);

    // === OPEN MODALS ===
    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleUpdateUserClick = (userId) => {
        const selectedUser = users.find(u => u.id === userId);
        setUserToUpdate(selectedUser);
        setIsUpdateModalOpen(true);
    };

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsUpdateModalOpen(false);
        setUserToUpdate(null);
    };

    // === DELETE USER ===
    const handleDelete = async (userId, username) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `Do you really want to delete "${username}"?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
            });

            if (result.isConfirmed) {
                await deleteUser(userId);
                setUsers(users.filter(user => user.id !== userId));
                Swal.fire('Deleted!', `${username} has been deleted.`, 'success');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Error deleting user');
            Swal.fire('Error', 'Failed to delete user.', 'error');
        }
    };

    // === PAGINATION ===
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // === LOADING & ERROR ===
    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

    // === RETURN ===
    return (
        <div className="p-2">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-base font-bold text-gray-700">List of Users</h1>
                {role === 'admin' && (
                    <button
                        onClick={openCreateModal}
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
                            <th className="text-left p-3 border-b">Username</th>
                            <th className="text-left p-3 border-b">Email</th>
                            <th className="text-left p-3 border-b">Role</th>
                            {role === 'admin' && (
                                <th className="p-3 text-center">Account Statues</th>
                            )}
                            {role === 'admin' && (
                                <th className="p-3 text-center">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="font-medium text-gray-700 text-sm">
                        {currentUsers.length === 0 ? (
                            <tr>
                                <td colSpan={role === 'admin' ? 6 : 5} className="p-4 text-center text-gray-500">
                                    No User found.
                                </td>
                            </tr>
                        ) : (
                            currentUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-blue-50">
                                    <td className="p-3">{user.username}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.role}</td>
                                    {role === 'admin' && (
                                        <td className="p-3">
                                            <div className="flex justify-center items-center">
                                                {user.isVerified ? (
                                                    <span className="text-xl">
                                                        <Icon name="checkMark" className="text-green-500" />
                                                    </span>
                                                ) : (
                                                    <span className="text-xl">
                                                        <Icon name="crossMark" className="text-red-500" />
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    )}

                                    {role === 'admin' && (
                                        <td className="p-3 border-b text-center space-x-2">
                                            <button
                                                onClick={() => handleUpdateUserClick(user.id)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <Icon name="update" className="text-lg" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id, user.username)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Icon name="delete" className="text-xl" />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {users.length > 0 && (
                <Pagination
                    totalUsers={users.length}
                    usersPerPage={usersPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            )};

            {/* Create Modal */}
            <Modal isOpen={isCreateModalOpen} onClose={closeModals}>
                <UserForm mode="create" onSuccess={() => { closeModals(); fetchUsers(); }} />
            </Modal>

            {/* Update Modal */}
            <Modal isOpen={isUpdateModalOpen} onClose={closeModals}>
                <UserForm mode="update" user={userToUpdate} onSuccess={() => { closeModals(); fetchUsers(); }} />
            </Modal>

        </div>
    );
};

export default UserList;
