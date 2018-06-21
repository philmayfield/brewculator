const express = require("express");
const router = express.Router();
const passport = require("passport");
const notEmpty = require("../../validation/empty").notEmpty;

// load validations
const validateGravityInput = require("../../validation/brew");

// load gravity and brew model
const Gravity = require("../../models/Gravity");
const Brew = require("../../models/Brew");

// ROUTES --------------------------------------------

// @route   GET api/gravity/:gravity_id
// @desc    Read gravity by ID
// @access  Public
router.get("/:gravity_id", (req, res) => {
  const errors = {};

  Gravity.findOne({ _id: req.params.gravity_id })
    .then(gravity => {
      if (notEmpty(gravity)) {
        // gravity was found, return it with 200 status
        return res.json(gravity);
      }

      // gravity was not found
      errors.noGravity = "Sorry, we couldnt find that gravity reading :(";
      return res.status(404).json(errors);
    })
    .catch(err => {
      errors.noGravity = "Sorry, we couldnt find that gravity reading :(";
      return res.status(404).json({ err, errors });
    });
});

// @route   POST api/gravity/
// @desc    Create a gravity
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validate request
    const { body } = req;
    const brew_id = body.brew;
    const { errors, isValid } = validateGravityInput(body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const gravityFields = {};
    gravityFields.brew = brew_id ? brew_id : "";
    gravityFields.date = body.date ? body.date : new Date();
    gravityFields.brix = body.brix ? body.brix : "";
    gravityFields.temp = body.temp ? body.temp : "";
    gravityFields.notes = body.notes ? body.notes : "";

    Brew.findOne({ _id: brew_id })
      .then(brew => {
        if (brew) {
          // found the brew, add the gravity

          // set the recipe and version id
          // gravityFields.recipe = brew.recipe;
          // gravityFields.version = brew.version;

          new Gravity(gravityFields)
            .save()
            .then(gravity => res.json(gravity))
            .catch(err => {
              errors.err = err;
              errors.createGravity =
                "We ran into a problem creating the gravity.";
              res.status(400).json({ errors });
            });
        } else {
          errors.noBrew = "Could not find the brew to add a gravity :(";
          res.status(404).json({ errors });
        }
      })
      .catch(err => {
        errors.noBrew = "Could not find the brew to add a gravity :(";
        res.status(404).json({ err, errors });
      });
  }
);

// @route   POST api/gravity/:gravity_id
// @desc    Update a gravity
// @access  Private
router.post(
  "/:gravity_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validate request
    const gravityId = req.params.gravity_id;
    const { body } = req;
    const { errors, isValid } = validateGravityInput(body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const gravityFields = {};
    gravityFields.date = body.date ? body.date : "";
    gravityFields.brix = body.brix ? body.brix : "";
    gravityFields.temp = body.temp ? body.temp : "";
    gravityFields.notes = body.notes ? body.notes : "";

    Gravity.findOneAndUpdate(
      { _id: gravityId }, // object to find and update
      { $set: gravityFields }, // data
      { new: true } // new option returns the updated object
    )
      .then(gravity => {
        if (gravity) {
          console.log(`>> updated gravity ${gravityId}`);
          return res.json(gravity);
        }

        errors.noGravity = "Could not find that gravity reading to update :(";
        return res.status(404).json({ errors });
      })
      .catch(err => {
        errors.noGravity = "Could not find that gravity reading to update :(";
        return res.status(404).json({ err, errors });
      });
  }
);

// @route   DELETE api/gravity/:gravity_id
// @desc    Delete a gravity
// @access  Private
router.delete(
  "/:gravity_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Gravity.findOneAndRemove({ _id: req.params.gravity_id })
      .then(gravity => {
        if (notEmpty(gravity)) {
          return res.json({ deleted: true });
        }
        return res.json({
          deleted: "That gravity was not found or already deleted!"
        });
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
