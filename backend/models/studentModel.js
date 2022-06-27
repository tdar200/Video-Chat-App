const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const studentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  sessions: [
    {
      session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
      },
    },
  ],

  rating: {
    type: Number,
    default: 0,
  },

  reviews: [reviewSchema],

  gender: {
    type: String,
    required: true,
    default: "Male"
  },

  credit: {
    type: Number,
    default: 0,
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
