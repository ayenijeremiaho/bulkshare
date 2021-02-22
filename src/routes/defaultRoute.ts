import * as express from "express";
import {DefaultController} from "../controller/DefaultController";

const defaultRouter = express.Router();

const main = new DefaultController();

defaultRouter.get("/", main.home);
defaultRouter.get("/about", main.home);
defaultRouter.get("/team", main.home);

export {defaultRouter};
