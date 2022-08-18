import React, { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  Textarea,
  FormControl,
  FormLabel,
  Center,
  Text,
  Box,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  AbleInput,
  CustomSelect,
  mainInput,
  textInput,
  ZoneSelect,
} from "../components/element/RegisterEl";

import axios from "axios";
import { treePath } from "../components/UrlPath";
import Swal from "sweetalert2";

const treeDetail = {
  circumference: "",
  height: "",
  treeCode: "",
  latitude: "",
  longitude: "",
  treeAge: "",
  carbonCredit: 0,
  image: "",
  zone: "",
};
const initialValue = {
  treeName: "",
  scientificName: "",
  plantNumber: "",
  plantDate: "",
  type: "",
  other: "",
  area: "",
};

export default function Register() {
  const { treeType } = useSelector((state) => state.overviewInfo);
  const allTreeInfo = useSelector((state) => state.allTreeInfo);

  const [treeVol, setTreeVol] = useState();
  const [fillValue, setFillValue] = useState(initialValue);
  const [detail, setDetail] = useState([]);
  const [autoFill, setAutoFill] = useState("");
  const [buttonVal, setButtonVal] = useState(true);

  const treeOptions = treeType?.map((info) => ({
    value: info.TREES_NAME,
    label: info.TREES_NAME,
  }));

  // * ON CHANGE FUNCTION * //
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "plantNumber") {
      setTreeVol(value);
    }
    setFillValue({ ...fillValue, [name]: value });
  };
  const detailChange = (e, i) => {
    const { name, value } = e.target;

    const copyArr = [...detail];
    const editArr = { ...detail[i], [name]: value };

    copyArr[i] = editArr;
    setDetail(copyArr);
  };
  const handleImage = (e, i) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
      const copyArr = [...detail];
      const editArr = { ...detail[i], image: reader.result };

      copyArr[i] = editArr;
      setDetail(copyArr);
    };
    reader.readAsDataURL(file);
  };

  // ! AUTOFILL INPUT FUNCTION ! //
  const autoFillInput = () => {
    const { properties } = allTreeInfo?.find(
      (info) => info.properties.description == autoFill
    );
    setFillValue({
      ...fillValue,
      treeName: properties.description,
      scientificName: properties.sciName,
      type: properties.treeType,
    });
  };
  useEffect(() => {
    const initPage = setTimeout(() => {
      if (autoFill != "") {
        autoFillInput();
      } else {
        setFillValue(initialValue);
      }
    }, 0);

    return () => {
      clearTimeout(initPage);
    };
  }, [autoFill]);

  // * BUTTON FUNCTION * //
  const handleNext = () => {
    const arr = [];
    for (let i = 0; i < treeVol; i++) {
      arr.push(treeDetail);
    }
    setDetail(arr);
  };
  const handleSave = () => {
    const formatAxios = detail.map((info) => ({ ...fillValue, ...info }));
    console.log(formatAxios);

    axios.post(treePath, formatAxios).then(({ data }) => {
      if (data.state) {
        Swal.fire({
          icon: "success",
          title: "Save completed",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        console.log(data);
        Swal.fire({
          icon: "error",
          title: data.message.toUpperCase(),
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  };

  // ! CHECK INPUT TO DISABLE BUTTON ! //
  const getDisable = () => {
    const arr = detail.map(
      (info) =>
        info.zone == "" ||
        info.treeCode == "" ||
        info.circumference == "" ||
        info.height == ""
    );

    if (arr.every((el) => el == false)) {
      setButtonVal(false);
    } else {
      setButtonVal(true);
    }
  };
  useEffect(() => {
    const initPage = setTimeout(() => getDisable(), 0);
    return () => clearTimeout(initPage);
  }, [detail]);

  return (
    <>
      <Center>
        <Box
          bgColor="white"
          rounded="xl"
          shadow="md"
          p={3}
          w={{ base: "100%", lg: "60%" }}
          overflow="auto"
          maxH="88vh"
        >
          <Text textAlign="center" fontSize="xl" fontWeight="bold" mb={4}>
            ลงทะเบียนต้นไม้ (Plant Register)
          </Text>

          <Grid
            templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(2,1fr)" }}
            gap={2}
          >
            {/* Select Autofill */}
            <GridItem colSpan={{ base: 1, lg: 2 }} mb={4}>
              <CustomSelect
                options={treeOptions}
                onChange={(value) => setAutoFill(value.value)}
              />
            </GridItem>

            {/* Main */}
            {mainInput.map((info, i) => (
              <React.Fragment key={i}>
                <GridItem my={2}>
                  <AbleInput
                    type={info.type}
                    text={info.thai}
                    name={info.name[0]}
                    onChange={handleChange}
                    value={fillValue[info.name[0]]}
                  />
                </GridItem>
                <GridItem my={2}>
                  <AbleInput
                    type={info.type}
                    text={info.eng}
                    disabled={true}
                    readOnly={true}
                    name={info.name[1]}
                    onChange={handleChange}
                    value={fillValue[info.name[1]]}
                  />
                </GridItem>
              </React.Fragment>
            ))}

            {/* Indicator */}
            <GridItem pl={4}>
              <Text fontSize="small" color="gray.500">
                หมายเหตุประเภทต้นไม้ <br /> 1: ไม้ต้น (Tree) / 2: ไม้หนุ่ม
                (Sapling) / 3: ปาล์ม (Palm)
              </Text>
            </GridItem>

            {/* Other */}
            <GridItem my={1} colSpan={{ lg: 2 }}>
              <FormControl px={2}>
                <FormLabel fontWeight="normal">
                  ข้อมูลอื่นๆ (Other information)
                </FormLabel>
                <Textarea
                  placeholder=" "
                  name="other"
                  rows={5}
                  value={fillValue["other"]}
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>

            {/* Next Button */}
            <GridItem colSpan={{ lg: 2 }} textAlign="end" my={2}>
              <Button
                onClick={handleNext}
                w="20%"
                rounded="full"
                disabled={!treeVol || treeVol < 1 || !fillValue.plantDate}
                colorScheme="linkedin"
                size="sm"
              >
                ต่อไป (Next)
              </Button>
              {!treeVol && (
                <Text fontSize="small" color="red" mt={1}>
                  กรุณาระบุจำนวนต้นไม้ (Please enter plant volume)
                </Text>
              )}
            </GridItem>

            {/* Detail */}
            {detail.map((_, j) => (
              <React.Fragment key={`tree ${j + 1}`}>
                <GridItem colSpan={2} pl={3} mt={4} fontWeight="semibold">
                  ต้นที่ {j + 1}
                </GridItem>

                {textInput.map((info, i) => (
                  <React.Fragment key={i}>
                    <GridItem my={1}>
                      {info.type == "select" ? (
                        <ZoneSelect
                          onChange={(e) => {
                            const el = {
                              target: { name: "zone", value: e.value },
                            };
                            detailChange(el, j);
                          }}
                        />
                      ) : (
                        <AbleInput
                          type={info.type}
                          text={info.thai}
                          name={info.name[0]}
                          onChange={(e) => detailChange(e, j)}
                          value={detail[j][info.name[0]]}
                        />
                      )}
                    </GridItem>
                    <GridItem my={1}>
                      <AbleInput
                        type={info.type}
                        text={info.eng}
                        disabled={info.name[1] != "longitude"}
                        readOnly={info.name[1] != "longitude"}
                        name={info.name[1]}
                        onChange={(e) => detailChange(e, j)}
                        value={detail[j][info.name[1]]}
                      />
                    </GridItem>
                  </React.Fragment>
                ))}

                <GridItem colSpan={2}>
                  <input
                    type="file"
                    accept="image/png,image/jpeg.text"
                    name="image"
                    onChange={(e) => handleImage(e, j)}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <Divider border="1px" mt={3} borderColor="gray.300" />
                </GridItem>
              </React.Fragment>
            ))}

            {/* Save */}
            {detail != "" && (
              <GridItem colSpan={2} textAlign="end" my={2}>
                <Button
                  w="20%"
                  rounded="full"
                  colorScheme="whatsapp"
                  size="sm"
                  mr={3}
                  onClick={handleSave}
                  isDisabled={buttonVal}
                >
                  บันทึก (Save)
                </Button>
                <Button w="20%" rounded="full" colorScheme="red" size="sm">
                  ยกเลิก (Cancel)
                </Button>
              </GridItem>
            )}
          </Grid>
        </Box>
      </Center>
    </>
  );
}
