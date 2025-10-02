import express from "express"
import { placeOrder } from "../controllers/order.controllers.js"
import { isAuth } from "../middlewares/isAuth.js"

const orderRouter = express.Router()

orderRouter.post("/placeorder", isAuth, placeOrder)

export default orderRouter