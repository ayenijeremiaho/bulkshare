import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from "body-parser";
import {Routes} from "./routes";
import {User} from "./entity/User";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
                    .catch(reason =>  res.status(404).send(reason.message));

            } else if (result !== null && result !== undefined) {
                res.json(result);
            } else {
                res.status(500).send("Internal Server Error");
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    const port = process.env.PORT || 3000;
    app.listen(port);

    console.log(`Server has started on port ${port}. Open http://localhost:3000/users to see results`);

}).catch(error => console.log(error));
