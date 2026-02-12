import { useEffect, useState } from "react";
import socket from "./socket";

function TaskDashboard({ user }) {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    socket.on("usersList", (data) => {
      setUsers(data);
    });

    socket.on("initialTasks", (data) => {
      setTasks(data);
    });

    socket.on("updateTasks", (data) => {
      setTasks(data);
    });

    return () => {
      socket.off("usersList");
      socket.off("initialTasks");
      socket.off("updateTasks");
    };
  }, []);

  const handleAddTask = () => {
    if (!title) return;

    if (editId) {
      socket.emit("updateTask", {
        _id: editId,
        title,
        description,
        deadline,
        assignedTo,
      });
      setEditId(null);
    } else {
      socket.emit("addTask", {
        title,
        description,
        deadline,
        assignedTo,
      });
    }

    setTitle("");
    setDescription("");
    setDeadline("");
    setAssignedTo("");
  };

  const handleDelete = (id) => {
    socket.emit("deleteTask", id);
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setDeadline(task.deadline);
    setAssignedTo(task.assignedTo);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Task Dashboard (Real-time)</h1>

      <h3>Logged in as: {user.name} ({user.role})</h3>

      <h2>Active Users</h2>
      <ul>
        {users.map((u, index) => (
          <li key={index}>{u}</li>
        ))}
      </ul>

      {user.role === "Admin" && (
        <>
          <h2>Add / Edit Task</h2>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <input
            placeholder="Assign To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />

          <button onClick={handleAddTask}>
            {editId ? "Update Task" : "Add Task"}
          </button>
        </>
      )}

      <h2>Task List</h2>

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p><b>Deadline:</b> {task.deadline}</p>
          <p><b>Assigned To:</b> {task.assignedTo}</p>

          {user.role === "Admin" && (
            <>
              <button onClick={() => handleEdit(task)}>
                Edit
              </button>

              <button onClick={() => handleDelete(task._id)}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskDashboard;
