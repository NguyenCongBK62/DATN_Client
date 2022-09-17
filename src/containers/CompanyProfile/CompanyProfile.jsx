import { Col, Row } from "antd";
import CompanyInfo from "components/CompanyInfo/CompanyInfo";
import CompanyRate from "components/CompanyRate/CompanyRate";
import CompanyReview from "components/CompanyReview/CompanyReview";
import "containers/CompanyProfile/CompanyProfile.less";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompanyDescription from "../../components/CompanyDescription/CompanyDescription";

export default function CompanyProfile() {
  const { companyid } = useParams();
  const navigate = useNavigate();
  const [companyProfile, setCompanyProfile] = useState();

  const getData = async () => {
    let company = await fetch("http://localhost:3001/users/getprofilecompany", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
      },
      body: JSON.stringify({ id: companyid }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    setCompanyProfile(company);
  };

  useEffect(() => {
    getData();
  }, [companyid]);

  if (companyProfile === undefined) {
    return null;
  }
  return (
    <div className="company-info-container">
      <Row style={{ height: "100%" }}>
        <Col span={24}>
          <CompanyInfo
            companyProfile={companyProfile}
            buttton2CallBack={() => {
              navigate(`/postreviewcompany/${companyid}`);
            }}
            buttton1CallBack={() => {
              navigate(`/jobs/${companyid}`);
            }}
          />
        </Col>

        <Col span={16} style={{ marginTop: "30px" }}>
          <CompanyDescription companyProfile={companyProfile} />
        </Col>

        <Col span={8} style={{ marginTop: "30px" }}>
          <Row>
            <Col offset={1} span={23}>
              <CompanyRate companyProfile={companyProfile} />
            </Col>
          </Row>
          <Row style={{ marginTop: "30px" }}>
            <Col offset={1} span={23}>
              <CompanyReview companyProfile={companyProfile} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
