import React from 'react'
import { useEffect, useState } from 'react'
import { Stack, Typography, Box, Button, TextField } from '@mui/material'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const CreateApp = (props) => {
    return (
        <div>
            <Stack direction="column" alignItems="center" sx={{ padding: 2 }}>
                <Typography align='left' variant="h2" sx={{ fontWeight: 500 }}>
                    Create Application
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="first" label="First Name" variant="standard" />
                    <TextField id="last" label="Last Name" variant="standard" />
                    <TextField id="email" label="Email" variant="standard" />
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                    <Fab color="secondary" aria-label="edit">
                        <EditIcon />
                    </Fab>
                </Box>
            </Stack>
            <Stack direction="column" alignItems="center" sx={{ padding: 2 }}>
                <Button variant="contained"> Save </Button>
            </Stack>
            <Stack direction="column" alignItems="center" sx={{ padding: 2 }}>
                <Button variant="standard"> Revert Changes to Default </Button>
            </Stack>
        </div>
    )
}

export default CreateApp