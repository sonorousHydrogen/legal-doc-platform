const express = require("express");
const Questionnaire = require("../models/Questionnaire");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { fullName, documentType, details } = req.body;

    const questionnaire = await Questionnaire.create({
      user: req.user,
      fullName,
      documentType,
      details,
    });

    res.status(201).json({
      message: "Questionnaire saved",
      questionnaire,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/my", protect, async (req, res) => {
  try {
    const questionnaires = await Questionnaire.find({
      user: req.user,
    }).sort({ createdAt: -1 });

    res.json(questionnaires);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    const query =
      user.role === "admin"
        ? { _id: req.params.id }
        : { _id: req.params.id, user: req.user };

    const questionnaire = await Questionnaire.findOne(query);

    if (!questionnaire) {
      return res.status(404).json({ message: "Questionnaire not found" });
    }

    res.json(questionnaire);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const { fullName, documentType, details } = req.body;

    const questionnaire = await Questionnaire.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user,
      },
      {
        fullName,
        documentType,
        details,
      },
      { new: true }
    );

    if (!questionnaire) {
      return res.status(404).json({ message: "Questionnaire not found" });
    }

    res.json({
      message: "Questionnaire updated successfully",
      questionnaire,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    const questionnaire =
      user.role === "admin"
        ? await Questionnaire.findByIdAndDelete(req.params.id)
        : await Questionnaire.findOneAndDelete({
            _id: req.params.id,
            user: req.user,
          });

    if (!questionnaire) {
      return res.status(404).json({ message: "Questionnaire not found" });
    }

    res.json({ message: "Questionnaire deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;