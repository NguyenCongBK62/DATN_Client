import React, { useEffect, useState } from "react";
import "components/CompanyReview/CompanyReview.less";
import { Rate } from "antd";
import { useNavigate, useParams } from "react-router-dom";
export default function CompanyReview() {
  const { companyid } = useParams();
  const [listReview, setListReview] = useState([]);
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

  useEffect(() => {
    getListReview();
  }, [companyid]);

  return (
    <div className="company-review">
      <div className="company-review-header">
        <span>Review gần đây</span>
      </div>
      {listReview.length < 3
        ? listReview.map((r) => {
            return (
              <div className="review-post">
                <div className="review-post-header">
                  <span>{r.titlereview}</span>
                </div>
                <Rate allowHalf value={r.rate} count={5} disabled />
                <p>{r.contentreview}</p>
              </div>
            );
          })
        : listReview.slice(0, 3).map((r) => {
            return (
              <div className="review-post">
                <div className="review-post-header">
                  <span>{r.titlereview}</span>
                </div>
                <Rate allowHalf value={r.rate} count={5} disabled />
                <p>{r.contentreview}</p>
              </div>
            );
          })}
      <div
        className="go-to-rate-page"
        onClick={() => {
          navigate(`/companyreviewlist/${companyid}`);
        }}
      >
        Xem thêm các đánh giá khác
      </div>
    </div>
  );
}
