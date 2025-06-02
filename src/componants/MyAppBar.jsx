import { AppBar, Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import PortraitIcon from '@mui/icons-material/Portrait';
import LoginIcon from '@mui/icons-material/Login';

const MyAppBar = () => {

    let navigator = useNavigate()

    return (
        <>
            <Box>
                <AppBar>
                    <Toolbar>
                        <IconButton>
                            <MenuIcon sx={{
                                color: '#fff',
                                
                            }} />
                        </IconButton>

                        <Typography variant='h4' sx={{mr:6, ml:3}}>FoodKart</Typography>

                        <List sx={{
                            display: "flex"
                        }}>
                            <ListItem onClick={() => {
                                navigator("/")
                            }}
                                sx={{
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        px: 1
                                    },
                                    color: "#fff"
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 34, color: "#fff" }}>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText>Home</ListItemText>
                            </ListItem>

                            <ListItem onClick={() => {
                                navigator("/dishes")
                            }}>
                                <ListItemIcon sx={{ minWidth: 34, color: "#fff" }}>
                                    <LocalDiningIcon />
                                </ListItemIcon>
                                <ListItemText>Dishes</ListItemText>
                            </ListItem>

                            <ListItem onClick={() => {
                                navigator("/cart")
                            }}>
                                <ListItemIcon sx={{ minWidth: 34, color: "#fff" }}>
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText>Cart</ListItemText>
                            </ListItem>

                            <ListItem onClick={() => {
                                navigator("/order")
                            }}>
                                <ListItemIcon sx={{ minWidth: 34, color: "#fff" }}>
                                    <ChromeReaderModeIcon />
                                </ListItemIcon>
                                <ListItemText>Order</ListItemText>
                            </ListItem>

                            <ListItem onClick={() => {
                                navigator("/profile")
                            }}>
                                <ListItemIcon sx={{ minWidth: 34, color: "#fff" }}>
                                    <PortraitIcon />
                                </ListItemIcon>
                                <ListItemText>Profile</ListItemText>
                            </ListItem>

                            <ListItem onClick={() => {
                                navigator("/login")
                            }}>
                                <ListItemIcon sx={{ minWidth: 34, color: "#fff" }}>
                                    <LoginIcon />
                                </ListItemIcon>
                                <ListItemText>Login</ListItemText>
                            </ListItem>

                        </List>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default MyAppBar