const pool = require("../config/db");

// UPDATE TASK STATUS
exports.updateTaskStatus = async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskId = req.params.id;
    const { status } = req.body;

    const allowedStatuses = ["todo", "in-progress", "done"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedTask = await pool.query(
      `UPDATE tasks
       SET status = $1
       WHERE id = $2 AND user_id = $3
       RETURNING *`,
      [status, taskId, userId]
    );

    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task status updated successfully",
      task: updatedTask.rows[0],
    });
  } catch (error) {
    console.error("Update task status error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// GET PROGRESS FOR ONE GOAL
exports.getGoalProgress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const goalId = req.params.goalId;

    const totalTasksResult = await pool.query(
      `SELECT COUNT(*) AS total
       FROM tasks
       WHERE goal_id = $1 AND user_id = $2`,
      [goalId, userId]
    );

    const doneTasksResult = await pool.query(
      `SELECT COUNT(*) AS done
       FROM tasks
       WHERE goal_id = $1 AND user_id = $2 AND status = 'done'`,
      [goalId, userId]
    );

    const totalTasks = parseInt(totalTasksResult.rows[0].total, 10);
    const doneTasks = parseInt(doneTasksResult.rows[0].done, 10);

    const progress =
      totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

    res.json({
      goalId: Number(goalId),
      totalTasks,
      doneTasks,
      progress,
    });
  } catch (error) {
    console.error("Get goal progress error:", error);
    res.status(500).json({ error: "Server error" });
  }
};