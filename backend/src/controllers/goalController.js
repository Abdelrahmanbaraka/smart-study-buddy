const pool = require("../config/db");

// CREATE GOAL + AUTO GENERATE TASKS
exports.createGoal = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, description, examDate, totalTopics, hoursPerDay } = req.body;

    // 1) create study goal
    const newGoal = await pool.query(
      `INSERT INTO study_goals (user_id, title, description, exam_date, total_topics, hours_per_day)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, title, description, examDate, totalTopics, hoursPerDay]
    );

    const goal = newGoal.rows[0];

    // 2) calculate remaining days
    const today = new Date();
    const exam = new Date(examDate);

    const diffTime = exam - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return res.status(400).json({
        message: "Exam date must be in the future",
      });
    }

    // 3) calculate how many topics per day
    const topicsPerDay = Math.ceil(totalTopics / diffDays);

    let currentTopic = 1;

    for (let day = 0; day < diffDays && currentTopic <= totalTopics; day++) {
      const plannedDate = new Date();
      plannedDate.setDate(today.getDate() + day);

      const topicStart = currentTopic;
      const topicEnd = Math.min(currentTopic + topicsPerDay - 1, totalTopics);

      const taskTitle = `Study topics ${topicStart} - ${topicEnd}`;

      await pool.query(
        `INSERT INTO tasks (user_id, goal_id, title, planned_date, topic_start, topic_end, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [userId, goal.id, taskTitle, plannedDate, topicStart, topicEnd, "todo"]
      );

      currentTopic = topicEnd + 1;
    }

    res.status(201).json({
      message: "Goal created and tasks generated successfully",
      goal,
    });
  } catch (error) {
    console.error("Create goal error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// GET ALL GOALS FOR LOGGED IN USER
exports.getGoals = async (req, res) => {
  try {
    const userId = req.user.userId;

    const goals = await pool.query(
      `SELECT * FROM study_goals
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json(goals.rows);
  } catch (error) {
    console.error("Get goals error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// GET ONE GOAL + ITS TASKS
exports.getGoalById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const goalId = req.params.id;

    const goal = await pool.query(
      `SELECT * FROM study_goals
       WHERE id = $1 AND user_id = $2`,
      [goalId, userId]
    );

    if (goal.rows.length === 0) {
      return res.status(404).json({ message: "Goal not found" });
    }

    const tasks = await pool.query(
      `SELECT * FROM tasks
       WHERE goal_id = $1 AND user_id = $2
       ORDER BY planned_date ASC, id ASC`,
      [goalId, userId]
    );

    res.json({
      goal: goal.rows[0],
      tasks: tasks.rows,
    });
  } catch (error) {
    console.error("Get goal by id error:", error);
    res.status(500).json({ error: "Server error" });
  }
};