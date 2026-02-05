import { useEffect, useState } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const addUser = (name) => {
    fetch("http://localhost:5000/users", 
      {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(newUser => setUsers([...users, newUser]));
  };

  return (
    <div>
      <h2>User Management System</h2>
      <UserForm addUser={addUser} />
      <UserList users={users} />
    </div>
  );
}

export default App;
