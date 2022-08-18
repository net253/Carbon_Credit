import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateOverviewInfo } from "../store/slice/overviewSlice";
import { updateTreeInfoInfo } from "../store/slice/treeInfoSlice";

import { overviewPath } from "./UrlPath";

export default function CallAPI() {
  const dispatch = useDispatch();

  const getData = axios.get(overviewPath).then(({ data: { results } }) => {
    const { carbonCredit, layout, treeVolume, treeType, overview } = results;

    const mapInfo = overview
      .filter((tree) => tree.LONGITUDE)
      .map((value, i) => {
        if (value.LONGITUDE && value.LATITUDE) {
          return {
            type: "Feature",
            properties: {
              id: value.TREES_ID,
              code: value.TREES_CODE,
              description: value.TREES_NAME,
              sciName: value.SCIENTIFIC_NAME,
              treeType: value.TYPE,
              d: Number(value.CIRCUMFERENCE),
              h: Number(value.HEIGHT),
              zone: value.ZONE,
              carbon: Number(value.C_ZONE).toFixed(5),
            },
            geometry: {
              type: "Point",
              coordinates: [Number(value.LONGITUDE), Number(value.LATITUDE)],
            },
          };
        }
      });

    dispatch(updateTreeInfoInfo(mapInfo));
    dispatch(
      updateOverviewInfo({
        carbonCredit: carbonCredit,
        layout: layout,
        treeVolume: treeVolume,
        treeType: treeType,
      })
    );
  });

  useEffect(() => {
    const initPage = setTimeout(() => getData, 0);

    return () => {
      clearTimeout(initPage);
    };
  }, []);
}
