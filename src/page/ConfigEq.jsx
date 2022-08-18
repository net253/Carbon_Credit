import React, { useState } from "react";
import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid,
  Input,
  HStack,
  Button,
  Spinner,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { eqPath } from "../components/UrlPath";
import CalculateCarbon from "../components/libs/CalculateCarbon.jsx";

const CustomBox = ({ children }) => (
  <Box bgColor="white" rounded="xl" shadow="md" h="80vh" overflow="auto" p={3}>
    {children}
  </Box>
);

const CustomGrid = ({ children }) => (
  <SimpleGrid columns={{ base: 1, lg: 2 }}>{children}</SimpleGrid>
);

const TextSymbol = ({ arr }) => {
  const arrayEq = [...arr];
  return (
    <Box display="flex" justifyContent="left" w="100%" my={3}>
      {arrayEq.map((info, i) => (
        <Text key={i} fontSize={{ base: "lg", lg: "2xl" }}>
          {info.normal == "sigma" ? <span>Σ</span> : info.normal}
          <sup>{info.top}</sup> <sub>{info.below}</sub>
        </Text>
      ))}
    </Box>
  );
};

export default function ConfigEq() {
  const navigate = useNavigate();
  const eqValue = useSelector((state) => state.eqValue);
  const {
    totalEq,
    palmEq,
    saplingEq,
    treeEq,
    aboveEq,
    belowEq,
    other,
    initialValue,
  } = eqValue;

  const initial = {
    router: "/update-allometric",
  };

  const defaultValue = { ...initialValue };
  const [editValue, setEditValue] = useState(initial);

  const handleSave = () => {
    const formInput = { ...defaultValue[0], ...editValue };
    Swal.fire({
      icon: "warning",
      title: "โปรดยืนยันความถูกต้องของข้อมูล",
      html: "เนื่องจากข้อมูลข้างต้นมีผลต่อการคำนวนคาร์บอนเครดิต",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(formInput);

        axios.post(eqPath, { ...formInput }).then(({ data }) => {
          if (data.state) {
            Swal.fire({
              icon: "success",
              title: "บันทึกสำเร็จ",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => window.location.reload());
          } else {
            Swal.fire({
              icon: "error",
              title: "บันทึกไม่สำเร็จ",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValue({ ...editValue, [name]: value });
  };

  const handleCancel = () => {
    Swal.fire({
      icon: "warning",
      title: "ยกเลิกการแก้ไขสูตรคำนวน",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  if (!treeEq || !palmEq || !saplingEq) {
    return (
      <Box h="89vh" display="flex" justifyContent="center" alignItems="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          my={4}
        />
      </Box>
    );
  }

  return (
    <>
      <CustomBox>
        <Accordion defaultIndex={[0]} allowMultiple>
          {/* Tree */}
          <AccordionItem>
            <AccordionButton _expanded={{ bg: "green", color: "white" }}>
              <Box flex="1" textAlign="left" fontWeight="bold">
                กลุ่มพรรณไม้ทั่วไป (Tree)
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CustomGrid>
                <Box>
                  <TextSymbol arr={treeEq["ws"]} />
                  <TextSymbol arr={treeEq["wb"]} />
                  <TextSymbol arr={treeEq["wl"]} />
                  <TextSymbol arr={treeEq["wt"]} />
                </Box>
                <Box>
                  <HStack my={3}>
                    {treeEq.variable.ws.map((value, i) => (
                      <Input
                        key={i}
                        variant="filled"
                        size="sm"
                        type="number"
                        placeholder={value}
                        name={treeEq.name.ws[i]}
                        onChange={handleChange}
                        defaultValue={editValue[treeEq.name.ws[i]]}
                      />
                    ))}
                  </HStack>
                  <HStack my={3}>
                    {treeEq.variable.wb.map((value, i) => (
                      <Input
                        key={i}
                        variant="filled"
                        size="sm"
                        type="number"
                        placeholder={value}
                        name={treeEq.name.wb[i]}
                        onChange={handleChange}
                        defaultValue={editValue[treeEq.name.wb[i]]}
                      />
                    ))}
                  </HStack>
                  <HStack my={3}>
                    {treeEq.variable.wl.map((value, i) => (
                      <Input
                        key={i}
                        variant="filled"
                        size="sm"
                        type="number"
                        placeholder={value}
                        name={treeEq.name.wl[i]}
                        onChange={handleChange}
                        defaultValue={editValue[treeEq.name.wl[i]]}
                      />
                    ))}
                  </HStack>
                </Box>
              </CustomGrid>
            </AccordionPanel>
          </AccordionItem>

          {/* Sapling */}
          <AccordionItem>
            <AccordionButton _expanded={{ bg: "green", color: "white" }}>
              <Box flex="1" textAlign="left" fontWeight="bold">
                กลุ่มไม้หนุ่ม (Sapling)
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CustomGrid>
                <Box>
                  <TextSymbol arr={saplingEq["ws"]} />
                  <TextSymbol arr={saplingEq["wb"]} />
                  <TextSymbol arr={saplingEq["wl"]} />
                  <TextSymbol arr={saplingEq["wt"]} />
                </Box>
                <Box>
                  <HStack my={3}>
                    {saplingEq.variable.ws.map((value, i) => (
                      <Input
                        key={i}
                        variant="filled"
                        size="sm"
                        type="number"
                        placeholder={value}
                        name={saplingEq.name.ws[i]}
                        onChange={handleChange}
                        defaultValue={editValue[saplingEq.name.ws[i]]}
                      />
                    ))}
                  </HStack>
                  <HStack my={3}>
                    {saplingEq.variable.wb.map((value, i) => (
                      <Input
                        key={i}
                        variant="filled"
                        size="sm"
                        type="number"
                        placeholder={value}
                        name={saplingEq.name.wb[i]}
                        onChange={handleChange}
                        defaultValue={editValue[saplingEq.name.wb[i]]}
                      />
                    ))}
                  </HStack>
                  <HStack my={3}>
                    {saplingEq.variable.wl.map((value, i) => (
                      <Input
                        key={i}
                        variant="filled"
                        size="sm"
                        type="number"
                        placeholder={value}
                        name={saplingEq.name.wl[i]}
                        onChange={handleChange}
                        defaultValue={editValue[saplingEq.name.wl[i]]}
                      />
                    ))}
                  </HStack>
                </Box>
              </CustomGrid>
            </AccordionPanel>
          </AccordionItem>

          {/* Palm */}
          <AccordionItem>
            <AccordionButton _expanded={{ bg: "green", color: "white" }}>
              <Box flex="1" textAlign="left" fontWeight="bold">
                กลุ่มปาล์ม (Palm)
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CustomGrid>
                <TextSymbol arr={palmEq["wt"]} />
                <HStack my={3}>
                  {palmEq.variable.wt.map((value, i) => (
                    <Input
                      key={i}
                      variant="filled"
                      size="sm"
                      type="number"
                      placeholder={value}
                      name={palmEq.name.wt[i]}
                      onChange={handleChange}
                      defaultValue={editValue[palmEq.name.wt[i]]}
                    />
                  ))}
                </HStack>
              </CustomGrid>
            </AccordionPanel>
          </AccordionItem>

          {/* Aboveground */}
          <AccordionItem>
            <AccordionButton _expanded={{ bg: "green", color: "white" }}>
              <Box flex="1" textAlign="left" fontWeight="bold">
                มวลเหนือดิน (Aboveground Biomass)
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CustomGrid>
                <Box>
                  <TextSymbol arr={aboveEq.eq.abg} />
                  <TextSymbol arr={aboveEq.eq.abgi} />
                </Box>
                <Box>
                  <HStack my={3}>
                    <Text>CF</Text>
                    {aboveEq.variable.cf.map((value, i) => (
                      <Input
                        key={i}
                        variant="filled"
                        size="sm"
                        type="number"
                        placeholder={value}
                        name={aboveEq.name.cf[i]}
                        onChange={handleChange}
                        defaultValue={editValue[aboveEq.name.cf[i]]}
                      />
                    ))}
                  </HStack>
                  <HStack my={3}>
                    <Text>A</Text>
                    {aboveEq.variable.area.map((value, i) => (
                      <Input
                        key={i}
                        variant="filled"
                        size="sm"
                        type="number"
                        placeholder={value}
                        name={aboveEq.name.area[i]}
                        onChange={handleChange}
                        defaultValue={editValue[aboveEq.name.area[i]]}
                      />
                    ))}
                    <Text>ไร่</Text>
                  </HStack>
                  <HStack my={3}>
                    <Text>a</Text>
                    {aboveEq.variable.a.map((value, i) => (
                      <Input
                        key={i}
                        variant="filled"
                        size="sm"
                        type="number"
                        placeholder={value}
                        name={aboveEq.name.a[i]}
                        onChange={handleChange}
                        defaultValue={editValue[aboveEq.name.a[i]]}
                      />
                    ))}
                    <Text>ไร่</Text>
                  </HStack>
                </Box>
              </CustomGrid>
            </AccordionPanel>
          </AccordionItem>

          {/* Belowground */}
          <AccordionItem>
            <AccordionButton _expanded={{ bg: "green", color: "white" }}>
              <Box flex="1" textAlign="left" fontWeight="bold">
                มวลใต้ดิน (Belowground Biomass)
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CustomGrid>
                <Box>
                  <TextSymbol arr={belowEq.eq.blg} />
                  <TextSymbol arr={belowEq.eq.blgi} />
                </Box>

                <HStack my={3}>
                  <Text>R</Text>
                  {belowEq.variable.blg.map((value, i) => (
                    <Input
                      key={i}
                      variant="filled"
                      size="sm"
                      type="number"
                      placeholder={value}
                      name={belowEq.name.blg[i]}
                      onChange={handleChange}
                      defaultValue={editValue[belowEq.name.blg[i]]}
                    />
                  ))}
                </HStack>
              </CustomGrid>
            </AccordionPanel>
          </AccordionItem>

          {/* Total */}
          <AccordionItem>
            <AccordionButton _expanded={{ bg: "green", color: "white" }}>
              <Box flex="1" textAlign="left" fontWeight="bold">
                ผลรวมคาร์บอน (Total Carbon)
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CustomGrid>
                <TextSymbol arr={totalEq} />
              </CustomGrid>
            </AccordionPanel>
          </AccordionItem>

          {/* Other */}
          <AccordionItem>
            <AccordionButton _expanded={{ bg: "green", color: "white" }}>
              <Box flex="1" textAlign="left" fontWeight="bold">
                ข้อมูลอื่นๆที่เกี่ยวข้อง (Other Information)
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pt={4}>
              {other.map((info, i) => (
                <SimpleGrid columns={{ base: 1, xl: 2 }} key={i}>
                  <Text>{info.text}</Text>
                  <Input
                    variant="filled"
                    size="sm"
                    w="100%"
                    placeholder={info.value}
                    mb={5}
                    type="number"
                    name={info.name}
                    onChange={handleChange}
                  />
                </SimpleGrid>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CustomBox>

      {/* Button */}
      <Box textAlign="end" my={4}>
        <Button mr={3} colorScheme="green" rounded="full" onClick={handleSave}>
          คำนวน
        </Button>
        <Button colorScheme="red" rounded="full" onClick={handleCancel}>
          ยกเลิก
        </Button>
      </Box>

      {/* <CalculateCarbon /> */}
    </>
  );
}
