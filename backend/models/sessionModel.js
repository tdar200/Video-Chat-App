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
            required: true,
            default: 0.0
        },
        session_started: {
            type: Date,
            required: true,
        },
        session_ended: {
            type: Date,
            required: true
        }
    }
)

const Session = mongoose.model("Session", sessionSchema)

module.exports = Session