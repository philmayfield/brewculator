const express = require("express");
const router = express.Router();
const isEmpty = require("../../validation/empty").isEmpty;

// load recipe model
const Version = require("../../models/Version");

// ROUTES --------------------------------------------

// @route   GET api/versions/:recipe_id
// @desc    Read all versions for a recipe
// @access  Public
router.get("/:recipe_id", (req, res) => {
  const errors = {};

  Version.find({ recipe: req.params.recipe_id })
    .sort({ version: 1 }) // sort by version, 1 asc, -1 desc
    .then(versions => {
      if (isEmpty(versions)) {
        // no versions found
        errors.noVersions =
          "Hey, there arent any versions of that brew yet.  How about you add one!";
        return res.json(errors);
      }

      // found some versions, return with 200 status
      return res.json(versions);
    })
    .catch(err => {
      return res
        .status(404)
        .json({ err, req, noVersions: "Could not fetch versions" });
    });
});

module.exports = router;
