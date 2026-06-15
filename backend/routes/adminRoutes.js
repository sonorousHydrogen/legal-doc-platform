const express = require("express");
const User = require("../models/User");
const Questionnaire = require("../models/Questionnaire");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/questionnaires", protect, adminOnly, async (req, res) => {
  try {
    const questionnaires = await Questionnaire.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.json(questionnaires);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalQuestionnaires = await Questionnaire.countDocuments();
    const adminUsers = await User.countDocuments({ role: "admin" });
    const regularUsers = await User.countDocuments({ role: "user" });

    res.json({
      totalUsers,
      totalQuestionnaires,
      adminUsers,
      regularUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;