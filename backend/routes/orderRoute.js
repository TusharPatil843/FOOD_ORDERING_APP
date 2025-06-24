import express from 'express';
import auth from '../middleware/auth.js';
import { listOrders, placeOrder, userOrders, verifyOrder , updateOrderStatus  } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/place", auth , placeOrder);
orderRouter.post("/verify" , verifyOrder)
orderRouter.post("/userorders", auth , userOrders);
orderRouter.get("/list" , listOrders);
orderRouter.post("/status", updateOrderStatus);

export default orderRouter;