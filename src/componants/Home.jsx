import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import food1 from "../assets/foodpics/food1.jpg";
import food2 from "../assets/foodpics/food2.jpg";
import food3 from "../assets/foodpics/food3.jpg";
import food4 from "../assets/foodpics/food4.jpg";
import food5 from "../assets/foodpics/food5.jpg";
import dessert from "../assets/foodpics/dessert.png";
import juice from "../assets/foodpics/Juice1.png";
import pasta from "../assets/foodpics/pasta2.png";
import burgur from "../assets/foodpics/burgur-removebg-preview.png";
import newsticker from "../assets/foodpics/newsticker.png";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "./reduxwork/CartSlice";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "Food 1",
    imgPath: food1,
    title: "Tasty Beginnings",
    caption: "Start your day with freshness",
  },
  {
    label: "Food 2",
    imgPath: food2,
    title: "Spicy Flavors",
    caption: "Add a kick to your meals",
  },
  {
    label: "Food 3",
    imgPath: food3,
    title: "Hearty Meals",
    caption: "For the hunger you deserve",
  },
  {
    label: "Food 4",
    imgPath: food4,
    title: "Refreshing Sips",
    caption: "Beverages for every mood",
  },
  {
    label: "Food 5",
    imgPath: food5,
    title: "Sweet Cravings",
    caption: "Desserts that melt your heart",
  },
];

const Home = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;
  const [recentDish, setrecentDish] = useState([]);
  const [topDishes, settopDishes] = useState([]);
  let navigator = useNavigate();
  let dispatcher = useDispatch();

  useEffect(() => {
    let fetchRecentDish = async () => {
      try {
        let result = await axios.get("http://localhost:5000/api/fetchrecent");
        console.log("DATA", result.data.data);
        setrecentDish(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentDish();
  }, []);

  useEffect(() => {
    let fetchTopDish = async () => {
      try {
        let result = await axios.get(
          "http://localhost:5000/api/fetchtopdishes"
        );
        console.log("DATA", result.data);
        settopDishes(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopDish();
  }, []);

  const [allReviews, setallReviews] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "100%",
          flexGrow: 1,
          mt: 3.5,
          overflow: "hidden", // hides scroll bar
          position: "relative",
        }}
      >
        {/* Carousel */}
        <AutoPlaySwipeableViews
  index={activeStep}
  onChangeIndex={(step) => setActiveStep(step)}
  interval={3000}
  enableMouseEvents
  axis="x"
  onTransitionEnd={() => {
    if (activeStep === maxSteps - 1) {
      setTimeout(() => {
        setActiveStep(0); // reset to start after last image
      }, 500); // wait for the animation to finish
    }
  }}
  style={{ overflow: "hidden" }}
>
  {images.map((step, index) => (
    <Box key={index} sx={{ position: "relative" }}>
      <Box
        component="img"
        src={step.imgPath}
        alt={step.label}
        sx={{
          height: 560,
          width: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {step.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          {step.caption}
        </Typography>
      </Box>
    </Box>
  ))}
</AutoPlaySwipeableViews>


      </Box>

      <IconButton
        onClick={handleBack}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(0,0,0,0.4)",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.6)",
          },
        }}
      >
        <KeyboardArrowLeft />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(0,0,0,0.4)",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.6)",
          },
        }}
      >
        <KeyboardArrowRight />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ mt: 9 }}>
          Specially made for you!!!
        </Typography>

        <Grid
          container
          spacing={2}
          size={{
            sm: 12,
            md: 6,
            lg: 3,
          }}
          sx={{
            gap: 3,
            mt: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid item sx={{ textAlign: "center" }}>
            <Card>
              <CardMedia
                component="img"
                image={pasta}
                sx={{
                  height: "200px",
                  width: "200px",
                  objectFit: "cover",
                  mx: "auto",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
                onClick={() => navigator("/dishes", { state: "appetizer" })}
              />
              <CardContent sx={{ width: "200px" }}>
                <Typography variant="h6">Appetizer</Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "gray", fontSize: "13px" }}
                >
                  Tasty starters to awaken your appetite.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item sx={{ textAlign: "center" }}>
            <Card>
              <CardMedia
                component="img"
                image={burgur}
                sx={{
                  height: "200px",
                  width: "200px",
                  objectFit: "cover",
                  mx: "auto",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
                onClick={() => navigator("/dishes", { state: "main-course" })}
              />
              <CardContent sx={{ width: "200px" }}>
                <Typography variant="h6">Main-course</Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "gray", fontSize: "13px" }}
                >
                  Hearty and tasty dishes to satisfy your hunger.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item sx={{ textAlign: "center" }}>
            <Card>
              <CardMedia
                component="img"
                image={juice}
                sx={{
                  height: "200px",
                  width: "200px",
                  objectFit: "cover",
                  mx: "auto",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
                onClick={() => navigator("/dishes", { state: "beverage" })}
              />
              <CardContent sx={{ width: "200px" }}>
                <Typography variant="h6">Beverage</Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "gray", fontSize: "13px" }}
                >
                  Refreshing drinks to complement every dish.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item sx={{ textAlign: "center" }}>
            <Card>
              <CardMedia
                component="img"
                image={dessert}
                sx={{
                  height: "200px",
                  width: "200px",
                  objectFit: "cover",
                  mx: "auto",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
                onClick={() => navigator("/dishes", { state: "dessert" })}
              />
              <CardContent sx={{ width: "200px" }}>
                <Typography variant="h6">Dessert</Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "gray", fontSize: "13px" }}
                >
                  Sweet treats to finish every meal.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#d32f2f",
          textShadow: "1px 1px #fbc02d",
          mt: 13,
          // mb: 2,
          fontFamily: "cursive",
          animation: "helloFlash 1.5s infinite alternate",
          "@keyframes helloFlash": {
            from: { color: "#d32f2f" },
            to: { color: "#f57c00" },
          },
        }}
      >
        Say Hello to Our Newest Dishes!
      </Typography>

      <Box>
        <Grid
          container
          spacing={2}
          size={{
            sm: 12,
            md: 6,
            lg: 3,
          }}
          sx={{
            gap: 3,
            mt: 10,
            mb: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {recentDish.map((dish, index) => (
            <Grid item key={index} sx={{ textAlign: "center" }}>
              <Card
                sx={{
                  width: 260,
                  height: "100%",
                  mx: "auto",
                  borderRadius: 3,
                  boxShadow: 5,
                  position: "relative",
                  overflow: "visible",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 10,
                  },
                }}
              >
                {/* 🆕 Animated Starburst NEW Sticker */}
                <Box
                  component="img"
                  src={newsticker}
                  alt="new"
                  sx={{
                    position: "absolute",
                    top: -20,
                    left: -20,
                    width: 60,
                    height: 60,
                    zIndex: 10,
                    animation: "stickerFlash 1s infinite alternate",
                  }}
                />

                <CardMedia
                  component="img"
                  image={`http://localhost:5000/${dish.image}`}
                  alt={dish.foodname}
                  sx={{
                    height: 180,
                    objectFit: "cover",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                  onClick={() => navigator("/dishes", { state: dish.category })}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    alignItems: "center",
                    px: 2,
                    py: 1,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {dish.foodname}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "gray",
                      fontSize: "13px",
                      textAlign: "center",
                      height: 32,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {dish.description || "Tasty & freshly prepared"}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "medium", color: "#388e3c" }}
                  >
                    ₹{dish.price}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      backgroundColor: "#f0f0f0",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 20,
                      fontSize: "11px",
                      color: "#555",
                    }}
                  >
                    {dish.category.toUpperCase()}
                  </Typography>

                  <IconButton
                    onClick={() => {
                      dispatcher(addItem(dish));
                      showAlert("Added to Cart", "success"); // optional alert
                    }}
                    sx={{
                      backgroundColor: "#ff7043ff",
                      color: "#fff",
                      borderRadius: "10px",
                      width: "40px",
                      "&:hover": {
                        backgroundColor: "#ff8a65",
                      },
                    }}
                  >
                    <AddShoppingCartIcon fontSize="small" />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 3,
            color: "#333",
          }}
        >
          🔥 Best Selling Dishes
        </Typography>

        <List sx={{ width: "100%", maxWidth: 800, mx: "auto" }}>
          {topDishes.map((dish, index) => (
            <React.Fragment key={index}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  backgroundColor: "#fff8f0",
                  borderRadius: 3,
                  mb: 2,
                  boxShadow: 2,
                  px: 2,
                  py: 1,
                  "&:hover": {
                    backgroundColor: "#ffe9d8",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={`http://localhost:5000/${dish.image}`}
                    alt={dish.foodname}
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {dish.foodname}
                      </Typography>
                      <Box textAlign="right">
                        <Typography variant="subtitle1" color="green">
                          ₹{dish.price}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          🛒 {dish.totalSold || 0} sold
                        </Typography>
                      </Box>
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {dish.category.toUpperCase()} | ⭐{" "}
                        {dish.averageRating?.toFixed(1) || "0.0"} / 5
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Box>
    </>
  );
};

export default Home;
