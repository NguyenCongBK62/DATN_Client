import React from "react";
import PropTypes from "prop-types";
import { Divider } from "antd";

function SectionHeader({ label, logo, fontSize }) {
  return (
    <div className="form-section-header">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {fontSize !== undefined ? (
          <h2 style={{ fontSize: fontSize }}>
            Đánh giá <br /> {label}
          </h2>
        ) : (
          <h2>{label}</h2>
        )}

        {logo && <img src={logo} width={80} height={80} />}
      </div>
      <Divider style={{ background: "#D8D8D8", marginTop: 10 }} />
    </div>
  );
}

SectionHeader.propTypes = {
  label: PropTypes.string.isRequired,
  logo: PropTypes.string,
  fontSize: PropTypes.number,
};

export default SectionHeader;
