import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    let navigator = useNavigate()

    let submitCustomerData = async (e) => {
        e.preventDefault()
        let formData = new FormData(e.target);
        let reqFormData = Object.fromEntries(formData.entries());
        console.log("FDATA", reqFormData);

        try {
            let result = await axios.post("http://localhost:5000/api/createcustomer",
                {
                    ...reqFormData, address: {
                        street: reqFormData["street"],
                        city: reqFormData["city"],
                        postalCode: reqFormData["postalCode"],
                    }
                });
            alert("Customer Registered Successfully")
            navigator('/login')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Box sx={{
                mt: 10,
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#f4f6f8',
                minHeight: '100vh',
                p: 2,
            }}>
                <Box
                    onSubmit={submitCustomerData}
                    component='form'
                    sx={{
                        width: '100%',
                        maxWidth: 550,
                        bgcolor: 'white',
                        boxShadow: 5,
                        borderRadius: 4,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}>

                    <Typography variant="h4" align="center" color="textSecondary" fontWeight="bold">
                        Create Account
                    </Typography>

                    <TextField
                        type='text'
                        name='name'
                        label='Enter your name'
                        variant='outlined'
                        fullWidth />

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


                    <TextField
                        type='tel'
                        name='Phone'
                        label='Enter Mobile No'
                        variant='outlined'
                        fullWidth />


                    <Divider>
                        <Typography variant="subtitle2" color="text.secondary">
                            Address
                        </Typography>
                    </Divider>

                    <TextField
                        type='text'
                        name='street'
                        label='Enter street'
                        variant='outlined'
                        placeholder='e.g.,Plot No 2, Aanand Road'
                        fullWidth />

                    <TextField
                        type='text'
                        name='city'
                        label='Enter city'
                        variant='outlined'
                        fullWidth />

                    <TextField
                        type='text'
                        name='postalCode'
                        label='Enter postalcode'
                        variant='outlined'
                        fullWidth />

                    <Button type='submit' variant='contained' color='warning'
                        fullWidth
                        sx={{
                            py: 1,
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            '&:hover': {
                                backgroundColor: '#2e7d32',
                            },
                        }}
                    >Register</Button>

                </Box>
            </Box>
        </>
    )
}

export default Register