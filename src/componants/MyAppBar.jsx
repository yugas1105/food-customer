import { AppBar, Badge, Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import PortraitIcon from '@mui/icons-material/Portrait';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';

const MyAppBar = () => {

    let navigator = useNavigate()

    const { itemCount } = useSelector((state) => state.cart)
    const { isLogin } = useSelector((state) => state.user)

    return (
        <>
            <Box>
                <AppBar position="fixed" color="warning" sx={{ background: '#0B0B45' }}>
                    <Toolbar>
                        <IconButton>
                            <MenuIcon sx={{
                                color: '#fff',
                            }} />
                        </IconButton>

                        <Typography variant='h4' sx={{ mr: 6, ml: 3, fontWeight: "bold", }}>FoodKart</Typography>

                        <List sx={{
                            display: "flex"
                        }}>
                            <ListItem onClick={() => {
                                navigator("/")
                            }}>
                                <ListItemIcon sx={{ minWidth: 34, color: "#fff" }}>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText sx={{
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        px: 1
                                    },
                                    color: "#fff"
                                }}>Home</ListItemText>
                            </ListItem>

                            <ListItem onClick={() => {
                                navigator("/dishes")
                            }}>
                                <ListItemIcon sx={{ minWidth: 36, color: "#fff" }}>
                                    <FastfoodIcon />
                                </ListItemIcon>
                                <ListItemText sx={{
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        px: 1
                                    },
                                    color: "#fff"
                                }}>Dishes</ListItemText>
                            </ListItem>

                            {
                                isLogin && (
                                    <ListItem onClick={() => {
                                        navigator("/cart")
                                    }}>
                                        <ListItemIcon sx={{ minWidth: 36, color: "#fff" }}>
                                            <ShoppingCartIcon />
                                        </ListItemIcon>
                                        <Badge badgeContent={itemCount} color='error'>
                                            <ListItemText sx={{
                                                transition: 'all 0.3s ease-in-out',
                                                '&:hover': {
                                                    px: 1
                                                },
                                                color: "#fff"
                                            }}>Cart</ListItemText>
                                        </Badge>
                                    </ListItem>
                                )
                            }

                            <ListItem onClick={() => {
                                navigator("/order")
                            }}>
                                <ListItemIcon sx={{ minWidth: 36, color: "#fff" }}>
                                    <ChromeReaderModeIcon />
                                </ListItemIcon>
                                <ListItemText sx={{
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        px: 1
                                    },
                                    color: "#fff"
                                }}>Order</ListItemText>
                            </ListItem>

                            {
                                isLogin && (
                                    <ListItem onClick={() => {
                                        navigator("/profile")
                                    }}>
                                        <ListItemIcon sx={{ minWidth: 37, color: "#fff" }}>
                                            <PortraitIcon />
                                        </ListItemIcon>
                                        <ListItemText sx={{
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': {
                                                px: 1
                                            },
                                            color: "#fff"
                                        }}>Profile</ListItemText>
                                    </ListItem>
                                )
                            }


                            <ListItem onClick={() => {
                                navigator("/login")
                            }}>
                                <ListItemIcon sx={{ minWidth: 34, color: "#fff" }}>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText sx={{
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        px: 1
                                    },
                                    color: "#fff"
                                }}>Login</ListItemText>
                            </ListItem>

                        </List>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default MyAppBar