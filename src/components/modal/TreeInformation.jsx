import React from "react";
import {
  Grid,
  GridItem,
  Input,
  Textarea,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";

const textInput = [
  {
    thai: "โซน (Zone)",
    name: "zone",
    type: "text",
  },
  {
    thai: "รหัสทะเบียน (Tree Code)",
    name: "treeCode",
    type: "text",
  },
  {
    thai: "ชื่อต้นไม้ (Tree Name)",
    name: "treeName",
    type: "text",
  },
  {
    thai: "ชื่อวิทยาศาสตร์ (Scientific Name)",
    name: "scientificName",
    type: "text",
  },
  {
    thai: "GPS (Latitude)",
    name: "latitude",
    type: "number",
  },
  {
    thai: "GPS (Longitude)",
    name: "longitude",
    type: "number",
  },
  {
    thai: "วันที่ปลูก (Plant Date)",
    name: "plantDate",
    type: "",
  },
  {
    thai: "เส้นผ่านศูนย์กลางที่ความสูง 1.3 เมตร (Diameter at a Height of 1.3 m. [cm.])",
    name: "circumference",
    type: "number",
  },
  {
    thai: "ความสูงทั้งหมด (Tree Height [m.])",
    name: "height",
    type: "number",
  },
  {
    thai: "คาร์บอนเครดิต/วัน (Carbon Credit/Day [kg.CO2])",
    name: "carbonCredit",
    type: "number",
  },
];

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <FormControl variant="floating" ref={ref}>
    <Input
      placeholder=" "
      onClick={onClick}
      value={value}
      readOnly
      rounded="full"
    />
    <FormLabel fontWeight="normal">วันที่ปลูก</FormLabel>
  </FormControl>
));

const AbleInput = ({ type, text, disabled, onChange, name, value }) => (
  <FormControl variant="floating">
    <Input
      name={name}
      placeholder={" "}
      rounded="full"
      type={type}
      readOnly={disabled}
      // disabled={name == "treeCode"}
      onChange={onChange}
      value={value}
    />
    <FormLabel fontWeight="normal">{text}</FormLabel>
  </FormControl>
);

export default function TreeInformation({ fillValue, setFillValue, edit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFillValue({ ...fillValue, [name]: value });
  };

  return (
    <>
      <Grid templateColumns="repeat(1,1fr)" gap={2}>
        {textInput.map((info, i) => (
          <React.Fragment key={i}>
            <GridItem my={1}>
              {info.name == "plantDate" ? (
                <DatePicker
                  selected={fillValue.plantDate}
                  onChange={(date) =>
                    setFillValue({ ...fillValue, plantDate: date })
                  }
                  customInput={<CustomInput />}
                  dateFormat="dd/MM/yyyy"
                  disabled={edit}
                />
              ) : (
                <AbleInput
                  type={info.type}
                  text={info.thai}
                  name={info.name}
                  onChange={handleChange}
                  disabled={edit}
                  value={fillValue[info.name]}
                />
              )}
            </GridItem>
          </React.Fragment>
        ))}

        <GridItem my={1}>
          <FormControl variant="floating">
            <Textarea
              placeholder=" "
              name="other"
              rows={3}
              disabled={edit}
              onChange={handleChange}
              value={fillValue["other"]}
            />
            <FormLabel fontWeight="normal">
              ข้อมูลอื่นๆ (Other information)
            </FormLabel>
          </FormControl>
        </GridItem>
      </Grid>
    </>
  );
}
