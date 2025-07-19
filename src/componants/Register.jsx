import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../custom/CustomAlert";

const Register = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const submitCustomerData = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reqFormData = Object.fromEntries(formData.entries());

    try {
      await axios.post("http://localhost:5000/api/createcustomer", {
        ...reqFormData,
        address: {
          street: reqFormData["street"],
          city: reqFormData["city"],
          postalCode: reqFormData["postalCode"],
        },
      });
      showAlert("Customer Registered Successfully","success");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        p: 2,
        mt: 4,
      }}
    >
      <Box
        component="form"
        onSubmit={submitCustomerData}
        sx={{
          width: "100%",
          maxWidth: 550,
          bgcolor: "white",
          boxShadow: 5,
          borderRadius: 4,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mt: 4,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            fontSize: "2rem",
            background: "linear-gradient(90deg, #FF9800, #FFC107)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            mb: 1,
          }}
        >
          Create Account
        </Typography>

        <TextField
          type="text"
          name="name"
          label="Enter your name"
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          type="email"
          name="email"
          label="Enter your email"
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          type="password"
          name="password"
          label="Enter password"
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          type="tel"
          name="Phone"
          label="Enter Mobile No"
          variant="outlined"
          size="small"
          fullWidth
        />

        <Divider>
          <Typography variant="subtitle2" color="text.secondary">
            Address
          </Typography>
        </Divider>

        <TextField
          type="text"
          name="street"
          label="Enter street"
          placeholder="e.g.,Plot No 2, Aanand Road"
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          type="text"
          name="city"
          label="Enter city"
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          type="text"
          name="postalCode"
          label="Enter postalcode"
          variant="outlined"
          size="small"
          fullWidth
        />

        <Box sx={{ height: "100%", display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="warning"
            sx={{
              borderRadius: "999px",
              textTransform: "uppercase",
              width: "200px",
              height: "45px",
              fontWeight: "bold",
              fontSize: "20px",
              background:
                "linear-gradient(90deg, rgb(253, 104, 29) 0%, rgb(249, 227, 29) 100%)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                boxShadow: "rgba(32, 31, 31, 0.35) 0px 5px 15px",
              },
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
