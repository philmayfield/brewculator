import "jest-localstorage-mock";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

global.Promise = require.requireActual("promise");

if (!global.SVGSVGElement && global.HTMLUnknownElement) {
  global.SVGSVGElement = global.HTMLUnknownElement;
}
