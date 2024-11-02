import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AdminPanel = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);

  const fetchUsers = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/user/all", {
            method: "POST", // Explicitly specifying GET method
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
    } catch (error) {
        console.error("Error fetching users:", error);
    } finally {
        setLoading(false);
    }
};


  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/user/delete/${userId}`, {
          method: "DELETE",
        });
        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          setUsers(users.filter((user) => user._id !== userId));
        } else {
          alert("Failed to delete user.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-center">
          {currentUser?.isAdmin ? "Admin Dashboard" : "Access Denied"}
        </h1>
        {currentUser?.isAdmin ? (
          <>
            <h2 className="text-3xl font-bold text-center my-6">Total Users: {users.length}</h2>
            {loading ? (
              <p className="text-center text-lg">Loading...</p>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {users.map((user) => (
                  <li key={user._id} className="p-4 border rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold">{user.username}</h3>
                    <p className="text-sm text-gray-600">Email: {user.email}</p>
                    <p className="text-sm text-gray-600">First Name: {user.firstName}</p>
                    <p className="text-sm text-gray-600">
                      Birthday: {new Date(user.birthday).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">Gender: {user.gender}</p>
                    <p className="text-sm text-gray-600">Height: {user.height} cm</p>
                    <p className="text-sm text-gray-600">Interests: {user.interests.join(", ")}</p>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="text-center text-lg text-red-500">You do not have access to view this page.</p>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;
