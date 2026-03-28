import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function CreateGoalPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    examDate: "",
    totalTopics: "",
    hoursPerDay: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/goals", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Goal created successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to create goal");
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "0 30px 30px", maxWidth: "600px" }}>
        <h1>Create Goal</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Goal Title"
              value={formData.title}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px" }}
            />
          </div>

          <div style={{ marginTop: "12px" }}>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", minHeight: "100px" }}
            />
          </div>

          <div style={{ marginTop: "12px" }}>
            <input
              type="date"
              name="examDate"
              value={formData.examDate}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px" }}
            />
          </div>

          <div style={{ marginTop: "12px" }}>
            <input
              type="number"
              name="totalTopics"
              placeholder="Total Topics"
              value={formData.totalTopics}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px" }}
            />
          </div>

          <div style={{ marginTop: "12px" }}>
            <input
              type="number"
              name="hoursPerDay"
              placeholder="Hours Per Day"
              value={formData.hoursPerDay}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px" }}
            />
          </div>

          <button style={{ marginTop: "16px" }} type="submit">
            Save Goal
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateGoalPage;