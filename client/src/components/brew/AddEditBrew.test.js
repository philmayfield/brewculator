import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import moxios from "moxios";
import Root from "../../Root";
import AddEditBrew from "./AddEditBrew";
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
          <AddEditBrew match={{ params: { id: "12345" } }} history={{}} />
        </BrowserRouter>
      </Root>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("the brew date input", () => {
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

  describe("the brew notes input", () => {
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
          <AddEditBrew match={{ params: { id: "new" } }} history={{}} />
        </BrowserRouter>
      </Root>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should have an date input with current date and an empty text area", () => {
    const expectedDate = new Date().toISOString().substr(0, 10);
    expect(wrapper.find(Input).length).toEqual(1);
    expect(wrapper.find(TextArea).length).toEqual(1);
    expect(wrapper.find(Input).prop("value")).toEqual(expectedDate);
    expect(wrapper.find(TextArea).prop("value")).toEqual("");
  });
});

describe("The edit form", () => {
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

  it("should have a populated date input and a populated text area", done => {
    wrapper = mount(
      <Root>
        <BrowserRouter>
          <AddEditBrew match={{ params: { id: "12345" } }} history={{}} />
        </BrowserRouter>
      </Root>
    );

    moxios.wait(() => {
      wrapper.update();

      expect(wrapper.find(Input).length).toEqual(1);
      expect(wrapper.find(TextArea).length).toEqual(1);
      wrapper.find(Input, TextArea).forEach(node => {
        expect(node.prop("value")).not.toEqual("");
      });

      done();

      wrapper.unmount();
    });
  });
});
