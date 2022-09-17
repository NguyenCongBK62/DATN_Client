import React from "react";
import "./Navigation.css";
import Logo from "../../assets/umat_logo.svg";
import { Menu, Layout, Dropdown, Row, Col, Switch } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;
const { SubMenu } = Menu;
const Navigation = (props) => {
  const menuJob = (
    <Menu style={{ width: "200px", marginTop: "20px", marginLeft: "-20px" }}>
      <SubMenu title="sub menu">
        <div style={{ width: "400px", height: "auto" }}>
          <Row>
            <Col span={12} style={{ textAlign: "center" }}>
              Java
            </Col>
            <Col span={12} style={{ textAlign: "center" }}>
              Ruby
            </Col>
          </Row>
        </div>
      </SubMenu>
      <SubMenu title="sub menu">
        <div style={{ width: "400px", height: "auto" }}>
          <Row>
            <Col span={12} style={{ textAlign: "center" }}>
              Java
            </Col>
            <Col span={12} style={{ textAlign: "center" }}>
              Ruby
            </Col>
          </Row>
        </div>
      </SubMenu>
    </Menu>
  );
  const logoutHandle = () => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("userName");
    window.location.reload();
  };
  const menuCompany = (
    <Menu style={{ width: "200px", marginTop: "20px", marginLeft: "-20px" }}>
      <SubMenu title="sub menu">
        <Menu.Item>Công ty tốt nhất 2021</Menu.Item>
        <Menu.Item>Công ty tốt nhất 2020</Menu.Item>
        <Menu.Item>Công ty tốt nhất 2019</Menu.Item>
        <Menu.Item>Công ty tốt nhất 2018</Menu.Item>
      </SubMenu>
      <Menu.Item>Review Công ty</Menu.Item>
    </Menu>
  );
  return (
    <Header className="header-fix" style={{ zIndex: 2 }}>
      <Link to="/">
        <div className="logo" id="components-layout-demo-top-side-2">
          <img
            src={Logo}
            id="components-layout-demo-top-side-2"
            className="logo"
          ></img>
        </div>
      </Link>
      <Menu theme="dark" mode="horizontal" className="header-menu">
        <Menu.Item>
          <Dropdown overlay={menuJob}>
            <Link
              to="/jobs"
              className="ant-dropdown-link"
              id="dropdown-link-navi"
            >
              Việc Làm IT
            </Link>
          </Dropdown>
        </Menu.Item>
        <Menu.Item>
          <Dropdown overlay={menuCompany}>
            <a
              className="ant-dropdown-link"
              id="dropdown-link-navi"
              onClick={(e) => e.preventDefault()}
            >
              Công ty hàng đầu
            </a>
          </Dropdown>
        </Menu.Item>
        <Menu.Item id="header-item-right">
          <a href="http://localhost:8888/login" style={{ color: "white" }}>
            Nhà tuyển dụng
          </a>
        </Menu.Item>
        {localStorage.getItem("Authorization") ? (
          <Menu.Item id="header-item-right-is-login" onClick={logoutHandle}>
            {localStorage.getItem("userName")}
          </Menu.Item>
        ) : (
          <Menu.Item id="header-item-right">
            <Link to="/signin" style={{ color: "white" }}>
              Đăng nhập
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default Navigation;
