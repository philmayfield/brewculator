import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import Root from "../../Root";
import BrewList from "./BrewList";
import ItemListItem from "../common/ItemListItem";

let wrapper;

beforeEach(() => {
  const brews = [
    {
      gravities: [],
      _id: "5b3ac2d5dbc52830e8460ed6",
      version: "5b3a9c1e584e2c1b10b10882",
      date: "2018-07-03T00:00:00.000Z",
      notes: "",
      __v: 0
    },
    {
      gravities: [],
      _id: "5b3aa85dab75262d6434791f",
      version: "5b3a9c1e584e2c1b10b10882",
      date: "2018-06-01T00:00:00.000Z",
      notes: "",
      __v: 0
    }
  ];

  wrapper = mount(
    <Root>
      <BrowserRouter>
        <BrewList brews={brews} />
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
