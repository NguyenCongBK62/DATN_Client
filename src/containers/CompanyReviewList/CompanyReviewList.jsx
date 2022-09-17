import { Col, Divider, Pagination, Progress, Rate, Row } from "antd";
import CompanyInfo from "components/CompanyInfo/CompanyInfo";
import Review from "components/Review/Review";
import "containers/CompanyReviewList/CompanyReviewList.less";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function CompanyReviewList() {
  const { companyid } = useParams();
  const [statePagination, setStatePagination] = useState({
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
  });
  const [companyProfile, setCompanyProfile] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3001/users/getprofilecompany", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
      },
      body: JSON.stringify({ id: companyid }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCompanyProfile(data);
      });
  }, []);
  const [listReview, setListReview] = useState([]);
  const [rate, setRate] = useState(0);
  const [recommentPercent, setRecommentPercent] = useState(0);
  const getListReview = async () => {
    let reviews = await fetch(
      `http://localhost:3001/users/listreview/${companyid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        return data.data;
      });
    await setListReview(reviews);
  };

  const getRate = () => {
    if (listReview.length !== 0) {
      let sum = listReview.reduce((partialSum, l) => partialSum + l.rate, 0);
      return sum / listReview.length;
    } else return 0;
  };

  const getRecommentPercent = () => {
    let sumRecomment = 0;
    listReview.forEach((r) => {
      if (r.recomment === 1) sumRecomment += 1;
    });
    return ((sumRecomment / listReview.length) * 100).toFixed(1);
  };

  useEffect(() => {
    setStatePagination({
      totalPage: listReview.length / 6,
      minIndex: 0,
      maxIndex: 6,
    });
  }, [listReview]);

  const handleChange = (page) => {
    setStatePagination({
      current: page,
      minIndex: (page - 1) * 6,
      maxIndex: page * 6,
    });
  };

  useEffect(() => {
    getListReview();
  }, []);

  useEffect(() => {
    setRate(getRate());
    setRecommentPercent(getRecommentPercent());
  }, [listReview]);

  if (companyProfile === undefined) {
    return null;
  }
  return (
    <div className="company-review-container">
      <Row style={{ height: "100%" }}>
        <Col span={24}>
          <CompanyInfo
            companyProfile={companyProfile}
            buttonTitle1={"Xem thông tin doanh nghiệp"}
            buttton1CallBack={() => {
              navigate(`/companyprofile/${companyid}`);
            }}
            buttton2CallBack={() => {
              navigate(`/postreviewcompany/${companyid}`);
            }}
          />
        </Col>

        <Col span={24} style={{ marginTop: "30px" }}>
          <Col
            span={24}
            style={{
              padding: "20px",
              backgroundColor: "#ffffff",
              border: "1px solid #ccc",
              borderRadius: "2px",
            }}
          >
            <Row>
              <Col span={24}>
                <Row style={{ alignItems: "center" }}>
                  <Col span={12}>
                    <Row style={{ alignItems: "center" }}>
                      <Col span={5}>
                        <span style={{ fontSize: 23 }}>{rate.toFixed(1)}</span>
                      </Col>
                      <Col span={19}>
                        <Rate
                          allowHalf
                          value={rate}
                          count={5}
                          style={{ fontSize: 30 }}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <Col span={10}>
                        <Progress type="circle" percent={recommentPercent} />
                      </Col>
                      <Col
                        span={14}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: 23,
                        }}
                      >
                        <span>Khuyến khích làm việc tại đây</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col
            span={24}
            style={{
              padding: "20px",
              backgroundColor: "#ffffff",
              border: "1px solid #ccc",
              borderRadius: "2px",
              marginTop: 20,
            }}
          >
            <span style={{ fontSize: 23 }}>{listReview.length} Reviews</span>
            <Divider style={{ background: "#D8D8D8", marginTop: 10 }} />
            <Row>
              {listReview.map((r) => (
                <Col span={24}>
                  <Review review={r} />
                  <Divider style={{ background: "#D8D8D8", marginTop: 10 }} />
                </Col>
              ))}
            </Row>
            <Pagination
              pageSize={6}
              current={statePagination.current}
              total={listReview.length}
              onChange={handleChange}
              style={{
                textAlign: "center",
                marginTop: "3rem",
                marginBottom: "3rem",
              }}
            />
          </Col>
        </Col>
      </Row>
    </div>
  );
}
