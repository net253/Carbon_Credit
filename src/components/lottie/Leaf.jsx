import React from "react";
import leaf from "./leaf.json";
import Lottie from "react-lottie";

export default function Leaf({ height, width }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: leaf,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
}
