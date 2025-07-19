import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import PortraitIcon from "@mui/icons-material/Portrait";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AnimationIcon from '@mui/icons-material/Animation';
import { useSelector } from "react-redux";

const MyAppBar = () => {
  let navigator = useNavigate();

  const { itemCount } = useSelector((state) => state.cart);
  const { isLogin } = useSelector((state) => state.user);

  return (
    <Box>
      <AppBar position="fixed" color="warning" sx={{ background: "#0B0B45" }}>
        <Toolbar>
          <IconButton>
            <AnimationIcon
              sx={{
                fontSize: 32,
                color:"#fff"
                // color: "linear-gradient( 98.7deg,  rgba(34,175,245,1) 2.8%, rgba(98,247,151,1) 97.8% )"
              }}
            />
          </IconButton>

          <Typography variant="h5" sx={{ mr: 6, ml: 1, fontWeight: "bold" }}>
            FoodKart
          </Typography>

          <List
            sx={{
              display: "flex",
              cursor: "pointer",
            }}
          >
            <ListItem
              onClick={() => {
                navigator("/");
              }}
              sx={{ "&:hover": { color: "#fff" } }}
            >
              {/* <ListItemIcon sx={{ minWidth: 34, color: "#D3D3D3", }}>
                <HomeIcon />
              </ListItemIcon> */}
              <ListItemText
                sx={{
                  "&:hover": {
                    color: "#fff",
                  },
                  color: "#D3D3D3",
                }}
              >
                Home
              </ListItemText>
            </ListItem>

            <ListItem
              onClick={() => {
                navigator("/dishes");
              }}
            >
              {/* <ListItemIcon sx={{ minWidth: 36, color: "#D3D3D3" }}>
                <FastfoodIcon />
              </ListItemIcon> */}
              <ListItemText
                sx={{
                  "&:hover": {
                    color: "#fff",
                  },
                  color: "#D3D3D3",
                }}
              >
                Dishes
              </ListItemText>
            </ListItem>

            {isLogin && (
              <ListItem
                onClick={() => {
                  navigator("/cart");
                }}
              >
                {/* <ListItemIcon sx={{ minWidth: 36, color: "#D3D3D3" }}>
                  <ShoppingCartIcon />
                </ListItemIcon> */}
                <Badge badgeContent={itemCount} color="error">
                  <ListItemText
                    sx={{
                      "&:hover": {
                        color: "#fff",
                      },
                      color: "#D3D3D3",
                    }}
                  >
                    Cart
                  </ListItemText>
                </Badge>
              </ListItem>
            )}

            <ListItem
              onClick={() => {
                navigator("/order");
              }}
            >
              {/* <ListItemIcon sx={{ minWidth: 36, color: "#D3D3D3" }}>
                <ChromeReaderModeIcon />
              </ListItemIcon> */}
              <ListItemText
                sx={{
                  "&:hover": {
                    color: "#fff",
                  },
                  color: "#D3D3D3",
                }}
              >
                Order
              </ListItemText>
            </ListItem>

            {isLogin && (
              <ListItem
                onClick={() => {
                  navigator("/profile");
                }}
              >
                {/* <ListItemIcon sx={{ minWidth: 37, color: "#D3D3D3" }}>
                  <PortraitIcon />
                </ListItemIcon> */}
                <ListItemText
                  sx={{
                    "&:hover": {
                      color: "#fff",
                    },
                    color: "#D3D3D3",
                  }}
                >
                  Profile
                </ListItemText>
              </ListItem>
            )}
          </List>

          <Box
            sx={{
              position: "absolute",
              right: 0,
              mr: 3,
            }}
          >
            <ListItem
              onClick={() => {
                navigator("/login");
              }}
            >
              <ListItemIcon sx={{ minWidth: 44, color: "#D3D3D3" }}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: "#D3D3D3", // Light navy
                  cursor: "pointer",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#fff",
                    textDecoration: "underline",

                  },
                }}
              >
                Login
              </ListItemText>
            </ListItem>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MyAppBar;
