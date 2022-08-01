const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Session = require("../models/sessionModel");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.route("/").post(
  protect,
  asyncHandler(async (req, res) => {
    const { teacher, student, session_started, active } = req.body;

    const session = new Session({
      teacher,
      student,
      session_started,
      active,
    });

    const createdSession = await session.save();

    res.status(201).json(createdSession);
  })
);

router.route("/update/:id").put(
  protect,
  upload.single("image"),
  asyncHandler(async (req, res) => {
    // console.log(req.body, "req.body")

    const session = await Session.find({
      teacher: req.params.id,
      student: req.user._id,
    });

    // console.log("teacher Session", teacherSession)

    // console.log("student session" , studentSession)

    if (session) {
      session[0].image = req.body.image;

      const updatedSession = await session[0].save();

      res.json(updatedSession);
    } else {
      res.status(404);
      throw new Error("Session not found");
    }
  })
);

router.route("/:teacher_id/:student_id").get(
  protect,
  asyncHandler(async (req, res) => {

    const session = await Session.find({
      teacher: req.params.teacher_id,
      student: req.params.student_id,
    });

    // console.log(req.user._id, "teacher id")
    // console.log(req.)

    console.log("this is working", session);

    if (session) {
      res.json(session);
    } else {
      res.status(404);
      throw new Error("Session not found");
    }
  })
);

module.exports = router;
