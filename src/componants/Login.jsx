import { Box, Button, TextField, Typography, Card } from "@mui/material";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./reduxwork/UserSlice";

const Login = () => {
  let navigator = useNavigate();
  let dispatcher = useDispatch();

  let logInCustomerData = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let loginData = Object.fromEntries(formData.entries());

    try {
      let result = await axios.post(
        "http://localhost:5000/api/dologin",
        loginData
      );
      console.log("FDATA", result.data.data);
      dispatcher(loginUser(result.data.data));

      // alert("Login Successfull")
      navigator("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    
      <Box
        sx={{
          overflow: "hidden",
          mt: 10,
          height: "83vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "#b9dce9ff"
        }}
      >
        <Card
          sx={{
            borderRadius: "15px",
          }}
        >
          <Box
            component="form"
            onSubmit={logInCustomerData}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              p: 3,
              height: "100%",
              width: 380,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#424242",
                mb: 1,
                textAlign: "center",
              }}
            >
              Customer Login{" "}
            </Typography>

            <TextField
              type="email"
              name="email"
              label="Enter your email"
              variant="outlined"
              fullWidth
            />

            <TextField
              type="password"
              name="password"
              label="Enter password"
              variant="outlined"
              fullWidth
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  height: "35px",
                  fontSize: "17px",
                  height:35,
                  width:100,
                  background: "linear-gradient(to right, #1CB5E0, #000851)",
                  color: "#fff",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "linear-gradient(to right, #1a91da, #000544)",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  },
                }}
              >
                Login
              </Button>
            </Box>

            <Typography
              variant="body2"
              onClick={() => {
                navigator("/register");
              }}
              sx={{
                textAlign: "center",
                color: "#1976d2",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Don't have an an account? Register here
            </Typography>
          </Box>
        </Card>
      </Box>
      
    </>
  );
};

export default Login;
