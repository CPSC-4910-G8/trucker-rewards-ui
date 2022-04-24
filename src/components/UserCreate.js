import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Button,
  Input,
  InputLabel,
  Typography,
  Tab,
  Tabs,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material";
import axios from "axios";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router-dom";
import { validateInput } from "../lib/helpers";

const UserCreate = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [view, setView] = useState("driver");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    user_type: "driver",
    sponsor_company_id: null,
  });
  const url = "http://trucker-rewards-dev.us-east-1.elasticbeanstalk.com";
  const [sponsors, setSponsors] = useState([]);
  const [confirmPass, setConfirmPass] = useState("");

  const config = {
    headers: {
      Authorization: `Key key=123456789`,
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  };

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 10000);
      return () => clearTimeout(timeout);
    } else {
      axios
        .get(`${url}/api/companies`, config)
        .then((response) => {
          const sponsors = response.data["sponsor_companies"];
          setSponsors(sponsors);
        })
        .catch((err) => console.log(err));
    }
  }, [success]);

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({
      ...user,
      [event.target.name]: value,
    });
  };

  const changeView = (event, value) => {
    setView(value);
    setUser({
      ...user,
      user_type: value,
    });
  };

  const handleSubmit = async (event) => {
    if (user.user_type === "driver") delete user.sponsor_company_id;
    if (validateInput(user)) {
      const response = await axios.get(
        `${url}/api/authenticate/${user.email}`,
        config
      );
      console.log(response.status);
      console.log(response.data)
      if (response.status === 200 && response.data.count === 0) {
        setErrorMessage(null);
        axios
          .post(`${url}/api/authenticate?type=register`, user, config)
          .then((response) => {
            if (response.status === 201) {
              setSuccess(true);
            } else {
              setErrorMessage("error - something went wrong!");
            }
          })
          .catch((err) => console.log(err));
        navigate("/account-create/success", { replace: false }, [navigate]);
      } else if(response.status === 200) {
        setErrorMessage("error - an account with this email already exists!");
      }
      else {
        setErrorMessage("error - something went wrong!");
      }
    } else {
      setErrorMessage("error - sign up fields cannot be blank!");
    }
  };

  return (
    <Box pb={6}>
      <Typography align="center" m={view === "sponsor" ? 1 : 5} variant="h4">
        Register Account
      </Typography>
      <Tabs centered onChange={changeView} value={view}>
        <Tab label="driver" value="driver" key="driver" />
        <Tab label="sponsor" value="sponsor" key="sponsor" />
      </Tabs>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Stack
          spacing={2}
          color={theme.palette.text.primary}
          sx={{ width: "60vw" }}
        >
          <Typography variant="overline">First Name</Typography>
          <Input required name="first_name" onChange={handleChange} />
          <Typography variant="overline">Last Name</Typography>
          <Input required name="last_name" onChange={handleChange} />
          <Typography variant="overline">Email</Typography>
          <Input required name="email" onChange={handleChange} />
          <Typography variant="overline">Password</Typography>
          <Input
            required
            type="password"
            name="password"
            onChange={handleChange}
          />
          <Typography variant="overline">Confirm Password</Typography>
          <Input
            required
            type="password"
            name="confirmPass"
            onChange={(event) => setConfirmPass(event.target.value)}
          />
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={5}
            value={user.password}
            valueAgain={confirmPass}
          />
          <Typography variant="overline">Phone Number</Typography>
          <Input
            required
            inputProps={{ maxLength: 10 }}
            name="phone"
            type="tel"
            onChange={handleChange}
          />
          {view === "sponsor" ? <InputLabel>Sponsor Company</InputLabel> : null}
          {view === "sponsor" ? (
            <Select
              value={user.sponsor}
              autoWidth
              label="sponsor"
              name="sponsor_company_id"
              onChange={handleChange}
            >
              {sponsors.map((sponsor) => (
                <MenuItem value={sponsor.id}>{sponsor.name}</MenuItem>
              ))}
            </Select>
          ) : null}
          {errorMessage !== null ? (
            <Alert severity="error">{errorMessage}</Alert>
          ) : (
            <Box> </Box>
          )}
          <Button
            variant="contained"
            disableFocusRipple={true}
            sx={{ color: theme.palette.text.primary }}
            onClick={handleSubmit}
          >
            Register
          </Button>
          {success === true ? (
            <Alert severity="success">
              Account created successfully! - Redirecting to the Login page ...{" "}
            </Alert>
          ) : null}
        </Stack>
      </Box>
    </Box>
  );
};

export default UserCreate;
