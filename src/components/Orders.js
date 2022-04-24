import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import MainAppBar from "./MainAppBar";
import { Stack, Typography, Box, Button, TextField } from '@mui/material'
import Modal from '@mui/material/Modal';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Link } from 'react-router-dom';


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

const Orders = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'id', headerName: 'Order #', width: 130 },
    { field: 'name', headerName: 'Driver', width: 130 },
    { field: 'company', headerName: 'Sponsor', width: 130 },
    { field: 'total', headerName: 'Price', width: 130 },
    {
      field: "Order Info",
      renderCell: (cellValues) => {
        return (
          <Link to="/ordersummary">
            <Button
              variant="contained"
              color="primary"
            >
              View
            </Button>
          </Link>
        );
      }
    }
  ];

  const rows = [
    { id: 1, name: 'Kenley Shaw', company: 'Company 1', total: 450 },
    { id: 2, name: 'Amara Obasi', company: 'Company 2', total: 30 },
    { id: 3, name: 'CJ Fuller', company: 'Company 3', total: 1000 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <MainAppBar></MainAppBar>
      <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
      <Typography align='center' variant="h2" sx={{ fontWeight: 500 }}>
        All Orders
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
      <h5> Sales Reports </h5>
      <Button variant="contained"> Generate Detailed Sales Report </Button>
      <Button variant="contained"> Generate Summarized Sales Report </Button>
    </div>
  );
};
export default Orders;