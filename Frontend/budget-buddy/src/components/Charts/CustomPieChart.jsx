import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({
  data = [],
  label,
  totalAmount,
  colors = ["#875CF5", "#FA2C37", "#FF6900"],
  showTextAnchor,
}) => {



  
  const processedData = data.map((item) => ({
    ...item,
    amount: Number(
      item.amount?.toString().replace(/,/g, "")
    ) || 0,
  }));
 

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={processedData}  
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={110}
          innerRadius={80}
          labelLine={false}
        >
          {processedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>

        <Tooltip content={CustomTooltip} />
        <Legend content={CustomLegend} />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-20}
              textAnchor="middle"
              fill="#666"
              fontSize="14px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={10}
              textAnchor="middle"
              fill="#333"
              fontSize="22px"
              fontWeight="600"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
