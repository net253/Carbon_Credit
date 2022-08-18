import React from "react";
import { Text, Divider, Box, Grid, GridItem, Input } from "@chakra-ui/react";

const DividerGrid = () => (
  <GridItem colSpan={5} my={3} border="1px" borderColor="gray.200">
    <Divider />
  </GridItem>
);

export default function LayoutInfo() {
  const infoOption = [
    { text: "พื้นที่ทั้งหมด", unit: "ตร.ม.", value: "XXX,XXX.XX" },
    { text: "พื้นที่ต้นไม้", unit: "ตร.ม.", value: "XX,XXX.XX" },
    { text: "อัตราส่วน", unit: "%", value: "XX.XX" },
    { text: "คาร์บอนเครดิต", unit: "tCO2", value: "XX.XX" },
  ];

  return (
    <>
      <Box textAlign="center">
        <Text fontSize="xl" fontWeight="semibold">
          Plant Layout
        </Text>

        <Grid
          templateColumns="repeat(5,1fr)"
          mt={2}
          alignItems="center"
          fontSize={{ base: "", lg: "smaller", xl: "md" }}
        >
          {infoOption.map((info) => (
            <React.Fragment key={info.text}>
              <GridItem colSpan={2} textAlign="left" my={1.5}>
                <Text>{info.text}</Text>
              </GridItem>
              <GridItem colSpan={2} textAlign="end" fontWeight="semibold">
                <Text>{info.value}</Text>
              </GridItem>
              <GridItem>
                <Text textAlign="left" pl={7}>
                  {info.unit}
                </Text>
              </GridItem>
            </React.Fragment>
          ))}

          <DividerGrid />

          <GridItem colSpan={2}>
            <Text>
              tCO<sub>2</sub>
            </Text>
          </GridItem>
          <GridItem />
          <GridItem colSpan={2}>
            <Text>USD</Text>
          </GridItem>

          <GridItem colSpan={2}>
            <Input variant="filled" size="sm" />
          </GridItem>
          <GridItem>to</GridItem>
          <GridItem colSpan={2}>
            <Input variant="filled" size="sm" />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
