import { Col, Row } from "antd";
import Label from "components/Form/atoms/Label";
import SectionHeader from "components/Form/atoms/SectionHeader";
import { Input } from "components/FormControllers";
import PdfUpload from "components/FormControllers/atoms/PdfUpload";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetSelectedJob } from "Store/modules/Job";
import "./style/index.less";

function JobApplyForm({ control }) {
  const selector = useSelector;
  const selectedJob = selector(GetSelectedJob);
  const navigate = useNavigate();

  const onCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (selectedJob.id === undefined) {
      navigate("/jobs");
    }
  }, [selectedJob]);
  useEffect(() => {
    if (selectedJob.id === undefined) {
      navigate("/jobs");
    }
  }, []);
  return (
    <div className="form-wrapper">
      <Row className="form-section">
        <Col span={24}>
          <SectionHeader label={`${selectedJob.jobtitle}`} />
        </Col>

        <Col span={24} style={{ marginTop: 25 }}>
          <div className="input-group">
            <Label label={"Họ và tên"} required={false} />
            <div
              className="reservation-input-name"
              style={{ flexWrap: "wrap" }}
            >
              <div className="input-element" style={{ marginRight: 25 }}>
                <Input
                  control={control}
                  inputName="candidatefullname"
                  inputProps={{ placeholder: "Nhập thông tin" }}
                  width={"100%"}
                />
              </div>
            </div>
          </div>
        </Col>
        <Col span={24} style={{ marginTop: 25 }}>
          <div className="input-group">
            <Label label={"Số điện thoại"} required={false} />
            <div
              className="reservation-input-name"
              style={{ flexWrap: "wrap" }}
            >
              <div className="input-element" style={{ marginRight: 25 }}>
                <Input
                  control={control}
                  inputName="phone"
                  inputProps={{ placeholder: "Nhập thông tin" }}
                  width={"100%"}
                />
              </div>
            </div>
          </div>
        </Col>
        <Col span={24} style={{ marginTop: 25 }}>
          <div className="input-group">
            <Label label={"Đính kèm CV"} required={false} />
            <div
              className="reservation-input-name"
              style={{ flexWrap: "wrap" }}
            >
              <div className="input-element" style={{ marginRight: 25 }}>
                <PdfUpload control={control} inputName={"linkcv"} />
              </div>
            </div>
          </div>
        </Col>
        <Col
          span={24}
          style={{ marginTop: 25, display: "flex", justifyContent: "flex-end" }}
        >
          <button
            onClick={() => {
              onCancel();
            }}
            type="button"
            className="button button-default button-default-2"
          >
            Hủy
          </button>

          <button
            type="submit"
            className="button button-primary button-primary-2"
            style={{ marginLeft: 10 }}
          >
            Apply và gửi CV
          </button>
        </Col>
      </Row>
    </div>
  );
}

JobApplyForm.propTypes = {
  control: PropTypes.any,
};

export default JobApplyForm;
