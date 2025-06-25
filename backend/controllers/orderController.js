import Order from "../models/order.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
export const placeOrder = async (req, res) => {
    const front_url = "https://tomato-74r1.onrender.com"; // <-- use your deployed frontend URL
    try {
        const newOrder = new Order({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            status: req.body.status,
            address: req.body.address // Ensure address is included
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 3 * 100 * 80
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${front_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${front_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({
            success: true,
            session_url: session.url
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to create order",
            error: error
        });
    }
};

export const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await Order.findByIdAndUpdate(orderId, { payment: true });
            res.json({
                success: true,
                message: "Paid successfully"
            });
        } else {
            await Order.findByIdAndDelete(orderId);
            res.json({
                success: false,
                message: "Payment failed"
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to verify order",
        });
    }
};


// USER ORDERS
export const userOrders = async (req,res) => {
    try {
        const orders = await Order.find({userId: req.body.userId});
        res.json({
            success: true,
            data : orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to fetch orders"
        })
    }
}

//Listing Orders for ADMIN PANEL
export const listOrders = async (req,res) => {
    try {
        const orders = await Order.find({});
        res.json({
            success: true,
            data : orders
        })
    } catch (error) {
        console.log(error);
        
        res.json({
            success: false,
            message: "Failed to fetch orders"
        })
    }
}

// API FOR UPDATING ORDER STATUS
export const updateOrderStatus = async (req,res) => {
    try {
        await Order.findByIdAndUpdate(req.body.orderId , {status : req.body.status});
        res.json({
            success: true,
            message: "Order status updated"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to update order status"
        })
        
    }
}