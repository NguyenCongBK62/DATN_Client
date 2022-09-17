import {
  BankOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import "components/CompanyInfo/CompanyInfo.less";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
export default function CompanyInfo({
  companyProfile,
  buttonTitle1 = "Xem thông tin tuyển dụng",
  buttonTitle2 = "Viết đánh giá",
  buttton1CallBack,
  buttton2CallBack,
}) {
  return (
    <div className="company-info">
      <Row className="deal-job-footer-title">
        <Col span={4}>
          <img
            src={companyProfile.logo}
            style={{
              height: "150px",
              width: "150px",
              border: "1px solid black",
            }}
          />
        </Col>
        <Col span={20}>
          <Row>
            <Col span={24}>
              <div className="deal-job-footer-company-name">
                {companyProfile.name}
              </div>
              <div className="deal-job-footer-company-des">
                {companyProfile.slogan}
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col span={8}>
              <Col span={24}>
                <SettingOutlined className="deal-job-footer-content-icon" />
                {companyProfile.field}
              </Col>
              <Col span={24}>
                <TeamOutlined className="deal-job-footer-content-icon" />
                {companyProfile.memberQuantity}
              </Col>
              <Col span={24}>
                <ClockCircleOutlined className="deal-job-footer-content-icon" />
                {`${companyProfile.timeOT}h/Tháng OT`}
              </Col>
            </Col>
            <Col span={8}>
              <Col span={24}>
                <CalendarOutlined className="deal-job-footer-content-icon" />
                {`${companyProfile.workTimeStart} - ${companyProfile.workTimeEnd}`}
              </Col>
              <Col span={24}>
                <BankOutlined className="deal-job-footer-content-icon" />
                {companyProfile.address}
              </Col>
            </Col>
            <Col span={8}>
              <Col span={24}>
                <div
                  className="deal-job-footer-view-profile-company"
                  onClick={() => {
                    buttton1CallBack();
                  }}
                >
                  {buttonTitle1}
                </div>
              </Col>
              <Col span={24}>
                <div
                  className="go-post-review-page"
                  onClick={() => {
                    buttton2CallBack();
                  }}
                >
                  {buttonTitle2}
                </div>
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

CompanyInfo.propTypes = {
  companyProfle: PropTypes.object,
  buttonTitle1: PropTypes.string,
  buttonTitle2: PropTypes.string,
  buttton1CallBack: PropTypes.func,
  buttton2CallBack: PropTypes.func,
};
