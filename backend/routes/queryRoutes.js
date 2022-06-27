const express = require("express");
const router = express.Router();
const Query = require("../models/queryModel");
const asyncHandler = require("express-async-handler");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/authMiddleware");

router.route("/").get(
  protect,
  asyncHandler(async (req, res) => {
    // console.log("request for list", req)

    // console.log("user id", req.user)

    const queries = await Query.find({ user: req.user._id });
    res.json(queries);
  })
);

router.route("/").post(
  protect,
  asyncHandler(async (req, res) => {
    const { email, category, subCategory, query } = req.body;

    const isQuery = await Query.find({ user: req.user._id });

    if (isQuery.length === 0) {
      const newQuery = new Query({
        user: req.user._id,
        email,
        category,
        sub_category: subCategory,
        query,
      });
      const createdQuery = await newQuery.save();
      res.status(201).json(createdQuery);
    } else if (isQuery.length > 0) {
      res.status(500);
      throw new Error("Query Already Exists");
    }
  })
);

router.route("/:id").get(
  protect,
  asyncHandler(async (req, res) => {
    const query = await Query.find({ _id: req.params.id });

    if (query) {
      res.json(query);
    } else {
      res.status(404);
      throw new Error("Query not found");
    }
  })
);

router.route("/:id").delete(
  protect,
  asyncHandler(async (req, res) => {
    const query = await Query.find({ _id: req.params.id });

    if (query) {
      await Query.deleteOne(query[0]);
      res.status(200);
    } else {
      res.status(404);
      throw new Error("query not found");
    }
  })
);

module.exports = router;
