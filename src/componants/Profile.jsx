import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from './reduxwork/UserSlice'

const Profile = () => {

  let { userData } = useSelector((state) => state.user)

  let dispatcher = useDispatch()
  let navigater = useNavigate()
  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 13
      }}>
        <Typography variant='h4' sx={{
          textAlign: 'center',
          color: 'warning.dark',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          letterSpacing: 1,
          mb: 4
        }}>Profile</Typography>

        <Box>
          <Typography variant='h6' sx={{
            color: 'warning.dark',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            mb: 2
          }}
          >Name: {userData.name}</Typography>

          <Typography variant='h6' sx={{
            color: 'warning.dark',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            mb: 2
          }}>Email: {userData.email}</Typography>

          <Typography variant='h6' sx={{
            color: 'warning.dark',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            mb: 2
          }}
          >Address: {userData.address?.street} {userData.address?.city} {userData.address?.postalCode}</Typography>

          <Typography variant='h6' sx={{
            color: 'warning.dark',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            mb: 2
          }}          
          >Mobile No: {userData.Phone}</Typography>


        </Box>

        <Button variant='contained' color='error'
          sx={{
            mt: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 26px',
            background: '#ff3e3e',
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '50px',
            cursor: 'pointer',
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out',
            boxShadow: '0 10px 20px rgba(255, 62, 62, 0.5)',
            '&:hover': {
              background: '#ff1e1e',
              transform: 'scale(1.08)'
            }
          }}
          onClick={() => {
            dispatcher(logoutUser())
            navigater('/login')
          }}>
          Logout
        </Button>
      </Box >
    </>
  )
}

export default Profile