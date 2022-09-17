import { Button, Card, Form, Input, Spin } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToastStatus } from "Store/modules/AlertToast";
import { setIsLoginStatus } from "Store/modules/Auth";
import bg from "../../assets/bg.svg";
import loginCover from "../../assets/login-cover.svg";
import "./Register.less";

export default function Login() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = async (data) => {
    await fetch("http://localhost:3001/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/register");
          const error = new Error("Truy vấn dữ liệu không thành công !");
          error.statusCode = 303;
          throw error;
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          localStorage.setItem("Authorization", data.Authorization);
          localStorage.setItem("email", data.email);
          localStorage.setItem("username", data.username);
          dispatch(setToastStatus({ value: 1, mess: "đăng nhập thành công!" }));
          dispatch(setIsLoginStatus(true));
          navigate("/jobs");
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
        navigate("/register");
      });
  };

  const onFinish = (values) => {
    setIsLoading(true);
    login(values);
    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <Spin tip="Đang xử lí" size="large" spinning={isLoading}>
      <div
        className={"main"}
        style={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: "center",
          marginTop: -110,
        }}
      >
        <Card
          className={"register-card"}
          cover={
            <img alt="example" src={loginCover} width="345px" height="118px" />
          }
        >
          <Form
            name="normal_login"
            className="login-form"
            layout={"vertical"}
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Tên đăng nhập"
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập" },
              ]}
            >
              <Input
                placeholder="Vui lòng nhập tên đăng nhập"
                className={"login-input"}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập Email" }]}
            >
              <Input
                placeholder="Vui lòng nhập email"
                className={"login-input"}
              />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input
                type="password"
                placeholder="Vui lòng nhập mật khẩu"
                className={"login-input"}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button login-btn"
              >
                Đăng kí
              </Button>
            </Form.Item>
          </Form>
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "25px" }}
          >
            Bạn đã có tài khoản ? <br />
            <Link to="/Register">Đăng nhập ngay</Link>
          </div>
        </Card>
      </div>
    </Spin>
  );
}
