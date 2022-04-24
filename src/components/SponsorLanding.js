import React from 'react'
import { useEffect, useState } from 'react'
import { Stack, Typography, Box, Button, TextField } from '@mui/material'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const CreateLanding = (props) => {
    return (
        <div>
            <Stack direction="column" alignItems="center" sx={{ padding: 2 }}>
                <Typography align='left' variant="h2" sx={{ fontWeight: 500 }}>
                    Create Landing Page
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="name" label="Company Name" variant="standard" />
                    <TextField id="website" label="Link to Company Website" variant="standard" />
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="textInfo"
                        label="Summary of Company"
                        multiline
                        rows={10}
                        variant="standard"
                    />
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

export default CreateLanding