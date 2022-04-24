import React from "react";
import {
  Stack,
  Button,
  Input,
  Box,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";

const ForgotPassword = (props) => {

    /* Eventually this funciton will check the email is the one associated with the account, then send
    an email to the user with a way to reset thier password */
    const email_sent = () => {
        alert("Password email sent, Please check your email for a link, message may be sent to Spam/Junk folder(s)!");
    }

    const navigate = useNavigate()
    const backtoLogin = () => { return navigate('/', {replace : false}), [navigate] }

      return (
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Stack spacing = {2} sx = {{width: "50vw"}}>
              <h1 align='center'> Forgot Password </h1>
              <h2> Enter your Email </h2>
              <Input> </Input>
              <Button variant = "contained" endIcon={<SendIcon />} onClick = {email_sent}> Send reset Link </Button>
              <Button variant = "contained" onClick = {backtoLogin}> Return to Login </Button>
              </Stack>  
      </Box>
      )

}
export default ForgotPassword; 