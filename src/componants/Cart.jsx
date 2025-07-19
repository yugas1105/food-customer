import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreQty, increQty, calculateTotal, removeItem } from './reduxwork/CartSlice'

const Cart = () => {

  let { cartItem, cartTotal } = useSelector((state) => state.cart)

  let dispatcher = useDispatch()
  dispatcher((calculateTotal()))


  let placeOrder = async () => {

    let orderItems = cartItem.map((item) => {
      return {
        food: item._id,
        quantity: item.Qty
      }
    })

    let reqBody = {
      customer: userData._id,
      totalPrice: cartTotal,
      items: orderItems
    }

    try {
      let response = await axios.post("http://localhost:5000/api/createorder", reqBody)
      console.log(response.data);
      alert("Order Placed Successfully")
      dispatcher(clearCart())
    } catch (error) {
      console.log(error);
    }
  }
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
        <Typography variant='h5'>Total:{cartTotal}</Typography>
      </Box >
    </>
  );
};

export default Cart;
