import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import CardCompany from "components/CardCompany/CardCompany";
import "containers/CompanyList/CompanyList.less";
import { Pagination } from "antd";

const CompanyList = () => {
  const [companys, setCompanys] = useState([]);

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

  const [statePagination, setStatePagination] = useState({
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
  });

  useEffect(() => {
    setStatePagination({
      totalPage: companys.length / 6,
      minIndex: 0,
      maxIndex: 6,
    });
  }, [companys]);

  const handleChange = (page) => {
    setStatePagination({
      current: page,
      minIndex: (page - 1) * 6,
      maxIndex: page * 6,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="landing-content">
      <h1 className="landing-content-title">Nhà tuyển dụng hàng đầu</h1>
      <div className="site-card-wrapper">
        <Row gutter={3} justify="space-around">
          {companys.map(
            (company, index) =>
              index >= statePagination.minIndex &&
              index < statePagination.maxIndex && (
                <Col xs={24} xl={7}>
                  <CardCompany company={company} />
                </Col>
              ),
          )}
        </Row>
      </div>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Pagination
          pageSize={6}
          current={statePagination.current}
          total={companys.length}
          onChange={handleChange}
          style={{
            textAlign: "center",
            marginTop: "1rem",
            marginBottom: "3rem",
          }}
        />
      </div>
    </div>
  );
};

export default CompanyList;
