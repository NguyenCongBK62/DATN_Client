import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { Rate } from "antd";

export default function RateCompany({
  control,
  inputName,
  defaultValue = 0,
  inputProps = {},
  callback = () => {},
}) {
  return (
    <>
      <Controller
        control={control}
        name={inputName}
        defaultValue={defaultValue}
        render={({ field: { onChange, value, name } }) => (
          <Rate
            {...inputProps}
            defaultValue={defaultValue}
            style={{ fontSize: 30 }}
            name={name}
            value={value}
            onChange={(v) => {
              onChange(v);
              callback();
            }}
            allowHalf={true}
            count={5}
          />
        )}
      />
    </>
  );
}

RateCompany.propTypes = {
  control: PropTypes.any,
  inputName: PropTypes.string,
  inputProps: PropTypes.object,
  defaultValue: PropTypes.number,
  callback: PropTypes.func,
};
