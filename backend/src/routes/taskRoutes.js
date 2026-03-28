const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  updateTaskStatus,
  getGoalProgress,
} = require("../controllers/taskController");

router.patch("/:id/status", authMiddleware, updateTaskStatus);
router.get("/progress/:goalId", authMiddleware, getGoalProgress);

module.exports = router;