import React from 'react'
import{
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";
import CustomLegend from './CustomLegend';
import { formatINR } from '../../utils/helper';

const getBarColor=(index)=>{
    return index%2===0 ? "#875cf5" : "#cfbefb";
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {

    const data = payload[0].payload;
    const { month, amount, source, category } = data;

    return (
      <div className='bg-white shadow-md rounded-lg p-3 border border-gray-300'>

        {/* Date */}
        {month && (
          <p className='text-xs font-semibold text-purple-800 mb-1'>
            {month}
          </p>
        )}

        {/* Source (Income) */}
        {source && (
          <p className='text-sm text-gray-700'>
            Source:
            <span className='font-medium text-gray-900 ml-1'>
              {source}
            </span>
          </p>
        )}

        {/* Category (Expense) */}
        {category && (
          <p className='text-sm text-gray-700'>
            Category:
            <span className='font-medium text-gray-900 ml-1'>
              {category}
            </span>
          </p>
        )}

        {/* Amount */}
        <p className='text-sm text-gray-700'>
          Amount:
          <span className='font-medium text-gray-900 ml-1'>
            {formatINR(amount)}
          </span>
        </p>

      </div>
    );
  }
  return null;
};


const CustomBarChart = ({data=[]}) => {
  return (
    <div className='bg-white mt-6'>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} >
                <CartesianGrid stroke='none' />
                <XAxis dataKey="month" tick={{ fill: '#555', fontSize: 12 }} strokes='none' />
                <YAxis tick={{ fill: '#555', fontSize: 12 }} strokes='none'/>     
                <Tooltip content={CustomTooltip} />
                <Legend content={CustomLegend} />
                <Bar 
                    dataKey="amount" 
                    fill="#FF8042" 
                    activeDot={{ r: 8 ,fill:"yellow"}} 
                    activeStyle={{fill:"green"}} 
                    radius={[10, 10, 0, 0]} 
                >
                    {data.map((entry,index)=>(
                        <Cell key={index} fill={getBarColor(index)} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart
