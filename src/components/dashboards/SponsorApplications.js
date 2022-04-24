import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import MainAppBar from "../MainAppBar";
import { Stack, Typography, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom';

const Applications = (props) => {
  const columns = [
    { field: 'id', headerName: 'Application Num', width: 150 },
    { field: 'driver', headerName: 'Driver Name', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: "Application",
      renderCell: (cellValues) => {
        return (
          <Link to="/application" >
            <Button
              variant="contained"
              color="primary"
            >
              View
            </Button>
          </Link>
        );
      }
    },
    {
      field: "Accept",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="success"
          >
            Accept
          </Button>
        );
      }
    },
    {
      field: "Deny",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="error"
          >
            Deny
          </Button>
        );
      }
    }
  ];

  const rows = [
    { id: 1, driver: 'Driver 1', status: 'Pending' },
    { id: 2, driver: 'Driver 2', status: 'Denied' },
    { id: 5, driver: 'Driver 3', status: 'New' },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <MainAppBar></MainAppBar>
      <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
      <Typography align='center' variant="h2" sx={{ fontWeight: 500 }}>
        My Applications
      </Typography>
      <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />

    </div>
  );
};
export default Applications;