import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  Icon,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import { FaSearch, FaTrash, FaFileExcel } from "react-icons/fa";
import fdatetime from "../libs/fdatetime";

const treeOptions = [
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

const zoneOptions = [
  { label: "Overview", value: "" },
  { label: "zone A", value: "A" },
  { label: "zone B", value: "B" },
  { label: "zone C", value: "C" },
  { label: "zone D", value: "D" },
  { label: "SNC Park", value: "SNCPark" },
  { label: "ธนาคารน้ำ", value: "waterBank" },
];

const ageOptions = Array(200)
  .fill(0)
  .map((_, i) => ({ label: i + " year", value: i }));

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <Input
    onClick={onClick}
    ref={ref}
    value={value}
    readOnly
    placeholder="Plant Date"
    borderColor="gray.300"
    // fontSize="sm"
  />
));

export default function Filter() {
  const initialFilter = {
    zone: "",
    type: "",
    startAge: "",
    endAge: "",
    startDate: "",
    endDate: "",
  };

  const [filter, setFilter] = useState(initialFilter);

  const handleSearch = () => {
    const zone = filter.zone?.value || "";
    const type = filter.type?.value || "";
    const startAge = filter.startAge?.value || "";
    const endAge = filter.endAge?.value || "";
    let startDate = filter.startDate || "";
    startDate = fdatetime(startDate).getFDate;
    let endDate = filter.endDate || "";
    endDate = fdatetime(endDate).getFDate;

    console.log(zone, type, startAge, endAge, startDate, endDate);
  };

  return (
    <>
      <Grid
        templateColumns={{ base: "repeat(2,1fr)", lg: "repeat(8,1fr)" }}
        gap={5}
      >
        {/* Zone */}
        <GridItem>
          <Text fontWeight="semibold">โซน</Text>
          <Text fontSize="small">Zone</Text>
          <Select
            options={zoneOptions}
            placeholder="Zone"
            menuPosition="fixed"
            name="zone"
            value={filter.zone}
            onChange={(zone) => setFilter({ ...filter, zone })}
          />
        </GridItem>

        {/* Type */}
        <GridItem>
          <Text fontWeight="semibold">ประเภทต้นไม้</Text>
          <Text fontSize="small">Tree Type</Text>
          <Select
            options={treeOptions}
            placeholder="Type"
            menuPosition="fixed"
            name="type"
            value={filter.type}
            onChange={(type) => setFilter({ ...filter, type })}
          />
        </GridItem>

        {/* Age */}
        <GridItem colSpan={2}>
          <Text fontWeight="semibold">ช่วงอายุต้นไม้ (ปี)</Text>
          <Text fontSize="small">Tree Age (Year.)</Text>
          <HStack>
            <Box w="49%">
              <Select
                options={ageOptions}
                placeholder="Start"
                menuPosition="fixed"
                name="startAge"
                value={filter.startAge}
                onChange={(startAge) => setFilter({ ...filter, startAge })}
              />
            </Box>
            <Text> - </Text>
            <Box w="49%">
              <Select
                options={ageOptions}
                placeholder="End"
                menuPosition="fixed"
                name="endAge"
                value={filter.endAge}
                onChange={(endAge) => setFilter({ ...filter, endAge })}
              />
            </Box>
          </HStack>
        </GridItem>

        {/* Reg date */}
        <GridItem colSpan={2}>
          <Text fontWeight="semibold">
            วันที่ขึ้นทะเบียน <span>(วันที่ปลูกใน SNC)</span>
          </Text>
          <Text fontSize="small">Register Date (Plant Date)</Text>
          <DatePicker
            closeOnScroll={true}
            selectsRange={true}
            dateFormat="dd/MM/yyyy"
            startDate={filter.startDate}
            endDate={filter.endDate}
            onChange={([startDate, endDate]) => {
              setFilter({ ...filter, startDate, endDate });
            }}
            maxDate={addDays(new Date(), 0)}
            customInput={<CustomInput />}
          />
        </GridItem>

        {/* Button Filter */}
        <GridItem display="flex" alignItems="end">
          <Button mr={3} shadow="md" onClick={handleSearch}>
            <Icon as={FaSearch} />
          </Button>
          <Button
            colorScheme="red"
            shadow="md"
            onClick={() => setFilter(initialFilter)}
          >
            <Icon as={FaTrash} />
          </Button>
        </GridItem>

        {/* <GridItem /> */}

        {/* Export  */}
        <GridItem display="flex" justifyContent="end" alignItems="end">
          <Button
            variant="outline"
            colorScheme="green"
            rounded="full"
            shadow="sm"
          >
            <Icon as={FaFileExcel} mr={2} />
            <Text textColor="black">Export Table</Text>
          </Button>
        </GridItem>
      </Grid>
    </>
  );
}
