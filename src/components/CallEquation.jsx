import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateEquationInfo } from "../store/slice/equationSlice";
import { eqPath } from "./UrlPath";
import axios from "axios";

export default function CallEquation() {
  const dispatch = useDispatch();
  const [formRedux, setFormRedux] = useState({
    treeEq: "",
    saplingEq: "",
    palmEq: "",
    totalEq: "",
    aboveEq: "",
    belowEq: "",
    other: "",
    initialValue: "",
  });
  const str2Num = (str) => Number(str).toFixed(5);

  const getEqValue = () => {
    axios.post(eqPath, { router: "/all-allometric" }).then(({ data }) => {
      const treeEq = {
        ws: [
          { normal: "W", below: "S", top: "" },
          {
            normal: `= ${str2Num(data[0].TREE_S_1)} (D`,
            below: "",
            top: Number(data[0].TREE_S_2),
          },
          { normal: "H)", below: "", top: str2Num(data[0].TREE_S_3) },
        ],
        wb: [
          { normal: "W", below: "B", top: "" },
          {
            normal: `= ${str2Num(data[0].TREE_B_1)} (D`,
            below: "",
            top: Number(data[0].TREE_B_2),
          },
          { normal: "H)", below: "", top: str2Num(data[0].TREE_B_3) },
        ],
        wl: [
          { normal: "W", below: "L", top: "" },
          { normal: `= (${str2Num(data[0].TREE_L_1)} / `, below: "", top: "" },
          { normal: "W", below: "S", top: "" },
          { normal: "+", below: "", top: "" },
          { normal: "W", below: "B", top: "" },
          {
            normal: `+ ${str2Num(data[0].TREE_L_2)}))`,
            below: "",
            top: Number(data[0].TREE_L_3),
          },
        ],
        wt: [
          { normal: "W", below: "T", top: "" },
          { normal: "= W", below: "S", top: "" },
          { normal: "+", below: "", top: "" },
          { normal: "W", below: "B", top: "" },
          { normal: "+", below: "", top: "" },
          { normal: "W", below: "L", top: "" },
        ],
        variable: {
          ws: [
            str2Num(data[0].TREE_S_1),
            str2Num(data[0].TREE_S_2),
            str2Num(data[0].TREE_S_3),
          ],
          wb: [
            str2Num(data[0].TREE_B_1),
            str2Num(data[0].TREE_B_2),
            str2Num(data[0].TREE_B_3),
          ],
          wl: [
            str2Num(data[0].TREE_L_1),
            str2Num(data[0].TREE_L_2),
            str2Num(data[0].TREE_L_3),
          ],
        },
        name: {
          ws: ["TREE_S_1", "TREE_S_2", "TREE_S_3"],
          wb: ["TREE_B_1", "TREE_B_2", "TREE_B_3"],
          wl: ["TREE_L_1", "TREE_L_2", "TREE_L_3"],
        },
      };

      const saplingEq = {
        ws: [
          { normal: "W", below: "S", top: "" },
          {
            normal: `= ${str2Num(data[0].SAPLING_S_1)} (D`,
            below: "",
            top: Number(data[0].SAPLING_S_2),
          },
          { normal: "H)", below: "", top: str2Num(data[0].SAPLING_S_3) },
        ],
        wb: [
          { normal: "W", below: "B", top: "" },
          {
            normal: `= ${str2Num(data[0].SAPLING_B_1)} (D`,
            below: "",
            top: Number(data[0].SAPLING_B_2),
          },
          { normal: "H)", below: "", top: str2Num(data[0].SAPLING_B_3) },
        ],
        wl: [
          { normal: "W", below: "L", top: "" },
          {
            normal: `= ${str2Num(data[0].SAPLING_L_1)} (D`,
            below: "",
            top: Number(data[0].SAPLING_L_2),
          },
          { normal: "H)", below: "", top: str2Num(data[0].SAPLING_L_3) },
        ],
        wt: [
          { normal: "W", below: "T", top: "" },
          { normal: "= W", below: "S", top: "" },
          { normal: "+", below: "", top: "" },
          { normal: "W", below: "B", top: "" },
          { normal: "+", below: "", top: "" },
          { normal: "W", below: "L", top: "" },
        ],
        variable: {
          ws: [
            str2Num(data[0].SAPLING_S_1),
            str2Num(data[0].SAPLING_S_2),
            str2Num(data[0].SAPLING_S_3),
          ],
          wb: [
            str2Num(data[0].SAPLING_B_1),
            str2Num(data[0].SAPLING_B_2),
            str2Num(data[0].SAPLING_B_3),
          ],
          wl: [
            str2Num(data[0].SAPLING_L_1),
            str2Num(data[0].SAPLING_L_2),
            str2Num(data[0].SAPLING_L_3),
          ],
        },
        name: {
          ws: ["SAPLING_S_1", "SAPLING_S_2", "SAPLING_S_3"],
          wb: ["SAPLING_B_1", "SAPLING_B_2", "SAPLING_B_3"],
          wl: ["SAPLING_L_1", "SAPLING_L_2", "SAPLING_L_3"],
        },
      };

      const palmEq = {
        wt: [
          { normal: "W", below: "T", top: "" },
          {
            normal: `= ${str2Num(data[0].PALM_T_1)} + ${str2Num(
              data[0].PALM_T_2
            )} (H)`,
            below: "",
            top: str2Num(data[0].PALM_T_3),
          },
          { normal: "(In H)", below: "", top: "" },
        ],
        variable: {
          wt: [
            str2Num(data[0].PALM_T_1),
            str2Num(data[0].PALM_T_2),
            str2Num(data[0].PALM_T_3),
          ],
        },
        name: {
          wt: ["PALM_T_1", "PALM_T_2", "PALM_T_3"],
        },
      };

      const totalEq = [
        { normal: "C", below: "TT", top: "" },
        { normal: "=", below: "", top: "" },
        { normal: "C", below: "ABG", top: "" },
        { normal: "+", below: "", top: "" },
        { normal: "C", below: "BLG", top: "" },
      ];

      const aboveEq = {
        eq: {
          abg: [
            { normal: "C", below: "ABG", top: "" },
            { normal: "=", below: "", top: "" },
            { normal: "sigma", below: "i=1", top: "n" },
            { normal: "C", below: "ABG,i", top: "" },
          ],
          abgi: [
            { normal: "C", below: "ABG,i", top: "" },
            { normal: "= (", below: "", top: "" },
            { normal: "sigma", below: "j=1", top: "n" },
            { normal: "M", below: "j", top: "" },
            { normal: "x CF x 44/12) A/a", below: "", top: "" },
          ],
        },
        variable: {
          cf: [
            `พรรณไม้ทั่วไป = ${str2Num(data[0].CF_TREE)}`,
            `ไม้หนุ่ม = ${str2Num(data[0].CF_SAPLING)}`,
            `ปาล์ม = ${str2Num(data[0].CF_PALM)}`,
          ],
          area: [
            `A ${str2Num(data[0].AREA_A)}`,
            `B ${str2Num(data[0].AREA_B)}`,
            `C ${str2Num(data[0].AREA_C)}`,
            `D ${str2Num(data[0].AREA_D)}`,
            `Park ${str2Num(data[0].AREA_PARK)}`,
            `Water Bank `,
          ],
          a: [
            `A ${str2Num(data[0].area_aa)}`,
            `B ${str2Num(data[0].area_bb)}`,
            `C ${str2Num(data[0].area_cc)}`,
            `D ${str2Num(data[0].area_dd)}`,
            `Park ${str2Num(data[0].area_pp)}`,
            `Water Bank `,
          ],
        },
        name: {
          cf: ["CF_TREE", "CF_SAPLING", "CF_PALM"],
          area: [
            "AREA_A",
            "AREA_B",
            "AREA_C",
            "AREA_D",
            "AREA_PARK",
            "AREA_WATER",
          ],
          a: ["area_aa", "area_bb", "area_cc", "area_dd", "area_pp", "area_ww"],
        },
        value: {
          cf: [
            str2Num(data[0].CF_TREE),
            str2Num(data[0].CF_SAPLING),
            str2Num(data[0].CF_PALM),
          ],
          area: [
            str2Num(data[0].AREA_A),
            str2Num(data[0].AREA_B),
            str2Num(data[0].AREA_C),
            str2Num(data[0].AREA_D),
            str2Num(data[0].AREA_PARK),
            0,
          ],
          a: [
            str2Num(data[0].area_aa),
            str2Num(data[0].area_bb),
            str2Num(data[0].area_cc),
            str2Num(data[0].area_dd),
            str2Num(data[0].area_pp),
            str2Num(data[0].area_ww),
          ],
        },
      };

      const belowEq = {
        eq: {
          blg: [
            { normal: "C", below: "BLG", top: "" },
            { normal: "=", below: "", top: "" },
            { normal: "sigma", below: "i=1", top: "n" },
            { normal: "C", below: "BLG,i", top: "" },
          ],
          blgi: [
            { normal: "C", below: "BLG,i", top: "" },
            { normal: "=", below: "", top: "" },
            { normal: "C", below: "ABG,i", top: "" },
            { normal: "x R", below: "", top: "" },
          ],
        },
        variable: {
          blg: [
            `พรรณไม้ทั่วไป = ${str2Num(data[0].R_TREE)}`,
            `ไม้หนุ่ม = ${str2Num(data[0].R_SAPLING)}`,
            `ปาล์ม = ${str2Num(data[0].R_PALM)}`,
          ],
        },
        name: {
          blg: ["R_TREE", "R_SAPLING", "R_PALM"],
        },
        value: {
          blg: [
            str2Num(data[0].R_TREE),
            str2Num(data[0].R_SAPLING),
            str2Num(data[0].R_PALM),
          ],
        },
      };

      const other = [
        {
          text: "อัตราการเพิ่มพูนของการกักเก็บคาร์บอนของมวลชีวภาพรวมของไม้พื้นเมืองโตช้า",
          value: `${str2Num(data[0].RATE)} ตันคาร์บอน / ไร่ / ปี`,
          name: "RATE",
        },
        {
          text: "คิดเป็นการกักเก็บก๊าซคาร์บอนไดออกไซต์ในมวลชีวภาพรวม (คณะวนศาสตร์, 2554)",
          value: `${str2Num(data[0].PERCENTAGE)} ตันคาร์บอน / ไร่ / ปี`,
          name: "PERCENTAGE",
        },
      ];

      const initialValue = data;

      setFormRedux({
        ...formRedux,
        treeEq: treeEq,
        saplingEq: saplingEq,
        palmEq: palmEq,
        totalEq: totalEq,
        aboveEq: aboveEq,
        belowEq: belowEq,
        other: other,
        initialValue: initialValue,
      });
    });
  };

  useEffect(() => {
    const initPage = setTimeout(() => getEqValue(), 0);

    return () => clearTimeout(initPage);
  }, []);

  useEffect(() => {
    dispatch(updateEquationInfo({ ...formRedux }));
  }, [formRedux]);
}
