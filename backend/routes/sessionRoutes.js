const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Session = require("../models/sessionModel");
const protect = require("../middleware/authMiddleware");


router.route("/").post(
    protect,
    asyncHandler(async(req, res) => {
        const {teacher, student, session_started} = req.body

    
        const session = new Session({
            teacher,
            student, 
            session_started
        })

        const createdSession = await session.save()

        res.status(201).json(createdSession)


    })
)


router.route("update/:id").put(
  protect,
  asyncHandler(async (req, res) => {
    const { upload } = req.body;

    const session = await Session.findById(req.params.id);

    if (teacher) {
   
        

      const updatedSession = await session.save();

      res.json(updatedSession);
    } else {
      res.status(404);
      throw new Error("Session not found");
    }
  })
);

module.exports = router;
