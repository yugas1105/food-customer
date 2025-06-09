import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()

    const submitCustomerData = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const reqFormData = Object.fromEntries(formData.entries())

        try {
            await axios.post("http://localhost:5000/api/createcustomer", {
                ...reqFormData,
                address: {
                    street: reqFormData["street"],
                    city: reqFormData["city"],
                    postalCode: reqFormData["postalCode"],
                },
            })
            alert("Customer Registered Successfully")
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    const fieldStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: '#fdfdfd',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            '&:hover': {
                boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
            },
            '&.Mui-focused': {
                boxShadow: '0 0 0 2px rgba(255, 160, 0, 0.4)',
                borderColor: '#FFA000',
            },
        },
        '& .MuiInputLabel-root': {
            color: '#757575',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#FFA000',
        },
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f4f6f8', minHeight: '100vh', p: 2 }}>
            <Box
                component="form"
                onSubmit={submitCustomerData}
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
                    mt:9
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        fontWeight: 700,
                        fontSize: '2rem',
                        background: 'linear-gradient(90deg, #FF9800, #FFC107)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                        mb: 1,
                    }}
                >
                    Create Account
                </Typography>

                <TextField type="text" name="name" label="Enter your name" variant="outlined" fullWidth sx={fieldStyle} />
                <TextField type="email" name="email" label="Enter your email" variant="outlined" fullWidth sx={fieldStyle} />
                <TextField type="password" name="password" label="Enter password" variant="outlined" fullWidth sx={fieldStyle} />
                <TextField type="tel" name="Phone" label="Enter Mobile No" variant="outlined" fullWidth sx={fieldStyle} />

                <Divider>
                    <Typography variant="subtitle2" color="text.secondary">
                        Address
                    </Typography>
                </Divider>

                <TextField type="text" name="street" label="Enter street" placeholder="e.g.,Plot No 2, Aanand Road" variant="outlined" fullWidth sx={fieldStyle} />
                <TextField type="text" name="city" label="Enter city" variant="outlined" fullWidth sx={fieldStyle} />
                <TextField type="text" name="postalCode" label="Enter postalcode" variant="outlined" fullWidth sx={fieldStyle} />

                <Button
                    type="submit"
                    fullWidth
                    sx={{
                        py: 1.2,
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        borderRadius: '30px',
                        background: 'linear-gradient(135deg, #FFA726, #FFD54F)',
                        color: '#fff',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(255, 152, 0, 0.4)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #EF6C00, #FFC107)',
                            transform: 'scale(1.03)',
                            boxShadow: '0 6px 18px rgba(255, 140, 0, 0.5)',
                        },
                    }}
                >
                    Register
                </Button>
            </Box>
        </Box>
    )
}

export default Register
