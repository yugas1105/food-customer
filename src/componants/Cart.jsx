import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreQty, increQty, calculateTotal, removeItem } from './reduxwork/CartSlice'

const Cart = () => {

  let { cartItem, cartTotal } = useSelector((state) => state.cart)

  let dispatcher = useDispatch()
  dispatcher((calculateTotal()))

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
      </Box >
    </>
  )
}

export default Cart