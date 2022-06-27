const mongoose = require("mongoose");

const queriesSchema = mongoose.Schema(
  {

    user :{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },

    email: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sub_category: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Query = mongoose.model("Queries", queriesSchema);

module.exports = Query;
