import express from "express"
import { CreateUser, LoginController } from "../controllers/userController.js";
import { PrismaClient } from "@prisma/client";

const userRoute = express.Router();

export const prismaClient = new PrismaClient({
    log:['query']
})
userRoute.post('/createUser',CreateUser);
userRoute.post('/login',LoginController);

export default userRoute;