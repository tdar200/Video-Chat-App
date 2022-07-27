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

const appointmentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
});

const teacherSchema = mongoose.Schema({
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
  appointments : [appointmentSchema],

  hourly_rate: {
    type: Number,
    required: true,
  },

  subject_category: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  call_connected: {
    type: String,
  },

  credit: {
    type: Number,
    default: 0,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
