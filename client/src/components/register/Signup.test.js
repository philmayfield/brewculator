import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import Root from "../../Root";
import Signup from "./Signup";

let wrapper;
const testText = "asdf";

beforeEach(() => {
  wrapper = mount(
    <Root>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </Root>
  );
});

afterEach(() => {
  wrapper.unmount();
});

describe("username input", () => {
  it("should update when typed into", () => {
    wrapper.find("#input-username").simulate("change", {
      target: {
        name: "username",
        value: testText
      }
    });
    wrapper.update();
    expect(wrapper.find("#input-username").prop("value")).toEqual(testText);
  });
});

describe("password input", () => {
  it("should update when typed into", () => {
    wrapper.find("#input-password").simulate("change", {
      target: {
        name: "password",
        value: testText
      }
    });
    wrapper.update();
    expect(wrapper.find("#input-password").prop("value")).toEqual(testText);
  });
});
