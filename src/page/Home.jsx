import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import {
  Graph,
  OverallChart,
  Tables,
  OverviewInfo,
  SelectTree,
} from "../components/element";
import { useSelector } from "react-redux";
import Map from "../components/map/Map";

import axios from "axios";
import { eqPath } from "../components/UrlPath";

const CustomBox = ({ children, h, overflow }) => {
  return (
    <Box
      bgColor="white"
      rounded="xl"
      shadow="md"
      h={h}
      mb={2}
      overflow={overflow}
      maxW="96vw"
    >
      {children}
    </Box>
  );
};

const tableHead = [
  { thai: "ลำดับที่", eng: "No." },
  { thai: "รหัสต้นไม้", eng: "Tree Code." },
  { thai: "ประเภทต้นไม้", eng: "Tree Type." },
  { thai: "เส้นผ่านศูนย์กลาง (ซม.)", eng: "Tree Diameter (cm.)." },
  { thai: "ความสูงต้นไม้ (ม.)", eng: "Tree Height (m)." },

  {
    thai: "คาร์บอนเครดิต / วัน (กก.คาร์บอน)",
    eng: "Carbon Credit / Day (kgCo2)",
  },
];

const infoOption = [
  { text: "พื้นที่ทั้งหมด", unit: "ไร่", value: "329.75" },
  { text: "พื้นที่สีเขียว", unit: "ไร่", value: "XXX.XX" },
  { text: "อัตราส่วนต้นไม้ต่อพื้นที่สีเขียว", unit: "%", value: "XX.XX" },
  { text: "ปริมาณคาร์บอน", unit: "tCO2", value: "XX.XX" },
];

export default function Home() {
  const [treeType, setTreeType] = useState([]);
  const [indexs, setIndexs] = useState(0);
  const [selectValue, setSelectValue] = useState("");
  const [information, setInformation] = useState(infoOption);

  const overviewInfo = useSelector((state) => state.overviewInfo);
  const mapInfo = useSelector((state) => state.allTreeInfo);
  const eqValue = useSelector((state) => state.eqValue);

  const getCarbon = () => {
    const copyArr = [...information];
    const allArea = eqValue.aboveEq?.value?.area;

    axios.post(eqPath, { router: "/carbon-credit" }).then(({ data }) => {
      const area = allArea?.reduce((pre, cur) => pre + Number(cur), 0);
      const percent = (
        ((mapInfo.length * (Math.PI * 5 ** 2)) / 1600 / area) *
        100
      )?.toFixed(2);

      copyArr[1].value = area;
      copyArr[2].value = percent;
      copyArr[3].value = Number(data[0].CARBON_CREDIT).toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );
      setInformation(copyArr);
    });
  };

  const dataTable = mapInfo.map((info) => ({
    code: info.properties.code,
    name: info.properties.description,
    d: info.properties.d?.toFixed(2),
    h: info.properties.h?.toFixed(2),
    co2: info.properties.carbon,
  }));

  const handleTree = () => {
    const data = overviewInfo.treeType?.slice(0, 7)?.map((tree) => ({
      name: tree.TREES_NAME,
      value: Number(tree.TreeType),
    }));

    const otherTree = [
      {
        name: "อื่นๆ",
        value: overviewInfo.treeType
          ?.slice(7)
          .reduce((pre, cur) => pre + Number(cur.TreeType), 0),
      },
    ];

    if (data) {
      setTreeType([...data, ...otherTree]);
    }
  };

  const resetIndex = () => {
    setIndexs(0);
  };
  if (indexs > 7) {
    resetIndex();
  }

  useEffect(() => {
    const timer5s = setInterval(() => {
      setIndexs((sum) => sum + 1);
    }, 5000);
    return () => {
      clearInterval(timer5s);
    };
  }, []);

  useEffect(() => {
    handleTree();
    getCarbon();
  }, [overviewInfo]);

  return (
    <>
      <Grid templateColumns={{ xl: "repeat(4,1fr)" }} gap={2}>
        <GridItem>
          {/* Pie Chart */}
          <CustomBox>
            <Text fontSize="lg" fontWeight="bold" textAlign="center" pt={2}>
              ประเภทต้นไม้ (Tree Type)
            </Text>
            <OverallChart indexs={indexs} treeType={treeType} />
          </CustomBox>

          {/* Chart Tab */}
          <CustomBox>
            <Tabs size="sm" variant="enclosed" isFitted isLazy>
              <TabList>
                <Tab fontSize="xs">
                  ปริมาณต้นไม้สะสม <br />
                  (Cumulative Tree)
                </Tab>
                <Tab fontSize="xs">
                  คาร์บอนเครดิต <br />
                  (Carbon Credit)
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Graph
                    color="#B1DE80"
                    legendArea="ปริมาณต้นไม้สะสม+(Tree Volume)"
                    legendBar="ปริมาณต้นไม้ปลูกใหม่+(New Planted Volume)"
                    data="tree"
                  />
                </TabPanel>
                <TabPanel>
                  <Graph
                    color="#63C6FF"
                    legendArea="คาร์บอนเครดิตสะสม+(Carbon Credit: MtCO2)"
                    legendBar="คาร์บอนเครดิต / ปี+(Carbon Credit / Year)"
                    data="carbon"
                    info={information[3].value}
                    area={eqValue.aboveEq?.value?.area}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CustomBox>
        </GridItem>

        <GridItem colSpan={{ xl: 3 }}>
          {/* Map */}
          <CustomBox h="60vh">
            <SelectTree setSelectValue={setSelectValue} />
            <Map mapInfo={mapInfo} selectInfo={selectValue} />
          </CustomBox>

          <Grid templateColumns={{ lg: "repeat(3,1fr)" }} gap={2}>
            {/* Layout Info */}
            <GridItem>
              <CustomBox h="98%">
                <OverviewInfo information={information} />
              </CustomBox>
            </GridItem>

            {/* Tree Info */}
            <GridItem colSpan={{ lg: 2 }}>
              <CustomBox h="28vh" overflow="auto">
                <Tables
                  head={tableHead}
                  data={dataTable.sort((a, b) => b.co2 - a.co2).slice(0, 51)}
                />
              </CustomBox>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
}
