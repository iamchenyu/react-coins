import React from "react";
import "./Coin.css";

const Coin = ({ coin }) =>
  coin ? (
    <img
      src={coin.src}
      alt={coin.alt}
      className="Coin"
      data-testid="coin-image"
    />
  ) : null;
export default Coin;
