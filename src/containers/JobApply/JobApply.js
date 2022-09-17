import { Col, Row } from "antd";
import JobApplyForm from "components/Form/JobApplyForm";
import "containers/JobApply/JobApply.less";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToastStatus } from "Store/modules/AlertToast";
import { GetSelectedJob } from "Store/modules/Job";

const JobApply = () => {
  const methods = useForm({
    mode: "onSubmit",
  });
  const selector = useSelector;
  const dispatch = useDispatch();
  const { handleSubmit, control, setValue, watch } = methods;
  const jobSelected = selector(GetSelectedJob);
  const [applyInfo, setApplyInfo] = useState({});
  const token = localStorage.getItem("Authorization");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.candidatefullname === "" || data.candidatefullname === undefined) {
      dispatch(setToastStatus({ value: 0, mess: "Mời nhập họ tên đầy đủ!" }));
      return false;
    }
    if (data.phone === "" || data.phone === undefined) {
      dispatch(
        setToastStatus({ value: 0, mess: "Mời nhập số điện thoại liên lạc!" }),
      );
      return false;
    }
    if (data.linkcv === "" || data.linkcv === undefined) {
      dispatch(setToastStatus({ value: 0, mess: "Mời nhập CV!" }));
      return false;
    }
    let jobid = jobSelected.id;
    data = { ...data, token, jobid };
    await fetch("http://localhost:3001/users/applyjob", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setApplyInfo(data.data));
    dispatch(
      setToastStatus({ value: 1, mess: "Đã gửi CV cho nhà tuyển dụng" }),
    );
    navigate(-1);
  };

  useEffect(() => {
    setValue("linkcv", applyInfo.linkcv);
    setValue("candidatefullname", applyInfo.candidatefullname);
    setValue("phone", applyInfo.phone);
  }, [applyInfo]);

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
    return () => {
      if (token === null) {
        dispatch(
          setToastStatus({
            value: 0,
            mess: "Vui lòng đăng nhập để sử dụng tính năng!",
          }),
        );
      }
    };
  }, []);

  return (
    <form className="form-apply-job" onSubmit={handleSubmit(onSubmit)}>
      <Row wrap={false}>
        <Col flex="auto">
          <JobApplyForm control={control} />
        </Col>
      </Row>
    </form>
  );
};

export default JobApply;
