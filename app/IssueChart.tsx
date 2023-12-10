'use client'

import { Card } from '@radix-ui/themes';
import {
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from 'recharts';
import React from 'react';

type Props = { open: number; inProgress: number; closed: number };

function IssueChart({ open, inProgress, closed }: Props) {
  const data = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed },
  ];
  return (
    <Card className="py-5 pr-1">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            right: 15,
            left: -15,
            top: 10,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="label" fontSize={12} strokeOpacity={0} />
          <YAxis fontSize={12} strokeOpacity={0} />
          <Bar
            dataKey="value"
            barSize={75}
            style={{ fill: 'var(--purple-9)' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default IssueChart;
