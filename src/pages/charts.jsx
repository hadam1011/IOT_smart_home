import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    time: '06:00',
    value: 200,
    pv: 2400,
  },
  {
    time: 'Page B',
    uv: 3000,
    pv: 1398,
  },
  {
    time: 'Page C',
    uv: 2000,
    pv: 9800,
  },
  {
    time: 'Page D',
    uv: 2780,
    pv: 3908,
  },
  {
    time: 'Page E',
    uv: 1890,
    pv: 4800,
  },
  {
    time: 'Page F',
    uv: 2390,
    pv: 3800,
  },
  {
    time: 'Page G',
    uv: 3490,
    pv: 4300,
  },
  
];

const Charts = () => {
    return (
        <ResponsiveContainer width="85%" height="75%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
      </ResponsiveContainer>
    )
}

export default Charts;