import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import moxios from "moxios";
import Root from "../../Root";
import AddEditVersion from "./AddEditVersion";
import Input from "../common/Input";
import TextArea from "../common/TextArea";

let wrapper;
const testText = "asdf";

describe("The inputs", () => {
  beforeEach(() => {
    wrapper = mount(
      <Root>
        <BrowserRouter>
          <AddEditVersion match={{ params: { id: "12345" } }} history={{}} />
        </BrowserRouter>
      </Root>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("the version input", () => {
    it("should update when typed into", () => {
      wrapper.find("#input-version").simulate("change", {
        target: {
          name: "version",
          value: testText
        }
      });
      wrapper.update();
      expect(wrapper.find("#input-version").prop("value")).toEqual(testText);
    });
  });

  describe("the notes input", () => {
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
          <AddEditVersion match={{ params: { id: "new" } }} history={{}} />
        </BrowserRouter>
      </Root>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should have an empty text input and an empty text area", () => {
    expect(wrapper.find(Input).length).toEqual(1);
    expect(wrapper.find(TextArea).length).toEqual(1);
    wrapper.find(Input, TextArea).forEach(node => {
      expect(node.prop("value")).toEqual("");
    });
  });
});

describe("The edit form", () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest("/api/version/12345", {
      status: 200,
      response: {
        brews: [],
        _id: "12345",
        recipe: "5b3a9b94584e2c1b10b1087c",
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

  it("should have a populated text input and a populated text area", done => {
    wrapper = mount(
      <Root>
        <BrowserRouter>
          <AddEditVersion match={{ params: { id: "12345" } }} history={{}} />
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
