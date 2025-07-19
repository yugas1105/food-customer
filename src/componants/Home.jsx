import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

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

  let navigator = useNavigate();

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
      <Box sx={{ maxWidth: "100%", flexGrow: 1, margin: "auto", mt: 3 }}>
        <AutoPlaySwipeableViews
          index={activeStep}
          onChangeIndex={(index) => {
            if (index === maxSteps) {
              setActiveStep(0); // Loop back to first
            } else {
              setActiveStep(index);
            }
          }}
          interval={3000}
          enableMouseEvents
          axis="x"
        >
          {[...images, images[0]].map((step, index) => (
            <Box key={index} sx={{ position: "relative" }}>
              {/* Background image */}
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

              {/* Overlay content */}
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
      </Box>

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
    </>
  );
};

export default Home;
