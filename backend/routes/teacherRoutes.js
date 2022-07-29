const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Teacher = require("../models/teacherModel");
const User = require("../models/userModel");
const protect = require("../middleware/authMiddleware");
const Student = require("../models/studentModel");
const moment = require("moment");

// router.route("/fetch-appointments/:id").get(
//   protect,
//   asyncHandler(async (req, res) => {
//     const teacher = await Teacher.find({ user: req.params.id });

//     if (teacher) {

//     } else {
//       res.status(404);
//       throw new Error("Teacher not found");
//     }
//   })
// );



router.route("/make-appointment/:id").put(
  protect,
  asyncHandler(async (req, res) => {
    const { date } = req.body;

    const teacher = await Teacher.find({ user: req.params.id });

    console.log("teacher", teacher);

    if (teacher) {
      const newAppointment = {
        user: req.user._id,
        date: moment(date),
      };

      const updatedAppointment = await Teacher.findOneAndUpdate(
        { user: req.params.id },
        { $push: { appointments: newAppointment } },
        { useFindAndModify: false }
      );

      res.json(updatedAppointment);
    } else {
      res.status(404);
      throw new Error("Teacher not found");
    }
  })
);

router.route("/detail/:id").get(
  protect,
  asyncHandler(async (req, res) => {
    const teacher = await Teacher.findOne({
      user: req.params.id,
    });

    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404);
      throw new Error("No teachers found");
    }
  })
);

router.route("/update/:id/:userId").put(
  protect,
  asyncHandler(async (req, res) => {
    const teacher = await Teacher.findOne({
      user: req.params.id,
    });

    const student = await Teacher.findOne({
      call_connected: req.params.id,
    });

    if (teacher && req.params.userId !== "null") {
      teacher.call_connected = req.params.userId;

      const updatedTeacher = await Teacher.findOneAndUpdate(
        {
          _id: teacher._id,
        },
        {
          $set: {
            call_connected: req.params.userId,
          },
        },
        { useFindAndModify: false }
      );

      res.json(updatedTeacher);
    } else if (teacher && req.params.userId === "null") {
      await Teacher.findOneAndUpdate(
        {
          _id: teacher._id,
        },
        { $unset: { call_connected: true } },
        {
          upsert: true,
        }
      );

      res.status(200);
    } else if (student && req.params.userId === "null") {
      await Teacher.findOneAndUpdate(
        {
          call_connected: student.call_connected,
        },
        {
          $unset: "call_connected",
        },
        {
          upsert: true,
        }
      );

      res.status(200);
    } else {
      res.status(404);
      throw new Error("Teacher not found");
    }
  })
);

router.route("/:category").get(
  protect,
  asyncHandler(async (req, res) => {
    // console.log(req.params);

    const teachers = await Teacher.find({
      subject_category: req.params.category,
    }).populate({ path: "user" });
    // ([
    //   {
    //     '$match': {
    //       'subject_category': req.params.category
    //     }
    //   }
    //   // , {
    //   //   '$lookup': {
    //   //     'from': 'users',
    //   //     'localField': 'user',
    //   //     'foreignField': '_id',
    //   //     'as': 'user_results'
    //   //   }
    //   // }
    // ])

    if (teachers) {
      res.json(teachers);
    } else {
      res.status(404);
      throw new Error("No teachers found");
    }
  })
);

router.route("/:id/credit").put(
  protect,
  asyncHandler(async (req, res) => {
    const { credit } = req.body;

    const teacher = await Teacher.find({ user: req.params.id });

    if (teacher) {
      teacher[0].credit = teacher[0].credit + credit;
      const updatedTeacher = await teacher[0].save();
      res.json(updatedTeacher);
    } else {
      res.status(404);
      throw new Error("Teacher not found");
    }
  })
);

module.exports = router;
