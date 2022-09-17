import { Col, Menu, Rate, Row } from "antd";
import Heading from "components/Heading";
import Table from "components/Table/Table";
import PropTypes from "prop-types";
import "./style/index.less";

export function SearchCompanyDropdown({
  dataSourceCompany,
  handleDataSourceCompany,
  fullDataSourceCompany,
  handleMenuClickCompany,
  onClickRowCompany,
}) {
  const columns = [
    {
      title: "Tên công ty",
      dataIndex: "name",
      width: 10,
    },
    {
      title: "Điểm đánh giá",
      dataIndex: "rate",
      width: 20,
      render: function renderEditIcon(_, record) {
        return (
          <Row>
            <Col span={20}>
              <Rate allowHalf value={record.rate} count={5} disabled />
            </Col>
            <Col span={4}>
              <span>{record.rate.toFixed(1)}</span>
            </Col>
          </Row>
        );
      },
    },
  ];
  return (
    <Menu className="reservation-search" onClick={handleMenuClickCompany}>
      <Menu.Item disabled={true}>
        <Row>
          <Col span={16}>
            <Heading>Tìm kiếm công ty</Heading>
          </Col>
          <Col span={8}>
            {" "}
            <p className="count-reservation">
              Hiện có
              <span>{fullDataSourceCompany.length}</span>công ty
            </p>
          </Col>
        </Row>
      </Menu.Item>
      <Menu.Item disabled={true}>
        <Table
          data={dataSourceCompany}
          columns={columns}
          handleDataSource={handleDataSourceCompany}
          fullDataSource={fullDataSourceCompany}
          emptyText={"Không có bản ghi nào"}
          placeholder={"Tìm kiếm theo từ khóa"}
          scrollX={800}
          scrollY={886}
          totalItems={dataSourceCompany.length}
          hasPagination={false}
          onClickRow={onClickRowCompany}
        />
      </Menu.Item>
    </Menu>
  );
}

SearchCompanyDropdown.propTypes = {
  dataSourceCompany: PropTypes.array,
  handleDataSourceCompany: PropTypes.func,
  fullDataSourceCompany: PropTypes.array,
  handleMenuClickCompany: PropTypes.func,
  onClickRowCompany: PropTypes.func,
};
