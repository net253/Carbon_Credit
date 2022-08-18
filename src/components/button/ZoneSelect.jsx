import React from "react";
import { Button, Select } from "@chakra-ui/react";

export default function ZoneSelect({ w, textAlign, setValSelect }) {
  const option = [
    { text: "Overview", value: [101.089512, 12.887337] },
    { text: "zone A", value: [101.094722, 12.885376] },
    { text: "zone B", value: [101.090543, 12.887918] },
    { text: "zone C", value: [101.090196, 12.885244] },
    { text: "zone D", value: [101.086348, 12.890214] },
    { text: "SNC Park", value: "SNCPark" },
    { text: "ธนาคารน้ำ", value: "waterBank" },
  ];

  return (
    <>
      <Select
        textAlign={textAlign}
        placeholder="Zone"
        w={w}
        variant="ghost"
        rounded="full"
        fontWeight="semibold"
        _hover={{ bgColor: "gray.100" }}
        onChange={({ target: { value } }) => setValSelect(value)}
      >
        {option.map((info, i) => (
          <option value={info.value} key={i}>
            {info.text}
          </option>
        ))}
      </Select>
    </>
  );
}
