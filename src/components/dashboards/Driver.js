import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stack, Grid, Alert } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MainAppBar from "../MainAppBar";
import { useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import ApplicationStatus from "../ApplicationStatus";

const Driver = () => {
  const url = "http://trucker-rewards-dev.us-east-1.elasticbeanstalk.com";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const user_id = searchParams.get("id");
  const [sponsors, setSponsors] = useState(null);
  const [applications, setApplications] = useState(null);
  const [totalPoints, setTotalPoints] = useState(null);
  const [driverPoints, setDriverPoints] = useState(null);
  const [acceptedSponsors, setAcceptedSponsors] = useState(null);

  useEffect(() => {
    axios
      .get(`${url}/api/companies`, config)
      .then((response) => {
        const sponsors = response.data["sponsor_companies"];
        setSponsors(sponsors);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${url}/api/driver/${user_id}/points`, config)
      .then((response) => {
        if (response.status === 200) {
          if (response.data !== []) {
            let driver_points = response.data;
            setDriverPoints(driver_points);
            driver_points = driver_points.filter((d) => d.points !== null);
            setTotalPoints(
              driver_points.reduce((n, { points }) => n + points, 0)
            );
          } else {
            setTotalPoints(0);
          }
        }
      })
      .catch((err) => {
        setTotalPoints(null);
      });

    axios
      .get(`${url}/api/driver/${user_id}/applications`, config)
      .then((response) => {
        const accepted = response.data.filter(
          (d) => d.application_status === "accepted"
        );
        console.log(accepted.map((a) => a.name));
        setAcceptedSponsors(accepted.map((a) => a.name));
        setApplications(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${url}/api/${role}/${user_id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
            ? `Welcome, ${user.first_name}!`
            : "Welcome!"}
        </Typography>
        <Typography align="left" variant="h2" sx={{ fontWeight: 500 }}>
          {totalPoints !== null && totalPoints !== undefined
            ? `You have ${totalPoints} total points!`
            : `You have 0 total points!`}
        </Typography>
        <Stack direction="row" spacing={5}>
          <ApplicationStatus
            driver={user_id}
            applications={applications}
            sponsors={sponsors}
          />
          <Stack direction="column">
            <Box
              sx={{
                border: 1,
                borderRadius: 3,
                width: "75vw",
                margin: 2,
                padding: 2,
                paddingBottom: 20,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                {" "}
                Points
              </Typography>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Summary
                  </Typography>
                  <List
                    component={Stack}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {driverPoints !== null
                      ? driverPoints.map((dp) => {
                          return dp.points !== null || dp.points > 0 ? (
                            <Stack direction="column">
                              <Typography
                                variant="h5"
                                sx={{ textAlign: "center", m: 1 }}
                              >
                                {dp.name}
                              </Typography>
                              <Typography
                                variant="h2"
                                sx={{
                                  fontWeight: 500,
                                  textAlign: "center",
                                  m: 1,
                                }}
                              >
                                {dp.points}
                              </Typography>
                            </Stack>
                          ) : null;
                        })
                      : null}
                  </List>
                </CardContent>
              </Card>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ padding: 2 }}
              >
                <Typography variant="subtitle1">
                  Want to trade points for items?
                </Typography>
                <Link to="/driver/catalogs">
                  <Button size="small" variant="contained">
                    View Sponsor Catalogs
                  </Button>
                </Link>
              </Stack>
            </Box>
            <Box
              sx={{
                border: 1,
                borderRadius: 3,
                width: "75vw",
                margin: 2,
                padding: 2,
                paddingBottom: 20,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Orders
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};
export default Driver;
