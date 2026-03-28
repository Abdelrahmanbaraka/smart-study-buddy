import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        borderBottom: "1px solid #ddd",
        marginBottom: "20px",
      }}
    >
      <div>
        <Link
          to="/dashboard"
          style={{
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "20px",
            color: "#222",
          }}
        >
          Smart Study Buddy
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create-goal">Create Goal</Link>
        {user && <span>{user.email}</span>}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;