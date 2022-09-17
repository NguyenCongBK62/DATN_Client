import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import CardCompany from "components/CardCompany/CardCompany";
import "components/Landing/Landing.less";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [companys, setCompanys] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    let listCompany = await fetch(
      "http://localhost:3001/users/getLisCompanySearch",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          return data.data;
        } else {
          return [];
        }
      });
    await listCompany.sort((a, b) => {
      return b.rate - a.rate;
    });
    await setCompanys(listCompany);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="landing-content">
      <h1 className="landing-content-title">Nhà tuyển dụng hàng đầu</h1>
      <div className="site-card-wrapper">
        <Row gutter={3} justify="space-around">
          {companys.map((company, index) => {
            if (index < 6) {
              return (
                <Col xs={24} xl={7}>
                  <CardCompany company={company} />
                </Col>
              );
            }
          })}
        </Row>
      </div>
      <div style={{ width: "100%", textAlign: "center" }}>
        <button
          className="button button-primary button-primary-2"
          style={{ margin: "auto" }}
          onClick={() => {
            navigate("/CompanyList");
          }}
        >
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export default Landing;
