import { Box, Divider, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';



const Footer = () => {

    let navigator = useNavigate()

    return (
        <>
            <Paper sx={{
                height: 140,
                backgroundColor: "#0B0B45",
                display: "flex",
                mt: 5,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box>
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'center'
                    }}>
                        <GoogleIcon sx={{
                            fontSize: 20,
                            backgroundColor: '#ccc',
                            p: 0.6,
                            borderRadius: 50,
                            color: "black"
                        }} />
                        <WhatsAppIcon sx={{
                            fontSize: 20,
                            backgroundColor: '#ccc',
                            p: 0.6,
                            borderRadius: 50,
                            color: "black"
                        }} />
                        <InstagramIcon sx={{
                            fontSize: 20,
                            backgroundColor: '#ccc',
                            p: 0.6,
                            borderRadius: 50,
                            color: "black"
                        }} />
                        <FacebookIcon sx={{
                            fontSize: 20,
                            backgroundColor: '#ccc',
                            p: 0.6,
                            borderRadius: 50,
                            color: "black"
                        }} />
                        <TwitterIcon sx={{
                            fontSize: 20,
                            backgroundColor: '#ccc',
                            p: 0.6,
                            borderRadius: 50,
                            color: "black"
                        }} />
                    </Box>

                    <List sx={{
                        display: "flex",
                        color: "#ccc",
                        gap:4,
                        height:20
                    }}>
                        <ListItem
                            onClick={() => navigator("/")}
                            sx={{
                                p: 0.5,
                                minHeight: 24,
                                '&:hover .MuiTypography-root': {
                                    color: '#fff', // color on hover
                                },
                                cursor: "pointer"
                            }}
                        >
                            <ListItemText
                                primary="Home"
                                primaryTypographyProps={{ fontSize: '0.8rem', color: '#ccc' }}
                            />
                        </ListItem>

                        <ListItem
                            onClick={() => { navigator("/dishes") }}
                            sx={{
                                p: 0.5,
                                minHeight: 24,
                                '&:hover .MuiTypography-root': {
                                    color: '#fff', // color on hover
                                },
                                cursor: "pointer"
                            }}
                        >
                            <ListItemText
                                primary="Dishes"
                                primaryTypographyProps={{ fontSize: '0.8rem', color: '#ccc' }}
                            />
                        </ListItem>

                        <ListItem
                            onClick={() => { navigator("/cart") }}
                            sx={{
                                p: 0.5,
                                minHeight: 24,
                                '&:hover .MuiTypography-root': {
                                    color: '#fff', // color on hover
                                },
                                cursor: "pointer"
                            }}
                        >
                            <ListItemText
                                primary="Cart"
                                primaryTypographyProps={{ fontSize: '0.8rem', color: '#ccc' }}
                            />
                        </ListItem>

                        <ListItem
                            onClick={() => { navigator("/order") }}
                            sx={{
                                p: 0.5,
                                minHeight: 24,
                                '&:hover .MuiTypography-root': {
                                    color: '#fff', // color on hover
                                },
                                cursor: "pointer"
                            }}
                        >
                            <ListItemText
                                primary="Order"
                                primaryTypographyProps={{ fontSize: '0.8rem', color: '#ccc' }}
                            />
                        </ListItem>

                        <ListItem 
                        onClick={() => {navigator("/profile")}}
                            sx={{
                                p: 0.5,
                                minHeight: 24,
                                '&:hover .MuiTypography-root': {
                                    color: '#fff', // color on hover
                                },
                                cursor: "pointer"
                            }}>
                            <ListItemText
                                primary="Profile"
                                primaryTypographyProps={{ fontSize: '0.8rem', color: '#ccc' }}
                            />
                        </ListItem>

                        <ListItem onClick={() => {navigator("/login")}}
                            sx={{
                                p: 0.5,
                                minHeight: 24,
                                '&:hover .MuiTypography-root': {
                                    color: '#fff', // color on hover
                                },
                                cursor: "pointer"
                            }}>
                            <ListItemText
                                primary="Login"
                                primaryTypographyProps={{ fontSize: '0.8rem', color: '#ccc' }}
                            />
                        </ListItem>
                    </List>

                    <Divider sx={{ bgcolor: '#ccc' ,mt:1}} />

                    <Typography variant="caption" sx={{
                        color: '#ccc',
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 1,
                        fontSize: 12
                    }}>
                        &copy; 2025 Food Customer. All rights reserved.
                    </Typography>
                </Box>
            </Paper >
        </>
    )
}

export default Footer