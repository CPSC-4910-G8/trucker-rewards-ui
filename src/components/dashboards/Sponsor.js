import React from "react";
import { useEffect, useState } from "react";
import {
  Stack,
  Button,
  TabPanel,
  Container,
  Input,
  InputLabel,
  TextField,
  Divider,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MainAppBar from "../MainAppBar";
import {
  Link,
  useSearchParams,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

const Sponsor = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const url = "http://localhost:5000";
  const config = {
    headers: {
      Authorization: `Key key=123456789`,
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  };
  const role = useLocation().pathname.split("/")[1];
  const user_id = searchParams.get("id");

  const [user, setUser] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [statuses, setStatuses] = useState([
    "under-review",
    "accepted",
    "rejected",
    "pending",
  ]);
  const [statusChange, setStatusChange] = useState({
    status: statuses[0],
    reason: "",
  });
  const [pointChange, setPointChange] = useState(null);
  const [currentDriver, setCurrentDriver] = useState(null);

  const commonStyles = {
    bgcolor: "background.paper",
    borderColor: "text.primary",
    m: 1,
    p: 1,
    border: "4px",
    height: "auto",
  };

  useEffect(async () => {
    try {
      let response = await axios.get(
        `${url}/api/${role}/${searchParams.get("id")}`
      );
      setUser(response.data);

      response = await axios.get(
        `${url}/api/company/${response.data.sponsor_company_id}/drivers`
      );
      setDrivers(response.data.drivers);
      if (response.data.drivers.length > 0) {
        setCurrentDriver(response.data.drivers[0]);
        const application_status = response.data.drivers[0].application_status;
        setStatuses(statuses.filter((s) => s != application_status));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChange = (event, value) => {
    setCurrentDriver(drivers.find(d => d.id === value))
  };

  const handleStatus = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setStatusChange({
      ...statusChange,
      [event.target.name]: value,
    });
  };

  const handlePoints = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setPointChange({
      ...pointChange,
      [event.target.name]: value,
    });
  };

  const submitStatus = () => {
    const request_url = `${url}/api/company/${user.sponsor_company_id}/driver/${currentDriver.id}/application`;
    console.log(request_url);
    axios
      .put(request_url, statusChange, config)
      .then((response) => {
        console.log(response);
        if (response.status === 200){
        navigate(0)
        }
      })
      .catch((err) => console.log(err));
  };

  const submitPoints = () => {
    const request_url = `${url}/api/driver/${currentDriver.id}/points/${user.sponsor_company_id}`;
    axios
      .put(request_url, pointChange, config)
      .then((response) => {
        if (response.status === 200) {
          navigate(0)
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <MainAppBar
        username={user !== null ? user.first_name : ""}
        id={user_id}
        role={role}
      ></MainAppBar>
      <Stack direction="column" alignItems="center" sx={{ padding: 2 }}>
        <Typography align="left" variant="h2" sx={{ fontWeight: 500 }}>
          {user !== null && user !== undefined
            ? "Welcome, " + user.first_name + "!"
            : user}
        </Typography>
        <Container>
          <Stack direction="row">
            <Stack direction="column" alignItems="center">
              <Typography variant="h4">Drivers</Typography>
              <Box
                sx={{
                  ...commonStyles,
                  height: `75vh`,
                }}
              >
                <Tabs
                  orientation="vertical"
                  centered
                  value={currentDriver !== null ? currentDriver.id : null}
                  onChange={handleChange}
                  ariant="scrollable"
                  scrollButtons="auto"
                >
                  {drivers.map((driver) => {
                    return driver !== undefined ? (
                      <Tab
                        key={driver.id}
                        value={driver.id}
                        label={`${driver.first_name} ${driver.last_name}`}
                      ></Tab>
                    ) : null;
                  })}
                </Tabs>
              </Box>
            </Stack>
            <Container>
              <Box>
                <Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Typography align="center" variant="h4">
                        Driver Status
                      </Typography>
                      <Box sx={{ ...commonStyles, height: 280, width: 382 }}>
                        <Typography
                          sx={{ fontWeight: "bold" }}
                          variant="h5"
                          align="center"
                        >
                          {currentDriver !== null
                            ? currentDriver.application_status.toUpperCase()
                            : null}
                        </Typography>
                        <Divider
                          flexItem={true}
                          variant="fullWidth"
                          sx={{ m: 1 }}
                        >
                          EDIT
                        </Divider>
                        <FormControl fullWidth sx={{ p: 2 }}>
                          <InputLabel>New Status</InputLabel>
                          <Select
                            onChange={handleStatus}
                            name="status"
                            value={
                              statusChange.status !== undefined
                                ? statusChange.status
                                : statuses[0]
                            }
                            label="New Status"
                          >
                            {statuses.map((status) => (
                              <MenuItem value={status}>{status}</MenuItem>
                            ))}
                          </Select>
                          <TextField
                            onChange={handleStatus}
                            name="reason"
                            label="Enter Reason"
                            variant="outlined"
                          />
                          <Button onClick={submitStatus} variant="contained">
                            Update
                          </Button>
                        </FormControl>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="h4" align="center">
                        Driver Points
                      </Typography>
                      <Box sx={{ ...commonStyles, height: 280, width: 382 }}>
                        <Box>
                          <Typography variant="h5" align="center" paragraph>
                          {currentDriver !== null
                            ? currentDriver.points
                            : null}
                          </Typography>
                        </Box>
                        <Divider variant="fullWidth" sx={{ m: 1 }}>
                          Edit
                        </Divider>
                        <FormControl fullWidth sx={{ p: 2 }}>
                          <TextField
                            name="points"
                            onChange={handlePoints}
                            label="Points change"
                            variant="outlined"
                          />
                          <TextField
                            name="reason"
                            onChange={handlePoints}
                            label="Reason"
                            variant="outlined"
                          />
                          <Button variant="contained" onClick={submitPoints}>
                            Update
                          </Button>
                        </FormControl>
                      </Box>
                    </Box>
                  </Stack>
                  <Box>
                    <Typography variant="h4">Recent Orders</Typography>
                    <Box sx={{ ...commonStyles }}></Box>
                  </Box>
                </Stack>
              </Box>
            </Container>
          </Stack>
        </Container>
      </Stack>
    </div>
  );
};

export default Sponsor;
