import React, { useState } from "react";
import {
  Text,
  Grid,
  GridItem,
  Box,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Center,
  Divider,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";

const textInput = [
  { thai: "รหัสทะเบียน", eng: "Tree Code" },
  { thai: "ชื่อต้นไม้", eng: "Tree Name" },
  { thai: "ชื่อวิทยาศาสตร์", eng: "Scientific Name" },
  { thai: "จำนวนที่ปลูก", eng: "Planted Number" },
];

const detailInput = [
  { thai: "GPS (Latitude)", eng: "GPS (Longitude)" },
  { thai: "วันที่ปลูก", eng: "Plant Date" },
  { thai: "อายุ (ปี)", eng: "Tree Age (year.)" },
  {
    thai: "คาร์บอนเครดิต/วัน (กก.คาร์บอน)",
    eng: "Carbon Credit/Day (KgCarbon)",
  },
];

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <FormControl variant="floating" ref={ref}>
    <Input
      placeholder=" "
      onClick={onClick}
      value={value}
      readOnly
      borderColor="gray.400"
    />
    <FormLabel fontWeight="normal">วันที่ปลูก</FormLabel>
  </FormControl>
));

export default function PlantReg() {
  const [startDate, setStartDate] = useState();
  const [plantNum, setPlantNum] = useState(Array(2).fill(0));

  const handleShowInput = (text) => {
    return text == "Tree Name"
      ? true
      : text == "Scientific Name"
      ? true
      : text == "GPS (Longitude)"
      ? true
      : false;
  };

  return (
    <>
      <Center h="91vh">
        <Box
          shadow="md"
          h="80vh"
          w={{ base: "100vw", lg: "55vw" }}
          overflow="auto"
          p={5}
          bgColor="white"
        >
          <Text fontWeight="bold" fontSize="xl" textAlign="center" mb={5}>
            ลงทะเบียนต้นไม้
          </Text>

          <Grid templateColumns="repeat(2,1fr)" gap={2}>
            {textInput.map((info, i) => (
              <React.Fragment key={i}>
                <GridItem my={1}>
                  <FormControl variant="floating">
                    <Input placeholder=" " borderColor="gray.400" />
                    <FormLabel fontWeight="normal">{info.thai}</FormLabel>
                  </FormControl>
                </GridItem>

                <GridItem my={1}>
                  {handleShowInput(info.eng) ? (
                    <FormControl variant="floating">
                      <Input placeholder=" " borderColor="gray.400" />
                      <FormLabel fontWeight="normal">{info.eng}</FormLabel>
                    </FormControl>
                  ) : (
                    <Input placeholder={info.eng} readOnly />
                  )}
                </GridItem>
              </React.Fragment>
            ))}

            {plantNum.map((_, i) => (
              <React.Fragment key={i}>
                <GridItem colSpan={2} mt={2} pl={5} textAlign="start">
                  <Text fontSize="sm" fontWeight="semibold">
                    ต้นที่ {i + 1}
                  </Text>
                </GridItem>

                {detailInput.map((info, j) => (
                  <React.Fragment key={info.eng}>
                    <GridItem my={1}>
                      {j != 1 ? (
                        <FormControl variant="floating">
                          <Input placeholder=" " borderColor="gray.400" />
                          <FormLabel fontWeight="normal">{info.thai}</FormLabel>
                        </FormControl>
                      ) : (
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          customInput={<CustomInput />}
                        />
                      )}
                    </GridItem>
                    <GridItem my={1}>
                      {handleShowInput(info.eng) ? (
                        <FormControl variant="floating">
                          <Input placeholder=" " borderColor="gray.400" />
                          <FormLabel fontWeight="normal">{info.eng}</FormLabel>
                        </FormControl>
                      ) : (
                        <Input placeholder={info.eng} readOnly />
                      )}
                    </GridItem>
                  </React.Fragment>
                ))}

                {/* Other Information */}
                <GridItem my={1} colSpan={2}>
                  <FormControl variant="floating">
                    <Textarea placeholder=" " rows={5} borderColor="gray.400" />
                    <FormLabel fontWeight="normal">
                      ข้อมูลอื่นๆ (Other information)
                    </FormLabel>
                  </FormControl>
                </GridItem>

                <GridItem mb={4} colSpan={2}>
                  <Text fontWeight="medium">Upload Tree Image</Text>
                  <input type="file" />
                </GridItem>
              </React.Fragment>
            ))}
          </Grid>
        </Box>
      </Center>
    </>
  );
}
