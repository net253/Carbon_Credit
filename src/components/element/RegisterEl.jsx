import React from "react";
import { Input, FormControl, FormLabel } from "@chakra-ui/react";
import Select from "react-select";

export const AbleInput = ({
  type,
  text,
  disabled,
  readOnly,
  onChange,
  name,
  value,
}) => {
  return (
    <FormControl variant="floating">
      <Input
        name={name}
        placeholder={readOnly ? text : " "}
        type={type}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChange}
        value={value}
      />
      {!readOnly && <FormLabel fontWeight="normal">{text}</FormLabel>}
    </FormControl>
  );
};

export const CustomSelect = ({ options, onChange, disabled }) => {
  if (typeof options != "object") {
    return <div />;
  }
  return (
    <FormControl variant="floating">
      <Select
        options={[...options, { value: "", label: "อื่นๆ" }]}
        isDisabled={disabled}
        onChange={onChange}
        styles={{
          menu: (provided) => ({ ...provided, zIndex: 5 }),
        }}
        placeholder="Select tree to autofill input"
      />
    </FormControl>
  );
};

export const ZoneSelect = ({ onChange }) => {
  return (
    <FormControl variant="floating">
      <Select
        options={[
          { value: "A", label: "Zone A" },
          { value: "B", label: "Zone B" },
          { value: "C", label: "Zone C" },
          { value: "D", label: "Zone D" },
          { value: "Park", label: "Snc Park" },
          { value: "Water", label: "Water Bank" },
        ]}
        onChange={onChange}
        styles={{
          menu: (provided) => ({ ...provided, zIndex: 5 }),
        }}
        placeholder="Select Zone"
      />
    </FormControl>
  );
};

export const textInput = [
  {
    thai: "โซน",
    eng: "Zone",
    name: ["zone", ""],
    type: "select",
  },
  {
    thai: "รหัสทะเบียน",
    eng: "Tree Code",
    name: ["treeCode", ""],
    type: "text",
  },
  {
    thai: "GPS (Latitude)",
    eng: "GPS (Longitude)",
    name: ["latitude", "longitude"],
    type: "number",
  },

  {
    thai: "อายุ (ปี)",
    eng: "Tree Age (year.)",
    name: ["treeAge", ""],
    type: "number",
  },
  {
    thai: "เส้นผ่านศูนย์กลางที่ความสูง 1.3 เมตร (ซม.)",
    eng: "Diameter at a Height of 1.3 m. (cm.)",
    name: ["circumference", ""],
    type: "number",
  },
  {
    thai: "ความสูงทั้งหมด (ม.)",
    eng: "Tree Height (m.)",
    name: ["height", ""],
    type: "number",
  },
];

export const mainInput = [
  {
    thai: "ชื่อต้นไม้",
    eng: "Tree Name",
    name: ["treeName", "treeName"],
    type: "text",
  },
  {
    thai: "ชื่อวิทยาศาสตร์",
    eng: "Scientific Name",
    name: ["scientificName", "scientificName"],
    type: "text",
  },
  {
    thai: "จำนวนที่ปลูก (รวมถึงกิ่งที่ขนาดเกิน 45 ซม.)",
    eng: "Planted Volume (Including branches larger than 45 cm. )",
    name: ["plantNumber", "plantNumber"],
    type: "number",
  },
  {
    thai: "วันที่ปลูก",
    eng: "Plant Date",
    name: ["plantDate", "plantDate"],
    type: "date",
  },
  {
    thai: "ประเภทต้นไม้",
    eng: "Tree Type",
    name: ["type", "type"],
    type: "number",
  },
];
