import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("authUser") ||
    sessionStorage.getItem("authUser");

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("jwtToken");

    sessionStorage.removeItem("authUser");
    sessionStorage.removeItem("jwtToken");

    navigate("/");
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <h2>Welcome, {username}!</h2>

      <p>You are successfully logged in.</p>

      <p>JWT Token: Active</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;