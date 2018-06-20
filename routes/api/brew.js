const express = require("express");
const router = express.Router();
const passport = require("passport");
const notEmpty = require("../../validation/empty").notEmpty;

// load validations
const validateBrewInput = require("../../validation/brew");

// load models
const Version = require("../../models/Version");
const Brew = require("../../models/Brew");
const Gravity = require("../../models/Gravity");

// ROUTES --------------------------------------------

// @route   GET api/brew/:brew_id
// @desc    Read brew by ID
// @access  Public
router.get("/:brew_id", (req, res) => {
  const errors = {};

  Brew.findOne({ _id: req.params.brew_id })
    .then(brew => {
      if (notEmpty(brew)) {
        // brew was found, return it with 200 status
        return res.json(brew);
      }

      // brew was not found
      errors.noBrew = "Sorry, we couldnt find that brew :(";
      return res.status(404).json(errors);
    })
    .catch(err => {
      errors.noBrew = "Sorry, we couldnt find that brew :(";
      return res.status(404).json({ err, errors });
    });
});

// @route   POST api/brew/
// @desc    Create a brew
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validate request
    const { body } = req;
    const version_id = body.version;
    const { errors, isValid } = validateBrewInput(body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const brewFields = {};
    brewFields.version = version_id ? version_id : "";
    brewFields.notes = body.notes ? body.notes : "";

    Version.findOne({ _id: version_id })
      .then(version => {
        if (version) {
          // found the version, add the brew

          // set the recipe id
          brewFields.recipe = version.recipe;

          new Brew(brewFields)
            .save()
            .then(brew => res.json(brew))
            .catch(err =>
              res.status(400).json({
                err,
                createVersion: "We ran into a problem creating the brew."
              })
            );
        } else {
          errors.noVersion = "Could not find the version to add a brew :(";
          res.status(404).json({ errors });
        }
      })
      .catch(err => {
        errors.noVersion = "Could not find the version to add a brew :(";
        res.status(404).json({ err, errors });
      });
  }
);

// @route   POST api/brew/:brew_id
// @desc    Update a brew
// @access  Private
router.post(
  "/:brew_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validate request
    const brewId = req.params.brew_id;
    const { body } = req;
    const { errors, isValid } = validateBrewInput(body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const brewFields = {};
    brewFields.notes = body.notes ? body.notes : "";

    Brew.findOneAndUpdate(
      { _id: brewId }, // object to find and update
      { $set: brewFields }, // data
      { new: true } // new option returns the updated object
    )
      .then(brew => {
        if (brew) {
          return res.json(brew);
        } else {
          errors.noBrew = "Could not find that brew to update :(";
          return res.status(404).json({ errors });
        }
      })
      .catch(err => {
        errors.noBrew = "Could not find that brew to update :(";
        res.status(404).json({ err, errors });
      });
  }
);

// @route   DELETE api/brew/:brew_id
// @desc    Delete a brew
// @access  Private
router.delete(
  "/:brew_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const brewId = req.params.brew_id;

    Brew.findOneAndRemove({ _id: brewId })
      .then(brew => {
        if (notEmpty(brew)) {
          // deleted the brew - now delete the associated gravities
          Gravity.deleteMany({ brew: brewId }).catch(err =>
            res.status(400).json(err)
          );
          return res.json({ deleted: true });
        }

        return res.json({
          deleted: "That brew was not found or already deleted!"
        });
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
