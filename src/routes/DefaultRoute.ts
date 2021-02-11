import * as express from "express";
import {UserController} from "../controller/UserController";

const defaultRouter = express.Router();
const user = new UserController();

defaultRouter.get("/", user.all)

export {defaultRouter};
