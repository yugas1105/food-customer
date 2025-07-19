import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { useAlert } from "../custom/CustomAlert";

const OrderDetails = () => {
  let orderData = useLocation().state;
  const { showAlert } = useAlert();

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ mt: 10, mb: 2, textAlign: "center" }}>
          Order Details
        </Typography>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              margin: "8px",
              width: "45%",
            }}
          >
            <Typography variant="body1">
              Name: {orderData.customer?.name}
            </Typography>
            <Typography variant="body1">
              Address:{" "}
              {orderData.customer?.address.street +
                " " +
                orderData.customer?.address.city +
                " " +
                orderData.customer?.address.postalCode}
            </Typography>
            <Typography variant="body1">
              Phone: {orderData.customer?.Phone}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Status: {orderData.status}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Total Price: {orderData.totalPrice}
            </Typography>
          </Box>

          <Grid
            container
            sx={{
              width: "65%",
              gap: 1.5,
            }}
          >
            {orderData.items?.map((dish) => {
              return (
                <Grid
                  item
                  size={{
                    sm: 12,
                    md: 6,
                    lg: 12,
                  }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      p: 1,
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="65px"
                      image={`http://localhost:5000/${dish.food.image}`}
                      alt={dish.food.foodname}
                      sx={{
                        width: "65px",
                        borderRadius: "50%",
                      }}
                    />
                    <CardContent>
                      <Typography variant="body">
                        <b>{dish.food.foodname}</b>{" "}
                      </Typography>
                      <Typography variant="body">
                        Quantity: {dish.quantity}{" "}
                      </Typography>
                      <Typography variant="body">
                        Price: {dish.food.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mr: 2,
        }}
      >
        <Button
          variant="contained"
          color="error"
          
          sx={{
            mt: 2,
            fontSize:12,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
              transition: "all 0.2s ease-in-out",
            },
          }}
          onClick={() => showAlert("Order Cancelled", "error")}
        >
          Cancel Order
        </Button>
      </Box>
    </>
  );
};

export default OrderDetails;
