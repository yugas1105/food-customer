import { Box, Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {

    let orderData = useLocation().state;

    return <>
        <Box sx={{
            mt: 9
        }}>
            <Typography variant="h4" sx={{
                textAlign: 'center',
                mb: 3
            }}>
                Order Details
            </Typography>
            <Box sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                margin: '8px'
            }}>
                <Typography variant='body1'>Total Price: {orderData.totalPrice}</Typography>
                <Typography variant='body1'>Status: {orderData.status}</Typography>
                <Typography variant='body1'>Name: {orderData.customer?.name}</Typography>
                <Typography variant='body1'>Address: {orderData.customer?.address.street + orderData.customer?.address.city + orderData.customer?.address.postalCode}</Typography>
                <Typography variant='body1'>Phone: {orderData.customer?.Phone}</Typography>
            </Box>
            <Box sx={{
                mt: 3,
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                margin: '8px'
            }}>
                <Typography variant='h6'>Ordered Dishes</Typography>
                {orderData.items?.map((dish, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant='body1'>Dish Name: {dish.food.foodname}</Typography>
                        <Typography variant='body1'>Quantity: {dish.quantity}</Typography>
                        <Typography variant='body1'>Price: {dish.food.price}</Typography>
                    </Box>
                ))}

            </Box>
        </Box>
        <Button variant="contained" color="error" sx={{ mt: 3 }} 
        onClick={() => alert("Order Cancelled")}>
            Cancel Order
        </Button>
    </>;
};
export default OrderDetails;            