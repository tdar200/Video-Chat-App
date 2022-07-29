const mongoose = require("mongoose")

const sessionSchema = mongoose.Schema(
    {
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Teacher"
        },
        student : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Student"
        },

        session_total_cost: {
            type: Number,
            default: 0.0
        },
        session_started: {
            type: Date,
            required: true,
        },
        session_ended: {
            type: Date,
            required: true
        },
        pictures: {
            type:String

        }
    }
)

const Session = mongoose.model("Session", sessionSchema)

module.exports = Session