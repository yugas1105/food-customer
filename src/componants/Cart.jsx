import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {

  let { cartItem, cartTotal } = useSelector((state) => state.cart)

  return (
    <>
      <Box>
        <Typography variant='h5' sx={{ mt: 9 }}>Cart</Typography>
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
                    
                  </Grid>
                )
            })
          }
        </Grid>
      </Box>
    </>
  )
}

export default Cart