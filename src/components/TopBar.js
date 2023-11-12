import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonPinRoundedIcon from "@mui/icons-material/PersonPinRounded";
import LocalPostOfficeRoundedIcon from "@mui/icons-material/LocalPostOfficeRounded";
import Box from "@mui/material/Box";
import LogoutIcon from "@mui/icons-material/Logout";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AccountCircle from "@mui/icons-material/AccountCircle";

import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DescriptionIcon from "@mui/icons-material/Description";
import { Typography } from '@mui/material';





const TopBar = ({ authenticated, teacher, handleLogOut }) => {


  //react useState hook to save the current open/close state of the drawer, normally variables dissapear afte the function was executed
  const [open, setState] = useState(false);

  //function that is being called every time the drawer should open or close, the keys tab and shift are excluded so the user can focus between the elements with the keys
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    //changes the function state according to the value of open
    setState(open);

  }
      
  

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="sticky"
          className="app-bar"
          style={{
            marginBottom: 20,
            backgroundImage:
              "linear-gradient(to right,  #8A2387, #E94057, #F27121)",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              sx={{
                mr: 2,
              }}
            >
              <MenuIcon />
            </IconButton>
            {authenticated ? (
              <div className="corner">
                <Typography>{teacher.username}</Typography>
              </div>
            ) : (
              <div className="corner" style={{ display: "flex" }}>
                <Typography variant="h6">Welcome! </Typography>

                <AccountCircle
                  size="large"
                  style={{
                    marginLeft: 5,
                    padding: 4,
                  }}
                />
              </div>
            )}
            <Drawer
              //from which side the drawer slides in
              anchor="left"
              //if open is true --> drawer is shown
              open={open}
              //function that is called when the drawer should close
              onClose={toggleDrawer(false)}
              //function that is called when the drawer should open
              onOpen={toggleDrawer(true)}
            >
              {/* The inside of the drawer */}
              <Box
                sx={{
                  p: 2,
                  height: 1,
                  backgroundColor: "#FFFFFF",
                }}
              >
                {/* when clicking the icon it calls the function toggleDrawer and closes the drawer by setting the variable open to false */}
                <IconButton sx={{ mb: 2 }}>
                  <CloseIcon onClick={toggleDrawer(false)} />
                </IconButton>

                <Divider sx={{ mb: 2 }} />
                {authenticated && teacher ? (
                  <Box sx={{ mb: 2 }}>
                    <ListItemButton className="nav">
                      <ListItemIcon>
                        <HomeRoundedIcon sx={{ color: "#8A2387" }} />
                      </ListItemIcon>
                      <Link className="nav" to="/posts">
                        <ListItemText className="nav" primary="Home" />
                      </Link>
                    </ListItemButton>

                    <ListItemButton className="nav">
                      <ListItemIcon>
                        <PersonPinRoundedIcon sx={{ color: "#8A2387" }} />
                      </ListItemIcon>
                      <Link className="nav" to="/prof">
                        <ListItemText className="nav" primary="My Profile" />
                      </Link>
                    </ListItemButton>

                    <ListItemButton>
                      <ListItemIcon>
                        <DescriptionIcon sx={{ color: "#8A2387" }} />
                      </ListItemIcon>
                      <Link className="nav" to="/createpost">
                        <ListItemText primary="Post" />
                      </Link>
                    </ListItemButton>

                    <ListItemButton>
                      <ListItemIcon>
                        <LocalPostOfficeRoundedIcon sx={{ color: "#8A2387" }} />
                      </ListItemIcon>
                      <Link className="nav" to="/questions">
                        <ListItemText primary="Q&A" />
                      </Link>
                    </ListItemButton>

                    <ListItemButton>
                      <ListItemIcon>
                        <LogoutIcon sx={{ color: "#8A2387" }} />
                      </ListItemIcon>
                      <Link className="nav" onClick={handleLogOut} to="/">
                        <ListItemText primary="Logout" />
                      </Link>
                    </ListItemButton>
                  </Box>
                ) : (
                  <Box sx={{ mb: 2 }}>
                    <ListItemButton className="nav">
                      <ListItemIcon>
                        <HomeRoundedIcon sx={{ color: "#8A2387" }} />
                      </ListItemIcon>
                      <Link className="nav" to="/posts">
                        <ListItemText className="nav" primary="Home" />
                      </Link>
                    </ListItemButton>

                    <ListItemButton className="nav">
                      <ListItemIcon>
                        <PersonPinRoundedIcon sx={{ color: "#8A2387" }} />
                      </ListItemIcon>
                      <Link className="nav" to="/prof">
                        <ListItemText className="nav" primary="My Profile" />
                      </Link>
                    </ListItemButton>

                    <ListItemButton>
                      <ListItemIcon>
                        <LocalPostOfficeRoundedIcon sx={{ color: "#8A2387" }} />
                      </ListItemIcon>
                      <Link className="nav" to="/questions">
                        <ListItemText primary="Q&A" />
                      </Link>
                    </ListItemButton>

                    <ListItemButton className="nav">
                      <ListItemIcon>
                        <VpnKeyIcon sx={{ color: "#8A2387" }} />
                      </ListItemIcon>
                      <Link className="nav" to="/login">
                        <ListItemText className="nav" primary="Login" />
                      </Link>
                    </ListItemButton>
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: "0",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                  }}
                ></Box>
              </Box>
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
  };

export default TopBar
