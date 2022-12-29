import React, { useState } from "react";
import Coin from "./Coin";
import "./CoinFlip.css";

const choice = (arr) => {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

const CoinFlip = ({ coins }) => {
  const [side, setSide] = useState(null);
  const [headCount, setHeadCount] = useState(0);
  const [tailCount, setTailCount] = useState(0);

  const flipHandler = () => {
    const coin = choice(coins);
    setSide(coin);
    if (coin.side === "tail") {
      setTailCount(tailCount + 1);
    }
    if (coin.side === "head") {
      setHeadCount(headCount + 1);
    }
  };

  const restartHandler = () => {
    setSide(null);
    setHeadCount(0);
    setTailCount(0);
  };

  return (
    <>
      <div
        className={side ? null : "CoinFlip-hide"}
        data-testid="flip-the-coin"
      >
        <Coin coin={side} />
      </div>

      <button
        onClick={flipHandler}
        className="CoinFlip-button"
        data-testid="flip-button"
      >
        Flip Me!
      </button>

      <button
        onClick={restartHandler}
        className={side ? "CoinFlip-button" : "CoinFlip-hide"}
        data-testid="restart-button"
      >
        Restart
      </button>

      <p>
        Out of <span data-testid="flip-count">{headCount + tailCount}</span>{" "}
        flips, there have been <span data-testid="head-count">{headCount}</span>{" "}
        heads and <span data-testid="tail-count">{tailCount}</span> tails.
      </p>
    </>
  );
};

CoinFlip.defaultProps = {
  coins: [
    {
      side: "head",
      src: "https://tinyurl.com/react-coin-heads-jpg",
      alt: "coin head image",
    },
    {
      side: "tail",
      src: "https://www.pcgs.com/UserImages/71009269r.jpg",
      alt: "coin tail image",
    },
  ],
};

export default CoinFlip;
