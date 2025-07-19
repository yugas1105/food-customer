import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigator = useNavigate();
  const [allOrdersData, setallOrdersData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/fetchorder");
        setallOrdersData(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box sx={{ mt: 10, px: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
        All Orders
      </Typography>

      <Grid container spacing={2}>
        {allOrdersData.map((order) => (
          <Grid item size={{
                  sm: 12,
                  md: 6,
                  lg: 4,
                }} key={order._id}>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                p: 2,
                position: "relative",
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "center",
                backgroundColor: "#fafafa",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Customer: {order.customer?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status:{" "}
                  <strong style={{ color: "#1976d2" }}>{order.status}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Price: ₹{order.totalPrice}
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={() =>
                  navigator("/orderdetails", { state: order })
                }
                sx={{
                  height: "35px",
                  fontSize: "13px",
                  background: "linear-gradient(to right, #1CB5E0, #000851)",
                  color: "#fff",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "linear-gradient(to right, #1a91da, #000544)",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  },
                }}
              >
                View Details
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Order;
