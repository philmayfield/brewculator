import logo from "../img/logo.svg";
import baselineClose24px from "../img/baseline-close-24px.svg";
import baselineEdit24px from "../img/baseline-edit-24px.svg";
import baselineDeleteForever24px from "../img/baseline-delete_forever-24px.svg";

let imgs = {
  logo,
  baselineClose24px,
  baselineEdit24px,
  baselineDeleteForever24px
};

let getImage = key => imgs[key];

export default getImage;
