const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const goalRoutes = require("./routes/goalRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Smart Study Buddy API is running");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database(), NOW()");
    res.json({
      message: "Database connected successfully",
      database: result.rows[0].current_database,
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

async function initTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS study_goals (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(150) NOT NULL,
        description TEXT,
        exam_date DATE NOT NULL,
        total_topics INTEGER NOT NULL,
        hours_per_day NUMERIC(4,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        goal_id INTEGER NOT NULL REFERENCES study_goals(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        planned_date DATE NOT NULL,
        topic_start INTEGER NOT NULL,
        topic_end INTEGER NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'todo',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT valid_status CHECK (status IN ('todo', 'in-progress', 'done'))
      );
    `);

    console.log("Tables initialized successfully");
  } catch (error) {
    console.error("Error initializing tables:", error);
  }
}

async function startServer() {
  try {
    const result = await pool.query("SELECT current_database()");
    console.log("Connected to database:", result.rows[0].current_database);

    await initTables();

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  } catch (error) {
    console.error("Startup error:", error);
  }
}

startServer();