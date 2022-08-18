import React from "react";
import { Text, Box } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { barData, areaData, areaCarbon, barCarbon } from "../Data";

const customizedLabel = ({ x, y, value }) => {
  var textLabel = value.toString().split("");

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

export default function Graph({ color, legendArea, legendBar, data }) {
  const vh = (v) => {
    var h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    return (v * h) / 100;
  };

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
          data={data == "carbon" ? areaCarbon : areaData}
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
          <Area
            type="monotone"
            dataKey="value"
            stroke="none"
            fill={`url(${color})`}
            label={customizedLabel}
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>

      <Box
        display="flex"
        fontWeight="bold"
        alignItems="center"
        my={2}
        fontSize="smaller"
      >
        <Text mr={2}>{legendBar.split("+")[0]} </Text>
        <Text>{legendBar.split("+")[1]} </Text>
      </Box>

      {/* BarChart */}
      <ResponsiveContainer height={vh(21)}>
        <BarChart
          data={data == "carbon" ? barCarbon : barData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
          }}
        >
          <XAxis dataKey="name" axisLine={false} />
          <Tooltip />
          <Bar
            dataKey="value"
            fill={color}
            label={customizedLabel}
            radius={[20, 20, 20, 20]}
            barSize={20}
            animationDuration={500}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
