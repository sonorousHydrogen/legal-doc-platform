const mongoose = require("mongoose");

const questionnaireSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: String,
    documentType: String,
    details: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Questionnaire", questionnaireSchema);