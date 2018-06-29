import logo from "../img/logo.svg";
import phil from "../img/phil.svg";
import bootstrap from "../img/bootstrap.svg";
import express from "../img/express.svg";
import git from "../img/git.svg";
import heroku from "../img/heroku.svg";
import js from "../img/js.svg";
import mongo from "../img/mongo.svg";
import node from "../img/node.svg";
import react from "../img/react.svg";
import redux from "../img/redux.svg";
import sass from "../img/sass.svg";
import baselineAccountCircle24px from "../img/baseline-account_circle-24px.svg";
import baselineAddCircle24px from "../img/baseline-add_circle-24px.svg";
import baselineArrowBack24px from "../img/baseline-arrow_back-24px.svg";
import baselineClose24px from "../img/baseline-close-24px.svg";
import baselineDeleteForever24px from "../img/baseline-delete_forever-24px.svg";
import baselineDone24px from "../img/baseline-done-24px.svg";
import baselineEdit24px from "../img/baseline-edit-24px.svg";
import baselineLocalDrink24px from "../img/baseline-local_drink-24px.svg";
import baselineMoreVert24px from "../img/baseline-more_vert-24px.svg";
import baselineSave24px from "../img/baseline-save-24px.svg";
import roundWarning24px from "../img/round-warning-24px.svg";

let imgs = {
  logo,
  phil,
  bootstrap,
  express,
  git,
  heroku,
  js,
  mongo,
  node,
  react,
  redux,
  sass,
  baselineAccountCircle24px,
  baselineAddCircle24px,
  baselineArrowBack24px,
  baselineClose24px,
  baselineDone24px,
  baselineEdit24px,
  baselineDeleteForever24px,
  baselineLocalDrink24px,
  baselineMoreVert24px,
  baselineSave24px,
  roundWarning24px
};

let getImage = key => imgs[key];

export default getImage;
