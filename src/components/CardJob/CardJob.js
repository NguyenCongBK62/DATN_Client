import { DollarCircleOutlined } from "@ant-design/icons";
import { Col, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSelectedJob, setSelectedJob } from "Store/modules/Job";
import "components/CardJob/CardJob.less";

const CardJob = (props) => {
  const selectedJob = useSelector(GetSelectedJob);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedJob(props.job));
  };

  const [logo, setLogo] = useState(null);

  const getCompanyProfile = async () => {
    await fetch("http://localhost:3001/users/getprofilecompany", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
      },
      body: JSON.stringify({ id: props.job.companyid }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLogo(data.logo);
      });
  };

  useEffect(() => {
    getCompanyProfile();
  }, []);

  return (
    <Row
      className={selectedJob.id === props.job.id ? "job-clicked" : "job"}
      onClick={handleClick}
    >
      <Col span={5} style={{ textAlign: "center" }}>
        {logo && (
          <img
            src={logo}
            style={{
              width: "100px",
              height: "100px",
            }}
          ></img>
        )}
      </Col>
      <Col span={14}>
        <div className="job-title">{props.job.jobtitle}</div>
        <div className="job-salary">
          <DollarCircleOutlined style={{ marginRight: "2px" }} />
          {props.job.salary}
        </div>
        <div className="skill-tag-list">
          {props.job.techSkills.map((skill) => (
            <Tag className="skill-tag">{skill}</Tag>
          ))}
        </div>
      </Col>
      <Col span={5}>
        <div className="job-state">
          <Tag color="warning" style={{ float: "right", marginRight: 0 }}>
            Hot
          </Tag>
        </div>
        <div className="job-place">{props.job.place}</div>
        <div className="job-date-up">1 phút</div>
      </Col>
    </Row>
  );
};
export default CardJob;
