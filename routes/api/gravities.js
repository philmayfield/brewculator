const express = require("express");
const router = express.Router();
const isEmpty = require("../../validation/empty").isEmpty;

// load recipe model
const Gravity = require("../../models/Gravity");

// ROUTES --------------------------------------------

// @route   GET api/gravities/:brew_id
// @desc    Read all gravities for a version
// @access  Public
router.get("/:brew_id", (req, res) => {
  const errors = {};

  Gravity.find({ brew: req.params.brew_id })
    .sort({ date: -1 }) // sort by date, 1 asc, -1 desc
    .then(gravities => {
      if (isEmpty(gravities)) {
        // no gravities found
        errors.noGravities =
          "Hey, there arent any gravities for that brew yet.  How about you add one!";
        return res.status(404).json(errors);
      }

      // found some gravities, return with 200 status
      return res.json(gravities);
    })
    .catch(err => {
      return res
        .status(404)
        .json({ err, req, noGravities: "Could not fetch gravities" });
    });
});

module.exports = router;
