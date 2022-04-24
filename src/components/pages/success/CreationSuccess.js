import React from 'react'
import { Alert, Button, Stack, Box, Link} from '@mui/material'

const CreationSuccess = () => {
  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      margin: 10,
      padding: 2
    }}
  >
    <Stack direction='column' spacing={2} sx={{width : '50vw'}}>
      <Alert severity='success'>
        Account created Successfully! Click below to log in.
      </Alert>
    <Button variant='outlined' size='large' href='/'>
      To Login
    </Button>
    </Stack>
    </Box>
  )
}

export default CreationSuccess