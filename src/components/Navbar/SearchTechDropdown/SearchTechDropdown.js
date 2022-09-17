import { Col, Input, Menu, Row } from "antd";
import Table from "components/Table/Table";
import Heading from "components/Heading";
import SearchIcon from "components/Icons/SearchIcon";
import PropTypes from "prop-types";
import { useState } from "react";
import "./style/index.less";

const inputStyle = {
  width: "174px",
  height: "40px",
  float: "right",
};

export function SearchTechDropdown({
  dataSourceTechSkill,
  handleDataSourceTechSkill,
  fullDataSourceTechSkill,
  handleMenuClickTechSkill,
  onClickRowTechSkill,
}) {
  const columns = [
    {
      title: "Tên chuyên môn",
      dataIndex: "name",
      width: 10,
    },
    {
      title: "Số công việc",
      dataIndex: "count",
      width: 20,
    },
  ];
  return (
    <Menu className="reservation-search" onClick={handleMenuClickTechSkill}>
      <Menu.Item disabled={true}>
        <Row>
          <Col span={16}>
            <Heading>Tìm kiếm công việc theo chuyên môn</Heading>
          </Col>
          <Col span={8}>
            {" "}
            <p className="count-reservation">
              <span>{fullDataSourceTechSkill.length}</span>lĩnh vực
            </p>
          </Col>
        </Row>
      </Menu.Item>
      <Menu.Item disabled={true}>
        <Table
          data={dataSourceTechSkill}
          columns={columns}
          handleDataSource={handleDataSourceTechSkill}
          fullDataSource={fullDataSourceTechSkill}
          emptyText={"Không có bản ghi nào"}
          placeholder={"Tìm kiếm theo từ khóa"}
          scrollX={800}
          scrollY={886}
          totalItems={dataSourceTechSkill.length}
          hasPagination={false}
          onClickRow={onClickRowTechSkill}
        />
      </Menu.Item>
    </Menu>
  );
}

SearchTechDropdown.propTypes = {
  dataSourceTechSkill: PropTypes.array,
  handleDataSourceTechSkill: PropTypes.func,
  fullDataSourceTechSkill: PropTypes.array,
  handleMenuClickTechSkill: PropTypes.func,
  onClickRowTechSkill: PropTypes.func,
};
