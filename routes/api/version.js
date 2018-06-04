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

// @route   POST api/version/recipe/:recipe_id
// @desc    Create or Update a recipe version
// @access  Private
router.post(
  "/recipe/:recipe_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validate request
    const recipeId = req.params.recipe_id;
    const { body } = req;
    const { errors, isValid } = validateVersionInput(body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const versionFields = {};
    versionFields.recipe = recipeId ? recipeId : "";
    versionFields.version = body.version ? body.version : "1";
    versionFields.notes = body.notes ? body.notes : "";

    Recipe.findOne({ _id: recipeId })
      .then(recipe => {
        if (notEmpty(recipe)) {
          // found the recipe, add or update the version

          Version.findOneAndUpdate(
            { version: versionFields.version }, // object to find and update
            { $set: versionFields }, // data
            { new: true } // new option returns the updated object
          )
            .then(version => {
              if (notEmpty(version)) {
                // version found - UPDATE
                return res.json(version);
              }

              // version NOT found - CREATE
              new Version(versionFields)
                .save()
                .then(version => res.json(version))
                .catch(err => {
                  errors.createVersion =
                    "We ran into a problem creating the version.";
                  return res.status(400).json({ err, errors });
                });
            })
            .catch(err => {
              errors.createVersion =
                "We ran into a problem updating the version.";
              return res.status(400).json({ err, errors });
            });
        }
      })
      .catch(err => {
        errors.noRecipe = "Could not find the recipe to make a version of :(";
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
