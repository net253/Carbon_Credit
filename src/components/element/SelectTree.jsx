import React from "react";
import Select from "react-select";
import { useSelector } from "react-redux";

export default function SelectTree({ setSelectValue }) {
  const treeType = useSelector((state) => state.overviewInfo.treeType);

  if (!treeType) {
    return <div />;
  }

  const handleChange = (e) => {
    setSelectValue(e.value);
  };

  const options = treeType.map((info) => ({
    value: info.TREES_NAME,
    label: info.TREES_NAME,
  }));

  const initialValue = [{ value: "", label: "All Tree" }];

  return (
    <>
      <Select
        menuPortalTarget={document.body}
        options={[...initialValue, ...options]}
        onChange={handleChange}
      />
    </>
  );
}
