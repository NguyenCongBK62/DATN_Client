import React from "react";
import PropTypes from "prop-types";
import { STROKE } from "constant";

export default function MessageSquareIcon({
  width,
  height,
  customStyles,
  stroke = STROKE,
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={customStyles}
    >
      <path
        d="M15.75 11.25C15.75 11.6478 15.592 12.0294 15.3107 12.3107C15.0294 12.592 14.6478 12.75 14.25 12.75H5.25L2.25 15.75V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H14.25C14.6478 2.25 15.0294 2.40804 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75V11.25Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

MessageSquareIcon.defaultProps = {
  width: "18",
  height: "18",
  customStyles: {},
};

MessageSquareIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  customStyles: PropTypes.object,
  stroke: PropTypes.string,
};