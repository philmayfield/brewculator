import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import Root from "../../Root";
import GravityList from "./GravityList";
import ItemListItem from "../common/ItemListItem";

let wrapper;

beforeEach(() => {
  const gravities = [
    {
      _id: "5b3ac2dddbc52830e8460ed7",
      brew: "5b3ac2d5dbc52830e8460ed6",
      date: "2018-07-03T00:00:00.000Z",
      brix: 15,
      temp: 70,
      notes: "",
      __v: 0
    },
    {
      _id: "5b3ac305dbc52830e8460ed8",
      brew: "5b3ac2d5dbc52830e8460ed6",
      date: "2018-07-03T00:00:00.000Z",
      brix: 8.3,
      temp: null,
      notes: "",
      __v: 0
    },
    {
      _id: "5b3ac311dbc52830e8460ed9",
      brew: "5b3ac2d5dbc52830e8460ed6",
      date: "2018-07-03T00:00:00.000Z",
      brix: 4,
      temp: 77,
      notes: "",
      __v: 0
    }
  ];

  wrapper = mount(
    <Root>
      <BrowserRouter>
        <GravityList gravities={gravities} />
      </BrowserRouter>
    </Root>
  );
});

afterEach(() => {
  wrapper.unmount();
});

it("should create one ItemListItem component per recipe", () => {
  expect(wrapper.find(ItemListItem).length).toEqual(3);
});
