import {Express} from "express";
import {userRouter} from "./routes/UserRoute";
import {defaultRouter} from "./routes/DefaultRoute";
import {errorHandler} from "./middleware/Error";

//Home Route
export function allRoutes(app:Express) {
    app.use("/api/", defaultRouter)
    app.use("/api/users", userRouter);


    //for handling errors
    app.use(errorHandler);
}
