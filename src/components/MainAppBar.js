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
import {
  Link,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

const pages = ["Dashboard", "Points", "Orders", "Cart"];
const settings = ["Profile", "Settings ", "Logout"];

const MainAppBar = (props) => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    const new_page = event.target.innerText.toLowerCase();
    setAnchorElNav(null);
    switch (new_page) {
      case "dashboard":
        if (props.role === "sponsor") {
          navigate(`/sponsor/dashboard?id=${props.id}`, { replace: false }, [
            navigate,
          ]);
        }
        if (props.role === "driver") {
          navigate(`/driver/dashboard?id=${props.id}`, { replace: false }, [
            navigate,
          ]);
        }
        if (props.role === "admin") {
          navigate(`/admin/dashboard?id=${props.id}`, { replace: false }, [
            navigate,
          ]);
        }
        break;
      case "points":
        if (props.role === "sponsor") {
          navigate(`/sponsor/drivers?id=${props.id}`, { replace: false }, [
            navigate,
          ]);
        }
        if (props.role === "driver") {
          navigate(`/driver/points?id=${props.id}`, { replace: false }, [
            navigate,
          ]);
        }
        if (props.role === "admin") {
          navigate(`/admin/drivers?id=${props.id}`, { replace: false }, [
            navigate,
          ]);
        }
        break;
      case "orders":
        break;
      case "cart":
      
        break;
      default:
        break;
    }
  };

  const handleCloseUserMenu = (event) => {
    const new_page = event.target.innerText;
    setAnchorElUser(null);
    if (new_page === "Profile")
      navigate(
        `/profile?id=${props.id}&role=${props.role}`,
        { replace: false },
        [navigate]
      );
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              alignItems: "center",
              padding: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                variant="outlined"
                color="primary"
                key={page}
                value={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  {localStorage.getItem("email") !== null
                    ? localStorage
                        .getItem("email")
                        .charAt(0)
                        .toLocaleUpperCase()
                    : "P"}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem value="Profile" onClick={handleCloseUserMenu}>
                Profile
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MainAppBar;
