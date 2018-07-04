import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import Root from "../../Root";
import Login from "./Login";

let wrapper;
const testText = "asdf";

beforeEach(() => {
  console.log("before .............");
  wrapper = mount(
    <Root>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Root>
  );
});

afterEach(() => {
  console.log("after .............");
  wrapper.unmount();
});

it("has a username and password input field", () => {
  console.log("<<<<<<<<<<", wrapper.find("input"));
  expect(wrapper.find("input").length).toEqual(2);
});

it("should be there", () => {
  console.log(">>>>>>>>>>", wrapper.find("input"));
  expect(wrapper.find("input").length).toEqual(2);
});
