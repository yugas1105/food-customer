import { Box, Button, Grid, Typography, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
          {allOrdersData.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Box sx={{ p: 1 }}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "rgba(0, 0, 0, 0.2) 0px 8px 16px",
                    },
                  }}
                >
                  <Box>
                    {/* <Typography variant="subtitle1" fontWeight={600}>
                      Customer: {order.customer?.name}
                    </Typography> */}

                    <Typography variant="body2" color="text.secondary" mt={1}>
                      Status:{" "}
                      <strong style={{ color: "#1976d2" }}>
                        {order.status}
                      </strong>
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mt={1}>
                      Total Price: ₹{order.totalPrice}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate("/orderdetails", { state: order })}
                    sx={{
                      mt: 3,
                      height: "40px",
                      fontSize: "14px",
                      background: "linear-gradient(to right, #1CB5E0, #000851)",
                      color: "#fff",
                      textTransform: "capitalize",
                      borderRadius: 2,
                      "&:hover": {
                        background:
                          "linear-gradient(to right, #1a91da, #000544)",
                      },
                    }}
                  >
                    View Details
                  </Button>
                </Paper>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Order;
