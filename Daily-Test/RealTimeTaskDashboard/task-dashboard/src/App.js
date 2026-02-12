import { useState } from "react";
import Login from "./Login";
import TaskDashboard from "./TaskDashboard";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {user ? (
        <TaskDashboard user={user} />
      ) : (
        <Login setUser={setUser} />
      )}
    </>
  );
}

export default App;
