import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { shallow } from "enzyme";
import Root from "../Root";
import App from "../App";
import Header from "../components/layout/Header";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<App />);
});

it("shows the layout components", () => {
  expect(wrapper.find(Header).length).toEqual(1);
});
it("is connected to the store", () => {
  expect(wrapper.find(Root).length).toEqual(1);
});
it("has router components", () => {
  expect(wrapper.find(BrowserRouter).length).toEqual(1);
  expect(wrapper.find(Route).length).toBeGreaterThan(0);
});
