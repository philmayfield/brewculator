import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import moxios from "moxios";
import Root from "../../Root";
import Version from "../version/Version";
import RecipeDeets from "../layout/RecipeDeets";
import Alert from "../common/Alert";

describe("When a version is found", () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest("/api/version/54321", {
      status: 200,
      response: {
        brews: [],
        _id: "54321",
        recipe: "12345",
        version: "1.0",
        notes: "First attempt",
        date: "2018-07-02T21:41:50.061Z",
        __v: 0
      }
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should display the version", done => {
    const wrapper = mount(
      <Root>
        <BrowserRouter>
          <Version match={{ params: { id: "54321" } }} history={{}} />
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

describe("When a version is not found", () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest("/api/version/54321", {
      status: 404,
      response: { noVersion: "Sorry, we couldnt find that recipe version :(" }
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should display an alert", done => {
    const wrapper = mount(
      <Root>
        <BrowserRouter>
          <Version match={{ params: { id: "54321" } }} history={{}} />
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
