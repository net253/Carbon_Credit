import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function calculateCarbon() {
  const eqValue = useSelector((state) => state.eqValue);
  const allTreeInfo = useSelector((state) => state.allTreeInfo);
  const { palmEq, saplingEq, treeEq, aboveEq, belowEq } = eqValue;

  const [totalC, setTotalC] = useState(0);

  const tree = (d, h) => {
    const { variable } = treeEq;

    let ws =
      Number(variable.ws[0]) *
      (d ** Number(variable.ws[1]) * h) ** Number(variable.ws[2]);
    let wb =
      Number(variable.wb[0]) *
      (d ** Number(variable.wb[1]) * h) ** Number(variable.wb[2]);
    let wl =
      (Number(variable.wl[0]) / (ws + wb + Number(variable.wl[1]))) **
      Number(variable.wl[2]);
    let wt = ws + wb + wl;

    return wt;
  };

  const sapling = (d, h) => {
    const { variable } = saplingEq;
    let ws =
      Number(variable.ws[0]) *
      (d ** Number(variable.ws[1]) * h) ** Number(variable.ws[2]);
    let wb =
      Number(variable.wb[0]) *
      (d ** Number(variable.wb[1]) * h) ** Number(variable.wb[2]);
    let wl =
      Number(variable.wl[0]) *
      (d ** Number(variable.wl[1]) * h) ** Number(variable.wl[2]);
    let wt = ws + wb + wl;

    return wt;
  };

  const palm = (h) => {
    const { variable } = palmEq;
    let wt =
      Number(variable.wt[0]) +
      Number(variable.wt[1]) * h ** Number(variable.wt[2]) * Math.log(h);
    return wt;
  };

  const cBLG = (cTree, cSap, cPalm) => {
    const { value } = belowEq;
    return (
      cTree * Number(value.blg[0]) +
      cSap * Number(value.blg[1]) +
      cPalm * Number(value.blg[2])
    );
  };

  const area = (zone, value) => {
    const A = Number(value.area[0]) / Number(value.a[0]);
    const B = Number(value.area[1]) / Number(value.a[1]);
    const C = Number(value.area[2]) / Number(value.a[2]);
    const D = Number(value.area[3]) / Number(value.a[3]);
    const Park = Number(value.area[4]) / Number(value.a[4]);
    return zone == "A"
      ? A
      : zone == "B"
      ? B
      : zone == "C"
      ? C
      : zone == "D"
      ? D
      : Park;
  };

  const handleCal = (allTreeInfo) => {
    const { value } = aboveEq;
    const {
      value: { blg },
    } = belowEq;

    const treeArr = [];
    const sapArr = [];
    const palmArr = [];

    allTreeInfo.map((info) => {
      const { properties } = info;

      //* Check Zone
      const zone = area(properties.zone, value);

      //* Check Tree Type
      if (properties.treeType == 1) {
        const wt = tree(properties.d, properties.h);
        const cTree =
          wt * Number(value.cf[0]) * (44 / 12) * zone * Number(blg[0]);
        treeArr.push(cTree);
      } else if (properties.treeType == 2) {
        const wt = sapling(properties.d, properties.h);
        const cSap =
          wt * Number(value.cf[1]) * (44 / 12) * zone * Number(blg[1]);
        sapArr.push(cSap);
      } else if (properties.treeType == 3) {
        const wt = palm(properties.h);
        const cPalm =
          wt * Number(value.cf[2]) * (44 / 12) * zone * Number(blg[2]);
        palmArr.push(cPalm);
      }
    });

    //* Sumary Carbon Credit
    const cTree = treeArr.reduce((pre, cur) => pre + cur, 0);
    const cSap = sapArr.reduce((pre, cur) => pre + cur, 0);
    const cPalm = palmArr.reduce((pre, cur) => pre + cur, 0);

    const total = cBLG(cTree, cSap, cPalm) + cTree + cSap + cPalm;
    // setTotalC(total / 1000);

    // console.log(palmArr);
  };

  useEffect(() => {
    const initPage = setTimeout(() => {
      if (allTreeInfo && eqValue) {
        handleCal(allTreeInfo);
      }
    }, 100);

    return () => clearTimeout(initPage);
  }, [allTreeInfo]);
}
