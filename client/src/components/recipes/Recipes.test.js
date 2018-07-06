import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import moxios from "moxios";
import Root from "../../Root";
import Recipes from "../recipes/Recipes";
import Alert from "../common/Alert";

describe("When there are recipes", () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest("/api/recipe/all", {
      status: 200,
      response: [
        {
          versions: [],
          _id: "5b3a9b94584e2c1b10b1087c",
          author: "5b16e4ab641b2320ac42a26d",
          name: "The Darkness",
          style: "Black IPA",
          date: "2018-07-02T21:39:32.503Z",
          __v: 0
        },
        {
          versions: [],
          _id: "5b3a9ba4584e2c1b10b1087d",
          author: "5b16e4ab641b2320ac42a26d",
          name: "The Dankness",
          style: "Double IPA",
          date: "2018-07-02T21:39:48.122Z",
          __v: 0
        }
      ]
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should fetch and display a list of recipes", done => {
    const wrapper = mount(
      <Root>
        <BrowserRouter>
          <Recipes />
        </BrowserRouter>
      </Root>
    );

    moxios.wait(() => {
      wrapper.update();

      expect(wrapper.find(".list-group-item").length).toEqual(2);

      done();

      wrapper.unmount();
    });
  });
});

describe("When there are no recipes", () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest("/api/recipe/all", {
      status: 404,
      response: {
        recipesError:
          "Hey, there arent any recipes here yet.  Why dont you add some!"
      }
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should show an alert to add recipes", done => {
    const wrapper = mount(
      <Root>
        <BrowserRouter>
          <Recipes />
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
