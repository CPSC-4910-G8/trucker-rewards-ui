import React from 'react';
import { Link } from 'react-router-dom';
import MainAppBar from "./MainAppBar";
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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const products = [
    {
        name: 'Product 1',
        desc: 'Some thing',
        price: '200 points',
    },
    {
        name: 'Product 2',
        desc: 'Another thing',
        price: '50 points',
    },
    {
        name: 'Product 3',
        desc: 'Something else',
        price: '150 points',
    },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    { name: 'Points Spent', detail: '400' },
    { name: 'Points Left', detail: '1600' },
];

const OrderSummary = () => {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <MainAppBar></MainAppBar>
            <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
            <Typography align='center' variant="h2" sx={{ fontWeight: 500 }}>
                Order Summary
            </Typography>
            <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
            <CssBaseline />
            <main>
                <Container align="center" sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Company Name: Example
                                </Typography>
                                <React.Fragment>
                                    <List disablePadding>
                                        {products.map((product) => (
                                            <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                                                <ListItemText primary={product.name} secondary={product.desc} />
                                                <Typography variant="body2">{product.price}</Typography>
                                                <Link to='/item'>
                                                <Button> View </Button>
                                                </Link>
                                            </ListItem>
                                        ))}
                                        <ListItem sx={{ py: 1, px: 0 }}>
                                            <ListItemText primary="Total" />
                                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                                400 points
                                            </Typography>
                                        </ListItem>
                                    </List>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                                Shipping
                                            </Typography>
                                            <Typography gutterBottom>John Smith</Typography>
                                            <Typography gutterBottom>{addresses.join(', ')}</Typography>
                                        </Grid>
                                        <Grid item container direction="column" xs={12} sm={6}>
                                            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                                Payment details
                                            </Typography>
                                            <Grid container>
                                                {payments.map((payment) => (
                                                    <React.Fragment key={payment.name}>
                                                        <Grid item xs={6}>
                                                            <Typography gutterBottom>{payment.name}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography gutterBottom>{payment.detail}</Typography>
                                                        </Grid>
                                                    </React.Fragment>
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Stack direction="column" alignItems="center" sx={{padding : 2}}></Stack>
                    <Button 
                    // add a cancel order function
                    variant="contained" > Cancel Order </Button>
                </Container>
            </main>
        </div>
    )
}
export default OrderSummary;