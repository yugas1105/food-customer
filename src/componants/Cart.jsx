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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreQty,
  increQty,
  calculateTotal,
  removeItem,
  clearCart,
} from "./reduxwork/CartSlice";
import axios from "axios";
import { useAlert } from "../custom/CustomAlert";

const Cart = () => {
  let { cartItem, cartTotal } = useSelector((state) => state.cart);
  let { userData } = useSelector((state) => state.user);
  const { showAlert } = useAlert();
  let dispatcher = useDispatch();

  dispatcher(calculateTotal());

  const handlePayment = async () => {

    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const razorpay = await axios.post(`http://localhost:5000/api/razorpayorder`,
        {
          customer: userData._id, // ✅ match what backend expects
          amount: cartTotal,
          // paymentMethod: "Razorpay",
        }
      );

      const options = {
        key: "rzp_test_RRRqrm1ahDFT82", // Replace with your real Razorpay key
        amount: cartTotal * 100,
        currency: "INR",
        name: "swati delights",
        description: "Order Payment",
        order_id: razorpay.data.order.id,
        handler: async function (response) {
          alert("Payment Successful!");
          dispatcher(clearCart());
        },
        prefill: {
          name: userData?.Name || "Customer",
          email: userData?.Email || "example@gmail.com",
          contact: userData?.Mobile || "1234567894",
        },
        theme: {
          color: "#222dffff",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error.message);
    }
  };

  let placeOrder = async () => {
    let orderItems = cartItem.map((item) => {
      return {
        food: item._id,
        quantity: item.Qty,
      };
    });

    let reqBody = {
      customer: userData._id,
      items: orderItems,
      totalPrice: cartTotal,
    };

    try {
      let result = await axios.post(
        "http://localhost:5000/api/createorder",
        reqBody
      );
      console.log(result.data);
      showAlert("Order Placed Successfully", "success");
      await handlePayment()
      dispatcher(clearCart());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={{ mt: 10 }}>
        <Grid container>
          {cartItem.map((dish) => {
            let dId = dish._id;
            return (
              <Grid
                item
                size={{
                  sm: 12,
                  md: 6,
                  lg: 3,
                }}
                key={dish._id}
              >
                <Box padding={1}>
                  <Card
                    sx={{
                      height: 250,
                      position: "relative",
                      padding: 1,
                    }}
                  >
                    <CardContent>
                      {/* <Typography variant='h5'>{dish._id}</Typography> */}
                      <Typography variant="h6">{dish.foodname}</Typography>
                      <Typography variant="body2">
                        {dish.description}
                      </Typography>
                      <Typography variant="subtitle1">{dish.price}</Typography>
                      <Typography variant="caption">{dish.category}</Typography>
                    </CardContent>

                    <CardActions>
                      <Button
                        variant="outlined"
                        color="info"
                        onClick={() => {
                          dispatcher(decreQty({ dId }));
                        }}
                        sx={{
                          height: "35px",
                          width: "20px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography sx={{ fontSize: "45px", mb: 1 }}>
                          -
                        </Typography>
                      </Button>

                      <Typography variant="h5">{dish.Qty}</Typography>

                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => {
                          dispatcher(increQty({ dId }));
                        }}
                        sx={{
                          height: "35px",
                          width: "20px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography sx={{ fontSize: "30px" }}>+</Typography>
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => {
                          dispatcher(removeItem({ dId }));
                        }}
                      >
                        <small>Cancel</small>
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        <Typography variant="h6" fontWeight="bold">
          Total:₹{cartTotal}
        </Typography>

        <Button
          onClick={() => placeOrder()}
          variant="contained"
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
          Place Order
        </Button>
      </Box>
    </>
  );
};

export default Cart;
