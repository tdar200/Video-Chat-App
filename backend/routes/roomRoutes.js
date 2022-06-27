const express = require("express")
const router = express.Router()
const Room = require("../models/roomModel")
const asyncHandler = require("express-async-handler")
const protect = require("../middleware/authMiddleware")


router.route("/").post(
    protect,
    asyncHandler(async (req, res)=> {
        const {teacher, student} = req.body

        const newRoom = new Room({
            teacher,
            student
        })

        const createdRoom = await newRoom.save()
        res.status(201).json(createdRoom)

    })
)

router.route(":id").get(
    protect,
    asyncHandler(async(req,res) => {
        const room = await Room.find({_id: req.params.id})


        if(room){
            res.json(room)
        }else {
            res.status(404)
            throw new Error("Room not found")
        }

    })
)

module.exports = router