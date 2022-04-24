import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Button,
  Input,
  InputLabel,
  Container,
  Typography,
} from "@mui/material";
import axios from "axios";
import ForgotPassword from "./Forgotpassword";
import {
  useNavigate,
  Link,
  useSearchParams,
  useHistory,
} from "react-router-dom";
import MainAppBar from "./MainAppBar";

const EditProfile = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const role = searchParams.get("role");
  console.log([id, role]);
  const url = "http://trucker-rewards-dev.us-east-1.elasticbeanstalk.com";
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const json_map = {
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    phone: "Phone Number",
    user_type: "Role",
    sponsor_company_id: "Sponsor Company",
  };

  useEffect(() => {
    console.log([role, id, url]);
    axios
      .get(`${url}/api/${role}/${id}`)
      .then((response) => {
        setUser(response.data);
        setEmail(response.data.email);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({
      ...user,
      [event.target.name]: value,
    });
    console.log(user);
  };
  const config = {
    headers: {
      Authorization: `Key key=123456789`,
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  };

  const handleSubmit = (event) => {
    axios
      .put(`${url}/api/authenticate/${email}`, user, config)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.status);
          navigate(
            `/profile?id=${user.id}&role=${user.user_type}`,
            { replace: false },
            [navigate]
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <MainAppBar
        username={user !== null ? user.first_name : ""}
        id={id}
        role={role}
      ></MainAppBar>
      <Typography variant="h3" align="center">
        {" "}
        Edit Profile{" "}
      </Typography>
      <Container maxWidth={false} sx={{alignItems: 'center'}} >
        {user !== null
          ? Object.entries(user).map(([k, v]) => {
              if (k !== "password_hash" && k !== "id" && k !== "user_type") {
                return (
                  <Stack alignItems="center" justifyContents="center" spacing={1} sx={{ marginBottom : 1 }}>
                    <InputLabel>{json_map[k]}</InputLabel>
                    <Input
                      name={k}
                      defaultValue={v}
                      onChange={handleChange}
                    ></Input>
                  </Stack>
                );
              } else return null;
            })
          : null}
        <Stack alignItems="center" justifyContents="center" spacing={2} sx={{pt : 5}}  direction="column">
          <Button variant="contained" onClick={handleSubmit}>
            Submit Changes
          </Button>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Return to Profile
          </Button>
        </Stack>
      </Container>
    </div>
  );
};

export default EditProfile;
