import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import MainAppBar from "../MainAppBar";
import { Stack, Typography, Box, Button, TextField } from '@mui/material'
import Modal from '@mui/material/Modal';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Link } from 'react-router-dom';
import { sponsSalesDetailed, sponsSalesSummary } from './reportGenerator';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { invoice } from './reportGenerator';
import { adminAuditLog } from './reportGenerator';


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

const Sponsors = (props) => {
  const [sponsors, setsponsors] = useState([]);

  useEffect(() => {
    const getsponsors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/sponsors")
        setsponsors(response.data.sponsors);
      } catch (err) {
        console.log("error");
      }
    };
    getsponsors();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'id', headerName: 'Sponsor #', width: 130 },
    { field: 'name', headerName: 'Sponsor Name', width: 130 },
    { field: 'sales', headerName: 'Total Sales', width: 130 },
    {
      field: "Drivers List",
      renderCell: (cellValues) => {
        return (
          <Link to="/sponsor/drivers">
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
      field: "Invoice",
      width: 300,
      renderCell: (cellValues) => {
        return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => invoice(sponsors)}
            >
              Generate Invoice
            </Button>
        );
      }
    },
  ];

  const rows = [
    { id: 1, name: 'Company 1', sales: 35000 },
    { id: 2, name: 'Company 2', sales: 45020 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <MainAppBar></MainAppBar>
      <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
      <Typography align='center' variant="h2" sx={{ fontWeight: 500 }}>
        Sponsors
      </Typography>
      <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
      <><Button variant="contained" color="primary" onClick={handleOpen}> Add New Sponsor </Button><Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align="center" id="modal-modal-title" variant="h6" component="h2">
            Add New Sponsor
          </Typography>
          <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
          <TextField fullWidth required id="filled-basic" label="Full Name" variant="filled" />
          <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
          <TextField fullWidth required id="filled-basic" label="Email" variant="filled" />
          <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
          <TextField fullWidth required id="filled-basic" label="Company" variant="filled" />
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
        <Button variant="contained" onClick={() => sponsSalesSummary(sponsors)}> Generate Sales Summary </Button>
        <Button variant="contained" onClick={() => sponsSalesDetailed(sponsors)}> Generate Detailed Sales Report </Button>
        <Button variant="contained" onClick={() => adminAuditLog(sponsors)}> Generate Audit Log </Button>
      </Stack>
      <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
    </div>
  );
};
export default Sponsors;