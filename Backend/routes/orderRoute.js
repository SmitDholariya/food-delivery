import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder,verifyOrder, userOrders, listOrder, orderStatus } from "../controllers/orderController.js"
const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorder",authMiddleware,userOrders)
orderRouter.get("/list",listOrder)
orderRouter.post("/status",orderStatus)

export default orderRouter;