import React, { useState, useEffect } from "react";
import { Box, Stack, Button, InputLabel, Typography } from "@mui/material";
import axios from "axios";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import MainAppBar from "./MainAppBar";

const Profile = (props) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const role = searchParams.get("role");
  const url = "http://trucker-rewards-dev.us-east-1.elasticbeanstalk.com";
  const [user, setUser] = useState(null);
  const json_map = {
    "first_name" : "First Name",
    "last_name" : "Last Name", 
    "email" : "Email", 
    "phone" : "Phone Number",
    "email" : "Email",
    "user_type" : "Role",
    "sponsor_company_id" : "Sponsor Company"

  }

  useEffect(() => {
    axios
      .get(`${url}/api/${role}/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
    <MainAppBar username={user !== null ? user.first_name : ""} id={id} role={role}></MainAppBar>
    <Stack alignItems="center" justifyContents="center" spacing={1} sx={{ width: "90vw", marginBottom : 1 }}>
    <Typography variant='h3' align='center'> My Profile </Typography>
      {user != null
        ? Object.entries(user).map(([k, v]) => {
            if (k !== "password_hash" && k !== "id" && k!="sponsor_company_id ") {
              return (
                <div>
                  <Typography align='center' variant='h5'>{json_map[k]}</Typography>
                  <Typography align='center' sx={{width : 500,  p: 2, border: 1, borderRadius : "12px"}}>{v}</Typography>
                </div>
              );
            } else return null;
          })
        : null}
      <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={()=> navigate(`/editprofile?id=${id}&role=${role}`)}>Edit Profile</Button>
        <Link to="/forgotpassword">
          <Button variant="contained"> Forgot Password </Button>
        </Link>
      </Stack>
    </Stack>
    </div>
  );
};

export default Profile;
