"use client";
import React, { useEffect, useState } from "react";

// Utility to get cookie value in client component
// function getCookie(name) {
//   if (typeof document === "undefined") return undefined;
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
//   return undefined;
// }

const STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Completing: "bg-blue-100 text-blue-800 border-blue-300",
  Completed: "bg-green-100 text-green-800 border-green-300",
};

const SENDER_BG = {
  Head: "bg-gradient-to-r from-red-500 via-red-500 to-yellow-400 shadow-lg border-2 border-pink-300",
  officer: "bg-gradient-to-r from-blue-500 via-cyan-500 to-green-300 shadow border-2 border-blue-300",
};

export default function EmployeeTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState({}); // {taskId: true/false}
  const [error, setError] = useState("");

  // Get logged-in user's email from cookies
  // const email = getCookie("email");
  // const email = req.cookies.get('email')?.value;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("name");
      const email = localStorage.getItem("email");
      setName(storedName || "");
      setEmail(email || "");
    }
  }, []);


  const fetchTasks = async () => {
    if (!email) {
      setError("No user email found in localstorage.");
      setLoading(false);
      return;
    }
    setLoading(true);
    // fetch(`/api/getTasksByEmail?email=${encodeURIComponent(email)}`)
    fetch(`/api/getTasksByEmail`, { body: JSON.stringify({ email }), method: "POST", headers: { "Content-Type": "application/json" } })
      .then((res) => res.json())
      .then(data => {
        setTasks(data || []);
        setLoading(false);
        console.log("Fetched tasks:", data);
      })
      .catch(() => {
        setError("Failed to load tasks.");
        setLoading(false);
      });
  }
  // Fetch tasks for the logged-in user

  useEffect(() => {

    if (email) {
      fetchTasks()
    }
  }, [email]);
  // Handle status change
  const handleStatusChange = async (taskId, newStatus) => {
    setStatusUpdating((prev) => ({ ...prev, [taskId]: true }));
    try {
      const res = await fetch("/api/updateTaskStatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, status: newStatus }),
      });
      if (res.ok) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
      }
    } finally {
      setStatusUpdating((prev) => ({ ...prev, [taskId]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-black/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-gray-700 overflow-auto h-[90vh] lg:h-[650px] whitespace-nowrap ">
        <h1 className="text-3xl font-bold text-white mb-8 text-center sticky top-0 z-10  backdrop-blur-lg ">
          My Tasks
        </h1>
        {error && (
          <div className="mb-4 text-red-500 text-center font-semibold">
            {error}
          </div>
        )}
        {loading ? (
          <div className="text-gray-500 text-center py-20">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-gray-400 text-center py-20">
            No tasks assigned yet.
          </div>
        ) : (
          <ul className="space-y-6">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`rounded-xl p-5 flex flex-col gap-2 shadow-md border transition-all ${SENDER_BG[task.sendedByRole] || "bg-white border-gray-200"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${task.sendedByRole === "Head"
                      ? "bg-pink-600 text-white"
                      : "bg-blue-600 text-white"
                      }`}
                  >
                    From {task.sendedByRole}
                  </span>
                  <span className="ml-2 text-sm text-gray-800 font-semibold">
                    {task.sendedByName}
                  </span>
                </div>
                <div className="mt-2 text-lg text-gray-900 font-medium">
                  {task.task_info}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-sm text-gray-700 font-semibold">
                    Status:
                  </span>
                  <select
                    className={`rounded px-3 py-1 border outline-none font-semibold transition ${STATUS_COLORS[task.status] || "bg-gray-100 text-gray-700 border-gray-300"}`}
                    value={task.status}
                    disabled={statusUpdating[task.id]}
                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completing">Completing</option>
                    <option value="Completed">Completed</option>
                  </select>
                  {statusUpdating[task.id] && (
                    <span className="text-xs text-gray-500 ml-2">Updating...</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
