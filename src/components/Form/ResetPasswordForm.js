import { Col, Row } from "antd";
import Label from "components/Form/atoms/Label";
import SectionHeader from "components/Form/atoms/SectionHeader";
import { Input, TextArea } from "components/FormControllers";
import RadioReview from "components/FormControllers/atoms/RadioReview";
import RateCompany from "components/FormControllers/atoms/RateCompany";
import PropTypes from "prop-types";
import "./style/index.less";

function ReviewCompanyForm({ control, companyProfile }) {
  return (
    <div className="form-wrapper">
      <Row className="form-section">
        <Col span={24}>
          <SectionHeader
            label={`${companyProfile.name}`}
            logo={companyProfile.logo}
            fontSize={23}
          />
        </Col>
        <Col span={24}>
          <span>
            Bạn chỉ mất 1 phút để hoàn thành bảng đánh giá này. <br />Ý kiến của
            bạn sẽ giúp ích rất nhiều cho cộng đồng Developer đang tìm việc.
          </span>
        </Col>

        <Col span={24} style={{ marginTop: 25 }}>
          <div className="input-group">
            <Label label={"Đánh giá tổng quát: "} required={false} />
            <div
              className="reservation-input-name"
              style={{ flexWrap: "wrap" }}
            >
              <div className="input-element" style={{ marginRight: 25 }}>
                <RateCompany control={control} inputName="rate" />
              </div>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <div className="input-group">
            <Label label={"Tiêu đề:"} required={false} />
            <div
              className="reservation-input-name"
              style={{ flexWrap: "wrap" }}
            >
              <div className="input-element" style={{ marginRight: 25 }}>
                <Input
                  control={control}
                  inputName="titlereview"
                  inputProps={{ placeholder: "Nhập thông tin" }}
                  width={"100%"}
                />
              </div>
            </div>
          </div>
        </Col>
        <Col span={24} style={{ marginTop: 25 }}>
          <div className="input-group">
            <Label label={"Nội dung đánh giá:"} required={false} />
            <div
              className="reservation-input-name"
              style={{ flexWrap: "wrap" }}
            >
              <div className="input-element" style={{ marginRight: 25 }}>
                <TextArea control={control} inputName={"contentreview"} />
              </div>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <RadioReview control={control} inputName="recomment" />
        </Col>
        <Col
          span={24}
          style={{ marginTop: 25, display: "flex", justifyContent: "flex-end" }}
        >
          <button
            type="submit"
            className="button button-primary button-primary-2"
            style={{ marginLeft: 10 }}
          >
            Đánh giá
          </button>
        </Col>
      </Row>
    </div>
  );
}

ReviewCompanyForm.propTypes = {
  control: PropTypes.any,
  companyProfile: PropTypes.object,
};

export default ReviewCompanyForm;
