import React from 'react'
import {useEffect, useState} from 'react'
import {Stack, Typography, Box, Button} from '@mui/material'

const Applications = (props) => {
  return (
    <div>
      <Stack direction="column" alignItems="center" sx={{padding : 2}}>
      <Typography align='left' variant="h2" sx={{ fontWeight: 500 }}>
        Application
      </Typography>
        <Box sx={{ border: 1, borderRadius : 3,  width: "75vw", height: "12vw", margin: 2, padding : 2, paddingBottom : 10 }}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {" "}
            Applicant Name
          </Typography>
          <Button variant = "contained"> Accept </Button>
          <Button variant = "contained"> Reject </Button>
        </Box>
        </Stack>
    </div>
  )
}

export default Applications