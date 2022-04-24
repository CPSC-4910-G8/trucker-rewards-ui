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

const Item = () => {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <MainAppBar></MainAppBar>
            <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
            <Typography align='center' variant="h2" sx={{ fontWeight: 500 }}>
                Item Name
            </Typography>
            <Stack direction="column" alignItems="center" sx={{ padding: 2 }}></Stack>
            <CssBaseline />
            <main>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    pt: '0%',
                                }}
                                image="https://source.unsplash.com/random"
                                alt="random"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    100 points
                                </Typography>
                                <Typography>
                                    Item Description Here......
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to="/driver/cart">
                                    <Fab align="right" color="primary" aria-label="add">
                                        <ShoppingCartIcon />
                                    </Fab>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                </Container>
            </main>
        </div>
    )
}
export default Item;