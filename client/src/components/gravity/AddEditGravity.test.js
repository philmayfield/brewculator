import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import moxios from "moxios";
import Root from "../../Root";
import AddEditGravity from "./AddEditGravity";
import Input from "../common/Input";
import TextArea from "../common/TextArea";

let wrapper;
const testDate = "2018-01-01";
const testText = "asdf";

describe("The inputs", () => {
  beforeEach(() => {
    wrapper = mount(
      <Root>
        <BrowserRouter>
          <AddEditGravity match={{ params: { id: "12345" } }} history={{}} />
        </BrowserRouter>
      </Root>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("the gravity date input", () => {
    it("should update when typed into", () => {
      wrapper.find("#input-date").simulate("change", {
        target: {
          name: "date",
          value: testDate
        }
      });
      wrapper.update();
      expect(wrapper.find("#input-date").prop("value")).toEqual(testDate);
    });
  });

  describe("the refractometer reading input", () => {
    it("should update when typed into", () => {
      wrapper.find("#input-brix").simulate("change", {
        target: {
          name: "brix",
          value: testText
        }
      });
      wrapper.update();
      expect(wrapper.find("#input-brix").prop("value")).toEqual(testText);
    });
  });

  describe("the temperature reading input", () => {
    it("should update when typed into", () => {
      wrapper.find("#input-temp").simulate("change", {
        target: {
          name: "temp",
          value: testText
        }
      });
      wrapper.update();
      expect(wrapper.find("#input-temp").prop("value")).toEqual(testText);
    });
  });

  describe("the gravity notes input", () => {
    it("should update when typed into", () => {
      wrapper.find("#textarea-notes").simulate("change", {
        target: {
          name: "notes",
          value: testText
        }
      });
      wrapper.update();
      expect(wrapper.find("#textarea-notes").prop("value")).toEqual(testText);
    });
  });
});

describe("The new form", () => {
  beforeEach(() => {
    wrapper = mount(
      <Root>
        <BrowserRouter>
          <AddEditGravity match={{ params: { id: "new" } }} history={{}} />
        </BrowserRouter>
      </Root>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should have an date input with current date, two empty text inputs, and an empty text area", () => {
    const expectedDate = new Date().toISOString().substr(0, 10);
    expect(wrapper.find(Input).length).toEqual(3);
    expect(wrapper.find(TextArea).length).toEqual(1);
    expect(wrapper.find("#input-date").prop("value")).toEqual(expectedDate);
    wrapper.find("#input-brix", "#input-temp").forEach(node => {
      expect(node.prop("value")).toEqual("");
    });
    expect(wrapper.find(TextArea).prop("value")).toEqual("");
  });
});

describe("The edit form", () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest("/api/gravity/12345", {
      status: 200,
      response: {
        _id: "12345",
        brew: "5b3ac2d5dbc52830e8460ed6",
        date: "2018-07-03T00:00:00.000Z",
        brix: 15,
        temp: 70,
        notes: "Whatever",
        __v: 0
      }
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should have populated date, brix, temp, and notes", done => {
    wrapper = mount(
      <Root>
        <BrowserRouter>
          <AddEditGravity match={{ params: { id: "12345" } }} history={{}} />
        </BrowserRouter>
      </Root>
    );

    moxios.wait(() => {
      wrapper.update();

      expect(wrapper.find(Input).length).toEqual(3);
      expect(wrapper.find(TextArea).length).toEqual(1);

      wrapper.find(Input, TextArea).forEach(node => {
        expect(node.prop("value")).not.toEqual("");
      });

      done();

      wrapper.unmount();
    });
  });
});
