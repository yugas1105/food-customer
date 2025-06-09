import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreQty, increQty, calculateTotal, removeItem, clearCart } from './reduxwork/CartSlice'
import axios from 'axios'


const Cart = () => {

  let { cartItem, cartTotal } = useSelector((state) => state.cart)

  let { userData } = useSelector((state) => state.user)
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
      <Box >
        <Typography variant='h4' sx={{ mt: 10, color: 'grey', textAlign: 'center' }}>Cart Item</Typography>
        <Grid container>
          {
            cartItem.map((dish) => {
              let dId = dish._id
              return (
                <Grid item size={{
                  sm: 12,
                  md: 6,
                  lg: 3
                }}>
                  <Card>
                    <CardContent>
                      {/* <Typography variant='h5'>{dish._id}</Typography> */}
                      <Typography variant='h5'>{dish.foodname}</Typography>
                      <Typography variant='body1'>{dish.description}</Typography>
                      <Typography variant='h5'>{dish.price}</Typography>
                      <Typography variant='h5'>{dish.category}</Typography>
                    </CardContent>
                    <CardActions>
                      <Typography variant='body2'>Product Qty:</Typography>
                      <Button variant='contained' color='warning'
                        onClick={() => { dispatcher(decreQty({ dId })) }}
                      >-</Button>
                      <Typography variant='h4'>{dish.Qty}</Typography>
                      <Button variant='contained' color='primary'
                        onClick={() => { dispatcher(increQty({ dId })) }}
                      >+</Button>

                      <Button variant='contained' color='error'
                        onClick={() => { dispatcher(removeItem({ dId })) }}
                      >X</Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>
        <Typography variant='h5'>Total:{cartTotal}</Typography>
        <Button onClick={() => placeOrder()} variant='contained' color='success'>
          Place Order
        </Button>
      </Box >
    </>
  )
}

export default Cart