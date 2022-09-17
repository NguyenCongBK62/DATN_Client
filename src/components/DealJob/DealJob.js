import React, { useEffect, useState } from "react";
import "components/DealJob/DealJob.less";
import { Col, Row, Tag } from "antd";
import {
  DollarCircleOutlined,
  ScheduleOutlined,
  EnvironmentOutlined,
  SettingOutlined,
  CalendarOutlined,
  TeamOutlined,
  BankOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetSelectedJob } from "../../Store/modules/Job";
import { setToastStatus } from "Store/modules/AlertToast";

const DealJob = () => {
  const navigate = useNavigate();
  const [companyProfile, setCompanyProfile] = useState();
  const selectedJob = useSelector(GetSelectedJob);
  const dispatch = useDispatch();
  const getProfileCompany = async () => {
    if (selectedJob !== undefined) {
      await fetch("http://localhost:3001/users/getprofilecompany", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        },
        body: JSON.stringify({ id: selectedJob.companyid }),
      })
        .then((response) => response.json())
        .then((data) => {
          setCompanyProfile(data);
        });
    }
  };

  useEffect(() => {
    getProfileCompany();
  }, [selectedJob]);

  return companyProfile !== undefined && selectedJob !== undefined ? (
    <div className="deal-job">
      <div className="deal-job-title">
        <div className="deal-job-title-name">{selectedJob.jobtitle}</div>
        <div className="deal-job-title-company">{companyProfile.name}</div>
        <div className="deal-job-title-apply">
          <button className="apply-button">
            <Link
              to="/jobapply"
              style={{
                textDecoration: "none",
                color: "white",
                display: "block",
              }}
            >
              Apply Now
            </Link>
          </button>
        </div>
      </div>
      <div className="deal-job-content">
        <div className="skill-tag-list">
          {selectedJob.techSkills.map((skill) => (
            <Tag className="skill-tag">{skill}</Tag>
          ))}
        </div>
        <div className="skill-tag-list">
          {selectedJob.languageSkills.map((skill) => (
            <Tag className="skill-tag">{skill}</Tag>
          ))}
        </div>
        <div className="skill-tag-list">
          {selectedJob.position.map((skill) => (
            <Tag className="skill-tag">{skill}</Tag>
          ))}
        </div>
        <div className="deal-job-salary">
          <DollarCircleOutlined style={{ marginRight: "5px" }} />
          {selectedJob.salary}
        </div>
        <div className="deal-job-place">
          <EnvironmentOutlined style={{ marginRight: "5px" }} />
          {companyProfile.address}
        </div>
        <div className="deal-job-time">
          <ScheduleOutlined style={{ marginRight: "5px" }} />1 phút
        </div>
        <div className="deal-job-reason">
          <div
            dangerouslySetInnerHTML={{ __html: selectedJob.jobdesrciption }}
          />
        </div>
      </div>
      <div className="deal-job-footer">
        <Row className="deal-job-footer-title">
          <Col span={3}>
            <img
              src={companyProfile.logo}
              style={{
                height: "65px",
                width: "65px",
                border: "1px solid black",
              }}
            />
          </Col>
          <Col span={21}>
            <div className="deal-job-footer-company-name">
              {companyProfile.name}
            </div>
            <div className="deal-job-footer-company-des">
              {companyProfile.slogan}
            </div>
          </Col>
        </Row>
        <Row className="deal-job-footer-content">
          <Col span={16}>
            <Row>
              <Col span={12}>
                <SettingOutlined className="deal-job-footer-content-icon" />
                {companyProfile.field}
              </Col>
              <Col span={12}>
                <TeamOutlined className="deal-job-footer-content-icon" />
                {companyProfile.memberQuantity}
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <CalendarOutlined className="deal-job-footer-content-icon" />
                {`${companyProfile.workTimeStart} - ${companyProfile.workTimeEnd}`}
              </Col>
              <Col span={12}>
                <BankOutlined className="deal-job-footer-content-icon" />
                {companyProfile.address}
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <ClockCircleOutlined className="deal-job-footer-content-icon" />
                {`${companyProfile.timeOT}h/Tháng OT`}
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <div
              className="deal-job-footer-view-profile-company"
              onClick={() => {
                navigate(`/companyprofile/${companyProfile.id}`);
              }}
            >
              View profile company
            </div>
          </Col>
        </Row>
      </div>
    </div>
  ) : null;
};

export default DealJob;
