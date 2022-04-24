import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from "@mui/material";
import {Stack, Typography, Box, Button} from '@mui/material';
import MainAppBar from "../MainAppBar";


const DriverApp = (props) => {
    const columns = [
        { field: 'id', headerName: 'Application Num', width: 150 },
        { field: 'sponsor', headerName: 'Sponsor', width: 130},
        { field: 'status', headerName: 'Status', width: 130 },
        { field: 'action', headerName: 'Action', width: 130 },
       
      ];
      
      const rows = [
        { id: 1, sponsor: 'Trucking 1', status: 'Under Review', action: 'Accepted'},
        { id: 2, sponsor: 'Trucking 2', status: 'Accepted', action: 'Denied'},
        { id: 3, sponsor: 'Trucking 3', status: 'Denied', action: 'Withdraw' },
        { id: 4, sponsor: 'Trucking 4', status: 'Incomplete', action: ''},
        { id: 5, sponsor: 'Trucking 5', status: '', action: ''},
      ];
   
    return (
        <div style={{ height: 400, width: '100%' }}>
            <MainAppBar></MainAppBar>
            <Stack direction="column" alignItems="center" sx={{padding : 2}}></Stack>
            <Typography align='center' variant="h2" sx={{ fontWeight: 500 }}>
             My Applications
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
export default DriverApp;
