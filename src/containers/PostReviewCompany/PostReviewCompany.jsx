import { Col, Divider, Row } from "antd";
import ReviewCompanyForm from "components/Form/ReviewCompanyForm";
import "containers/PostReviewCompany/PostReviewCompany.less";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setToastStatus } from "Store/modules/AlertToast";

const PostReviewCompany = () => {
  const { companyid } = useParams();
  const methods = useForm({
    mode: "onSubmit",
  });
  const { handleSubmit, control, setValue, watch } = methods;
  const [companyProfile, setCompanyProfile] = useState();
  const [review, setReview] = useState({});
  const token = localStorage.getItem("Authorization");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (token !== null) {
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
    } else {
      navigate("/login");
    }
  }, []);

  const onSubmit = async (data) => {
    if (data.titlereview === "" || data.titlereview === undefined) {
      dispatch(
        setToastStatus({ value: 0, mess: "Mời nhập tiêu đề đánh giá!" }),
      );
      return false;
    }
    if (data.contentreview === "" || data.contentreview === undefined) {
      dispatch(
        setToastStatus({ value: 0, mess: "Mời nhập nội dung đánh giá!" }),
      );
      return false;
    }
    if (data.recomment === "" || data.recomment === undefined) {
      dispatch(setToastStatus({ value: 0, mess: "Mời nhập gợi ý ứng tuyển!" }));
      return false;
    }
    data = { ...data, token };
    await fetch(`http://localhost:3001/users/addreview/${companyid}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setReview(data.data);
          dispatch(
            setToastStatus({
              value: 1,
              mess: "Đánh giá của bạn đã được ghi nhận !",
            }),
          );
          navigate(-1);
        } else {
          if (data.status === "fail") {
            const error = new Error(data.message);
            error.statusCode = 303;
            throw error;
          }
        }
      })
      .catch((err) => {
        dispatch(
          setToastStatus({
            value: 0,
            mess: err.message,
          }),
        );
      });
  };

  useEffect(() => {
    setValue("titlereview", review.titlereview);
    setValue("contentreview", review.contentreview);
    setValue("rate", review.rate);
    setValue("recomment", review.recomment);
  }, [review]);

  if (companyProfile === undefined) {
    return null;
  }
  return (
    <form className="form-apply-job" onSubmit={handleSubmit(onSubmit)}>
      <Row wrap={false} style={{ paddingTop: 40 }}>
        <Col flex="15">
          <ReviewCompanyForm
            control={control}
            companyProfile={companyProfile}
          />
        </Col>
        <Col flex="9">
          <div className="condition-review">
            <h1 style={{ fontSize: 23 }}>Hướng dẫn & Điều kiện về đánh giá</h1>
            <Divider style={{ background: "#D8D8D8", marginTop: 10 }} />
            <p>
              Mọi đánh giá phải tuân thủ Hướng Dẫn & Điều Kiện về đánh giá để
              được hiển thị trên website.
            </p>
            <p>Xin vui lòng:</p>
            <ul style={{ marginLeft: 20 }}>
              <li>Không sử dụng từ ngữ mang ý xúc phạm, miệt thị</li>
              <li>Không cung cấp thông tin cá nhân</li>
              <li>
                Không cung cấp thông tin bảo mật, bí mật kinh doanh của công ty
              </li>
            </ul>
            <p>
              Cảm ơn bạn đã đưa ra những đánh giá chân thực nhất. Xem thêm thông
              tin chi tiết về Hướng Dẫn & Điều Kiện về đánh giá
            </p>
          </div>
        </Col>
      </Row>
    </form>
  );
};

export default PostReviewCompany;
