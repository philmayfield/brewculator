// packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

// routes
const user = require("./routes/api/user");
const recipe = require("./routes/api/recipe");
const version = require("./routes/api/version");
const versions = require("./routes/api/versions");
const brew = require("./routes/api/brew");
const brews = require("./routes/api/brews");
const gravity = require("./routes/api/gravity");
const gravities = require("./routes/api/gravities");

// init express
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config - get mongoURI from from config/keys
const db = require("./config/keys").mongoURI;

// Connect to MongoDB with mongoose
mongoose
  .connect(db)
  .then(() => console.log("> MongoDB connected"))
  .catch(e => console.error("Error connecting to DB:", e));

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

// Use Routes
app.use("/api/user", user);
app.use("/api/recipe", recipe);
app.use("/api/version", version);
app.use("/api/versions", versions);
app.use("/api/brew", brew);
app.use("/api/brews", brews);
app.use("/api/gravity", gravity);
app.use("/api/gravities", gravities);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// set express port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`> Server running on port ${port}`));
