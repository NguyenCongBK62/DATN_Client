import { Card } from "antd";
import "components/CardCompany/CardCompany.less";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function CardCompany({ company }) {
  const [job, setJob] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/users/job/${company.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setJob(data);
      });
  }, []);
  const navigate = useNavigate();
  return (
    <Card
      hoverable
      style={{ margin: "1rem", textAlign: "center" }}
      cover={
        <img
          alt="example"
          src={company.logo}
          className="logo-card"
          onClick={() => {
            navigate(`/companyprofile/${company.id}`);
          }}
        />
      }
    >
      <div className="company-name">{company.name}</div>
      <div className="job-suggestion">
        <Link to={`/jobs/${company.id}`}>
          <div className="highlight" style={{ zIndex: 1 }}>
            {job.length} Việc làm
          </div>{" "}
          - {company.address}
        </Link>
      </div>
    </Card>
    // </Link>
  );
}

CardCompany.propTypes = {
  company: PropTypes.object,
};
