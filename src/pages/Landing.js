import React from 'react'
import { useNavigate } from 'react-router-dom'

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

const Landing = () => {

  const navigate = useNavigate();
  const handleHome = () => navigate("/posts");
  const handleReg = () => navigate("/register")
  const handleLogin = () => navigate("/login");
  

  return (
    <div>
      <Container sx={{ py: 4 }} maxWidth="md">
        <Box>
          <div className="landing-container">
            <div>WELCOME TO</div>
            <div className="landing-title"> MINDIFY</div>
          </div>
          <br />
          <br />
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              className="hov"
              variant="contained"
              style={{
                backgroundImage:
                  "linear-gradient(to right,  #8A2387, #E94057, #F27121)",
                paddingRight: 35,
                paddingLeft: 35,
              }}
              onClick={handleHome}
            >
              Home
            </Button>
            <Button
              className="hov"
              variant="outlined"
              style={{
                borderColor: "#8A2387",
                color: "#8A2387",
                backgroundColor: "white",
                paddingLeft: 30,
                paddingRight: 30,
              }}
              onClick={handleReg}
            >
              Register
            </Button>
            <Button
              className="hov"
              variant="outlined"
              style={{
                backgroundImage:
                  "linear-gradient(to right,  #8A2387, #E94057, #F27121)",
                color: "#FFF",
                paddingLeft: 35,
                paddingRight: 35,
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Container>
    </div>
  );
}

export default Landing