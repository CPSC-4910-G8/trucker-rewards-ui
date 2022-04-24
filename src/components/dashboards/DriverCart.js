import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import MainAppBar from "../MainAppBar";
import {Stack, Typography, Box, Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function RemoveFromCart(props) {
  // remove from cart, add endpoint
  return props.ID;
}

const Cart = (props) => {
    const [show, setShow] = useState(true)

    useEffect(() => {
        const timeID = setTimeout(() => {
            setShow(false)
        }, 30000)
        return () => {clearTimeout(timeID)}
    }, [] );

    const columns = [
        { field: 'id', headerName: 'Item Num', width: 130},
        { field: 'itemName', headerName: 'Item', width: 130},
        { field: 'points', headerName: 'Points', width: 130},
        { field: 'Details', renderCell: (cellValues) => {
            return (
              <Link to="/item">
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
        { field: 'Trash', renderCell: (cellValues) => {
          // on click, delete the respective item using remove from cart function
            return (
                <IconButton>
                    <DeleteIcon />
                </IconButton> 
            );
            }
        },
    ];

    const rows = [
        {id: 1, itemName: 'Baseball Hat', points: 200},
        {id: 2, itemName: 'Large Sweatshirt', points: 400},
        {id: 3, itemName: 'Sunglasses', points: 300},
        {id: 4, itemName: 'Sponsor Keychain', points: 100},
        {id: 5, itemName: 'Medium Tshirt', points: 300},
    ];
   

    return (
        <div style={{ height: 400, width: '100%' }}>
          <MainAppBar></MainAppBar>
            <Stack direction="column" alignItems="center" sx={{padding : 2}}></Stack>
            <Typography align='center' variant="h2" sx={{ fontWeight: 500 }}>
             Shopping Carts
             </Typography>
            <Stack direction="column" alignItems="center" sx={{padding : 2}}></Stack>
           <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
            <Stack direction="column" alignItems="center" sx={{padding : 2}}></Stack>
            <Link to="/checkout">
            <Button variant="contained" disableFocusRipple={true} align="center" direction="column" alignItems="center"> Submit Order </Button>
            </Link>
        </div>
    );
};
export default Cart;