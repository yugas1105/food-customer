import { Box, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import food1 from '../assets/foodpics/food1.jpg'
import food2 from '../assets/foodpics/food2.jpg'
import food3 from '../assets/foodpics/food3.jpg'
import food4 from '../assets/foodpics/food4.jpg'
import food5 from '../assets/foodpics/food5.jpg'
import dessert from '../assets/foodpics/dessert.png'
import juice from '../assets/foodpics/Juice1.png'
import pasta from '../assets/foodpics/pasta2.png'
import pizza from '../assets/foodpics/pizza.jpeg'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "Food 1",
    imgPath: food1
  },
  {
    label: "Food 2",
    imgPath: food2
  },
  {
    label: "Food 3",
    imgPath: food3
  },
  {
    label: "Food 4",
    imgPath: food4
  },
  {
    label: "Food 5",
    imgPath: food5
  }
]

const Home = () => {

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  let navigator = useNavigate()

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
          onChangeIndex={handleStepChange}
          enableMouseEvents
          interval={3000}>

          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 560,
                    display: "block",
                    maxWidth: "100%",
                    overflow: "hidden",
                    width: "100%",
                    padding: "30px 0px 30px"
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>

        {/* Left Arrow */}
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

        {/* Right Arrow */}
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


      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography variant='h4' sx={{ mt: 9 }}>Specially made for you!!!</Typography>

        <Grid container spacing={2}
          size={{
            sm: 12,
            md: 6,
            lg: 3
          }}
          sx={{
            gap: 3,
            mt: 4,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Grid item sx={{ textAlign: 'center' }}>
            <Card >
              <CardMedia
                component="img"
                image={pasta}
                sx={{ height: '200px', width: '200px', objectFit: 'cover', mx: 'auto' }}
                onClick={() => navigator("/dishes", { state: "appetizer" })}
              />
              <CardContent sx={{ width: '200px' }}>
                <Typography variant='h6' >Appetizer</Typography>
                <Typography variant='caption' sx={{color: "gray", fontSize: "13px" }}>Tasty starters to awaken your appetite.</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item sx={{ textAlign: 'center' }}>
            <Card>
              <CardMedia
                component="img"
                image={pizza}
                sx={{ height: '200px', width: '200px', objectFit: 'cover', mx: 'auto' }}
                onClick={() => navigator("/dishes", { state: "main-course" })}
              />
              <CardContent sx={{ width: '200px' }}>
                <Typography variant='h6' >Main-course</Typography>
                <Typography variant='caption' sx={{color: "gray", fontSize: "13px" }}>Hearty and tasty dishes to satisfy your hunger.</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item sx={{ textAlign: 'center' }}>
            <Card>
              <CardMedia
                component="img"
                image={juice}
                sx={{ height: '200px', width: '200px', objectFit: 'cover', mx: 'auto' }}
                onClick={() => navigator("/dishes", { state: "beverage" })}
              />
              <CardContent sx={{ width: '200px' }}>
                <Typography variant='h6' >Beverage</Typography>
                <Typography variant='caption' sx={{color: "gray", fontSize: "13px" }}>Refreshing drinks to complement every dish.</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item sx={{ textAlign: 'center' }}>
            <Card>
              <CardMedia
                component="img"
                image={dessert}
                sx={{ height: '200px', width: '200px', objectFit: 'cover', mx: 'auto' }}
                onClick={() => navigator("/dishes", { state: "dessert" })}
              />
              <CardContent sx={{ width: '200px' }}>
                <Typography variant='h6' >Dessert</Typography>
                <Typography variant='caption' sx={{color: "gray", fontSize: "13px" }}>Sweet treats to finish every meal.</Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Box>
      </>
  )
}

export default Home