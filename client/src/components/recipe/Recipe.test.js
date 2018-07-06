import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import moxios from "moxios";
import Root from "../../Root";
import Recipe from "../recipe/Recipe";
import RecipeDeets from "../layout/RecipeDeets";
import Alert from "../common/Alert";

describe("When a recipe is found", () => {
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

  it("should display the recipe", done => {
    const wrapper = mount(
      <Root>
        <BrowserRouter>
          <Recipe match={{ params: { id: "12345" } }} history={{}} />
        </BrowserRouter>
      </Root>
    );

    moxios.wait(() => {
      wrapper.update();

      expect(wrapper.find(RecipeDeets).length).toEqual(1);

      done();

      wrapper.unmount();
    });
  });
});

describe("When a recipe is not found", () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest("/api/recipe/54321", {
      status: 404,
      response: { recipeError: "Sorry, we couldnt find that recipe :(" }
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should display an alert", done => {
    const wrapper = mount(
      <Root>
        <BrowserRouter>
          <Recipe match={{ params: { id: "54321" } }} history={{}} />
        </BrowserRouter>
      </Root>
    );

    moxios.wait(() => {
      wrapper.update();

      expect(wrapper.find(Alert).length).toEqual(1);

      done();

      wrapper.unmount();
    });
  });
});
