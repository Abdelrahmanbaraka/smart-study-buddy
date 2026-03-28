import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function GoalDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [goalData, setGoalData] = useState(null);
  const [progress, setProgress] = useState(null);

  const fetchGoalDetails = async () => {
    try {
      const goalResponse = await api.get(`/api/goals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const progressResponse = await api.get(`/api/tasks/progress/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGoalData(goalResponse.data);
      setProgress(progressResponse.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch goal details");
    }
  };

  const markTaskDone = async (taskId) => {
    try {
      await api.patch(
        `/api/tasks/${taskId}/status`,
        { status: "done" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchGoalDetails();
    } catch (error) {
      console.error(error);
      alert("Failed to update task");
    }
  };

  useEffect(() => {
    fetchGoalDetails();
  }, []);

  if (!goalData) return <p style={{ padding: "30px" }}>Loading...</p>;

  return (
    <div>
      <Navbar />

      <div style={{ padding: "0 30px 30px" }}>
        <button onClick={() => navigate("/dashboard")}>← Back to Dashboard</button>

        <h1 style={{ marginTop: "20px" }}>{goalData.goal.title}</h1>
        <p>{goalData.goal.description}</p>
        <p>
          <strong>Exam Date:</strong>{" "}
          {new Date(goalData.goal.exam_date).toLocaleDateString()}
        </p>
        <p>
          <strong>Progress:</strong> {progress?.progress ?? 0}%
        </p>

        <h2 style={{ marginTop: "25px" }}>Tasks</h2>

        {goalData.tasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "12px",
            }}
          >
            <p><strong>{task.title}</strong></p>
            <p>Status: {task.status}</p>
            <p>
              Planned Date: {new Date(task.planned_date).toLocaleDateString()}
            </p>

            {task.status !== "done" && (
              <button onClick={() => markTaskDone(task.id)}>
                Mark as Done
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoalDetailsPage;