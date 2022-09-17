import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { Radio } from "antd";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";

export default function RadioReview({
  control,
  inputName,
  defaultValue,
  validation = {},
  width = "212",
  classes = "radio-button-container",
}) {
  return (
    <Controller
      control={control}
      name={inputName}
      rules={validation}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, name } }) => (
        <Radio.Group
          className={classes}
          defaultValue={defaultValue}
          onChange={(v) => onChange(v.target.value)}
          value={value}
          name={name}
          style={{
            maxWidth: width,
            minWidth: width,
          }}
        >
          <Radio.Button value={1} key={1} style={{ height: 50 }}>
            <SmileOutlined style={{ fontSize: 30, marginRight: 10 }} />
            <span> Khuyến khích làm việc tại đây</span>
          </Radio.Button>
          <Radio.Button value={0} key={0} style={{ height: 50 }}>
            <FrownOutlined style={{ fontSize: 30, marginRight: 10 }} />
            <span>Môi trường không phù hợp</span>
          </Radio.Button>
        </Radio.Group>
      )}
    />
  );
}

RadioReview.propTypes = {
  control: PropTypes.any,
  validation: PropTypes.any,
  inputName: PropTypes.string,
  inputProps: PropTypes.object,
  buttons: PropTypes.array,
  defaultValue: PropTypes.string,
  classes: PropTypes.string,
};
