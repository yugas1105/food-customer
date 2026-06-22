import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "../custom/CustomAlert";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BillPDF from "../template/BillPDF"; // assuming this is correct

import axios from "axios";

const OrderDetails = () => {
  const orderData = useLocation().state;
  const { showAlert } = useAlert();
  let navigator = useNavigate();

  let deleteOrderReq = async (orderId) => {
    try {
      let result = await axios.delete(`http://localhost:5000/api/deleteorder`, {
        data: { orderId },
      });
      showAlert("Order Cancelled", "error");
      navigator("/order");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ mt: 10, px: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        fontWeight="bold"
      >
        Order Details
      </Typography>

      <Grid container spacing={3}>
        {/* Customer Info */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Customer Information
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Name:</strong> {orderData.customer?.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Address:</strong> {orderData.customer?.address?.street},{" "}
              {orderData.customer?.address?.city},{" "}
              {orderData.customer?.address?.postalCode}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Phone:</strong> {orderData.customer?.Phone}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Status:</strong> {orderData.status}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Total Price:</strong> ₹{orderData.totalPrice}
            </Typography>
          </Paper>
        </Grid>

        {/* Items */}
        <Grid item xs={12} md={7}>
          <Grid container spacing={2}>
            {orderData.items?.map((dish, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    boxShadow: 2,
                    backgroundColor: "#fff",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`http://localhost:5000/${dish.food.image}`}
                    alt={dish.food.foodname}
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      mr: 2,
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {dish.food.foodname}
                    </Typography>
                    <Typography variant="body2">
                      Quantity: {dish.quantity}
                    </Typography>
                    <Typography variant="body2">
                      Price: ₹{dish.food.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Cancel Button */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-start" }}>
        <PDFDownloadLink
          document={<BillPDF order={orderData} />}
          fileName={`Invoice_${orderData.customer.name}.pdf`}
          style={{
            textDecoration: "none",
          }}
        >
          {({ loading }) => (
            <Button
              variant="text"
              sx={{
                height: "35px",
                width: "150px",
                fontSize: "13px",
                background: "linear-gradient(to right, #1CB5E0, #000851)",
                color: "#fff",
                mr: 2,
                textTransform: "capitalize",
                "&:hover": {
                  background: "linear-gradient(to right, #1a91da, #000544)",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                },
              }}
            >
              {loading ? "Generating..." : "Download Invoice"}
            </Button>
          )}
        </PDFDownloadLink>

        <Button
          onClick={() => deleteOrderReq(orderData._id)}
          variant="contained"
          color="error"
          sx={{
            px: 3,
            fontSize: 13,
            borderRadius: 2,
            transition: "0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          Cancel Order
        </Button>
      </Box>
    </Box>
  );
};

export default OrderDetails;
