import { Box, Button, Grid, Typography, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const Order = () => {
  const navigate = useNavigate();
  const [allOrdersData, setAllOrdersData] = useState([]);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await axios.post(
          "http://localhost:5000/api/fetchordersbycustomer",
          {
            customerId: userData._id,
          }
        );
        setAllOrdersData(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (userData?._id) {
      fetchOrders();
    }
  }, [userData]);

  // Style handler by status
  const getStatusStyles = (status) => {
    switch (status) {
      case "Delivered":
        return {
          icon: <CheckCircleIcon color="success" />,
          color: "green",
          background: "#e8f5e9",
          border: "green",
          button: {
            bg: "linear-gradient(to right, #4caf50, #087f23)",
            hover: "linear-gradient(to right, #388e3c, #065f1f)",
            shadow: "rgba(76, 175, 80, 0.6)",
          },
        };
      case "Pending":
        return {
          icon: <HourglassEmptyIcon color="warning" />,
          color: "orange",
          background: "#fff3e0",
          border: "orange",
          button: {
            bg: "linear-gradient(to right, #ff9800, #e65100)",
            hover: "linear-gradient(to right, #fb8c00, #dd2c00)",
            shadow: "rgba(255, 152, 0, 0.6)",
          },
        };
      case "Preparing":
        return {
          icon: <LocalDiningIcon sx={{ color: "#6a1b9a" }} />,
          color: "#6a1b9a",
          background: "#f3e5f5",
          border: "#6a1b9a",
          button: {
            bg: "linear-gradient(to right, #ab47bc, #6a1b9a)",
            hover: "linear-gradient(to right, #9c27b0, #4a148c)",
            shadow: "rgba(186, 104, 200, 0.5)",
          },
        };
      case "Dispatched":
        return {
          icon: <LocalShippingIcon sx={{ color: "#0288d1" }} />,
          color: "#0288d1",
          background: "#e1f5fe",
          border: "#0288d1",
          button: {
            bg: "linear-gradient(to right, #29b6f6, #0288d1)",
            hover: "linear-gradient(to right, #039be5, #01579b)",
            shadow: "rgba(2, 136, 209, 0.5)",
          },
        };
      default:
        return {
          icon: null,
          color: "gray",
          background: "#eeeeee",
          border: "gray",
          button: {
            bg: "#9e9e9e",
            hover: "#757575",
            shadow: "rgba(158, 158, 158, 0.5)",
          },
        };
    }
  };

  return (
    <Box sx={{ mt: 10, px: { xs: 2, sm: 4 } }}>
      <Typography variant="h6" gutterBottom>
        Welcome, <strong>{userData?.name}</strong>
      </Typography>

      <Typography variant="h4" gutterBottom fontWeight="bold">
        Your Orders
      </Typography>

      {allOrdersData.length === 0 ? (
        <Typography variant="body1" color="text.secondary" mt={2}>
          You have not placed any orders yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {allOrdersData.map((order, index) => {
            const styles = getStatusStyles(order.status);

            return (
              <Grid item xs={12} sm={6} md={4} key={order._id}>
                <Box sx={{ p: 3 }}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      backgroundColor: styles.background,
                      borderLeft: `6px solid ${styles.border}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 0 10px ${styles.button.shadow}`,
                      },
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Order #{index + 1}
                    </Typography>

                    <Box display="flex" alignItems="center" mt={1} gap={1}>
                      {styles.icon}
                      <Typography variant="body2">
                        Status:{" "}
                        <strong style={{ color: styles.color }}>
                          {order.status}
                        </strong>
                      </Typography>
                    </Box>

                    <Typography variant="body2" mt={1}>
                      Total Price: ₹{order.totalPrice}
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() =>
                        navigate("/orderdetails", { state: order })
                      }
                      sx={{
                        mt: 3,
                        height: "40px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        color: "#fff",
                        background: styles.button.bg,
                        borderRadius: 2,
                        "&:hover": {
                          background: styles.button.hover,
                          boxShadow: `0 0 10px ${styles.button.shadow}`,
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </Paper>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default Order;
