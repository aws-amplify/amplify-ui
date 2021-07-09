import React from "react";
import { IconProps } from "../types";

const defaultViewBox = { minX: 0, minY: 0, width: 24, height: 24 };
export const Icon: React.FC<IconProps> = props => {
  const {
    ariaLabel,
    pathData,
    fill = "currentColor",
    viewBox = defaultViewBox,
    size = "medium",
  } = props;

  const minX = viewBox.minX ? viewBox.minX : defaultViewBox.minX;
  const minY = viewBox.minY ? viewBox.minY : defaultViewBox.minY;
  const width = viewBox.width ? viewBox.width : defaultViewBox.width;
  const height = viewBox.height ? viewBox.height : defaultViewBox.height;
  return (
    <svg
      viewBox={`${minX} ${minY} ${width} ${height}`}
      aria-label={ariaLabel}
      data-size={size}
    >
      <path d={pathData} fill={fill}></path>
    </svg>
  );
};
