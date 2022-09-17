import { Col, Menu, Row } from "antd";
import Heading from "components/Heading";
import Table from "components/Table/Table";
import PropTypes from "prop-types";
import "./style/index.less";
export function CityDropdown({
  dataSourceCity,
  handleDataSourceCity,
  fullDataSourceCity,
  handleMenuClickCity,
  onClickRowCity,
}) {
  const columns = [
    {
      title: "Tên thành phố",
      dataIndex: "worksplace",
      width: 10,
    },
    {
      title: "Số công việc",
      dataIndex: "count",
      width: 20,
    },
  ];
  return (
    <Menu className="reservation-search" onClick={handleMenuClickCity}>
      <Menu.Item disabled={true}>
        <Row>
          <Col span={16}>
            <Heading>Tìm kiếm theo nơi làm việc</Heading>
          </Col>
          <Col span={8}>
            {" "}
            <p className="count-reservation">
              <span>{fullDataSourceCity.length}</span>Thành phố
            </p>
          </Col>
        </Row>
      </Menu.Item>
      <Menu.Item disabled={true}>
        <Table
          data={dataSourceCity}
          columns={columns}
          handleDataSource={handleDataSourceCity}
          fullDataSource={fullDataSourceCity}
          emptyText={"Không có bản ghi nào"}
          placeholder={"Tìm kiếm theo từ khóa"}
          scrollX={800}
          scrollY={886}
          totalItems={dataSourceCity.length}
          hasPagination={false}
          onClickRow={onClickRowCity}
        />
      </Menu.Item>
    </Menu>
  );
}

CityDropdown.propTypes = {
  dataSourceCity: PropTypes.array,
  handleDataSourceCity: PropTypes.func,
  fullDataSourceCity: PropTypes.array,
  handleMenuClickCity: PropTypes.func,
  onClickRowCity: PropTypes.func,
};
