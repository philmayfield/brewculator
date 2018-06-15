const express = require("express");
const router = express.Router();
const passport = require("passport");
const notEmpty = require("../../validation/empty").notEmpty;

// load validations
const validateRecipeInput = require("../../validation/recipe");

// load models
const Recipe = require("../../models/Recipe");
const Version = require("../../models/Version");
const Brew = require("../../models/Brew");
const Gravity = require("../../models/Gravity");

// ROUTES --------------------------------------------

// @route   GET api/recipe/all
// @desc    Read all recipes
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Recipe.find()
    .then(recipes => {
      if (notEmpty(recipes)) {
        // found some recipes, return with 200 status
        return res.json(recipes);
      }

      // no recipes found
      errors.recipeError =
        "Hey, there arent any recipes here yet.  Why dont you add some!";
      return res.status(404).json(errors);
    })
    .catch(err => {
      errors.req = req;
      errors.err = err;
      errors.recipeError = "There was a problem fetching the recipes :(";
      return res.status(404).json(errors);
    });
});

// @route   GET api/recipe/:recipe_id
// @desc    Read recipe by ID
// @access  Public
router.get("/:recipe_id", (req, res) => {
  const errors = {};

  Recipe.findOne({ _id: req.params.recipe_id })
    .then(recipe => {
      if (notEmpty(recipe)) {
        // recipe was found, return it with 200 status
        return res.json(recipe);
      }

      // recipe was not found
      errors.recipeError = "Sorry, we couldnt find that recipe :(";
      return res.status(404).json(errors);
    })
    .catch(() => {
      errors.recipeError = "Sorry, we couldnt find that recipe :(";
      return res.status(404).json(errors);
    });
});

// @route   POST api/recipe
// @desc    Create a recipe
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validate request
    const author = req.user.id;
    const { body } = req;
    const { errors, isValid } = validateRecipeInput(body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const recipeFields = {};
    recipeFields.author = author ? author : "";
    recipeFields.name = body.name ? body.name : "";
    recipeFields.style = body.style ? body.style : "";

    // save profile
    new Recipe(recipeFields)
      .save()
      .then(profile => res.json(profile))
      .catch(() => {
        errors.recipeError = "We ran into a problem creating your recipe.";
        res.status(400).json(errors);
      });
  }
);

// @route   POST api/recipe/:recipe_id
// @desc    Update a recipe
// @access  Private
router.post(
  "/:recipe_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validate request
    const recipeId = req.params.recipe_id;
    const { body } = req;
    const { errors, isValid } = validateRecipeInput(body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const recipeFields = {};
    recipeFields.name = body.name ? body.name : "";
    recipeFields.style = body.style ? body.style : "";

    Recipe.findOneAndUpdate(
      { _id: recipeId }, // object to find and update
      { $set: recipeFields }, // data
      { new: true } // new option returns the updated object
    )
      .then(recipe => {
        if (notEmpty(recipe)) {
          return res.json(recipe);
        }
        errors.recipeError = "Could not find that recipe to update :(";
        return res.status(404).json(errors);
      })
      .catch(() => {
        errors.recipeError = "Could not find that recipe to update :(";
        return res.status(404).json(errors);
      });
  }
);

// @route   DELETE api/recipe/:recipe_id
// @desc    Delete a recipe
// @access  Private
router.delete(
  "/:recipe_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const recipeId = req.params.recipe_id;

    Recipe.findOneAndRemove({ _id: recipeId })
      .then(recipe => {
        if (notEmpty(recipe)) {
          // deleted the recipe - now delete the associated versions, brews and gravities
          Version.deleteMany({ recipe: recipeId }).catch(err =>
            res.status(400).json(err)
          );
          Brew.deleteMany({ recipe: recipeId }).catch(err =>
            res.status(400).json(err)
          );
          Gravity.deleteMany({ recipe: recipeId }).catch(err =>
            res.status(400).json(err)
          );
          return res.json({ deleted: true });
        }
        return res.json({
          deleted: "That recipe was not found or already deleted!"
        });
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
