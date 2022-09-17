import React from "react";
import PropTypes from "prop-types";
import { Col, Rate, Row } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
export default function Review({ review }) {
  return (
    <Row>
      <Col span={24}>
        <span style={{ fontSize: 23, fontWeight: "bold" }}>
          {review.titlereview}
        </span>
      </Col>

      <Col span={7}>
        <Rate
          allowHalf
          value={review.rate}
          count={5}
          style={{ fontSize: 15 }}
        />
      </Col>

      <Col span={7}>
        {review.recomment === 1 ? (
          <span>
            <LikeOutlined style={{ color: "green", fontSize: 20 }} /> Khuyến
            khích
          </span>
        ) : (
          <span>
            <DislikeOutlined style={{ color: "red", fontSize: 20 }} /> Không
            khuyến khích
          </span>
        )}
      </Col>

      <Col span={24} style={{ marginTop: 10, fontSize: 16 }}>
        <p>{review.contentreview}</p>
      </Col>
    </Row>
  );
}

Review.propTypes = {
  review: PropTypes.object,
};
