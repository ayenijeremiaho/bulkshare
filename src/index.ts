import "reflect-metadata";
import * as express from "express";
import "express-async-errors";
import {allRoutes} from "./routes";
import {connectDb, logger} from "./utility";

// create express app
const app = express();

// setup express app here
app.use(express.json());
app.use('/static', express.static('public'));
allRoutes(app);


// connect to db and start express server
const port = process.env.PORT || 3000;
connectDb().then(() => {
    app.listen(port, () => {
        logger.info(`Server has started on port ${port}. Open http://localhost:3000/users to see results`);
    })

});


