import { useState } from "react";

function Login({ setUser }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Team Member");

  const handleLogin = () => {
    if (!name) return alert("Enter name");
    setUser({ name, role });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Enter Your Details</h2>

      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option>Admin</option>
        <option>Team Member</option>
      </select>

      <button onClick={handleLogin}>Enter Dashboard</button>
    </div>
  );
}

export default Login;
