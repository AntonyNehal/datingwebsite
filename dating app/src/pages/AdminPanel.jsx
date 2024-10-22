import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/admin/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/admin/users/${userId}`, {
                    method: 'DELETE',
                });
                const result = await response.json();
                alert(result.message);
                // Refresh the user list
                setUsers(users.filter(user => user._id !== userId));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p>Total Users: {users.length}</p>
                    <table className="min-w-full border-collapse border border-gray-300 mt-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Username</th>
                                <th className="border border-gray-300 p-2">Email</th>
                                <th className="border border-gray-300 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td className="border border-gray-300 p-2">{user.username}</td>
                                    <td className="border border-gray-300 p-2">{user.email}</td>
                                    <td className="border border-gray-300 p-2">
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
