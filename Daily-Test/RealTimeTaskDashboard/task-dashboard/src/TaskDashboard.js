import { useEffect, useState } from "react";
import socket from "./socket";

function TaskDashboard({ user }) {

    //state to store tasks and active users
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  //From input states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  //satrt to track edit mode
  const [editId, setEditId] = useState(null);

  //Run once when component loads
  useEffect(() => {
    //Recieve active users list from server
    socket.on("usersList", (data) => {
      setUsers(data);
    });

    //Recieve initial tasks list from server
    socket.on("initialTasks", (data) => {
      setTasks(data);
    });


    //Recieve updated tasks list from server
    socket.on("updateTasks", (data) => {
      setTasks(data);
    });

    //Clean up socket listeners  
    return () => {
      socket.off("usersList");
      socket.off("initialTasks");
      socket.off("updateTasks");
    };
  }, []);


  //Function to handle add/update task
  const handleAddTask = () => {
    if (!title) return;

    if (editId) {
        //If editing ,emit update event
      socket.emit("updateTask", {
        _id: editId,
        title,
        description,
        deadline,
        assignedTo,
      });
      setEditId(null);
    } else {
        //If addinng new task
      socket.emit("addTask", {
        title,
        description,
        deadline,
        assignedTo,
      });
    }

    //Clear form fields
    setTitle("");
    setDescription("");
    setDeadline("");
    setAssignedTo("");
  };

  //Delet task
  const handleDelete = (id) => {
    socket.emit("deleteTask", id);
  };

  //Edit task
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
