
import React from "react";
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import {Stack, Typography, Box, Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainAppBar from "./MainAppBar";

const data = [
  { name: 'Trucking 1', points: 500 },
  { name: 'Trucking 2', points: 400 },
  { name: 'Trucking 3', points: 300 },
  { name: 'Trucking 4', points: 200 },
  { name: 'Trucking 5', points: 100 },
];

const columns = [
  { field: 'id', headerName: 'Sponsor Num', width: 150 },
  { field: 'sponsor', headerName: 'Sponsor', width: 130},
  { field: 'pointVal', headerName: 'Total Points', width: 130 },
  { field: 'change', headerName: 'Point Change', width: 150 },
  { field: 'reason', headerName: 'Reasoning', width: 400 },
];

const rows = [
  { id: 1, sponsor: 'Trucking 1', pointVal: 500, change: '+100', reason: 'Good behavior'},
  { id: 2, sponsor: 'Trucking 2', pointVal: 400, change: '-100', reason: 'Purchase made'},
  { id: 3, sponsor: 'Trucking 3', pointVal: 300, change: '+200', reason: 'Followed speed limit'},
  { id: 4, sponsor: 'Trucking 4', pointVal: 200, change: '-200', reason: 'Bad behavior'},
  { id: 5, sponsor: 'Trucking 5', pointVal: 100, change: '+100', reason: 'Account created'},
];

const getPath = (x, width, y, y1) => `M ${x} ${y1}
   L ${width + x} ${y1}
   L ${width + x} ${y + 30}
   L ${x + width / 2} ${y}
   L ${x} ${y + 30}
   Z`;

const labelStyle = { fill: '#BBDEFB' };

const BarWithLabel = ({
  arg, barWidth, maxBarWidth, val, startVal, color, value, style,
}) => {
  const width = maxBarWidth * barWidth;
  return (
    <React.Fragment>
      <path d={getPath(arg - width / 2, width, val, startVal)} fill={color} style={style} />
      <Chart.Label
        x={arg}
        y={(val + startVal) / 2}
        dominantBaseline="middle"
        textAnchor="middle"
        style={labelStyle}
      >
        {value}
      </Chart.Label>
    </React.Fragment>
  );
};

const Points = (props) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <MainAppBar></MainAppBar>
            <Stack direction="column" alignItems="center" sx={{padding : 2}}></Stack>
            <Typography align='center' variant="h2" sx={{ fontWeight: 500 }}> My Points </Typography>
             <Stack direction="column" alignItems="center" sx={{padding : 2}}></Stack>
      <Paper>
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis />
    
        <BarSeries valueField="points" argumentField="name" pointComponent={BarWithLabel}/>
        <Title text="Overall Points" />
      </Chart>
      </Paper>

      <Stack direction="column" alignItems="center" sx={{padding : 2}}></Stack>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
  </div>
);
};
export default Points;
