const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Teacher = require("../models/teacherModel");
const protect = require("../middleware/authMiddleware");

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
