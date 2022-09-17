import { Col, Progress, Rate, Row } from "antd";
import "components/CompanyRate/CompanyRate.less";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CompanyRate() {
  const { companyid } = useParams();
  const [listReview, setListReview] = useState([]);
  const [rate, setRate] = useState(0);
  const [recommentPercent, setRecommentPercent] = useState(0);
  const navigate = useNavigate();
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
    getListReview();
  }, [companyid]);

  useEffect(() => {
    setRate(getRate());
    setRecommentPercent(getRecommentPercent());
  }, [listReview]);

  return (
    <div className="company-rate">
      <div className="rate">
        <span>Điểm đánh giá doanh nghiệp</span>
        <Row>
          <Col span={20}>
            <Rate allowHalf value={rate} count={5} disabled />
          </Col>
          <Col span={4}>
            <span>{rate.toFixed(1)}</span>
          </Col>
        </Row>
      </div>
      <div className="recoment">
        <Row>
          <Col span={10}>
            <Progress type="circle" percent={recommentPercent} />
          </Col>
          <Col span={14} style={{ display: "flex", alignItems: "center" }}>
            <span>Khuyến khích làm việc tại đây</span>
          </Col>
        </Row>
      </div>
      <div
        className="go-to-rate-page"
        onClick={() => {
          navigate(`/postreviewcompany/${companyid}`);
        }}
      >
        Viết đánh giá doanh nghiệp
      </div>
    </div>
  );
}
