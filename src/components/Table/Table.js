import { Input, Table as AntTable } from "antd";
import SearchIcon from "components/Icons/SearchIcon";
import PropTypes from "prop-types";
import { useState } from "react";
import "./style/Table.less";

export default function Table({
  columns,
  data,
  totalItems = 100,
  hasPagination = true,
  rowSelection = null,
  placeholder,
  emptyText = "No data found.",
  onChange = () => {},
  currentPage = 1,
  scrollX = 100,
  scrollY = 100,
  hasSearchField = true,
  handleDataSource,
  fullDataSource,
  onClickRow = (record) => {},
}) {
  const [value, setValue] = useState("");
  return (
    <>
      <div className={"table-header-container"}>
        {hasSearchField ? (
          <Input
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              const currValue = e.target.value;
              setValue(currValue);
              const filteredData = fullDataSource.filter((entry) =>
                " ".concat
                  .apply([], Object.values(entry))
                  .toLowerCase()
                  .includes(currValue.toLowerCase()),
              );
              handleDataSource(filteredData);
            }}
            suffix={<SearchIcon />}
            className={"table-search"}
          />
        ) : null}
      </div>
      <div className="table-container" style={{ width: "100%" }}>
        <AntTable
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
          locale={{
            emptyText: <span>{emptyText}</span>,
          }}
          pagination={{
            pageSize: 3,
          }}
          className={"sortable-table"}
          size={"small"}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                onClickRow(record);
              },
            };
          }}
        />
      </div>
    </>
  );
}

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  rowSelection: PropTypes.object,
  emptyText: PropTypes.string,
  totalItems: PropTypes.number,
  hasPagination: PropTypes.bool,
  onChange: PropTypes.func,
  currentPage: PropTypes.any,
  scrollX: PropTypes.number,
  scrollY: PropTypes.number,
  handleDataSource: PropTypes.func,
  hasSearchField: PropTypes.bool,
  fullDataSource: PropTypes.array,
};
