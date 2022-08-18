import React, { useEffect, useState } from "react";
import { Text, Box } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { barData, areaData, areaCarbon, barCarbon } from "./Data";

const customizedLabel = ({ x, y, value }) => {
  var textLabel = value?.toString().split("");

  return (
    <text
      x={x + 20}
      y={y - 12}
      fill="black"
      textAnchor="end"
      dominantBaseline="central"
      fontSize="small"
      fontWeight={600}
    >
      {textLabel.length > 3
        ? textLabel.slice(0, 2).join("") + "k"
        : textLabel.join("")}
    </text>
  );
};

export default function Graph({
  color,
  legendArea,
  legendBar,
  data,
  info,
  area,
}) {
  const [carbonInfo, setCarbonInfo] = useState([
    { name: 2022, value: 0, carbon: 0 },
  ]);

  const vh = (v) => {
    var h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    return (v * h) / 100;
  };

  const calCarbon = () => {
    const arrCal = [];
    if (area) {
      const allArea = area?.reduce((pre, cur) => pre + Number(cur), 0);
      const baseCarbon = Number(info?.split(",")?.join(""));

      for (let i = 0; i < 10; i++) {
        const carbonCumu = baseCarbon + i * 0.95 * allArea;
        arrCal.push({
          name: 2022 + i,
          value: carbonCumu.toFixed(2),
          carbon:
            carbonCumu != baseCarbon
              ? Math.abs(baseCarbon - carbonCumu).toFixed(2)
              : 0,
        });
      }
    }

    setCarbonInfo(arrCal);
  };

  useEffect(() => {
    if (data == "carbon") {
      calCarbon();
    }
  }, [area]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        fontWeight="bold"
        fontSize="smaller"
      >
        <Text mr={2}>{legendArea.split("+")[0]} </Text>
        <Text>{legendArea.split("+")[1]} </Text>
      </Box>

      {/* AreaChart */}
      <ResponsiveContainer height={vh(20)}>
        <AreaChart
          data={data == "carbon" ? carbonInfo : areaData}
          margin={{ top: 20, right: 20, left: 20, bottom: 0 }}
        >
          {/* Color gradient */}
          <defs>
            <linearGradient id="B1DE80" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B1DE80" stopOpacity={1} />
              <stop offset="95%" stopColor="#B1DE80" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="63C6FF" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#63C6FF" stopOpacity={1} />
              <stop offset="95%" stopColor="#63C6FF" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="name" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="none"
            fill={`url(${color})`}
            label={customizedLabel}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>

      <Box
        display="flex"
        fontWeight="bold"
        alignItems="center"
        my={3}
        fontSize="smaller"
      >
        <Text mr={2}>{legendBar.split("+")[0]} </Text>
        <Text>{legendBar.split("+")[1]} </Text>
      </Box>

      {/* BarChart */}
      <ResponsiveContainer height={vh(19)}>
        <BarChart
          data={data == "carbon" ? carbonInfo : barData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
          }}
        >
          <XAxis dataKey="name" axisLine={false} />
          <YAxis hide={true} domain={[0, (dataMax) => dataMax * 1.8]} />
          <Tooltip />
          <Bar
            dataKey="carbon"
            fill={color}
            label={customizedLabel}
            radius={[20, 20, 20, 20]}
            barSize={20}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
