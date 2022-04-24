import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import MainAppBar from "../MainAppBar";
import { Stack, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

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

const Admins = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'id', headerName: 'Admin #', width: 130 },
    { field: 'adminFirst', headerName: 'First Name', width: 130 },
    { field: 'adminLast', headerName: 'Last Name', width: 130 },
    {
      field: "Profile",
      renderCell: (cellValues) => {
        return (
            <Link to="/admin/viewuser">
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
  ];

  const rows = [
    { id: 1, adminFirst: 'Joe', adminLast: 'Biden'},
    { id: 2, adminFirst: 'Kamala', adminLast: 'Harris'},
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <MainAppBar></MainAppBar>
      <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
      <Typography align='center' variant="h2" sx={{ fontWeight: 500 }}>
        Admins
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
      <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
    </div>
  );
};
export default Admins;