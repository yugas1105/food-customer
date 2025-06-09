import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from './reduxwork/UserSlice'

const Login = () => {

  let navigator = useNavigate()
  let dispatcher = useDispatch()

  let logInCustomerData = async (e) => {
    e.preventDefault()
    let formData = new FormData(e.target);
    let loginData = Object.fromEntries(formData.entries());

    try {
      let result = await axios.post("http://localhost:5000/api/dologin", loginData);
      console.log("FDATA", result.data.data);
      dispatcher(loginUser(result.data.data))

      // alert("Login Successfull")
      navigator('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '89vh',
        backgroundColor: '#f4f6f8',
        mt: 8
      }}>
        <Box
          component='form'
          onSubmit={logInCustomerData}
          sx={{
            width: 400,
            bgcolor: 'white',
            boxShadow: 4,
            borderRadius: 3,
            px: 4,
            py: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            alignItems: 'center',
          }}
        >
          <Typography variant='h4' sx={{
            fontWeight: 'bold',
            color: '#424242',
            mb: 1,
          }}>
            Customer Login </Typography>

          <TextField
            type='email'
            name='email'
            label='Enter your email'
            variant='outlined'
            fullWidth
          />

          <TextField
            type='password'
            name='password'
            label='Enter password'
            variant='outlined'
            fullWidth />

          <Button
            type='submit'
            variant='contained'
            sx={{
              borderRadius: '999px',
              textTransform: 'uppercase',
              minWidth: '120px',
              height: '45px',
              fontWeight: 'bold',
              fontSize: '20px',
              background: "#fd8d1d",
              background: "linear-gradient(90deg, rgb(253, 104, 29) 0%, rgb(249, 227, 29) 100%)",
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                translate: "0 6px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
              }
            }}
          >
            Login
          </Button>


          <Typography variant='body2' onClick={() => {
            navigator('/register')
          }}
            sx={{
              textAlign: 'center',
              mt: 1,
              color: '#1976d2',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Don't have an an account? Register here</Typography>
        </Box>
      </Box >
    </>
  )
}

export default Login