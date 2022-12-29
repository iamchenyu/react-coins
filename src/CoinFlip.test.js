import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CoinFlip from "./CoinFlip";

beforeEach(() => {
  jest
    .spyOn(global.Math, "random")
    .mockReturnValueOnce(0.2)
    .mockReturnValueOnce(0.8)
    .mockReturnValueOnce(0.8);
});

afterEach(() => {
  jest.spyOn(global.Math, "random").mockRestore();
});

it("renders without crashing", () => {
  render(<CoinFlip />);
});

it("matches the snapshot", () => {
  const { asFragment } = render(<CoinFlip />);
  expect(asFragment()).toMatchSnapshot();
});

it("shows the start button and no coin before starting the game", () => {
  const { queryByTestId } = render(<CoinFlip />);

  // not show coin and flip button
  expect(queryByTestId("flip-the-coin")).toHaveClass("CoinFlip-hide");
  expect(queryByTestId("restart-button")).toHaveClass("CoinFlip-hide");
  expect(queryByTestId("flip-button")).toBeInTheDocument();

  fireEvent.click(queryByTestId("flip-button"));

  // show coin and flip button and hide the start button
  expect(queryByTestId("flip-the-coin")).toBeInTheDocument();
  expect(queryByTestId("restart-button")).toBeInTheDocument();
});

it("shows the correct counts and image", () => {
  const { queryByTestId } = render(<CoinFlip />);
  expect(queryByTestId("flip-count")).toHaveTextContent(0);
  expect(queryByTestId("head-count")).toHaveTextContent(0);
  expect(queryByTestId("tail-count")).toHaveTextContent(0);

  fireEvent.click(queryByTestId("flip-button"));

  expect(queryByTestId("flip-count")).toHaveTextContent(1);
  expect(queryByTestId("head-count")).toHaveTextContent(1);
  expect(queryByTestId("tail-count")).toHaveTextContent(0);
  expect(queryByTestId("coin-image")).toHaveAttribute(
    "alt",
    expect.stringContaining("head")
  );

  fireEvent.click(queryByTestId("flip-button"));

  expect(queryByTestId("flip-count")).toHaveTextContent(2);
  expect(queryByTestId("head-count")).toHaveTextContent(1);
  expect(queryByTestId("tail-count")).toHaveTextContent(1);
  expect(queryByTestId("coin-image")).toHaveAttribute(
    "alt",
    expect.stringContaining("tail")
  );

  fireEvent.click(queryByTestId("flip-button"));

  expect(queryByTestId("flip-count")).toHaveTextContent(3);
  expect(queryByTestId("head-count")).toHaveTextContent(1);
  expect(queryByTestId("tail-count")).toHaveTextContent(2);
  expect(queryByTestId("coin-image")).toHaveAttribute(
    "alt",
    expect.stringContaining("tail")
  );
});

it("restarts the game after clicking the restart button", () => {
  const { queryByTestId } = render(<CoinFlip />);
  fireEvent.click(queryByTestId("restart-button"));

  expect(queryByTestId("flip-count")).toHaveTextContent(0);
  expect(queryByTestId("head-count")).toHaveTextContent(0);
  expect(queryByTestId("tail-count")).toHaveTextContent(0);

  expect(queryByTestId("flip-the-coin")).toHaveClass("CoinFlip-hide");
  expect(queryByTestId("restart-button")).toHaveClass("CoinFlip-hide");
});
