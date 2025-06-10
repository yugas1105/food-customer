import { Box, Button, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Order = () => {

  const navigate = useNavigate()

  const [allOrdersData, setallOrdersData] = useState([])

  useEffect(() => {
    let fetchOrders = async () => {
      try {
        let response = await axios.get("http://localhost:5000/api/fetchorder")
        setallOrdersData(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrders()
  }, [])


  return (
    <>
      <Box>
        <Typography variant='h4' sx={{
          mt: 25,
          textAlign: 'center'
        }}>Order</Typography>
      </Box>

      <Grid container spacing={2} sx={{ mt: 5, mb: 5 }}>
        {
          allOrdersData.map((order) => {
            return (
              <Grid item xs={12} sm={12} md={4} lg={3}
                key={order._id}>
                <Box sx={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '16px',
                  margin: '8px'
                }}>
                  <Typography variant='body1'>Total Price: {order.totalPrice}</Typography>
                  <Typography variant='body1'>Statu: {order.status}</Typography>
                  <Typography variant='body1'>Name: {order.customer?.name}</Typography>
                  <Button onClick={() => navigate("/orderdetails", { state: order })} variant='outlined' color='primary'>
                    View Details
                  </Button>
                </Box>
              </Grid>
            )
          })
        }
      </Grid>
    </>
  )
}

export default Order