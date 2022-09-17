import React from "react";
import PropTypes from "prop-types";
import "components/CompanyDescription/CompanyDescription.less";
export default function CompanyDescription({ companyProfile }) {
  return (
    <div
      className="company-description"
      dangerouslySetInnerHTML={{ __html: companyProfile.description }}
    ></div>
  );
}

CompanyDescription.propTypes = {
  companyProfile: PropTypes.object,
};
