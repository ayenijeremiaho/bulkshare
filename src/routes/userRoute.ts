import * as express from "express";
import {verifyToken} from "../middleware/auth";
import {UserController} from "../controller/UserController";

const userRouter = express.Router();

const userController = new UserController();

userRouter.get("/", verifyToken, userController.all);
userRouter.post("/signup", userController.signup);
userRouter.post("/activate", userController.activate);
userRouter.post("/login", userController.login);


export {userRouter};