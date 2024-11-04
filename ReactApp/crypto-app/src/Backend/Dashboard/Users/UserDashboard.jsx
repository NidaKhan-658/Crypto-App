import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const usersPerPage = 10;
  const navigate = useNavigate();

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search and status filter
  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesSearch = user.username?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    setFilteredUsers(filtered);
  }, [search, statusFilter, users]);

  // Admin login and logout
  const handleLogin = () => {
    if (role === "admin" && password === "admin") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid role or password. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole("");
    setPassword("");
  };

  // Pagination logic
  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = filteredUsers.slice(firstUserIndex, lastUserIndex);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // CRUD Operations
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdateUser = async () => {
    if (userToEdit) {
      try {
        await axios.put(`http://localhost:3000/users/${userToEdit.id}`, {
          ...userToEdit,
          status: "updated"
        });
        fetchUsers();
        closeModal();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setUserToEdit(null);
  };

  const handleCreateUser = () => {
    navigate("/auth");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserToEdit((prev) => ({ ...prev, [name]: value }));
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container d-flex flex-column align-items-center mt-5 ">
        <h2>Admin Login</h2>
        <div className="form-group mb-3 ">
          <input
            type="text"
            className="form-control"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5 user-dashboard">
      {/* Header */}
      <div className="d-flex justify-content-between mb-4">
        <h2>User Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-outline-danger">
          Logout
        </button>
      </div>

      {/* Search and Filter */}
      <div className="dashboard-controls mb-4 row">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="registered">Registered</option>
            <option value="logged_in">Logged In</option>
            <option value="updated">Updated</option>
          </select>
        </div>
        <div className="col-md-4">
          <button className="btn btn-success w-100" onClick={handleCreateUser}>
            Add User
          </button>
        </div>
      </div>

      {/* User List */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name || user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>Edit User</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={userToEdit?.name || ""}
              onChange={handleChange}
              className="form-control mb-3"
            />
            <input type="text" email="email" placeholder="Email" value={userToEdit?.email ||""} onChange={handleChange} className="form-control mb-3"/>
            <input type="text" name="phone" placeholder="Phone" value={userToEdit?.phone ||""} onChange={handleChange} className="form-control mb-3"/>


            <button className="btn btn-primary" onClick={handleUpdateUser}>
              Save Changes
            </button>
            <button className="btn btn-secondary mt-2" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="pagination d-flex justify-content-center align-items-center">
        <button
          className="btn btn-outline-primary me-2"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary ms-2"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
