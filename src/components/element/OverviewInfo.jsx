import React, { useState, useEffect } from "react";
import { Text, Divider, Box, Grid, GridItem, Input } from "@chakra-ui/react";

const DividerGrid = () => (
  <GridItem colSpan={5} my={2} border="1px" borderColor="gray.200">
    <Divider />
  </GridItem>
);

export default function OverviewInfo({ information }) {
  const [coValue, setCoValue] = useState({
    baht: 0,
    usd: 0,
  });

  useEffect(() => {
    const initPage = setTimeout(() => {
      let usd = coValue.baht * 15.62;
      setCoValue({ ...coValue, usd });
    }, 0);

    return () => {
      clearTimeout(initPage);
    };
  }, [coValue.baht]);

  useEffect(() => {
    setCoValue({
      baht: Number(information[3].value.split(",").join("")),
      usd: Number(information[3].value.split(",").join("")) * 15.62,
    });
  }, [information]);

  return (
    <>
      <Box textAlign="center" p={2}>
        <Text fontSize="xl" fontWeight="semibold">
          ผังโรงงาน (Plant Layout)
        </Text>

        <Grid
          templateColumns="repeat(5,1fr)"
          mt={2}
          alignItems="center"
          fontSize={{ lg: "smaller", xl: "md" }}
        >
          {information.map((info, i) => (
            <React.Fragment key={info.text}>
              <GridItem colSpan={3} textAlign="left" my={1}>
                <Text>{info.text}</Text>
              </GridItem>
              <GridItem textAlign="end" fontWeight="semibold">
                <Text>{info.value}</Text>
              </GridItem>
              <GridItem>
                {i != 3 ? (
                  <Text textAlign="left" pl={7}>
                    {info.unit}
                  </Text>
                ) : (
                  <Text textAlign="left" pl={7}>
                    tCO<sub>2</sub>
                  </Text>
                )}
              </GridItem>
            </React.Fragment>
          ))}

          <DividerGrid />

          <GridItem colSpan={2}>
            <Text fontSize="smaller">
              tCO<sub>2</sub>
            </Text>
            <Input
              variant="filled"
              size="sm"
              placeholder={information[3].value}
              onChange={({ target: { value: baht } }) =>
                setCoValue({ ...coValue, baht })
              }
            />
          </GridItem>
          <GridItem textAlign="center">to</GridItem>
          <GridItem colSpan={2}>
            <Text fontSize="smaller">USD</Text>
            <Input
              variant="filled"
              size="sm"
              value={coValue.usd.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              readOnly
            />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
