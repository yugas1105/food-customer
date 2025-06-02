import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { Form, useNavigate } from 'react-router-dom'

const Login = () => {

  let navigator = useNavigate()

  return (
    <>
      <Box sx={{
        mt: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        backgroundColor: '#f4f6f8',
      }}>
        <Box
          component='form'
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
            fullWidth />

          <TextField
            type='password'
            name='password'
            label='Enter password'
            variant='outlined'
            fullWidth />

          <Button variant='contained' color='success' sx={{     
            width: '100%',  
            bgcolor: 'primary', // blue
            py: 1.2,
            fontWeight: 'bold',
            letterSpacing: 1,
            fontSize: '1rem',
            '&:hover': {
              bgcolor: 'darkgreen',
            },
            boxShadow: 2,
          }}
          >Login</Button>

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
      </Box>
    </>
  )
}

export default Login