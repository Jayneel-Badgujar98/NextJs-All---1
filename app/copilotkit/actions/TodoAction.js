// path : `app/copilotkit/actions/TodoAction.js`
"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import { useState } from "react";
import { useCopilotReadable } from "@copilotkit/react-core";
import { useEffect } from "react";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";

function TodoSuggestions({ todos }) {
    useCopilotChatSuggestions(
        {
            instructions: "Suggest the most useful next actions for managing todos. Suggestions should be actionable and relevant and also do not suggest the cities which user does not ask for weather.",
            minSuggestions: 2,
            maxSuggestions: 4,
        },
        [todos] // Pass your current todos as context
    );
    return null;
}
function TodoList({ todos }) {
    return (
        <div className="max-w-md mx-auto mt-10 p-6 rounded-lg bg-white shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">Todo List</h2>
            {todos.length > 0 ? (
                <ol className="list-decimal pl-6 space-y-3">
                    {todos.map(todo => (
                        <li
                            key={todo.id}
                            className={`flex items-center justify-between p-3 rounded-md border ${todo.isCompleted ? "bg-green-100 border-green-400 text-green-800 line-through" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                        >
                            <span className="font-medium">{todo.name}</span>
                            <span className="ml-3 text-xs text-gray-500">(id: {todo.id})</span>
                            {todo.isCompleted ? (
                                <span className="ml-3 px-2 py-1 bg-green-600 text-white rounded text-xs">Done ✅</span>) : (
                                <span className="ml-3 px-2 py-1 bg-gray-600 text-white rounded text-xs">Pending ❌</span>
                            )}
                        </li>
                    ))}
                </ol>
            ) : (
                <p className="text-center text-gray-400">No todos available.</p>
            )}
        </div>
    );
}
export default function TodoAction() {
    const [todos, setTodos] = useState([]);
    <TodoSuggestions todos={todos} />
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
        // if (storedMessages) {
        setTodos(storedTodos);
        // }
    }, []);

    useCopilotReadable({
        description: "User's saved notes",
        value: todos,
    });
    useCopilotAction({
        name: "listTodos",
        description: "Fetches the list of todos and displays them.",
        parameters: [],
        render: () => {
            return <TodoList todos={todos} />

        },
        //      render: ({ status, args }) => {
        //   const { date, time, meetingName } = args;

        //   if (status === 'inProgress') {
        //     return <LoadingView />; // Your own component for loading state
        //   } else {
        //     const meetingProps: CalendarMeetingCardProps = {
        //       date: date,
        //       time,
        //       meetingName
        //     };
        //     return <CalendarMeetingCardComponent {...meetingProps} />;
        //   }
        // },
    })

    useCopilotAction({
        name: "addTodo",
        description: "Adds a new todo to the list.",
        parameters: [
            { name: "name", type: "string", description: "The todo text" }
        ],
        handler: async ({ name }) => {
            const newTodo = {
                id: Date.now().toString(), // Auto-generate unique id
                name,
                isCompleted: false        // Default: not completed
            };
            const updated = [...todos, newTodo];
            setTodos(updated);
            localStorage.setItem('todos', JSON.stringify(updated)); // Save to local storage
            return {
                message: `Todo with name ${name} added!`,
                todo: newTodo,
                todos: [...todos, newTodo]
            };
        }
    });

    useCopilotAction({
        name: "markTodoDone",
        description: "Marks a todo as done by its name or id.",
        parameters: [
            { name: "id", type: "string", description: "The id of the todo to mark as done (optional)" },
            { name: "name", type: "string", description: "The name of the todo to mark as done (optional)" }
        ],
        handler: async ({ id, name }) => {
            const updated = todos.map(todo =>
                (id && todo.id === id) || (name && todo.name === name)
                    ? { ...todo, isCompleted: true }
                    : todo
            );
            setTodos(updated);
            localStorage.setItem('todos', JSON.stringify(updated)); // Save to local storage
            const todo = updated.find(todo => (id && todo.id === id) || (name && todo.name === name));
            return {
                message: `The Todo with id ${todo.id} and name ${todo.name} marked as done!`,
                todos: updated
            };
        }
    });

    // 5️⃣ Remove Todo Action
    useCopilotAction({
        name: "removeTodo",
        description: "Removes a todo by its name or id.",
        parameters: [
            { name: "id", type: "string", description: "The id of the todo to mark as done (optional)" },
            { name: "name", type: "string", description: "The name of the todo to mark as done (optional)" }
        ],
        handler: async ({ name, id }) => {
            const updated = todos.filter(todo => (name && todo.name !== name) || (id && todo.id !== id));
            const todo = todos.find(todo => (name && todo.name === name) || (id && todo.id === id));
            setTodos(updated);
            localStorage.setItem('todos', JSON.stringify(updated)); // Save to local storage
            return {
                message: `The Todo with id ${todo.id} and name ${todo.name} removed!`,
                todos: updated
            };
        }
    });

    return (
        <div className="max-w-md mx-auto mt-10 p-6 rounded-lg bg-white shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">Todo List</h2>
            {todos.length > 0 ? (
                <ol className="list-decimal pl-6 space-y-3">
                    {todos.map(todo => (
                        <li
                            key={todo.id}
                            className={`flex items-center justify-between p-3 rounded-md border ${todo.isCompleted ? "bg-green-100 border-green-400 text-green-800 line-through" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                        >
                            <span className="font-medium">{todo.name}</span>
                            <span className="ml-3 text-xs text-gray-500">(id: {todo.id})</span>
                            {todo.isCompleted ? (
                                <span className="ml-3 px-2 py-1 bg-green-600 text-white rounded text-xs">Done ✅</span>) : (
                                <span className="ml-3 px-2 py-1 bg-gray-600 text-white rounded text-xs">Pending ❌</span>
                            )}
                        </li>
                    ))}
                </ol>
            ) : (
                <p className="text-center text-gray-400">No todos available.</p>
            )}
        </div>
    );
}
