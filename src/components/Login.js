import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { validateInput } from "../lib/helpers";
import {
  Box,
  Stack,
  Button,
  Input,
  InputLabel,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";

const Login = (props) => {
  const url = "http://trucker-rewards-dev.us-east-1.elasticbeanstalk.com";
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const config = {
    headers: {
      Authorization: `Key key=123456789`,
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  };

  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({
      ...user,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const valid = validateInput(user);
    if (valid) {
      try {
        setErrorMessage(null);
        console.log(user);
        axios
          .post(`${url}/api/authenticate?type=login`, user, config)
          .then((response) => {
            if (response.status === 200) {
              const new_url = `${url}/api/${response.data.user_type}/${response.data.id}`;
              axios
                .get(
                  `${url}/api/${response.data.user_type}/${response.data.id}`
                )
                .then((response) => {
                  if (response.status === 200) {
                    localStorage.setItem("email", response.data.email)
                    navigate(
                      `/${response.data.user_type}/dashboard?id=${response.data.id}`,
                      { replace: false },
                      [navigate]
                    );
                  }
                })
                .catch((err) => {
                  console.error(err.response.data);
                  if (err.response.status === 404 || err.response.status === 401)  {
                    setErrorMessage("error - " + err.response.data.message +"!")
                  }
                  else {
                    setErrorMessage("error - " + err.response.data.message+"!")
                  }
                });
            }
          })
          .catch((err) => {
            console.error(err.response.data);
            if (err.response.status === 404 || err.response.status === 401)  {
              setErrorMessage("error - " + err.response.data.message+"!")
            }
            else {
              setErrorMessage("error - " + err.response.data.message+"!")
            }
            console.log(err)
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrorMessage("error - email or password cannot be blank!");
    }
  };

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        margin: 10,
        padding: 2,
      }}
    >
      <Typography align="center" variant="h3">
        Login
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Stack spacing={2} sx={{ width: "50vw" }}>
          <InputLabel>Email</InputLabel>
          <Input name="email" onChange={handleChange} required />
          <InputLabel>Password</InputLabel>
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
          <Link to="/forgotpassword">
            <Button variant="text"> Forgot Password?</Button>
          </Link>
          {errorMessage !== null ? (
            <Alert severity="error">{errorMessage}</Alert>
          ) : (
            <Box> </Box>
          )}
          <Button
            variant="contained"
            disableFocusRipple={true}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Typography align="center" variant="subtitle2">
            Or
          </Typography>
          <Stack direction="row" justifyContent="space-around" spacing={1}>
            <Button
              href="/register"
              variant="contained"
              disableFocusRipple={true}
              onClick={() => props.setView("user-create")}
            >
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Login;
