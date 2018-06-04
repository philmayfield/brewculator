const express = require("express");
const router = express.Router();
const isEmpty = require("../../validation/empty").isEmpty;

// load recipe model
const Brew = require("../../models/Brew");

// ROUTES --------------------------------------------

// @route   GET api/brews/:version_id
// @desc    Read all brews for a version
// @access  Public
router.get("/:version_id", (req, res) => {
  const errors = {};

  Brew.find({ version: req.params.version_id })
    .sort({ date: -1 }) // sort by date, 1 asc, -1 desc
    .then(brews => {
      if (isEmpty(brews)) {
        // no brews found
        errors.noBrews =
          "Hey, there arent any brews of that version yet.  How about you add one!";
        return res.status(404).json(errors);
      }

      // found some brews, return with 200 status
      return res.json(brews);
    })
    .catch(err => {
      return res
        .status(404)
        .json({ err, req, noBrews: "Could not fetch brews" });
    });
});

module.exports = router;
