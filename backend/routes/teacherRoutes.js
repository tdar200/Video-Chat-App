const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Teacher = require("../models/teacherModel");
const User = require("../models/userModel");
const protect = require("../middleware/authMiddleware");

router.route("/detail/:id").get(
  protect,
  asyncHandler(async (req, res) => {
    // console.log(req.params);

    const teacher = await Teacher.findOne({
      user: req.params.id,
    });

    // console.log("teacher id ", req.params.id)

    // console.log("teacher",teacher)

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
    console.log(typeof req.params.userId);

    console.log(req.params.id, "teacher id");

    const teacher = await Teacher.findOne({
      user: req.params.id,
    });

    const student = await Teacher.findOne({
      call_connected: req.params.id,
    });

    console.log("user id", req.params.userId);

    // aggregate([
    //   {
    //     $match: {
    //       user: new ObjectId(`${req.params.id}`),
    //     },
    //   },
    // ]);

    // console.log(teacher, "teacher backend");

    if (teacher && req.params.userId !== "null") {
      // console.log("first function is running");

      teacher.call_connected = req.params.userId;

      // console.log(teacher, "inside if statement")
      const updatedTeacher =
        // await teacher.save();

        await Teacher.findOneAndUpdate(
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

      // console.log("updatedTeacher", updatedTeacher);

      res.json(updatedTeacher);
    } else if (teacher && req.params.userId === "null") {
      console.log("does this function even run");
      await Teacher.findOneAndUpdate(
        {
          _id: teacher._id,
        },
        { $unset: { call_connected: true } },
        false,
        true
      
      );

      console.log(teacher, "teacher");
    } else if (student && req.params.userId === "null") {
      await Teacher.findOneAndUpdate(
        {
          _id: teacher._id,
        },
        {
          $unset: "call_connected",
        }
      );
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

module.exports = router;
