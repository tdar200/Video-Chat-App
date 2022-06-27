const mongoose = require("mongoose");

const roomsSchema = mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Teacher",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
  },
  {
    timestamps: true,
  }
);


const Room = mongoose.model("Room", roomsSchema)

module.exports = Room