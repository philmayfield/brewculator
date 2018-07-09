import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import Root from "../../Root";
import VersionList from "./VersionList";
import ItemListItem from "../common/ItemListItem";

let wrapper;

beforeEach(() => {
  const versions = [
    {
      brews: [],
      _id: "5b3a9c1e584e2c1b10b10882",
      recipe: "5b3a9b94584e2c1b10b1087c",
      version: "1.0",
      notes: "First attempt",
      date: "2018-07-02T21:41:50.061Z",
      __v: 0
    },
    {
      brews: [],
      _id: "5b3feed53228801228e3bdf5",
      recipe: "5b3a9b94584e2c1b10b1087c",
      version: "2.0",
      notes: "Changed Simcoe to Mosaic",
      date: "2018-07-06T22:36:05.792Z",
      __v: 0
    }
  ];

  wrapper = mount(
    <Root>
      <BrowserRouter>
        <VersionList versions={versions} />
      </BrowserRouter>
    </Root>
  );
});

afterEach(() => {
  wrapper.unmount();
});

it("should create one ItemListItem component per recipe", () => {
  expect(wrapper.find(ItemListItem).length).toEqual(2);
});
