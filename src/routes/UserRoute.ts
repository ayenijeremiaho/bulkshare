import * as express from "express";
import {verifyToken} from "../middleware/Auth";
import {UserController} from "../controller/UserController";

const userRouter = express.Router();

const userController = new UserController();

userRouter.get("/", verifyToken, userController.all);


export {userRouter};