import { Layout as AntLayout, Spin } from "antd";
import React, { useEffect, useState } from "react";
import Sidebar from "components/Slidebar/Sidebar";
import Navbar from "components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import bg from "assets/bg.svg";
import "containers/Layout/style/Layout.less";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { Content } = AntLayout;
  const toastStatus = useSelector((state) => state.ToastStatus.toastStatus);
  useEffect(() => {
    if (toastStatus !== null) {
      if (toastStatus.value !== 0) {
        toast.success(toastStatus.mess);
      } else if (toastStatus.value === 0) {
        toast.error(toastStatus.mess);
      }
    }
  }, [toastStatus]);
  return (
    <Spin tip="" size="large" spinning={false} className={"full-screen-spin"}>
      <div
        style={{
          backgroundImage: `url(${bg})`,
        }}
        className={"main"}
      >
        <Navbar />
        <Content style={{ marginTop: 110 }}>
          <Outlet />
        </Content>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Spin>
  );
}
