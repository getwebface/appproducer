import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SimpleChartProps {
  title?: string;
  data: any[]; // Array of objects
  x_key: string;
  y_key: string;
  color?: string;
}

const SimpleChart: React.FC<SimpleChartProps> = ({ 
  title, 
  data = [], 
  x_key, 
  y_key,
  color = '#4F46E5' 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {title && <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={x_key} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={y_key} fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SimpleChart;
