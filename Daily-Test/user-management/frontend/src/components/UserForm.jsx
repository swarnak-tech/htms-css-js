import { useState } from "react";

function UserForm({ addUser }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm;
