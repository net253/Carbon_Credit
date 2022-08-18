import React from "react";
import Select from "react-select";
import { Box } from "@chakra-ui/react";

const options = [
  { value: "ต้นหูกระจง", label: "ต้นหูกระจง" },
  { value: "ต้นแคนา", label: "ต้นแคนา" },
  { value: "ต้นชงโค", label: "ต้นชงโค" },
  { value: "ต้นพญาสัตบรรณ", label: "ต้นพญาสัตบรรณ" },
  { value: "ต้นมะยม", label: "ต้นมะยม" },
  { value: "ต้นมะขาม", label: "ต้นมะขาม" },
  { value: "ต้นมะพร้าว", label: "ต้นมะพร้าว" },
  { value: "ต้นลําไย", label: "ต้นลําไย" },
  { value: "ต้นมะม่วงเขียวเสวย", label: "ต้นมะม่วงเขียวเสวย" },
  { value: "ต้นทุเรียนหมอนทอง", label: "ต้นทุเรียนหมอนทอง" },
  { value: "ต้นมะม่วงนํ้าดอกไม", label: "ต้นมะม่วงนํ้าดอกไม" },
  { value: "ต้นจิกนํ้า", label: "ต้นจิกนํ้า" },
];

export default function Search({ w }) {
  return (
    <>
      <Box minW={w}>
        <Select options={options} placeholder="Tree Select" />
      </Box>
    </>
  );
}
