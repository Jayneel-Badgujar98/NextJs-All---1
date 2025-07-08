// "use client"
// import React from 'react'
// import { useState, useEffect } from "react"

// const page = () => {
//   const [employees, setEmployees] = useState([]);
//   const [officers, setOfficers] = useState([]);
//   const [error, setError] = useState("");

//   const fetchAll = async () => {
//     try {
//       const [resOff, resEmp] = await Promise.all([fetch("/api/getOfficers", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json"
//         }
//       }), fetch("/api/getEmployees", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json"
//         }
//       })])

//       if (!resOff.ok) {
//         setError("Error fetching officers", resOff.error);
//         return;
//       }
//       if (!resEmp.ok) {
//         setError("Error fetching employees", resEmp.error);
//         return;
//       }
//       const [officers, employees] = await Promise.all([resOff.json(), resEmp.json()]);
//       setOfficers(officers);
//       setEmployees(employees);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   }

//   useEffect(() => {
//     fetchAll();
//   }, []);
//   return (
//     <div>
//       {error && <p>{error}</p>}
//       <h2>Officer List</h2>
//       {
//         officers ? (
//           <ul>
//             {officers.map((officer, index) => (
//               <li key={index}>{officer.name}</li>
//             ))}
//           </ul>
//         ) : (
//           <div className="flex flex-col items-center justify-center h-[50vh]">
//             <p className="text-gray-500">No officers found.</p>
//           </div>
//         )
//       }
//       <h2>Employee List</h2>
//       {employees ? (
//         <ul>
//           {employees.map((employee, index) => (
//             <li key={index}>{employee.name}</li>
//           ))}
//         </ul>
//       ) : (
//         <div className="flex flex-col items-center justify-center h-[50vh]">
//           <p className="text-gray-500">No employees found.</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default page

// "use client";
// import React, { useState, useEffect } from "react";

// // Utility for classNames
// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// const Page = () => {
//   const [employees, setEmployees] = useState([]);
//   const [officers, setOfficers] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   // Assign Task State
//   const [assignTo, setAssignTo] = useState(null);
//   const [assignRole, setAssignRole] = useState("employee");
//   const [task, setTask] = useState("");
//   const [assignLoading, setAssignLoading] = useState(false);
//   const [assignSuccess, setAssignSuccess] = useState("");

//   // Menu State
//   const [menuOpen, setMenuOpen] = useState({}); // { [userId]: boolean }

//   // Fetch users
//   const fetchAll = async () => {
//     setLoading(true);
//     try {
//       const [resOff, resEmp] = await Promise.all([
//         fetch("/api/getOfficers"),
//         fetch("/api/getEmployees"),
//       ]);
//       if (!resOff.ok) throw new Error("Error fetching officers");
//       if (!resEmp.ok) throw new Error("Error fetching employees");
//       const [officers, employees] = await Promise.all([
//         resOff.json(),
//         resEmp.json(),
//       ]);
//       setOfficers(officers);
//       setEmployees(employees);
//       setError("");
//     } catch (error) {
//       setError(error.message || "Unknown error");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   // Assign Task Handler
//   const handleAssignTask = async (e) => {
//     e.preventDefault();
//     if (!assignTo || !task) return;
//     setAssignLoading(true);
//     setAssignSuccess("");
//     try {
//       const res = await fetch("/api/assignTask", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: assignTo,
//           task,
//         }),
//       });
//       if (!res.ok) throw new Error("Failed to assign task");
//       setAssignSuccess("Task assigned successfully!");
//       setTask("");
//       setAssignTo(null);
//     } catch (err) {
//       setAssignSuccess("Failed to assign task.");
//     }
//     setAssignLoading(false);
//   };

//   // Promote/Demote Handler
//   const handleRoleChange = async (user, newRole) => {
//     if (
//       !window.confirm(
//         `Are you sure you want to ${
//           newRole === "officer" ? "promote" : "demote"
//         } ${user.name}?`
//       )
//     )
//       return;
//     try {
//       const res = await fetch("/api/updateRole", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user.id, newRole }),
//       });
//       if (!res.ok) throw new Error("Failed to change role");
//       fetchAll();
//     } catch (err) {
//       alert("Role change failed.");
//     }
//   };

//   // Delete Handler
//   const handleDelete = async (user) => {
//     if (!window.confirm(`Are you sure you want to delete ${user.name}?`)) return;
//     try {
//       const res = await fetch("/api/deleteUser", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user.id }),
//       });
//       if (!res.ok) throw new Error("Failed to delete user");
//       fetchAll();
//     } catch (err) {
//       alert("Delete failed.");
//     }
//   };

//   // Menu Toggle
//   const toggleMenu = (userId) => {
//     setMenuOpen((prev) => ({
//       ...prev,
//       [userId]: !prev[userId],
//     }));
//   };

//   // All users for assign dropdown
//   const allUsers = [
//     ...officers.map((u) => ({ ...u, role: "officer" })),
//     ...employees.map((u) => ({ ...u, role: "employee" })),
//   ];

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6 text-center">User Management</h1>

//       {/* Assign Task Section */}
//       <div className="bg-white rounded-lg shadow p-4 mb-8">
//         <h2 className="text-lg font-semibold mb-2">Assign New Task</h2>
//         <form className="flex flex-col md:flex-row gap-2 items-center" onSubmit={handleAssignTask}>
//           <select
//             className="border rounded px-2 py-1"
//             value={assignTo || ""}
//             onChange={(e) => setAssignTo(e.target.value)}
//             required
//           >
//             <option value="" disabled>
//               Select Officer/Employee
//             </option>
//             {allUsers.map((user) => (
//               <option key={user.id} value={user.id}>
//                 {user.name} ({user.email}) [{user.role}]
//               </option>
//             ))}
//           </select>
//           <input
//             type="text"
//             className="border rounded px-2 py-1 flex-1"
//             placeholder="Enter task"
//             value={task}
//             onChange={(e) => setTask(e.target.value)}
//             required
//           />
//           <button
//             type="submit"
//             className={classNames(
//               "bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition",
//               assignLoading && "opacity-50 cursor-not-allowed"
//             )}
//             disabled={assignLoading}
//           >
//             {assignLoading ? "Assigning..." : "Assign"}
//           </button>
//         </form>
//         {assignSuccess && (
//           <p className="text-green-600 mt-2">{assignSuccess}</p>
//         )}
//       </div>

//       {/* Officers List */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Officers</h2>
//         {loading ? (
//           <p>Loading officers...</p>
//         ) : officers.length === 0 ? (
//           <p className="text-gray-500">No officers found.</p>
//         ) : (
//           <ul className="space-y-3">
//             {officers.map((officer) => (
//               <li
//                 key={officer.id}
//                 className="flex items-center justify-between bg-gray-50 rounded shadow p-3 hover:bg-gray-100 transition"
//               >
//                 <div>
//                   <div className="font-medium">{officer.name}</div>
//                   <div className="text-sm text-gray-500">{officer.email}</div>
//                 </div>
//                 <div className="relative">
//                   {/* Menu Icon */}
//                   <button
//                     className="p-2 rounded hover:bg-gray-200"
//                     onClick={() => toggleMenu(officer.id)}
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle cx="5" cy="12" r="2" />
//                       <circle cx="12" cy="12" r="2" />
//                       <circle cx="19" cy="12" r="2" />
//                     </svg>
//                   </button>
//                   {/* Menu Dropdown */}
//                   {menuOpen[officer.id] && (
//                     <div className="absolute right-0 z-10 mt-2 w-40 bg-white border rounded shadow-lg py-1">
//                       <button
//                         className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                         onClick={() => {
//                           toggleMenu(officer.id);
//                           handleRoleChange(officer, "employee");
//                         }}
//                       >
//                         Demote to Employee
//                       </button>
//                       <button
//                         className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//                         onClick={() => {
//                           toggleMenu(officer.id);
//                           handleDelete(officer);
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>

//       {/* Employees List */}
//       <section>
//         <h2 className="text-xl font-semibold mb-4">Employees</h2>
//         {loading ? (
//           <p>Loading employees...</p>
//         ) : employees.length === 0 ? (
//           <p className="text-gray-500">No employees found.</p>
//         ) : (
//           <ul className="space-y-3">
//             {employees.map((employee) => (
//               <li
//                 key={employee.id}
//                 className="flex items-center justify-between bg-gray-50 rounded shadow p-3 hover:bg-gray-100 transition"
//               >
//                 <div>
//                   <div className="font-medium">{employee.name}</div>
//                   <div className="text-sm text-gray-500">{employee.email}</div>
//                 </div>
//                 <div className="relative">
//                   {/* Menu Icon */}
//                   <button
//                     className="p-2 rounded hover:bg-gray-200"
//                     onClick={() => toggleMenu(employee.id)}
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle cx="5" cy="12" r="2" />
//                       <circle cx="12" cy="12" r="2" />
//                       <circle cx="19" cy="12" r="2" />
//                     </svg>
//                   </button>
//                   {/* Menu Dropdown */}
//                   {menuOpen[employee.id] && (
//                     <div className="absolute right-0 z-10 mt-2 w-40 bg-white border rounded shadow-lg py-1">
//                       <button
//                         className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                         onClick={() => {
//                           toggleMenu(employee.id);
//                           handleRoleChange(employee, "officer");
//                         }}
//                       >
//                         Promote to Officer
//                       </button>
//                       <button
//                         className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//                         onClick={() => {
//                           toggleMenu(employee.id);
//                           handleDelete(employee);
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>

//       {error && (
//         <div className="mt-4 text-red-600 font-semibold">{error}</div>
//       )}
//     </div>
//   );
// };

// export default Page;

"use client";
import React, { useState, useEffect, useRef } from "react";

const TABLE_HEADER_CLASSES = "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider";
const TABLE_CELL_CLASSES = "px-6 py-4 whitespace-nowrap text-sm text-gray-200";
const TABLE_ROW_CLASSES = "hover:bg-gray-800 transition cursor-pointer";

const Page = () => {
  const [employees, setEmployees] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Add User Form State
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");

  // Assign Task Sidebar State
  const [assignSidebarOpen, setAssignSidebarOpen] = useState(false);
  const [assignUser, setAssignUser] = useState(null); // {id, name, email}
  const [assignTask, setAssignTask] = useState("");
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignError, setAssignError] = useState("");
  const [assignSuccess, setAssignSuccess] = useState("");
  const assignTextRef = useRef(null);

  const name = localStorage.getItem("name");
  // console.log("Stored name:", localStorage.getItem("name"));
  // At the top of your return, before <h1>...
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyTasks, setHistoryTasks] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");

  // Fetch assigned tasks when sidebar opens
  const fetchHistory = async () => {
    setHistoryLoading(true);
    setHistoryError("");
    try {
      const res = await fetch("/api/getAssignedTasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sendedByName: name }), // name from localStorage
      });
      const data = await res.json();
      if (res.ok) {
        setHistoryTasks(data.tasks || []);
      } else {
        setHistoryError(data.error || "Failed to load history.");
      }
    } catch {
      setHistoryError("Failed to load history.");
    }
    setHistoryLoading(false);
  };

  const openAssignSidebar = (user) => {
    setAssignUser(user);
    setAssignTask("");
    setAssignError("");
    setAssignSuccess("");
    setAssignSidebarOpen(true);
    assignTextRef.current.focus();
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
      // const getSender = await fetch("/api/getCurrentUser");
      // const senderData = await getSender.json();
      const res = await fetch("/api/assignTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: assignUser.id, task: assignTask, sendedByRole: "Head", sendedByName: name }),
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

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [resOff, resEmp] = await Promise.all([
        fetch("/api/getOfficers"),
        fetch("/api/getEmployees"),
      ]);
      if (!resOff.ok) throw new Error("Error fetching officers");
      if (!resEmp.ok) throw new Error("Error fetching employees");
      const [officers, employees] = await Promise.all([
        resOff.json(),
        resEmp.json(),
      ]);
      setOfficers(officers);
      setEmployees(employees);
      setError("");
    } catch (error) {
      setError(error.message || "Unknown error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleRoleChange = async (user, newRole) => {
    if (
      !window.confirm(
        `Are you sure you want to ${newRole === "officer" ? "promote" : "demote"
        } ${user.name} ${newRole === "officer" ? "to Officer" : "to Employee"}?`
      )
    )
      return;
    try {
      const res = await fetch("/api/updateRole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, newRole }),
      });
      if (!res.ok) throw new Error("Failed to change role");
      fetchAll();
    } catch (err) {
      alert("Role change failed.");
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Are you sure you want to delete ${user.name}?`)) return;
    try {
      const res = await fetch("/api/deleteUser", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      if (!res.ok) throw new Error("Failed to delete user");
      fetchAll();
    } catch (err) {
      alert("Delete failed.");
    }
  };

  const toggleMenu = (userId) => {
    setMenuOpen((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  // --- Add User Sidebar Logic ---
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

  const handleRoleToggle = (role) => {
    setNewUser((prev) => ({ ...prev, role }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddError("");
    setAddSuccess("");
    if (
      !newUser.name.trim() ||
      !newUser.email.trim() ||
      !newUser.password.trim()
    ) {
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
      if (!res.ok) throw new Error("Failed to add user");
      setAddSuccess("User added!");
      setTimeout(() => {
        closeSidebar();
        fetchAll();
      }, 800);
    } catch (err) {
      setAddError("Failed to add user.");
    }
    setAddLoading(false);
  };

  // --- Render Table ---
  const renderTable = (users, type) => (
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
              <td colSpan={4} className="text-center py-8 text-gray-500">
                No {type}s found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className={TABLE_ROW_CLASSES}>
                <td className={TABLE_CELL_CLASSES}>{user.name}</td>
                <td className={TABLE_CELL_CLASSES}>{user.email}</td>
                <td className={TABLE_CELL_CLASSES}>{type.charAt(0).toUpperCase() + type.slice(1)}</td>
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
                    <div className="absolute -right-10 z-20 -mt-30 w-40 bg-[#232329] border border-gray-700 rounded shadow-lg py-1">
                      {type === "employee" ? (
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-800 text-gray-200"
                          onClick={() => {
                            toggleMenu(user.id);
                            handleRoleChange(user, "officer");
                          }}
                        >
                          Promote to Officer
                        </button>
                      ) : (
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-800 text-gray-200"
                          onClick={() => {
                            toggleMenu(user.id);
                            handleRoleChange(user, "employee");
                          }}
                        >
                          Demote to Employee
                        </button>
                      )}
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

  return (
    <div className="min-h-screen bg-[#151518] py-10 px-4">
      <div className="max-w-5xl mx-auto relative">
        {/* Add User FAB */}
        <button
          onClick={openSidebar}
          className="fixed bottom-8 right-8 z-40 bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 text-white rounded-full shadow-xl p-0.5 focus:outline-none focus:ring-4 focus:ring-blue-400/40 transition-all hover:scale-105 active:scale-95"
          style={{ width: 64, height: 64 }}
          aria-label="Add User"
        >
          <span className="flex items-center justify-center w-full h-full bg-[#18181b] rounded-full text-3xl font-bold transition-all hover:bg-[#232329]">
            +
          </span>
        </button>

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#18181b] shadow-2xl z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-gray-100">Add New User</h2>
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
              <div>
                <label className="block text-gray-400 mb-1">Role</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className={`flex-1 px-4 py-2 rounded-full border transition text-sm font-semibold ${newUser.role === "employee"
                      ? "bg-blue-600 text-white border-blue-600 shadow"
                      : "bg-[#232329] text-gray-300 border-gray-700 hover:bg-blue-900"
                      }`}
                    onClick={() => handleRoleToggle("employee")}
                  >
                    Employee
                  </button>
                  <button
                    type="button"
                    className={`flex-1 px-4 py-2 rounded-full border transition text-sm font-semibold ${newUser.role === "officer"
                      ? "bg-pink-600 text-white border-pink-600 shadow"
                      : "bg-[#232329] text-gray-300 border-gray-700 hover:bg-pink-900"
                      }`}
                    onClick={() => handleRoleToggle("officer")}
                  >
                    Officer
                  </button>
                </div>
              </div>
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
                  {addLoading ? "Adding..." : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Assign Task Sidebar */}
        {/* <div
          className={`fixed bottom-0 right-0 h-[70%] w-full max-w-md bg-[#18181b] shadow-2xl z-50 transform transition-transform duration-300 ${assignSidebarOpen ? "translate-y-0" : "translate-y-[100%]"
            }`}
        > */}
        <div
          className={`fixed top-0 right-0 h-[70%] w-full max-w-md bg-[#18181b] shadow-2xl z-50 transform transition-transform duration-300 ${assignSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
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
        {/* History Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-full max-w-md bg-[#18181b] shadow-2xl z-50 transform transition-transform duration-300 ${historyOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
                <svg className="w-6 h-6 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Task History
              </h2>
              <button
                onClick={() => setHistoryOpen(false)}
                className="text-gray-400 rounded hover:bg-gray-800 p-2 transition"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {historyLoading ? (
                <div className="text-gray-400 text-center py-10">Loading history...</div>
              ) : historyError ? (
                <div className="text-red-500 text-center">{historyError}</div>
              ) : historyTasks.length === 0 ? (
                <div className="text-gray-400 text-center py-10">No assigned tasks yet.</div>
              ) : (
                <ul className="space-y-5">
                  {historyTasks.map((task) => (
                    <li
                      key={task.id}
                      className={`rounded-lg p-4 shadow border-l-4 ${task.status === "Completed"
                          ? "border-green-500 bg-green-900/20"
                          : task.status === "Completing"
                            ? "border-blue-500 bg-blue-900/20"
                            : "border-yellow-500 bg-yellow-900/20"
                        }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-gray-100 space-x-4">
                          To: <span className="text-blue-300">{task.user?.name || task.userId}</span>
                          <span>({task.user?.email})</span>
                          <span className="text-gray-400">[{task.user?.role}]</span>
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-bold ${task.status === "Completed"
                              ? "bg-green-600 text-white"
                              : task.status === "Completing"
                                ? "bg-blue-600 text-white"
                                : "bg-yellow-500 text-black"
                            }`}
                        >
                          {task.status}
                        </span>
                      </div>
                      <div className="text-gray-200 mb-1">{task.task_info}</div>
                      <div className="text-xs text-gray-400">
                        Assigned: {new Date(task.createdAt).toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Overlay for history sidebar */}
        {historyOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 transition-opacity"
            onClick={() => setHistoryOpen(false)}
          />
        )}

        {/* Overlay */}
        {assignSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 transition-opacity"
            onClick={closeAssignSidebar}
          />
        )}


        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50  transition-opacity"
            // backdrop-blur-sm bg-opacity-40
            onClick={closeSidebar}
          />
        )}

        {/* Main Content */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-100">User Management</h1>
          <button
            onClick={() => {
              setHistoryOpen(true);
              fetchHistory();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white shadow hover:from-blue-700 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            title="View Task History"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden md:inline">History</span>
          </button>
        </div>

        {error && <div className="mb-4 text-red-500">{error}</div>}
        {loading ? (
          <div className="text-gray-400 text-center py-20">Loading...</div>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-gray-300 mb-2">Officers</h2>
            {renderTable(officers, "officer")}
            <h2 className="text-lg font-semibold text-gray-300 mb-2">Employees</h2>
            {renderTable(employees, "employee")}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
