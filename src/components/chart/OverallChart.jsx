import React, { useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { treeData } from "../Data";
import { Text, Box } from "@chakra-ui/react";

const RADIAN = Math.PI / 180;
const activeShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fontWeight="bold"
        fontSize={18}
        fill={"#000"}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius + 15}
        outerRadius={outerRadius + 15}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const customizedLabel = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
    percent,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 10) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey + 5}
        textAnchor={textAnchor}
        fontSize={15}
      >
        {payload.name}
      </text>

      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text> */}
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        dy={23}
        textAnchor={textAnchor}
        fill="#999"
        fontSize={15}
      >
        {`(${value} ต้น)`}
      </text>
    </g>
  );
};

const COLORS = [
  "#E9EFC0",
  "#B4E197",
  "#83BD75",
  "#4E944F",
  "#3E753F",
  "#33A02C",
  "#FF8042",
  "#eee",
];

export default function OverallChart({ indexs }) {
  const [state, setState] = useState({ activeIndex: "" });
  const [hover, setHover] = useState(false);

  const onPieEnter = (_, index) => {
    setHover(true);
    setState({
      activeIndex: index,
    });
  };

  if (!hover && indexs != state.activeIndex) {
    setState({
      activeIndex: indexs,
    });
  }

  const vh = (v) => {
    var h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    return (v * h) / 100;
  };

  return (
    <>
      <ResponsiveContainer height={vh(36)}>
        <PieChart>
          <Pie
            activeIndex={state.activeIndex}
            activeShape={activeShape}
            data={treeData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={customizedLabel}
            innerRadius={50}
            outerRadius={80}
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={() => setHover(false)}
            animationDuration={800}
          >
            {treeData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
