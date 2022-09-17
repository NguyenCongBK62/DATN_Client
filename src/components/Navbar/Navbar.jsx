import { Button, Col, Dropdown, Form, Input, Layout, Modal, Row } from "antd";
import BuildingIcon from "components/Icons/BuildingIcon";
import ProfileIcon from "components/Icons/ProfileIcon";
import SearchIcon from "components/Icons/SearchIcon";
import ValiIcon from "components/Icons/ValiIcon";
import PropTypes from "prop-types";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/umat_logo.svg";
import CityIcon from "../Icons/CityIcon/index";
import "./style/Navbar.less";
import UserDropdown from "./UserDropdown";
import { useDispatch, useSelector } from "react-redux";
import { getIsLogin, setIsLoginStatus } from "Store/modules/Auth";
import { useEffect, useState } from "react";
import { SearchTechDropdown } from "./SearchTechDropdown/SearchTechDropdown";
import { SearchCompanyDropdown } from "./SearchCompanyDropdown/SearchCompanyDropdown";
import { CityDropdown } from "./CityDropdown/CityDropdown";
import { setToastStatus } from "Store/modules/AlertToast";

const { Header } = Layout;

export default function Navbar({ showBackdrop, logout }) {
  const customStyles = { position: "relative", bottom: "7px" };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector(getIsLogin);
  const query = new URLSearchParams(useLocation().search);
  const queryString = query.get("searchText");
  const [searchText, setSearchText] = useState(queryString);

  const [valiIconDropdownStatus, setValiIconDropdownStatus] = useState(false);
  const [dataSourceTechSkill, setDataSourceTechSkill] = useState([]);
  const handleDataSourceTechSkill = (newData) => {
    setDataSourceTechSkill(newData);
  };
  const [fullDataSourceTechSkill, setFullDataSourceTechSkill] = useState([]);
  const [modal2Visible, setModal2Visible] = useState(false);
  const handleMenuClickTechSkill = () => {
    setValiIconDropdownStatus(false);
  };
  const onClickRowTechSkill = (record) => {
    navigate(`/JobByTechSkill?techskill=${record.name}`);
  };

  const getAccountSatus = async () => {
    await fetch("http://localhost:3001/admin/checkAccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: localStorage.getItem("Authorization") }),
    })
      .then((response) => {
        if (response.status !== 200) {
          localStorage.removeItem("Authorization");
          localStorage.removeItem("username");
          localStorage.removeItem("email");
          dispatch(setIsLoginStatus(false));
        }
        response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          return;
        } else if (data.status !== "fail") {
          localStorage.removeItem("Authorization");
          localStorage.removeItem("username");
          localStorage.removeItem("email");
          dispatch(setIsLoginStatus(false));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAccountSatus();
  });

  const changePass = async (values) => {
    await fetch("http://localhost:3001/users/changepass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        token: localStorage.getItem("Authorization"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          dispatch(setToastStatus({ value: 1, mess: data.mess }));
        } else {
          if (data.status === "fail") {
            dispatch(
              setToastStatus({
                value: 0,
                mess: data.message,
              }),
            );
          }
        }
      })
      .catch((err) => {
        dispatch(setToastStatus({ value: 0, mess: err.message }));
      });
  };

  const getDataTechSkill = async () => {
    let listTechSkill = await fetch(
      "http://localhost:3001/users/getTechSkillList",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          return data.data;
        } else {
          return [];
        }
      });
    await setFullDataSourceTechSkill(listTechSkill);
  };

  const [buildingDropdownStatus, setBuildingDropdownStatus] = useState(false);
  const [dataSourceCompany, setDataSourceCompany] = useState([]);
  const handleDataSourceCompany = (newData) => {
    setDataSourceCompany(newData);
  };
  const [fullDataSourceCompany, setFullDataSourceCompany] = useState([]);
  const handleMenuClickCompany = () => {
    setBuildingDropdownStatus(false);
  };
  const onClickRowCompany = (record) => {
    navigate(`/companyprofile/${record.id}`);
  };
  const getDataCompany = async () => {
    let listCompany = await fetch(
      "http://localhost:3001/users/getLisCompanySearch",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          return data.data;
        } else {
          return [];
        }
      });
    await listCompany.sort((a, b) => {
      return b.rate - a.rate;
    });
    await setFullDataSourceCompany(listCompany);
  };

  const [cityDropdownStatus, setCityDropdownStatus] = useState(false);
  const [dataSourceCity, setDataSourceCity] = useState([]);
  const handleDataSourceCity = (newData) => {
    setDataSourceCity(newData);
  };
  const [fullDataSourceCity, setFullDataSourceCity] = useState([]);
  const handleMenuClickCity = () => {
    setCityDropdownStatus(false);
  };
  const onClickRowCity = (record) => {
    navigate(`/JobByCity?city=${record.worksplace}`);
  };
  const getDataCity = async () => {
    let listCity = await fetch("http://localhost:3001/users/getCityList", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          return data.data;
        } else {
          return [];
        }
      });
    await setFullDataSourceCity(listCity);
  };

  const onFinish = (values) => {
    changePass(values);
    setModal2Visible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  useEffect(() => {
    getDataTechSkill();
    getDataCompany();
    getDataCity();
  }, []);

  useEffect(() => {
    setDataSourceCompany(fullDataSourceCompany);
  }, [fullDataSourceCompany]);

  useEffect(() => {
    setDataSourceTechSkill(fullDataSourceTechSkill);
  }, [fullDataSourceTechSkill]);

  useEffect(() => {
    setDataSourceCity(fullDataSourceCity);
  }, [fullDataSourceCity]);

  return (
    <>
      <Header className="header">
        <Row style={{ justifyContent: "space-between" }}>
          <Col xs={4} sm={4} md={6} lg={8} xl={6}>
            <div
              className="logo"
              onClick={() => {
                navigate(`/`);
              }}
            >
              <img src={Logo} height="54px" width="180px" alt="Umat Logo" />
            </div>
          </Col>
          <>
            <Col xs={16} sm={16} md={12} lg={8} xl={12} className="search">
              <Input
                placeholder="Tìm kiếm việc làm theo từ khóa"
                suffix={<SearchIcon />}
                className="search-bar"
                defaultValue={searchText}
                onKeyDown={(v) =>
                  v.key === "Enter"
                    ? navigate(`/jobs?searchText=${v.target.value}`)
                    : ""
                }
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </Col>
            <Col xs={4} sm={4} md={6} lg={8} xl={6}>
              <ul className="menu">
                <Dropdown
                  overlay={SearchTechDropdown({
                    dataSourceTechSkill,
                    handleDataSourceTechSkill,
                    fullDataSourceTechSkill,
                    handleMenuClickTechSkill,
                    onClickRowTechSkill,
                  })}
                  placement="bottomRight"
                  arrow
                  trigger={["click"]}
                  visible={valiIconDropdownStatus}
                  onVisibleChange={() => {
                    setValiIconDropdownStatus(!valiIconDropdownStatus);
                  }}
                  overlayClassName={"menu-items-dropdown store-dropdown"}
                >
                  <li className="menu-items">
                    <NavLink
                      to="/jobs"
                      onClick={() => {
                        setValiIconDropdownStatus(true);
                      }}
                    >
                      <ValiIcon
                        width={23}
                        height={30}
                        customStyles={customStyles}
                      />
                    </NavLink>
                  </li>
                </Dropdown>
                <Dropdown
                  overlay={SearchCompanyDropdown({
                    dataSourceCompany,
                    handleDataSourceCompany,
                    fullDataSourceCompany,
                    handleMenuClickCompany,
                    onClickRowCompany,
                  })}
                  placement="bottomRight"
                  arrow
                  trigger={["click"]}
                  visible={buildingDropdownStatus}
                  onVisibleChange={() => {
                    setBuildingDropdownStatus(!buildingDropdownStatus);
                  }}
                  overlayClassName={"menu-items-dropdown store-dropdown"}
                >
                  <li
                    className="menu-items"
                    onClick={() => {
                      setBuildingDropdownStatus(true);
                    }}
                  >
                    <BuildingIcon
                      width={23}
                      height={30}
                      customStyles={customStyles}
                    />
                  </li>
                </Dropdown>
                <Dropdown
                  overlay={CityDropdown({
                    dataSourceCity,
                    handleDataSourceCity,
                    fullDataSourceCity,
                    handleMenuClickCity,
                    onClickRowCity,
                  })}
                  placement="bottomRight"
                  arrow
                  trigger={["click"]}
                  visible={cityDropdownStatus}
                  onVisibleChange={() => {
                    setCityDropdownStatus(!cityDropdownStatus);
                  }}
                  overlayClassName={"menu-items-dropdown store-dropdown"}
                >
                  <li
                    className="menu-items"
                    onClick={() => {
                      setCityDropdownStatus(true);
                    }}
                  >
                    <CityIcon
                      width={23}
                      height={30}
                      customStyles={customStyles}
                    />
                  </li>
                </Dropdown>
                {isLogin ? (
                  <Dropdown
                    overlay={UserDropdown({
                      logout,
                      showBackdrop,
                      modal2Visible,
                      setModal2Visible,
                    })}
                    placement="bottomRight"
                    arrow
                    trigger={["click"]}
                    onVisibleChange={showBackdrop}
                    overlayClassName={"menu-items-dropdown"}
                  >
                    <li className="profile-icon">
                      <ProfileIcon />
                    </li>
                  </Dropdown>
                ) : (
                  <Button
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Đăng nhập
                  </Button>
                )}
              </ul>
            </Col>
          </>
        </Row>
      </Header>
      <Modal
        title="Đổi mật khẩu"
        centered
        visible={modal2Visible}
        onOk={() => setModal2Visible(false)}
        onCancel={() => setModal2Visible(false)}
        footer={null}
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
            label="Mật khẩu cũ"
            name="oldpassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input
              type="password"
              placeholder="Vui lòng nhập mật khẩu cũ"
              className={"login-input"}
              autoComplete={false}
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newpassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input
              type="password"
              placeholder="Vui lòng nhập mật khẩu mới"
              className={"login-input"}
              autoComplete={false}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button login-btn"
            >
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

Navbar.propTypes = {
  showBackdrop: PropTypes.func,
  stores: PropTypes.array,
  role: PropTypes.string,
  selectedStoreId: PropTypes.any,
  logout: PropTypes.func,
  hasReservation: PropTypes.any,
  toNetReservationPage: PropTypes.func,
  goAccountList: PropTypes.func,
};
