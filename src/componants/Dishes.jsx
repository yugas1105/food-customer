import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from './reduxwork/CartSlice'
import AddIcon from '@mui/icons-material/Add';
import { useLocation } from 'react-router-dom'

const Dishes = () => {

    let dishCategory = useLocation().state

    let [allDishes, setallDishes] = useState([])
    const [selectedCategory, setselectedCategory] = useState(dishCategory ? dishCategory : "All");
    const [filterDishes, setfilterDishes] = useState([])
    let dispatcher = useDispatch()


    useEffect(() => {
        let fetchDishes = async () => {
            try {
                let result = await axios.get("http://localhost:5000/api/fetchfood")
                console.log("DATA", result.data.data);
                setallDishes(result.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchDishes()
    }, [])

    useEffect(() => {
        let filterDish = allDishes.filter((dish) => dish.category == selectedCategory)
        setfilterDishes(filterDish)

        if (selectedCategory == "All") {
            setfilterDishes(allDishes)
        }
    }, [selectedCategory, allDishes])

    const chipStyle = (category) => ({
        backgroundColor: selectedCategory === category ? "#ffa726" : "transparent",
        color: selectedCategory === category ? "#fff" : "inherit",
        borderColor: "#ffa726",
        '&:hover': {
            backgroundColor: selectedCategory === category ? "#fb8c00" : "rgba(255,167,38,0.1)"
        }
    })

    return (
        <>
            <Box sx={{ mt: 11 }}>
                <Stack sx={{ justifyContent: "center" }} direction="row" spacing={2}>
                    <Chip
                        label="All"
                        onClick={() => setselectedCategory("All")}
                        variant={selectedCategory === "All" ? "filled" : "outlined"}
                        sx={chipStyle("All")}
                    />
                    <Chip
                        label="Appetizer"
                        onClick={() => setselectedCategory("appetizer")}
                        variant={selectedCategory === "appetizer" ? "filled" : "outlined"}
                        sx={chipStyle("appetizer")}
                    />
                    <Chip
                        label="Dessert"
                        onClick={() => setselectedCategory("dessert")}
                        variant={selectedCategory === "dessert" ? "filled" : "outlined"}
                        sx={chipStyle("dessert")}
                    />
                    <Chip
                        label="Beverage"
                        onClick={() => setselectedCategory("beverage")}
                        variant={selectedCategory === "beverage" ? "filled" : "outlined"}
                        sx={chipStyle("beverage")}
                    />
                    <Chip
                        label="Main-course"
                        onClick={() => setselectedCategory("main-course")}
                        variant={selectedCategory === "main-course" ? "filled" : "outlined"}
                        sx={chipStyle("main-course")}
                    />
                </Stack>

                <Grid container sx={{ mt: 2 }}>
                    {
                        filterDishes.map((dish) => {
                            return (
                                <Grid item size={{
                                    sm: 12,
                                    md: 6,
                                    lg: 3
                                }}
                                >
                                    <Box sx={{padding: "5px"}}>
                                        <Card sx={{height: "450px", position: "relative"}}>
                                            <CardMedia component="img" image={`http://localhost:5000/${dish.image}`}
                                                sx={{ height: "200px" }}
                                            />
                                            <CardContent>
                                                <Typography variant='h5'>{dish.foodname}</Typography>
                                                <Typography variant='body2' sx={{color: "gray", fontSize: "13px" }}>{dish.description}</Typography>
                                                <Typography variant='subtitle1'>₹ {dish.price}</Typography>
                                                <Typography variant='caption' sx={{fontSize: "13px" }}>Category: {dish.category}</Typography>
                                            </CardContent>
                                            <CardActions sx={{ position: "absolute", bottom: "10px" }}>

                                                <Button
                                                    onClick={() => dispatcher(addItem(dish))}
                                                    sx={{
                                                        background: "none",
                                                        cursor: "pointer",
                                                        fontWeight: 600,
                                                        fontSize: "15px",
                                                        color: "rgb(6, 34, 175)",
                                                        position: "relative",
                                                        borderRadius: '90px',
                                                        padding: '6px 10px',
                                                        transition: "color 0.25s 0.083s",
                                                        "&::before, &::after": {
                                                            content: '""',
                                                            position: "absolute",
                                                            pointerEvents: "none",
                                                            boxSizing: "border-box",
                                                            border: "0 solid transparent"
                                                        },
                                                        "&::before": {
                                                            borderBottomWidth: "2px",
                                                            borderLeftWidth: "2px",
                                                        },
                                                        "&::after": {
                                                            borderTopWidth: "2px",
                                                            borderRightWidth: "2px",
                                                        },
                                                        // "&:hover": {
                                                        //     color: 'orange'
                                                        // },
                                                        "&:hover::before, &:hover::after": {
                                                            width: "100%",
                                                            height: "100%",
                                                            borderColor: 'warning.dark',
                                                            borderRadius: '40px',
                                                            // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",

                                                            transition: "border-color 0s, width 0.25s, height 0.25s",
                                                        },
                                                        "&:hover::before": {
                                                            transitionDelay: "0s, 0s, 0.25s",
                                                        },
                                                        "&:hover::after": {
                                                            transitionDelay: "0s, 0.25s, 0s",
                                                        },
                                                    }}
                                                >
                                                    <AddIcon sx={{fontSize: "18px"}} />
                                                    Add to Cart
                                                </Button>

                                            </CardActions>
                                        </Card>
                                        </Box>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Box>
        </>
    )
}

export default Dishes