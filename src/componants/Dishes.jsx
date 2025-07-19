import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./reduxwork/CartSlice";
import AddIcon from "@mui/icons-material/Add";
import { useLocation } from "react-router-dom";
import StarsIcon from "@mui/icons-material/Stars";
import Rating from "@mui/material/Rating";
import { useAlert } from "../custom/CustomAlert";

const labels = {
  1: "Poor",
  1.5: "Poor",
  2: "Ok",
  2.5: "Ok",
  3: "Good",
  3.5: "Good",
  4: "Very Good",
  4.5: "Excellent",
  5: "Excellent",
};

const Dishes = () => {
  let dishCategory = useLocation().state;
  let { userData } = useSelector((state) => state.user);

  let [allDishes, setallDishes] = useState([]);
  const [selectedCategory, setselectedCategory] = useState(
    dishCategory ? dishCategory : "All"
  );
  const [filterDishes, setfilterDishes] = useState([]);
  const [selectedDish, setselectedDish] = useState(null);
  const [isOpenDialog, setisOpenDialog] = useState(false);
  const [allReviews, setallReviews] = useState(0);
  const { showAlert } = useAlert();

  let dispatcher = useDispatch();

  useEffect(() => {
    let fetchDishes = async () => {
      try {
        let result = await axios.get("http://localhost:5000/api/fetchfood");
        console.log("DATA", result.data.data);
        setallDishes(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDishes();
  }, []);

  let submitReviewData = async (e) => {
    e.preventDefault();
    let reviewData = new FormData(e.target);
    let reqReviewData = Object.fromEntries(reviewData.entries());
    console.log("RDATA", reqReviewData);
    setselectedDish(reqReviewData);
    try {
      let result = await axios.post(
        "http://localhost:5000/api/createreview",
        reqReviewData
      );
      showAlert("Review Submitted", "success");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let filterDish = allDishes.filter(
      (dish) => dish.category == selectedCategory
    );
    setfilterDishes(filterDish);

    if (selectedCategory == "All") {
      setfilterDishes(allDishes);
    }
  }, [selectedCategory, allDishes]);

  let openDialog = (dish) => {
    setselectedDish(dish);
    setallReviews(0);
    setisOpenDialog(true);
  };

  let closeDialog = () => {
    setselectedDish(null);
    setisOpenDialog(false);
  };

  const chipStyle = (category) => ({
    backgroundColor:
      selectedCategory === category ? "#1CB5E0" : "transparent",
    color: selectedCategory === category ? "#fff" : "inherit",
    borderColor: "#1CB5E0",
    fontSize: "13px",
    "&:hover": {
      backgroundColor:
        selectedCategory === category ? "#1CB5E0" : "rgba(255,167,38,0.1)",
    },
  });

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

        <Grid container sx={{ margin: "14px 20px 15px 20px" }}>
          {filterDishes.map((dish) => {
            return (
              <Grid
                item
                size={{
                  sm: 12,
                  md: 6,
                  lg: 3,
                }}
              >
                <Box sx={{ padding: "3px" }}>
                  <Card sx={{ height: "450px", position: "relative" }}>
                    <CardMedia
                      component="img"
                      image={`http://localhost:5000/${dish.image}`}
                      sx={{ height: "200px" }}
                    />
                    <CardContent>
                      <Typography variant="h5">{dish.foodname}</Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "gray", fontSize: "13px" }}
                      >
                        {dish.description}
                      </Typography>
                      <Typography variant="subtitle2">
                        ₹ {dish.price}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: "13px" }}>
                        Category: {dish.category}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          position: "absolute",
                          bottom: 60,
                        }}
                      >
                        <Rating
                          size="small"
                          defaultValue={dish.averageratings}
                          readOnly
                        />
                        <Typography
                          variant="caption"
                          sx={{ ml: 1, color: "#999", fontSize: "13px" }}
                        >
                          Rating:{" "}
                          {dish.averageratings
                            ? dish.averageratings.toFixed(1)
                            : "No ratings yet"}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ position: "absolute", bottom: "10px" }}>
                      <Button
                        onClick={() => dispatcher(addItem(dish))}
                        variant="text"
                        sx={{
                          height: "35px",
                          width: "150px",
                          fontSize: "13px",
                          background:
                            "linear-gradient(to right, #1CB5E0, #000851)",
                          color: "#fff",
                          textTransform: "capitalize",
                          "&:hover": {
                            background:
                              "linear-gradient(to right, #1a91da, #000544)",
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                          },
                        }}
                      >
                        <AddIcon sx={{ fontSize: "18px" }} />
                        Add to Cart
                      </Button>

                      <StarsIcon
                        onClick={() => openDialog(dish)}
                        sx={{
                          color: "orange",
                          cursor: "pointer",
                          fontSize: "30px",
                          "&:hover": {
                            color: "#ff9800",
                            transform: "scale(1.1)",
                            transition: "all 0.2s ease-in-out",
                          },
                        }}
                      />
                    </CardActions>
                  </Card>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Dialog open={isOpenDialog} onClose={closeDialog}>
        <DialogTitle>Share Your Review!</DialogTitle>

        <Box component="form" onSubmit={submitReviewData}>
          <DialogContent>
            <DialogContentText>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Rating
                  name="rating"
                  precision={0.5}
                  value={allReviews}
                  defaultValue={0}
                  onChange={(event, newValue) => setallReviews(newValue)}
                />
                <Typography variant="body2">{labels[allReviews]}</Typography>
              </Box>
            </DialogContentText>

            <DialogContentText>
              <TextField
                type="text"
                name="comment"
                label="Comment"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
                sx={{ mt: 2 }}
              />
              <input type="hidden" name="food" value={selectedDish?._id} />
              <input type="hidden" name="customer" value={userData?._id} />
              <input type="hidden" name="rating" value={allReviews} />
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={closeDialog}
            >
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default Dishes;
