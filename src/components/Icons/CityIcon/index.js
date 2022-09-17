import React from "react";
import { PropTypes } from "prop-types";

export default function CityIcon({
  width,
  height,
  customeStyles,
  stroke = "white",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={customeStyles}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M4 6.143v12.824l5.065-2.17 6 3L20 17.68V4.857l1.303-.558a.5.5 0 0 1 .697.46V19l-7 3-6-3-6.303 2.701a.5.5 0 0 1-.697-.46V7l2-.857zm12.243 5.1L12 15.485l-4.243-4.242a6 6 0 1 1 8.486 0zM12 12.657l2.828-2.829a4 4 0 1 0-5.656 0L12 12.657z" />
    </svg>
  );
}

CityIcon.defaultProps = {
  width: "14",
  height: "14",
  customeStyles: {},
};

CityIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  customeStyles: PropTypes.object,
};
