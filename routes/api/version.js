const express = require("express");
const router = express.Router();
const passport = require("passport");
const notEmpty = require("../../validation/empty").notEmpty;

// load validations
const validateVersionInput = require("../../validation/version");

// load models
const Recipe = require("../../models/Recipe");
const Version = require("../../models/Version");
const Brew = require("../../models/Brew");
const Gravity = require("../../models/Gravity");

// ROUTES --------------------------------------------

// @route   GET api/version/:version_id
// @desc    Read version by ID
// @access  Public
router.get("/:version_id", (req, res) => {
  const errors = {};

  Version.findOne({ _id: req.params.version_id })
    .then(version => {
      if (notEmpty(version)) {
        // version was found, return it with 200 status
        return res.json(version);
      }

      // version was not found
      errors.noVersion = "Sorry, we couldnt find that recipe version :(";
      return res.status(404).json(errors);
    })
    .catch(() =>
      res.status(404).json({
        noVersion: "Sorry, we couldnt find that recipe version :("
      })
    );
});

// @route   POST api/version/
// @desc    Create a version
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validate request
    const { body } = req;
    const recipe_id = body.recipe;
    const { errors, isValid } = validateVersionInput(body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const versionFields = {};
    versionFields.recipe = recipe_id ? recipe_id : "";
    versionFields.version = body.version ? body.version : "1";
    versionFields.notes = body.notes ? body.notes : "";

    Recipe.findOne({ _id: recipe_id })
      .then(recipe => {
        if (notEmpty(recipe)) {
          // found the recipe, add the version

          new Version(versionFields)
            .save()
            .then(version => res.json(version))
            .catch(err => {
              errors.err = err;
              errors.createVersion = "We ran into a problem creating the brew.";
              res.status(400).json(errors);
            });
        } else {
          errors.noRecipe = "Could not find the recipe to make a version of :(";
          res.status(404).json({ errors });
        }
      })
      .catch(err => {
        errors.noRecipe = "Could not find the recipe to make a version of :(";
        res.status(404).json({ err, errors });
      });
  }
);

// @route   POST api/version/:version_id
// @desc    Update a version
// @access  Private
router.post(
  "/:version_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validate request
    const versionId = req.params.version_id;
    const { body } = req;
    const { errors, isValid } = validateVersionInput(body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const versionFields = {};
    versionFields.version = body.version ? body.version : "1";
    versionFields.notes = body.notes ? body.notes : "";

    Version.findOneAndUpdate(
      { _id: versionId }, // object to find and update
      { $set: versionFields }, // data
      { new: true } // new option returns the updated object
    )
      .then(version => {
        if (version) {
          return res.json(version);
        } else {
          errors.noVersion = "Could not find that version to update :(";
          return res.status(404).json({ errors });
        }
      })
      .catch(err => {
        errors.noversion = "Could not find that version to update :(";
        res.status(404).json({ err, errors });
      });
  }
);

// @route   DELETE api/version/:version_id
// @desc    Delete a version
// @access  Private
router.delete(
  "/:version_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const versionId = req.params.version_id;

    Version.findOneAndRemove({ _id: versionId })
      .then(version => {
        if (notEmpty(version)) {
          // deleted the version - now delete the associated brews and gravities
          Brew.deleteMany({ version: versionId }).catch(err =>
            res.status(400).json(err)
          );
          Gravity.deleteMany({ version: versionId }).catch(err =>
            res.status(400).json(err)
          );
          return res.json({ deleted: true });
        }
        return res.json({
          deleted: "That version was not found or already deleted!"
        });
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
