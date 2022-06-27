const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Teacher = require("../models/teacherModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const admin = require("../middleware/authMiddleware");
const protect = require("../middleware/authMiddleware");
const Student = require("../models/studentModel");

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password, signupUser } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    let user = {};
    let teacher = {};

    if (signupUser === "teacher") {
      user = await User.create({
        name,
        email,
        password,
        isTeacher: true,
      });

      teacher = await Teacher.create({
        user: user._id,
        hourly_rate: req.body.hourlyRate,
        subject_category: req.body.category,
        gender: req.body.gender,
      });
    } else if (signupUser === "student") {
      user = await User.create({
        name,
        email,
        password,
        isStudent: true,
      });

     
      student = await Student.create({
        user: user._id,
        gender: req.body.gender,
      });
    }



    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isTeacher: user.isTeacher,
        isStudent: user.isStudent,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user Data");
    }
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isTeacher: user.isTeacher,
        isStudent: user.isStudent,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("invalid password");
    }
  })
);

router.route("/profile").get(
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  })
);

router.route("/profile").put(
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.pasword = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  })
);

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.route("/").get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin

router.route("/all_teachers/:category").get(
  protect,
  asyncHandler(async (req, res) => {
    // const allTeachers = Teacher.find({ subject_category: req.params.category });

    const allTeachers = await Teacher.aggregate([
      {
        $match: {
          subject_category: req.params.category,
        },
      },
    ]);

    console.log(allTeachers);
    if (allTeachers) {
      res.json(allTeachers);
    } else {
      res.status(404);
      throw new Error("Teachers not found");
    }
  })
);

router.route("/:id").delete(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: "User removed" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);
// // @desc    Get user by ID
// // @route   GET /api/users/:id
// // @access  Private/Admin
router.route("/:id").get(
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.find({ _id: req.params.id });

    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// // @desc    Update user
// // @route   PUT /api/users/:id
// // @access  Private/Admin
router.route("/:id").put(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);
module.exports = router;
