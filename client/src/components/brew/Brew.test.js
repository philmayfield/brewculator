import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import moxios from "moxios";
import Root from "../../Root";
import Brew from "./Brew";
import RecipeDeets from "../layout/RecipeDeets";
import Alert from "../common/Alert";

describe("When a brew is found", () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest("/api/brew/12345", {
      status: 200,
      response: {
        gravities: [],
        _id: "12345",
        version: "5b3a9c1e584e2c1b10b10882",
        date: "2018-07-03T00:00:00.000Z",
        notes: "",
        __v: 0
      }
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should display the brew", done => {
    const wrapper = mount(
      <Root>
        <BrowserRouter>
          <Brew match={{ params: { id: "12345" } }} history={{}} />
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

describe("When a brew is not found", () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest("/api/brew/54321", {
      status: 404,
      response: { noBrew: "Sorry, we couldnt find that version brew :(" }
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should display an alert", done => {
    const wrapper = mount(
      <Root>
        <BrowserRouter>
          <Brew match={{ params: { id: "54321" } }} history={{}} />
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
