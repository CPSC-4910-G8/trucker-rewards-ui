import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MainAppBar from "../MainAppBar";
import { useTheme } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Sponsors from "../dashboards/SponsorList";
import { Link } from 'react-router-dom';

const Admin = () => {

  const theme = useTheme();
  return (
    <div>
      <MainAppBar></MainAppBar>
      <Stack direction="column" alignItems="center" sx={{ padding: 2 }}>
        <Typography align='left' variant="h2" sx={{ fontWeight: 500 }}>
          Dashboard
        </Typography>
        <Stack direction="row" alignItems="center" sx={{ padding: 2 }}>
          <Box sx={{ border: 1, borderRadius: 3, margin: 2, padding: 2, paddingBottom: 2 }}>
            <Stack direction="column" spacing={2} alignItems="center" sx={{ padding: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                {" "}
                Sponsors
              </Typography>
              <Link to="/admin/sponsors">
                <Button variant="contained"> Sponsors List </Button>
              </Link>
              <Link to="/orders">
              <Button variant="contained"> View Orders </Button>
              </Link>
              <Link to="/sponsor/applications">
                <Button variant="contained"> View Applications </Button>
              </Link>
            </Stack>
          </Box>
          <Box sx={{ border: 1, borderRadius: 3, margin: 2, padding: 2, paddingBottom: 2 }}>
            <Stack direction="column" spacing={2} alignItems="center" sx={{ padding: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                {" "}
                Drivers
              </Typography>
              <Link to="/admin/drivers">
                <Button variant="contained"> Drivers List </Button>
              </Link>
              <Link to="/orders">
              <Button variant="contained"> View Orders </Button>
              </Link>
              <Link to="/sponsor/applications">
                <Button variant="contained"> View Applications </Button>
              </Link>
            </Stack>
          </Box>
          <Box sx={{ border: 1, borderRadius: 3, margin: 2, padding: 2, paddingBottom: 9 }}>
            <Stack direction="column" spacing={2} alignItems="center" sx={{ padding: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                {" "}
                Admins/Auditing
              </Typography>
              <Link to="/admin/admins">
                <Button variant="contained"> Admins List </Button>
              </Link>
              <Button variant="contained"> View Change History </Button>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
};
export default Admin;
