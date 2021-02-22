import * as express from "express";
import {ShopController} from "../controller/ShopController";
import {verifyShopExist} from "../middleware/auth";

const shopRouter = express.Router();

const shopController = new ShopController();

shopRouter.post("/create", shopController.add);
shopRouter.get("/", verifyShopExist, shopController.home);
shopRouter.get("/team", verifyShopExist, shopController.home);

export {shopRouter};
