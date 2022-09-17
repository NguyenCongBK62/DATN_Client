/* eslint-disable no-unused-vars */
import { CloseOutlined } from "@ant-design/icons";
import { Image, Input as AntInput } from "antd";
import PropTypes from "prop-types";
import { useRef, useState } from "react";

import { Controller } from "react-hook-form";
function PdfUpload({
  control,
  inputName,
  validation = {},
  errors,
  inputProps = {},
  defaultValue = "",
  callback = () => {},
}) {
  const [url, setUrl] = useState();
  const ref = useRef();
  const handleFileChange = async (v, callback) => {
    const uploadData = await new FormData();
    uploadData.append("file", v, "file");
    fetch("http://localhost:3001/admin/cloudinary-upload", {
      method: "post",
      body: uploadData,
    })
      .then((response) => response.json())
      .then((data) => {
        setUrl(data.secure_url);
        callback(data.secure_url);
      })
      .then((err) => console.log(err));
    callback(uploadData);
  };
  return (
    <>
      <Controller
        control={control}
        name={inputName}
        rules={validation}
        defaultValue={defaultValue}
        render={({ field: { onChange, value, name } }) => {
          return (
            <div className="image-upload">
              <input
                style={{ display: "none" }}
                type="file"
                onChange={(v) => {
                  handleFileChange(v.target.files[0], onChange);
                  callback(v.target.files[0]);
                }}
                name={name}
                ref={ref}
              />
              <AntInput
                {...inputProps}
                type="button"
                className={"button file-button"}
                value="Hãy chọn file"
                onClick={() => {
                  ref.current.click();
                }}
              />
              <div className="image-preview-container">
                <span
                  onClick={() => {
                    setUrl("");
                    onChange(null);
                  }}
                >
                  <CloseOutlined />
                </span>
                {url && <a href={url} target="Blank">{`${url}`}</a>}
              </div>
            </div>
          );
        }}
      />
      <small className="invalid-feedback">{errors && errors.message}</small>
    </>
  );
}

PdfUpload.propTypes = {
  control: PropTypes.any,
  inputName: PropTypes.string,
  inputProps: PropTypes.object,
  validation: PropTypes.object,
  errors: PropTypes.any,
  getValues: PropTypes.any,
  defaultValue: PropTypes.string,
  callback: PropTypes.func,
};

export default PdfUpload;
