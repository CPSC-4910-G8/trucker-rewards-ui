import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import MainAppBar from "../MainAppBar";
import { Stack, Typography, Box, Button } from '@mui/material'
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {driverSalesDetailed, driverSalesSummary} from './reportGenerator';

export function StartDatePicker() {
  const [value, setValue] = React.useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Starting date"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export function EndDatePicker() {
  const [value, setValue] = React.useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Ending date"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AdminDrivers = (props) => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const getDrivers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/drivers")
        setDrivers(response.data.drivers);
      } catch (err) {
        console.log("error");
      }
    };
    getDrivers();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'id', headerName: 'Driver #', width: 130 },
    { field: 'driverFirst', headerName: 'First Name', width: 130 },
    { field: 'driverLast', headerName: 'Last Name', width: 130 },
    { field: 'points', headerName: 'Points', width: 130 },
    { field: 'lastPointChange', headerName: 'Last Point Change', type: 'date', width: 170 },
    { field: 'editedBy', headerName: 'Edited by', width: 170 },
    { field: 'numPointChange', headerName: '# of Point Changes', width: 170 },
    {
      field: "Profile",
      renderCell: (cellValues) => {
        return (
          <Link to="/admin/viewuser" >
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
      field: "Edit Points",
      renderCell: (cellValues) => {
        return (
          <><Button variant="contained" color="primary" onClick={handleOpen}> Edit </Button><Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography align="center" id="modal-modal-title" variant="h6" component="h2">
                Edit Point Value
              </Typography>
              <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
              <TextField fullWidth required id="filled-basic" label="Points" variant="filled" />
              <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
              <TextField fullWidth required id="filled-basic" label="Reasoning" variant="filled" multiline rows={4} />
              <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
              <Stack align="center" spacing={2} direction="row">
                <Button variant="contained" color="primary"> Add </Button>
                <Button variant="contained" color="primary"> Subtract </Button>
              </Stack>
            </Box>
          </Modal></>
        );
      }
    },
    {
      field: "Add Sponsor",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="success"
          >
            Add to New Sponsor
          </Button>
        );
      }
    },
    {
      field: "Remove",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="error"
          >
            Remove From Sponsor
          </Button>
        );
      }
    },
  ];

  const rows = [
    { id: 1, driverFirst: 'Joe', driverLast: 'Biden', points: 200, lastPointChange: '11/21/21', editedBy: 'Sponsor name here', numPointChange: 2 },
    { id: 2, driverFirst: 'Kamala', driverLast: 'Harris', points: 5000, lastPointChange: '2/3/22', editedBy: 'Sponsor name here', numPointChange: 4 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <MainAppBar></MainAppBar>
      <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
      <Typography align='center' variant="h2" sx={{ fontWeight: 500 }}>
        Drivers
      </Typography>
      <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
      <StartDatePicker />
      <EndDatePicker />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
      <><Button variant="contained" color="primary" onClick={handleOpen}> Add New Driver </Button><Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align="center" id="modal-modal-title" variant="h6" component="h2">
            Add New Driver
          </Typography>
          <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
          <TextField fullWidth required id="filled-basic" label="Full Name" variant="filled" />
          <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
          <TextField fullWidth required id="filled-basic" label="Email" variant="filled" />
          <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
          <TextField fullWidth required id="filled-basic" label="Sponsor Company" variant="filled" />
          <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
          <Stack align="center" spacing={2} direction="row">
            <Button variant="contained" color="primary" onClick={handleClose}> Cancel </Button>
            <Button variant="contained" color="primary"> Create </Button>
          </Stack>
        </Box>
      </Modal></>
      <h5> Sales Reports </h5>
      <Stack direction="column" alignItems="center" sx={{ padding: 2 }}>
        <StartDatePicker />
        <EndDatePicker />
        <Button variant="contained" onClick={() => driverSalesSummary(drivers)}> Generate Sales Summary </Button>
        <Button variant="contained" onClick={() => driverSalesDetailed(drivers)}> Generate Detailed Sales Report </Button>
      </Stack>
      <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
    </div>
  );
};
export default AdminDrivers;