import React from "react";
import { render } from "@testing-library/react";
import Coin from "./Coin";

const head = {
  side: "head",
  src: "https://tinyurl.com/react-coin-heads-jpg",
  alt: "coin head image",
};

const tail = {
  side: "tail",
  src: "https://www.pcgs.com/UserImages/71009269r.jpg",
  alt: "coin tail image",
};

it("renders the component without crashing", () => {
  render(<Coin />);
  render(<Coin coin={head} />);
  render(<Coin coin={tail} />);
});

it("matches the snapshot", () => {
  const { asFragment } = render(<Coin />);
  expect(asFragment()).toMatchSnapshot();
});

it("matches the snapshot", () => {
  const { asFragment } = render(<Coin coin={head} />);
  expect(asFragment()).toMatchSnapshot();
});

it("matches the snapshot", () => {
  const { asFragment } = render(<Coin coin={tail} />);
  expect(asFragment()).toMatchSnapshot();
});
