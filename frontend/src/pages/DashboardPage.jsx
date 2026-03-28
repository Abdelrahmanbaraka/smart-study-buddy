import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function DashboardPage() {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchGoals = async () => {
    try {
      const response = await api.get("/api/goals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGoals(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch goals");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetchGoals();
  }, []);

  return (
    <div>
      <Navbar />

      <div style={{ padding: "0 30px 30px" }}>
        <h1>Dashboard</h1>
        <p>Welcome back. Here are your study goals.</p>

        <button onClick={() => navigate("/create-goal")}>Create New Goal</button>

        <div style={{ marginTop: "20px" }}>
          {goals.length === 0 ? (
            <p>No goals yet.</p>
          ) : (
            goals.map((goal) => (
              <div
                key={goal.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "14px",
                }}
              >
                <h3>{goal.title}</h3>
                <p>{goal.description}</p>
                <p>
                  <strong>Exam Date:</strong>{" "}
                  {new Date(goal.exam_date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total Topics:</strong> {goal.total_topics}
                </p>
                <p>
                  <strong>Hours per Day:</strong> {goal.hours_per_day}
                </p>

                <Link to={`/goals/${goal.id}`}>View Details</Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;