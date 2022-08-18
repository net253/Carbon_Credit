import React, { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  Text,
  Box,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import { Graph, OverallChart } from "../components/chart";
import { Map, LayoutInfo, LayoutTable } from "../components/Layout";

export default function FactoryLayout() {
  const [tab, setTab] = useState(true);
  const [indexs, setIndexs] = useState(0);

  const setIndexPie = () => {
    setIndexs((sum) => sum + 1);
  };
  const resetIndex = () => {
    setIndexs(0);
  };

  if (indexs > 7) {
    resetIndex();
  }

  useEffect(() => {
    const timer5s = setInterval(() => {
      setIndexPie();
    }, 5000);
    return () => {
      clearInterval(timer5s);
    };
  }, []);

  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          lg: "repeat(3,1fr)",
          xl: "repeat(10,1fr)",
        }}
        gap={2}
      >
        <GridItem colSpan={{ base: 1, xl: 3 }}>
          <Box>
            <Text
              fontSize={{ base: "xl", lg: "md", xl: "xl" }}
              fontWeight="bold"
              textAlign="center"
              position="absolute"
              w={{ base: "100vw", lg: "32vw", xl: "30vw" }}
              mt={{ base: 1, xl: 2 }}
            >
              ประเภทต้นไม้ (Tree Type)
            </Text>
            <OverallChart indexs={indexs} />
          </Box>

          <Tabs variant="enclosed" size="sm" isFitted my={1}>
            <TabList>
              <Tab onClick={() => setTab(true)}>ปริมาณต้นไม้สะสม</Tab>
              <Tab onClick={() => setTab(false)}>คาร์บอนเครดิต</Tab>
            </TabList>
          </Tabs>

          {tab ? (
            <Box shadow="md" p={2} rounded="lg">
              <Graph
                color="#B1DE80"
                legendArea="ปริมาณต้นไม้สะสม+(Tree Volume)"
                legendBar="ปริมาณต้นไม้ปลูกใหม่+(New Planted Volume)"
                data="tree"
              />
            </Box>
          ) : (
            <Box shadow="md" p={2} rounded="lg">
              <Graph
                color="#63C6FF"
                legendArea="คาร์บอนเครดิตสะสม+(Carbon Credit: MtCO2)"
                legendBar="คาร์บอนเครดิต / ปี+(Carbon Credit / Year)"
                data="carbon"
              />
            </Box>
          )}
        </GridItem>

        {/* Map */}
        <GridItem colSpan={{ base: 1, lg: 2, xl: 7 }}>
          {/* <Box h="60vh" border="1px" /> */}
          <Map />

          <Grid
            templateColumns={{
              base: "repeat(1,1fr)",
              md: "repeat(3,1fr)",
            }}
            h={{ base: "60vh", md: "38vh", lg: "30vh" }}
          >
            {/* Information */}
            <GridItem mt={3} px={2}>
              <LayoutInfo />
            </GridItem>

            {/* Table */}
            <GridItem
              colSpan={2}
              mt={4}
              overflowY="auto"
              roundedTopLeft="md"
              roundedTopEnd="3xl"
            >
              <LayoutTable />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
}
