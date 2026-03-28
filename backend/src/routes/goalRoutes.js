const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createGoal,
  getGoals,
  getGoalById,
} = require("../controllers/goalController");

router.post("/", authMiddleware, createGoal);
router.get("/", authMiddleware, getGoals);
router.get("/:id", authMiddleware, getGoalById);

module.exports = router;