import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Button,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { useTheme } from "@mui/material";
import axios from "axios";
import { Link } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';


export function StartDatePicker() {
  const [value, setValue] = React.useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Starting date"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export function EndDatePicker() {
  const [value, setValue] = React.useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Ending date"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

const ProfileViewAdmin = (props) => {
  const theme = useTheme()
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    sponsor: null
  });
  const [sponsors, setSponsors] = useState([]);

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({
      ...user,
      [event.target.name]: value,
    });
  };
  const config = {
    headers: {
      "Authorization": `Key key=123456789`,
      "Content-Type": "application/json",
      "Cache-Control": 'no-cache',
      "Pragma": 'no-cache',
      "Expires": '0'
    }
  }

  const handleSubmit = (event) => {
    console.log(JSON.stringify(user));
    axios
      .post("http://localhost:5000/api/authenticate", user, config)
      .then((response) => console.log(response.status))
      .catch((err) => console.log(err));
  };

  return (
    <Stack align="center" justify="center" spacing={2} sx={{ width: "90vw" }}>
      <h1> Profile </h1>
      <InputLabel>First Name</InputLabel>
      <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>Smitty</Box>
      <InputLabel>Last Name</InputLabel>
      <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>Werner Man Jensen</Box>
      <InputLabel>Email</InputLabel>
      <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>SmanJensen@Gmail.com </Box>
      <InputLabel>Phone Number</InputLabel>
      <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>112313212312 </Box>
      <InputLabel>Sponsor</InputLabel>
      <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>NA </Box>
      <h5> Add to New Sponsor </h5>
      <Select
        value={user.sponsor}
        autoWidth
        label="sponsor"
        name="sponsor"
        onChange={handleChange}
      >
        {sponsors.map((sponsor) => (
          <MenuItem value={sponsor.id}>{sponsor.name}</MenuItem>
        ))}
      </Select>
      <h5> Remove from Sponsor </h5>
      <Select
        value={user.sponsor}
        autoWidth
        label="sponsor"
        name="sponsor"
        onChange={handleChange}
      >
        {sponsors.map((sponsor) => (
          <MenuItem value={sponsor.id}>{sponsor.name}</MenuItem>
        ))}
      </Select>
      <Stack direction="row" spacing={2}>
        <Link to="/EditProfile">
          <Button variant="contained">
            Edit Profile
          </Button>
        </Link>
      </Stack>
      <h5> Sales Reports </h5>
      <Stack direction="row" alignItems="center" sx={{ padding: 2 }}>
      <StartDatePicker />
      <EndDatePicker />
      <h5> Sales for Sponsor(s) </h5>
      <Select
        value={user.sponsor}
        autoWidth
        multiple
        label="sponsor"
        name="sponsor"
        onChange={handleChange}
      >
        {sponsors.map((sponsor) => (
          <MenuItem value={sponsor.id}>{sponsor.name}</MenuItem>
        ))}
      </Select>
      </Stack>
      <Button variant="contained"> Generate Detailed Sales Report </Button>
      <Button variant="contained"> Generate Summarized Sales Report </Button>
    </Stack>
  )
}

export default ProfileViewAdmin