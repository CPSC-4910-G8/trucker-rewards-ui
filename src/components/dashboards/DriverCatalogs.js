import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import MainAppBar from "../MainAppBar";
import {Stack, Typography, Box, Button} from '@mui/material'
import {Link} from 'react-router-dom';

const DriverCatalogs = (props) => {
  const columns = [
    { field: 'id', headerName: 'Sponsor #', width: 130},
    { field: 'sponsor', headerName: 'Sponsor Name', width: 130},{
      field: "Catalog",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <Link to="/catalog">
          <Button
            variant="contained"
            color="primary"
          >
            View Catalog
          </Button>
          </Link>
        );
      }
    }
  ];

  const rows = [
    { id: 1, sponsor: 'Sponsor Name 1'},
    { id: 2, sponsor: 'Sponsor Name 2'},
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <MainAppBar></MainAppBar>
        <Stack direction="column" alignItems="center" sx={{padding : 2}}></Stack>
        <Typography align='center' variant="h2" sx={{ fontWeight: 500 }}>
         My Catalogs
         </Typography>
         <Stack direction="column" alignItems="center" sx={{padding : 2}}></Stack>
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
export default DriverCatalogs;