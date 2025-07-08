"use client";
import React, { useState, useEffect, useRef } from "react";

// Table styling constants
const TABLE_HEADER_CLASSES = "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider";
const TABLE_CELL_CLASSES = "px-6 py-4 whitespace-nowrap text-sm text-gray-200";
const TABLE_ROW_CLASSES = "hover:bg-gray-800 transition cursor-pointer";

const OfficerDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Add Employee Form State
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee", // Always employee
  });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");

  // Assign Task Sidebar State (for assigning tasks to employees)
  const [assignSidebarOpen, setAssignSidebarOpen] = useState(false);
  const [assignUser, setAssignUser] = useState(null);
  const [assignTask, setAssignTask] = useState("");
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignError, setAssignError] = useState("");
  const [assignSuccess, setAssignSuccess] = useState("");
  const assignTextRef = useRef(null);

  // Officer's name from localStorage
  const name = typeof window !== "undefined" ? localStorage.getItem("name") : "";
  const email = localStorage.getItem("email");

  // Fetch employees and officer's tasks
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [resEmp, resTasks] = await Promise.all([
        fetch("/api/getEmployees"),
        fetch("/api/getTasksByEmail", { method: "POST", body: JSON.stringify({ email: email }) }), // Should return tasks assigned to this officer by Head
      ]);
      if (!resEmp.ok) throw new Error("Error fetching employees");
      if (!resTasks.ok) throw new Error("Error fetching tasks");
      const [employees, tasks] = await Promise.all([
        resEmp.json(),
        resTasks.json(),
      ]);
      setEmployees(employees);
      setTasks(tasks);
      setError("");
    } catch (error) {
      setError(error.message || "Unknown error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Assign Task Logic
  const openAssignSidebar = (user) => {
    setAssignUser(user);
    setAssignTask("");
    setAssignError("");
    setAssignSuccess("");
    setAssignSidebarOpen(true);
    setTimeout(() => assignTextRef.current?.focus(), 100);
  };
  const closeAssignSidebar = () => setAssignSidebarOpen(false);

  const handleAssignTask = async (e) => {
    e.preventDefault();
    setAssignError("");
    setAssignSuccess("");
    if (!assignTask.trim()) {
      setAssignError("Task cannot be empty.");
      return;
    }
    setAssignLoading(true);
    try {
      const res = await fetch("/api/assignTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: assignUser.id, task: assignTask, sendedByRole: "officer", sendedByName: name }),
      });
      if (!res.ok) throw new Error("Failed to assign task");
      setAssignSuccess("Task assigned!");
      setTimeout(() => {
        closeAssignSidebar();
      }, 800);
    } catch (err) {
      setAssignError("Failed to assign task.");
    }
    setAssignLoading(false);
  };

  // Add Employee Logic
  const openSidebar = () => {
    setSidebarOpen(true);
    setAddError("");
    setAddSuccess("");
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "employee",
    });
  };
  const closeSidebar = () => setSidebarOpen(false);

  const handleAddInput = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddError("");
    setAddSuccess("");
    if (!newUser.name.trim() || !newUser.email.trim() || !newUser.password.trim()) {
      setAddError("All fields are required.");
      return;
    }
    setAddLoading(true);
    try {
      const res = await fetch("/api/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) throw new Error("Failed to add employee");
      setAddSuccess("Employee added!");
      setTimeout(() => {
        closeSidebar();
        fetchAll();
      }, 800);
    } catch (err) {
      setAddError("Failed to add employee.");
    }
    setAddLoading(false);
  };

  // Delete Employee
  const handleDelete = async (user) => {
    if (!window.confirm(`Are you sure you want to delete ${user.name}?`)) return;
    try {
      const res = await fetch("/api/deleteUser", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      if (!res.ok) throw new Error("Failed to delete employee");
      fetchAll();
    } catch (err) {
      alert("Delete failed.");
    }
  };

  // Menu toggle
  const toggleMenu = (userId) => {
    setMenuOpen((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  // Render Employee Table (no promote/demote, only delete and assign task)
  const renderEmployeeTable = (users) => (
    <div className="bg-[#18181b] rounded-xl shadow border border-gray-800 mb-8 relative">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className={TABLE_HEADER_CLASSES}>Name</th>
            <th className={TABLE_HEADER_CLASSES}>Email</th>
            <th className={TABLE_HEADER_CLASSES}>Role</th>
            <th className={TABLE_HEADER_CLASSES}>Actions</th>
            <th className={TABLE_HEADER_CLASSES}>Assign Task</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-500">
                No employees found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className={TABLE_ROW_CLASSES}>
                <td className={TABLE_CELL_CLASSES}>{user.name}</td>
                <td className={TABLE_CELL_CLASSES}>{user.email}</td>
                <td className={TABLE_CELL_CLASSES}>Employee</td>
                <td className={TABLE_CELL_CLASSES + " relative"}>
                  <button
                    className="p-1 rounded hover:bg-gray-700"
                    onClick={() => toggleMenu(user.id)}
                  >
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="5" cy="12" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="19" cy="12" r="2" />
                    </svg>
                  </button>
                  {menuOpen[user.id] && (
                    <div className="absolute right-0 z-20 -mt-20 w-40 bg-[#232329] border border-gray-700 rounded shadow-lg py-1">
                      <button
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-800"
                        onClick={() => {
                          toggleMenu(user.id);
                          handleDelete(user);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
                <td className={TABLE_CELL_CLASSES}>
                  <button
                    className="rounded-full px-4 py-2 font-semibold bg-gradient-to-br from-green-800 via-green-900 to-green-700 hover:from-yellow-400 hover:via-orange-500 hover:to-red-500 text-white shadow focus:outline-none focus:ring-2 focus:ring-black active:scale-95 transition"
                    onClick={() => openAssignSidebar(user)}
                  >
                    Assign Task
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  // Render Officer's Tasks (from Head)
  const renderOfficerTasks = (tasks) => (
    <div className="bg-[#232329] rounded-xl shadow border border-gray-800 mb-8 p-6 max-h-[500px] overflow-auto">
      <h2 className="text-lg font-semibold text-gray-300 mb-4">Tasks Assigned to You by Head</h2>
      {tasks.length === 0 ? (
        <div className="text-gray-500">No tasks assigned by Head.</div>
      ) : (
        <ul className="space-y-4">
          {tasks
            .filter((task) => task.sendedByRole === "Head")
            .map((task) => (
              <li key={task.id} className="p-4 rounded-lg bg-gray-800 shadow text-white flex flex-col gap-1 border-black  border">
                <div className="font-bold text-black ">From: {task.sendedByName} (Head)</div>
                <div className="text-base font-medium text-red-500">{task.task_info}</div>
                <div className="text-xs mt-1">Status: <span className="font-semibold">{task.status}</span></div>
                <div className="text-xs text-gray-200 mt-1">Assigned: {new Date(task.createdAt).toLocaleString()}</div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#151518] py-10 px-4">
      <div className="max-w-5xl mx-auto relative">
        {/* Add Employee FAB */}
        <button
          onClick={openSidebar}
          className="fixed bottom-8 right-8 z-40 bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 text-white rounded-full shadow-xl p-0.5 focus:outline-none focus:ring-4 focus:ring-blue-400/40 transition-all hover:scale-105 active:scale-95"
          style={{ width: 64, height: 64 }}
          aria-label="Add Employee"
        >
          <span className="flex items-center justify-center w-full h-full bg-[#18181b] rounded-full text-3xl font-bold transition-all hover:bg-[#232329]">
            +
          </span>
        </button>

        {/* Add Employee Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#18181b] shadow-2xl z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-gray-100">Add New Employee</h2>
              <button
                onClick={closeSidebar}
                className="text-gray-400 rounded hover:bg-gray-800 p-2 transition"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form
              className="flex-1 flex flex-col gap-4 p-6"
              onSubmit={handleAddUser}
              autoComplete="off"
            >
              <div>
                <label className="block text-gray-400 mb-1">Name</label>
                <input
                  name="name"
                  type="text"
                  className="w-full rounded bg-[#232329] border border-gray-700 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newUser.name}
                  onChange={handleAddInput}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  className="w-full rounded bg-[#232329] border border-gray-700 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newUser.email}
                  onChange={handleAddInput}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  className="w-full rounded bg-[#232329] border border-gray-700 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newUser.password}
                  onChange={handleAddInput}
                  required
                />
              </div>
              {/* Role is always employee for officer */}
              <input type="hidden" name="role" value="employee" />
              {addError && <div className="text-red-500 text-sm">{addError}</div>}
              {addSuccess && <div className="text-green-500 text-sm">{addSuccess}</div>}
              <div className="mt-auto flex gap-2">
                <button
                  type="button"
                  className="flex-1 py-2 rounded bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
                  onClick={closeSidebar}
                  disabled={addLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold shadow-lg hover:from-blue-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  disabled={addLoading}
                >
                  {addLoading ? "Adding..." : "Add Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Assign Task Sidebar */}
        <div
          className={`fixed top-0 right-0 h-[70%] w-full max-w-md bg-[#18181b] shadow-2xl z-50 transform transition-transform duration-300 ${assignSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-gray-100">
                Assign Task to <span className="text-yellow-400">{assignUser?.name}</span>
              </h2>
              <button
                onClick={closeAssignSidebar}
                className="text-gray-400 rounded hover:bg-gray-800 p-2 transition"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form
              className="flex-1 flex flex-col gap-4 p-6"
              onSubmit={handleAssignTask}
              autoComplete="off"
            >
              <div>
                <label className="block text-gray-400 mb-1">Email</label>
                <div className="px-3 py-2 rounded bg-[#232329] text-gray-100 border border-gray-700">
                  {assignUser?.email}
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Task</label>
                <textarea
                  className="w-full rounded bg-[#232329] border border-gray-700 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 min-h-[100px]"
                  value={assignTask}
                  onChange={e => setAssignTask(e.target.value)}
                  required
                  ref={assignTextRef}
                  placeholder="Enter the task to assign..."
                />
              </div>
              {assignError && <div className="text-red-500 text-sm">{assignError}</div>}
              {assignSuccess && <div className="text-green-500 text-sm">{assignSuccess}</div>}
              <div className="mt-auto flex gap-2">
                <button
                  type="button"
                  className="flex-1 py-2 rounded bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
                  onClick={closeAssignSidebar}
                  disabled={assignLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-bold shadow-lg hover:from-yellow-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  disabled={assignLoading}
                >
                  {assignLoading ? "Assigning..." : "Assign"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Overlay */}
        {(sidebarOpen || assignSidebarOpen) && (
          <div
            className="fixed inset-0 z-40 bg-black/50 transition-opacity"
            onClick={() => {
              setSidebarOpen(false);
              setAssignSidebarOpen(false);
            }}
          />
        )}

        {/* Main Content */}
        <h1 className="text-3xl font-bold text-gray-100 mb-8">Officer Dashboard</h1>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {loading ? (
          <div className="text-gray-400 text-center py-20">Loading...</div>
        ) : (
          <>
            {renderOfficerTasks(tasks)}
            <h2 className="text-lg font-semibold text-gray-300 mb-2">Employees</h2>
            {renderEmployeeTable(employees)}
          </>
        )}
      </div>
    </div>
  );
};

export default OfficerDashboard;
