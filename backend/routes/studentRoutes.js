const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
const protect = require("../middleware/authMiddleware");

router.route("/:id").get(
  protect,
  asyncHandler(async (req, res) => {
    const student = await Student.find({ user: req.params.id });
    if (student) {
      res.json(student);
    } else {
      res.status(404);
      throw new Error("Student not found");
    }
  })
);

router.route("/:id/credit").put(
  protect,
  asyncHandler(async (req, res) => {
    const { credit } = req.body;

    const student = await Student.find({ user: req.params.id });

    // console.log(student)

    if (student) {
      student[0].credit = student[0].credit + credit;
      const updatedStudent = await student[0].save();
      res.json(updatedStudent);
    } else {
      res.status(404);
      throw new Error("Student not found");
    }
  })
);

module.exports = router;
