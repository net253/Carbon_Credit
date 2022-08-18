import React, { useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

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
        y={cy - 10}
        dy={8}
        textAnchor="middle"
        fontWeight="bold"
        fontSize={18}
        fill={"#000"}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <text x={cx} y={cy + 20} textAnchor="middle" fill="#999" fontSize={15}>
        {`(${value} ต้น)`}
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
  const my = cy + (outerRadius + 40) * sin;
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
        fontSize={13}
      >
        {payload.name}
      </text>

      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        dy={20}
        textAnchor={textAnchor}
        fill="#999"
        fontSize={15}
      >
        {`(${value} ต้น)`}
      </text> */}
    </g>
  );
};

const COLORS = [
  "#7DCE13",
  "#4E944F",
  "#33A02C",
  "#02bd43",
  "#9EB23B",
  "#83BD75",
  "#B4E197",
  "#E9EFC0",
];

export default function OverallChart({ indexs, treeType }) {
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
      <ResponsiveContainer height={vh(31)}>
        <PieChart>
          <Pie
            activeIndex={state.activeIndex}
            activeShape={activeShape}
            data={treeType}
            cx="52%"
            cy="50%"
            labelLine={false}
            label={customizedLabel}
            innerRadius={50}
            outerRadius={80}
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={() => setHover(false)}
            isAnimationActive={false}
          >
            {treeType.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
