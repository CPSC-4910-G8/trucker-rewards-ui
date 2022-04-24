import React from 'react';
import { Link } from 'react-router-dom';
import MainAppBar from "./MainAppBar";
import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Stack,
    Button,
    Input,
    InputLabel,
    Typography,
    TextField,
    Grid,
    Tooltip,
    Fab,
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

/*
Eventually the making of a catalog will store items added into the database, these items will then be read by a function
Will render all items on the page. This note is for me mainly but will be helpful for someone else. Futher more that database 
entry will also need to contain the point conversion so that the items price displays cleanly on the page as points. 

Driver: 
The functions needed: Add to Cart which will add the item to the persons cart 

Admin: 
Add to catalog 
Remove from catalog 

*/

// Either A this function will make an API Call to determine the users type and return it 
function getUserType() {
    return 'Driver';
}

function addToCart(props) {
    // it will be passed in the id of the item to the cart, right now it return the Id of the item
    return props.ID;
}

function getCatalogItems() {
    // This will make an API call to get the items that are in the catalog returning a list of 'items' which
    // I assume would be a Json object  
}

function assignPointValue(props, pointVal) {
    return props.value * pointVal;
}

function addToCatalog(props) {
    // adding a new item to the catalog, admins only
    return props.ID;
}

function removeFromCatalog(props) {
    // remove item from catalog, admins only
    return props.ID;
}

/* 
Eventually the items will be rendered based on what a company has saved. To do this when they edit you will write that ID
To the database and then it will be called from the database when the page is loaded. 

User: 
They will see the catalog of whoever is first in there list. There will be a dropdown populated by whichever company they select
from the dropdown 

Admin: Will have a dropdown of all companies in the system with the editing features of course 

Sponser user: Will see the editable version of their companies catalog 


*/

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const CatalogList = () => {

    if (getUserType() == 'Driver') {
        const columns = [
            { field: 'id', headerName: 'Item Num', width: 130 },
            { field: 'itemName', headerName: 'Item', width: 130 },
            { field: 'points', headerName: 'Points', width: 130 },
            {
                field: 'Details', renderCell: (cellValues) => {
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
        ];
        
        const rows = [
            { id: 1, itemName: 'Baseball Hat', points: 200 },
            { id: 2, itemName: 'Large Sweatshirt', points: 400 },
            { id: 3, itemName: 'Sunglasses', points: 300 },
            { id: 4, itemName: 'Sponsor Keychain', points: 100 },
            { id: 5, itemName: 'Medium Tshirt', points: 300 },
        ];
        return (
            <div style={{ height: 400, width: '100%' }}>
                <MainAppBar></MainAppBar>
                <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
                <Typography align='center' variant="h2" sx={{ fontWeight: 500 }}>
                    Catalog
                </Typography>
                <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                    <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
                <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
                <CssBaseline />
            </div>

        );
    }
    else if (getUserType() == 'Admin') {
        return (
            <Typography align="center" variant="h3">
                Catalog
                <Link to="/catalog">
                    <Button >Publish Catalog</Button>
                </Link>
            </Typography>
        )
    }
    else {
        return (
            <Typography align="center" variant="h3">
                Error
            </Typography>
        )
    }
}
export default CatalogList;