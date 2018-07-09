import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import moxios from "moxios";
import Root from "../../Root";
import AddEditRecipe from "./AddEditRecipe";
import Input from "../common/Input";

let wrapper;
const testText = "asdf";

describe("The inputs", () => {
  beforeEach(() => {
    wrapper = mount(
      <Root>
        <BrowserRouter>
          <AddEditRecipe test={true} testId={"new"} />
        </BrowserRouter>
      </Root>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("the name input", () => {
    it("should update when typed into", () => {
      wrapper.find("#input-name").simulate("change", {
        target: {
          name: "name",
          value: testText
        }
      });
      wrapper.update();
      expect(wrapper.find("#input-name").prop("value")).toEqual(testText);
    });
  });

  describe("the style input", () => {
    it("should update when typed into", () => {
      wrapper.find("#input-style").simulate("change", {
        target: {
          name: "style",
          value: testText
        }
      });
      wrapper.update();
      expect(wrapper.find("#input-style").prop("value")).toEqual(testText);
    });
  });
});

describe("The new form", () => {
  beforeEach(() => {
    wrapper = mount(
      <Root>
        <BrowserRouter>
          <AddEditRecipe test={true} testId={"new"} />
        </BrowserRouter>
      </Root>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should have two empty text inputs", () => {
    expect(wrapper.find(Input).length).toEqual(2);
    wrapper.find(Input).forEach(node => {
      expect(node.prop("value")).toEqual("");
    });
  });
});

describe("The edit form", () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest("/api/recipe/12345", {
      status: 200,
      response: {
        versions: [],
        _id: "12345",
        author: "5b16e4ab641b2320ac42a26d",
        name: "The Darkness",
        style: "Black IPA",
        date: "2018-07-02T21:39:32.503Z",
        __v: 0
      }
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should have two populated text inputs", done => {
    wrapper = mount(
      <Root>
        <BrowserRouter>
          <AddEditRecipe test={true} testId={"12345"} />
        </BrowserRouter>
      </Root>
    );

    moxios.wait(() => {
      wrapper.update();

      expect(wrapper.find(Input).length).toEqual(2);
      wrapper.find(Input).forEach(node => {
        expect(node.prop("value")).not.toEqual("");
      });

      done();

      wrapper.unmount();
    });
  });
});
