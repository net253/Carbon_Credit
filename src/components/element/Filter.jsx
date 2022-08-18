import React from "react";
import {
  Box,
  Text,
  Input,
  Icon,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import { FaSearch, FaTrash, FaFileExcel } from "react-icons/fa";
import Buttons from "./Buttons";
import { CSVLink } from "react-csv";

const zoneOptions = [
  { label: "Overview", value: "" },
  { label: "zone A", value: "A" },
  { label: "zone B", value: "B" },
  { label: "zone C", value: "C" },
  { label: "zone D", value: "D" },
  { label: "SNC Park", value: "Park" },
  { label: "ธนาคารน้ำ", value: "waterBank" },
];

const headers = [
  { label: "Tree Code", key: "code" },
  { label: "Tree Name", key: "name" },
  { label: "Scientific Name", key: "sciName" },
  { label: "Tree Diameter", key: "d" },
  { label: "Tree Height", key: "h" },
  { label: "Carbon Credit / Day (kgCO2)", key: "co2" },
];

const ageOptions = Array(200)
  .fill(0)
  .map((_, i) => ({ label: i + " year", value: i }));

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <Input
    onClick={onClick}
    ref={ref}
    value={value}
    disabled
    placeholder="Plant Date"
    borderColor="gray.300"
  />
));

export default function Filter({
  treeType,
  filter,
  setFilter,
  handleSearch,
  handleClear,
  data,
}) {
  const treeOptions = treeType?.map((info) => ({
    value: info.TREES_NAME,
    label: info.TREES_NAME,
  }));

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
          <Text fontWeight="semibold">ชื่อต้นไม้</Text>
          <Text fontSize="small">Tree Name</Text>
          <Select
            options={[{ value: "", label: "ทั้งหมด" }, ...treeOptions]}
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
                isDisabled
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
                isDisabled
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
            disabled
          />
        </GridItem>

        {/* Button Filter */}
        <GridItem display="flex" alignItems="end">
          <Buttons mr={3} onClick={handleSearch} fontsize="md" variant="solid">
            <Icon as={FaSearch} />
          </Buttons>
          <Buttons fontsize="md" bgColor="red.300" onClick={handleClear}>
            <Icon as={FaTrash} />
          </Buttons>
        </GridItem>

        {/* Export  */}
        <GridItem display="flex" alignItems="end">
          <CSVLink
            data={data}
            headers={headers}
            filename="Carbon_Credit_Export.csv"
          >
            <Buttons variant="outline" fontsize="md">
              <Icon as={FaFileExcel} mr={2} color="green" />
              <Text textColor="black">Export Table</Text>
            </Buttons>
          </CSVLink>
        </GridItem>
      </Grid>
    </>
  );
}
