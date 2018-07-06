import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import Root from "../../Root";
import RecipeList from "./RecipeList";
import ItemListItem from "../common/ItemListItem";

let wrapper;

beforeEach(() => {
  const recipes = [
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
  ];

  wrapper = mount(
    <Root>
      <BrowserRouter>
        <RecipeList recipes={recipes} />
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
