import {Express} from "express";
import {userRouter} from "./routes/userRoute";
import {defaultRouter} from "./routes/defaultRoute";
import {errorHandler} from "./middleware/error";
import {shopRouter} from "./routes/shopRoute";
import {verifyToken} from "./middleware/auth";

//Home Route
export function allRoutes(app: Express) {
    app.use("/api/", defaultRouter)
    app.use("/api/users", userRouter);
    app.use("/api/shops", verifyToken, shopRouter);


    //for handling errors
    app.use(errorHandler);
}
