import {
  Stack,
  Typography,
  List,
  ListItem,
  Alert,
  Button,
} from "@mui/material";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const mergeApplications = (sponsors, applications) => {
  if (applications != null && sponsors != null) {
    const sponsor_map = {};
    sponsors.map(({ id, name }) => (sponsor_map[id] = name));
    const statuses = applications.map((application) => {
      return {
        name: sponsor_map[application.sponsor_id],
        application_status: application.application_status,
      };
    });

    const ids = [
      ...new Set([
        ...sponsors.map((e) => e.name),
        ...statuses.map((e) => e.name),
      ]),
    ];
    console.log(ids);

    const result = ids.map((e) => {
      const obj = {
        ...sponsors.find((o) => o.name === e),
        ...statuses.find((o) => o.name === e),
      };

      if (obj.name && obj._id) delete obj._id;

      return obj;
    });
    console.log(result);
    return result;
  }
};

const ApplicationStatus = ({ driver, sponsors, applications }) => {
  const url = "http://trucker-rewards-dev.us-east-1.elasticbeanstalk.com";
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Key key=123456789`,
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  };

  const handleApply = (event) => {
    const sponsor_id = event.target.id 
    console.log(sponsor_id)
    axios
    .post(`${url}/api/driver/${driver}/applications/${sponsor_id}`, config)
    .then((response) => {
      console.log(response)
      if(response.status === 201)  navigate(0)
    })
    .catch((err) => {
      console.log(err)
      
    });
  
  } 
  return (
    <Stack direction="column">
      <Typography align="center">Sponsor Application Status</Typography>
      <List
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: "100vh",
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {mergeApplications(sponsors, applications) !== undefined
          ? (sponsors !== null &&
            mergeApplications(sponsors, applications) !== null
            ? mergeApplications(sponsors, applications).map((app) => (
                <ListItem sx={{ justifyContent: "space-between" }}>
                  {app.name}
                  {console.log(app.application_status)}
                  {app.application_status === "pending" ? (
                    <Alert variant="outlined" severity="info">
                      {app.application_status}
                    </Alert>
                  ) : app.application_status === "under-review" ? (
                    <Alert severity="warning">{app.application_status}</Alert>
                  ) : app.application_status === "rejected" ? (
                    <Alert severity="error">{app.application_status}</Alert>
                  ) : app.application_status === "accepted" ? (
                    <Alert severity="success">{app.application_status}</Alert>
                  ) : (
                    <Button id={app.id} variant="outlined" size="small" onClick={handleApply}>
                      Apply
                    </Button>
                  )}
                </ListItem>
              ))
            : null
          )
          : null}
      </List>
    </Stack>
  );
};

export default ApplicationStatus;
